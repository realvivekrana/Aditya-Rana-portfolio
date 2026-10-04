import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";
import Home from "../pages/public/Home";
import NotFound from "../pages/public/NotFound";
import Login from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";

const ComingSoon = () => (
  <div className="rounded-xl bg-white p-10 text-center shadow-sm">
    <h2 className="text-xl font-semibold">Coming soon</h2>
    <p className="mt-2 text-slate-500">Ye page agle steps me banega.</p>
  </div>
);

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />

    <Route path="/admin/login" element={<Login />} />

    <Route path="/admin" element={<ProtectedRoute />}>
      <Route element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="*" element={<ComingSoon />} />
      </Route>
    </Route>

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;