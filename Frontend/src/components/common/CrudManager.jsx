import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiArrowDown, FiArrowUp, FiEdit2, FiEye, FiEyeOff, FiPlus, FiTrash2 } from "react-icons/fi";
import { getErrorMessage } from "../../api/services";
import useFetch from "../../hooks/useFetch";
import { toInputDate } from "../../utils/format";
import ConfirmDialog from "./ConfirmDialog";
import ImageUpload from "./ImageUpload";
import Loader from "./Loader";
import Modal from "./Modal";

/*
  Generic admin page for any CRUD resource.
  fields: [{ name, label, type, required, options, placeholder, help, full, showIf, min, max }]
  types: text | textarea | number | select | date | checkbox | tags | url
*/

const blankValues = (fields) => {
  const values = { isPublished: true };
  fields.forEach((f) => {
    if (f.type === "checkbox") values[f.name] = f.default ?? false;
    else if (f.type === "select") values[f.name] = f.default ?? f.options?.[0] ?? "";
    else values[f.name] = f.default ?? "";
  });
  return values;
};

const valuesFromItem = (fields, item) => {
  const values = { isPublished: item.isPublished !== false };
  fields.forEach((f) => {
    const raw = item[f.name];
    if (f.type === "tags") values[f.name] = Array.isArray(raw) ? raw.join(", ") : "";
    else if (f.type === "date") values[f.name] = toInputDate(raw);
    else if (f.type === "checkbox") values[f.name] = Boolean(raw);
    else values[f.name] = raw ?? "";
  });
  return values;
};

