import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiArrowUp, FiLock, FiMail, FiX } from "react-icons/fi";
import { useSite } from "../../context/SiteContext";
import useAuth from "../../hooks/useAuth";
import { getErrorMessage } from "../../api/services";
import SocialLinks from "../common/SocialLinks";

const Footer = () => {
  const { profile, settings } = useSite();
  const { admin, login } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  const name = profile.fullName || settings.siteTitle || "Portfolio";
  const text = settings.footerText || `© ${new Date().getFullYear()} ${name}. All rights reserved.`;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(form.email, form.password);
      toast.success("Welcome back!");
      setForm({ email: "", password: "" });
      setOpen(false);
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="bg-deep pb-[max(2rem,env(safe-area-inset-bottom))] pt-14 text-white">
      <div className="container-x flex flex-col items-center gap-6 text-center">
        <p className="font-display text-3xl font-semibold">{name}</p>
        {profile.tagline && <p className="max-w-xl text-sm text-white/65">{profile.tagline}</p>}

        <SocialLinks socials={profile.socials} className="justify-center" />

        <div className="h-px w-full max-w-xs bg-gold/30" />

        <div className="flex w-full flex-col items-center justify-between gap-4 text-sm text-white/60 sm:flex-row">
          <p>{text}</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-5 text-white/80 transition hover:border-gold hover:text-gold"
          >
            <FiArrowUp size={16} />
            Back to top
          </button>
        </div>

        {/* Admin access */}
        {admin ? (
          <Link
            to="/admin/dashboard"
            className="flex min-h-11 items-center gap-1.5 px-3 text-xs text-gold transition hover:opacity-80"
          >
            <FiLock size={12} />
            Dashboard
          </Link>
        ) : !open ? (
          <button
            onClick={() => setOpen(true)}
            className="flex min-h-11 items-center gap-1.5 px-3 text-xs text-white/35 transition hover:text-gold"
          >
            <FiLock size={12} />
            Admin
          </button>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-xs space-y-3 rounded-xl border border-white/10 bg-white/5 p-4 text-left"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wide text-white/60">Admin Login</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="text-white/50 transition hover:text-gold"
              >
                <FiX size={16} />
              </button>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-white/15 px-3 focus-within:border-gold">
              <FiMail size={14} className="text-white/40" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="username"
                placeholder="Email"
                className="w-full bg-transparent py-2 text-sm text-white outline-none placeholder:text-white/30"
              />
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-white/15 px-3 focus-within:border-gold">
              <FiLock size={14} className="text-white/40" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
                placeholder="Password"
                className="w-full bg-transparent py-2 text-sm text-white outline-none placeholder:text-white/30"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-gold py-2 text-sm font-medium text-deep transition hover:opacity-90 disabled:opacity-60"
            >
              {submitting ? "Signing in..." : "Sign in"}
            </button>
          </form>
        )}
      </div>
    </footer>
  );
};

export default Footer;