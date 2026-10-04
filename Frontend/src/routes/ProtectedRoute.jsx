import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "../components/common/Loader";

const ProtectedRoute = () => {
  const { admin, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loader fullScreen />;
  if (!admin) return <Navigate to="/admin/login" state={{ from: location }} replace />;

  return <Outlet />;
};

export default ProtectedRoute;