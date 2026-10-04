import { Link } from "react-router-dom";
import {
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiEdit3,
  FiEye,
  FiFileText,
  FiFolder,
  FiImage,
  FiMail,
  FiStar,
  FiTool,
} from "react-icons/fi";
import { dashboardApi } from "../../api/services";
import useFetch from "../../hooks/useFetch";
import Loader from "../../components/common/Loader";

const cards = [
  { key: "education", label: "Education", to: "/admin/education", icon: FiBookOpen },
  { key: "skills", label: "Skills", to: "/admin/skills", icon: FiTool },
  { key: "experience", label: "Experience", to: "/admin/experience", icon: FiBriefcase },
  { key: "projects", label: "Projects", to: "/admin/projects", icon: FiFolder },
  { key: "certificates", label: "Certificates", to: "/admin/certificates", icon: FiAward },
  { key: "achievements", label: "Achievements", to: "/admin/achievements", icon: FiStar },
  { key: "publications", label: "Publications", to: "/admin/publications", icon: FiFileText },
  { key: "gallery", label: "Gallery", to: "/admin/gallery", icon: FiImage },
  { key: "blogs", label: "Blogs", to: "/admin/blogs", icon: FiEdit3 },
];

const Dashboard = () => {
  const { data, loading, error, refetch } = useFetch(dashboardApi.stats);

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow-sm">
        <p className="text-red-600">{error}</p>
        <button onClick={refetch} className="mt-4 rounded-lg bg-primary px-4 py-2 text-white">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Highlight cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Link to="/admin/messages" className="flex items-center gap-4 rounded-xl bg-primary p-5 text-white shadow-sm">
          <FiMail size={28} />
          <div>
            <p className="text-3xl font-bold">{data.unreadMessages}</p>
            <p className="text-sm opacity-90">Unread messages</p>
          </div>
        </Link>
        <div className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm">
          <FiMail size={28} className="text-slate-400" />
          <div>
            <p className="text-3xl font-bold">{data.totalMessages}</p>
            <p className="text-sm text-slate-500">Total messages</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm">
          <FiEye size={28} className="text-slate-400" />
          <div>
            <p className="text-3xl font-bold">{data.totalBlogViews}</p>
            <p className="text-sm text-slate-500">Blog views</p>
          </div>
        </div>
      </div>

      {/* Counts */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ key, label, to, icon: Icon }) => (
          <Link
            key={key}
            to={to}
            className="flex items-center justify-between rounded-xl bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div>
              <p className="text-sm text-slate-500">{label}</p>
              <p className="text-2xl font-bold">{data.counts[key]}</p>
            </div>
            <Icon size={26} className="text-primary" />
          </Link>
        ))}
      </div>

      {/* Recent messages */}
      <div className="rounded-xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">Recent messages</h2>
        {data.recentMessages.length === 0 ? (
          <p className="text-slate-500">Abhi koi message nahi aaya.</p>
        ) : (
          <ul className="divide-y">
            {data.recentMessages.map((m) => (
              <li key={m._id} className="py-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium">
                    {m.name}
                    {!m.isRead && (
                      <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">New</span>
                    )}
                  </p>
                  <span className="text-xs text-slate-400">{new Date(m.createdAt).toLocaleString()}</span>
                </div>
                <p className="text-sm text-slate-500">{m.subject || "(no subject)"}</p>
                <p className="mt-1 line-clamp-2 text-sm">{m.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;