const CrudManager = ({
  api,
  title,
  singular,
  fields,
  hasImage = false,
  imageRequired = false,
  imageLabel = "Image",
  getTitle,
  getSubtitle,
  getBadges,
  helperText,
}) => {
  const { data, loading, error, refetch } = useFetch(api.getAllAdmin);
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null); // null | "new" | item
  const [values, setValues] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imageRemoved, setImageRemoved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (data) setItems(data);
  }, [data]);

  const isNew = editing === "new";
  const currentImage = !isNew && editing?.image?.url ? editing.image.url : "";

  const closeForm = () => {
    if (saving) return;
    setEditing(null);
  };

  const openNew = () => {
    setValues(blankValues(fields));
    setImageFile(null);
    setImageRemoved(false);
    setEditing("new");
  };

  const openEdit = (item) => {
    setValues(valuesFromItem(fields, item));
    setImageFile(null);
    setImageRemoved(false);
    setEditing(item);
  };

  const setValue = (name, value) => setValues((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const f of fields) {
      if (f.showIf && !f.showIf(values)) continue;
      if (f.required && !String(values[f.name] ?? "").trim()) {
        return toast.error(`${f.label} is required`);
      }
    }
    if (hasImage && imageRequired && !imageFile && !currentImage) {
      return toast.error(`${imageLabel} is required`);
    }

    let payload;
    if (hasImage) {
      payload = new FormData();
      fields.forEach((f) => payload.append(f.name, values[f.name] ?? ""));
      payload.append("isPublished", values.isPublished);
      if (imageFile) payload.append("image", imageFile);
      if (imageRemoved && !imageFile) payload.append("removeImage", "true");
    } else {
      payload = { ...values };
    }

    setSaving(true);
    try {
      if (isNew) await api.create(payload);
      else await api.update(editing._id, payload);
      toast.success(`${singular} ${isNew ? "created" : "updated"} successfully`);
      setEditing(null);
      refetch();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const togglePublished = async (item) => {
    try {
      const updated = await api.update(item._id, { isPublished: !item.isPublished });
      setItems((prev) => prev.map((i) => (i._id === item._id ? { ...i, isPublished: updated.isPublished } : i)));
      toast.success(updated.isPublished ? "Published" : "Moved to drafts");
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  const move = async (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;

    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    setItems(next);

    try {
      await api.reorder(next.map((i) => i._id));
    } catch (err) {
      toast.error(getErrorMessage(err));
      refetch();
    }
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await api.remove(deleteTarget._id);
      toast.success(`${singular} deleted`);
      setDeleteTarget(null);
      refetch();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setDeleting(false);
    }
  };

  const renderField = (f) => {
    if (f.showIf && !f.showIf(values)) return null;

    const common = {
      id: `f-${f.name}`,
      name: f.name,
      value: values[f.name] ?? "",
      onChange: (e) => setValue(f.name, e.target.value),
      placeholder: f.placeholder,
      className: "input-admin",
    };

    let control;
    if (f.type === "textarea") control = <textarea {...common} rows={f.rows || 4} />;
    else if (f.type === "select") {
      control = (
        <select {...common}>
          {f.options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      );
    } else if (f.type === "number") control = <input {...common} type="number" min={f.min} max={f.max} />;
    else if (f.type === "date") control = <input {...common} type="date" />;
    else if (f.type === "url") control = <input {...common} type="url" inputMode="url" />;
    else if (f.type === "checkbox") {
      return (
        <label key={f.name} className={`flex items-center gap-3 ${f.full ? "sm:col-span-2" : ""}`}>
          <input
            type="checkbox"
            checked={Boolean(values[f.name])}
            onChange={(e) => setValue(f.name, e.target.checked)}
            className="h-5 w-5 rounded border-slate-300 accent-primary"
          />
          <span className="text-sm font-medium text-slate-700">{f.label}</span>
        </label>
      );
    } else control = <input {...common} type="text" />;

    return (
      <div key={f.name} className={f.full ? "sm:col-span-2" : ""}>
        <label htmlFor={`f-${f.name}`} className="label-admin">
          {f.label} {f.required && <span className="text-red-500">*</span>}
        </label>
        {control}
        {f.help && <p className="mt-1 text-xs text-slate-500">{f.help}</p>}
      </div>
    );
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

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm text-slate-500">
            {items.length} {items.length === 1 ? "item" : "items"}
            {helperText && ` · ${helperText}`}
          </p>
        </div>
        <button onClick={openNew} className="btn-admin">
          <FiPlus size={18} /> Add {singular}
        </button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl bg-white p-10 text-center shadow-sm">
          <p className="text-slate-500">No {title.toLowerCase()} yet. Click “Add {singular}” to create the first one.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li key={item._id} className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm sm:flex-row sm:items-center">
              <div className="flex min-w-0 flex-1 items-center gap-4">
                {hasImage && (
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                    {item.image?.url && <img src={item.image.url} alt="" className="h-full w-full object-cover" loading="lazy" />}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="truncate font-semibold">{getTitle(item) || "Untitled"}</p>
                  {getSubtitle && <p className="truncate text-sm text-slate-500">{getSubtitle(item)}</p>}
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {!item.isPublished && (
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">Draft</span>
                    )}
                    {getBadges?.(item).filter(Boolean).map((badge) => (
                      <span key={badge} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-0.5 border-t border-slate-100 pt-2 sm:border-0 sm:pt-0">
                <button className="icon-btn" onClick={() => move(index, -1)} disabled={index === 0} aria-label="Move up">
                  <FiArrowUp size={17} />
                </button>
                <button
                  className="icon-btn"
                  onClick={() => move(index, 1)}
                  disabled={index === items.length - 1}
                  aria-label="Move down"
                >
                  <FiArrowDown size={17} />
                </button>
                <button
                  className="icon-btn"
                  onClick={() => togglePublished(item)}
                  aria-label={item.isPublished ? "Unpublish" : "Publish"}
                  title={item.isPublished ? "Visible on website" : "Hidden (draft)"}
                >
                  {item.isPublished ? <FiEye size={17} /> : <FiEyeOff size={17} />}
                </button>
                <button className="icon-btn" onClick={() => openEdit(item)} aria-label="Edit">
                  <FiEdit2 size={17} />
                </button>
                <button className="icon-btn hover:!text-red-600" onClick={() => setDeleteTarget(item)} aria-label="Delete">
                  <FiTrash2 size={17} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Modal open={Boolean(editing)} onClose={closeForm} title={`${isNew ? "Add" : "Edit"} ${singular}`}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">{fields.map(renderField)}</div>

          {hasImage && (
            <ImageUpload
              label={imageLabel}
              required={imageRequired}
              currentUrl={currentImage}
              file={imageFile}
              onFile={(file) => {
                setImageFile(file);
                if (file) setImageRemoved(false);
              }}
              removed={imageRemoved}
              onRemove={() => setImageRemoved(true)}
            />
          )}

          <label className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
            <input
              type="checkbox"
              checked={Boolean(values.isPublished)}
              onChange={(e) => setValue("isPublished", e.target.checked)}
              className="h-5 w-5 accent-primary"
            />
            <span className="text-sm">
              <span className="font-medium">Published</span>
              <span className="block text-xs text-slate-500">Untick to keep it as a draft (hidden from the website)</span>
            </span>
          </label>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={closeForm} className="btn-admin-ghost">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="btn-admin">
              {saving ? "Saving..." : isNew ? `Create ${singular}` : "Save changes"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        message={`This will permanently delete “${deleteTarget ? getTitle(deleteTarget) : ""}”. This action cannot be undone.`}
        loading={deleting}
        onConfirm={confirmDelete}
        onClose={() => !deleting && setDeleteTarget(null)}
      />
    </div>
  );
};

export default CrudManager;