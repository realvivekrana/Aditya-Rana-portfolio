import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiLock, FiMail } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import { getErrorMessage } from "../../api/services";
import Loader from "../../components/common/Loader";

const Login = () => {
  const { admin, loading, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  if (loading) return <Loader fullScreen />;

  const redirectTo = location.state?.from?.pathname || "/admin/dashboard";
  if (admin) return <Navigate to={redirectTo} replace />;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(form.email, form.password);
      toast.success("Welcome back!");
      navigate(redirectTo, { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5 rounded-2xl bg-white p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="mt-1 text-sm text-slate-500">Portfolio dashboard me sign in karo</p>
        </div>

        <label className="block">
          <span className="mb-1 block text-sm font-medium">Email</span>
          <div className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 focus-within:border-primary">
            <FiMail className="text-slate-400" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="admin@example.com"
              className="w-full bg-transparent py-2.5 outline-none"
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium">Password</span>
          <div className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 focus-within:border-primary">
            <FiLock className="text-slate-400" />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full bg-transparent py-2.5 outline-none"
            />
          </div>
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-primary py-2.5 font-medium text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {submitting ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
};

export default Login;