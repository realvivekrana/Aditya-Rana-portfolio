import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiCheck, FiChevronDown, FiMail, FiTrash2 } from "react-icons/fi";
import { getErrorMessage, messageApi } from "../../api/services";
import useFetch from "../../hooks/useFetch";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import Loader from "../../components/common/Loader";

const Messages = () => {
  const { data, loading, error, refetch } = useFetch(() => messageApi.getAll());
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [openId, setOpenId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (data) setItems(data);
  }, [data]);

  const setRead = async (message, isRead) => {
    try {
      await messageApi.markRead(message._id, isRead);
      setItems((prev) => prev.map((m) => (m._id === message._id ? { ...m, isRead } : m)));
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  const toggleOpen = (message) => {
    const opening = openId !== message._id;
    setOpenId(opening ? message._id : null);
    if (opening && !message.isRead) setRead(message, true);
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await messageApi.remove(deleteTarget._id);
      setItems((prev) => prev.filter((m) => m._id !== deleteTarget._id));
      toast.success("Message deleted");
      setDeleteTarget(null);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <Loader />;
  if (error) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow-sm">
        <p className="text-red-600">{error}</p>
        <button onClick={refetch} className="btn-admin mt-4">
          Retry
        </button>
      </div>
    );
  }

  const unread = items.filter((m) => !m.isRead).length;
  const visible = filter === "unread" ? items.filter((m) => !m.isRead) : items;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Messages</h1>
          <p className="text-sm text-slate-500">
            {items.length} total · {unread} unread
          </p>
        </div>
        <div className="flex rounded-lg bg-white p-1 shadow-sm">
          {[
            ["all", "All"],
            ["unread", "Unread"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`min-h-9 rounded-md px-4 text-sm font-medium transition ${
                filter === key ? "bg-primary text-white" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="rounded-xl bg-white p-10 text-center shadow-sm">
          <p className="text-slate-500">{filter === "unread" ? "No unread messages." : "No messages yet."}</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {visible.map((m) => {
            const isOpen = openId === m._id;
            return (
              <li key={m._id} className="overflow-hidden rounded-xl bg-white shadow-sm">
                <button
                  onClick={() => toggleOpen(m)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start gap-3 p-4 text-left"
                >
                  <span
                    className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${m.isRead ? "bg-transparent" : "bg-primary"}`}
                    aria-label={m.isRead ? "Read" : "Unread"}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-x-3">
                      <p className={`truncate ${m.isRead ? "font-medium" : "font-bold"}`}>{m.name}</p>
                      <span className="text-xs text-slate-400">{new Date(m.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="truncate text-sm text-slate-500">{m.subject || "(no subject)"}</p>
                    {!isOpen && <p className="mt-1 line-clamp-1 text-sm text-slate-600">{m.message}</p>}
                  </div>
                  <FiChevronDown className={`mt-1 shrink-0 text-slate-400 transition ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {isOpen && (
                  <div className="border-t border-slate-100 p-4 pl-9">
                    <p className="mb-1 break-all text-sm text-slate-500">{m.email}</p>
                    <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">{m.message}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <a
                        href={`mailto:${m.email}?subject=${encodeURIComponent(`Re: ${m.subject || "Your message"}`)}`}
                        className="btn-admin"
                      >
                        <FiMail size={16} /> Reply by email
                      </a>
                      <button onClick={() => setRead(m, !m.isRead)} className="btn-admin-ghost">
                        <FiCheck size={16} /> Mark as {m.isRead ? "unread" : "read"}
                      </button>
                      <button onClick={() => setDeleteTarget(m)} className="btn-admin-ghost text-red-600">
                        <FiTrash2 size={16} /> Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        message={`Delete the message from ${deleteTarget?.name || "this sender"}? This cannot be undone.`}
        loading={deleting}
        onConfirm={confirmDelete}
        onClose={() => !deleting && setDeleteTarget(null)}
      />
    </div>
  );
};

export default Messages;