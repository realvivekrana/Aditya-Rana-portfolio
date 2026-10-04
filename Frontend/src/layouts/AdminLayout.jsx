import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiEdit3,
  FiFileText,
  FiFolder,
  FiHome,
  FiImage,
  FiLogOut,
  FiMail,
  FiMenu,
  FiSettings,
  FiStar,
  FiTool,
  FiUser,
  FiX,
} from "react-icons/fi";
import useAuth from "../hooks/useAuth";

const links = [
  { to: "/admin/dashboard", label: "Dashboard", icon: FiHome },
  { to: "/admin/profile", label: "Profile", icon: FiUser },
  { to: "/admin/education", label: "Education", icon: FiBookOpen },
  { to: "/admin/skills", label: "Skills", icon: FiTool },
  { to: "/admin/experience", label: "Experience", icon: FiBriefcase },
  { to: "/admin/projects", label: "Projects", icon: FiFolder },
  { to: "/admin/certificates", label: "Certificates", icon: FiAward },
  { to: "/admin/achievements", label: "Achievements", icon: FiStar },
  { to: "/admin/publications", label: "Publications", icon: FiFileText },
  { to: "/admin/gallery", label: "Gallery", icon: FiImage },
  { to: "/admin/blogs", label: "Blogs", icon: FiEdit3 },
  { to: "/admin/messages", label: "Messages", icon: FiMail },
  { to: "/admin/settings", label: "Settings", icon: FiSettings },
];

const AdminLayout = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-slate-900 text-slate-300 transition-transform lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <span className="text-lg font-bold text-white">Admin Panel</span>
          <button className="lg:hidden" onClick={() => setOpen(false)}>
            <FiX size={22} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-4">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                  isActive ? "bg-primary text-white" : "hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between bg-white px-4 shadow-sm">
          <button className="lg:hidden" onClick={() => setOpen(true)}>
            <FiMenu size={22} />
          </button>
          <div className="hidden lg:block" />

          <div className="flex items-center gap-4">
            <Link to="/" target="_blank" className="text-sm text-slate-500 hover:text-primary">
              View site
            </Link>
            <span className="hidden text-sm font-medium sm:block">{admin?.name}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm hover:bg-slate-200"
            >
              <FiLogOut size={16} />
              Logout
            </button>
          </div>
        </header>

        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;