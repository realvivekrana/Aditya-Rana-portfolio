import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authApi, getErrorMessage, settingsApi } from "../../api/services";
import useFetch from "../../hooks/useFetch";
import Loader from "../../components/common/Loader";

const SECTIONS = [
  ["education", "Education"],
  ["skills", "Skills"],
  ["experience", "Experience"],
  ["projects", "Projects"],
  ["publications", "Publications"],
  ["certificates", "Certificates"],
  ["achievements", "Achievements"],
  ["gallery", "Gallery"],
  ["blog", "Blog"],
  ["contact", "Contact form"],
];

const toForm = (s = {}) => ({
  siteTitle: s.siteTitle || "",
  siteDescription: s.siteDescription || "",
  keywords: (s.keywords || []).join(", "),
  footerText: s.footerText || "",
  defaultMode: s.defaultMode || "light",
  sections: Object.fromEntries(SECTIONS.map(([key]) => [key, s.sections?.[key] !== false])),
});

const Settings = () => {
  const { data, loading, error, refetch } = useFetch(settingsApi.get);
  const [form, setForm] = useState(toForm());
  const [saving, setSaving] = useState(false);
  const [pw, setPw] = useState({ currentPassword: "", newPassword: "", confirm: "" });
  const [changing, setChanging] = useState(false);

  useEffect(() => {
    if (data) setForm(toForm(data));
  }, [data]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const saveSettings = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await settingsApi.update(form);
      toast.success("Settings saved");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    if (pw.newPassword.length < 6) return toast.error("New password must be at least 6 characters");
    if (pw.newPassword !== pw.confirm) return toast.error("Passwords do not match");

    setChanging(true);
    try {
      await authApi.changePassword(pw.currentPassword, pw.newPassword);
      toast.success("Password changed successfully");
      setPw({ currentPassword: "", newPassword: "", confirm: "" });
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setChanging(false);
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

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <form onSubmit={saveSettings} className="space-y-6">
        <section className="space-y-4 rounded-xl bg-white p-5 shadow-sm">
          <h2 className="font-semibold">Website & SEO</h2>
          <div>
            <label htmlFor="s-title" className="label-admin">
              Website title
            </label>
            <input id="s-title" name="siteTitle" value={form.siteTitle} onChange={handleChange} className="input-admin" />
            <p className="mt-1 text-xs text-slate-500">Shown in the browser tab and in search results.</p>
          </div>
          <div>
            <label htmlFor="s-desc" className="label-admin">
              Website description
            </label>
            <textarea
              id="s-desc"
              name="siteDescription"
              value={form.siteDescription}
              onChange={handleChange}
              rows={3}
              maxLength={300}
              className="input-admin"
            />
          </div>
          <div>
            <label htmlFor="s-keywords" className="label-admin">
              Keywords
            </label>
            <input
              id="s-keywords"
              name="keywords"
              value={form.keywords}
              onChange={handleChange}
              className="input-admin"
              placeholder="pharmacy, B.Pharm, research"
            />
            <p className="mt-1 text-xs text-slate-500">Separate keywords with commas.</p>
          </div>
          <div>
            <label htmlFor="s-footer" className="label-admin">
              Footer text
            </label>
            <input id="s-footer" name="footerText" value={form.footerText} onChange={handleChange} className="input-admin" />
          </div>
          <div>
            <label htmlFor="s-mode" className="label-admin">
              Default theme for new visitors
            </label>
            <select id="s-mode" name="defaultMode" value={form.defaultMode} onChange={handleChange} className="input-admin sm:max-w-xs">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </section>

        <section className="rounded-xl bg-white p-5 shadow-sm">
          <h2 className="font-semibold">Visible sections</h2>
          <p className="mb-4 text-sm text-slate-500">Turn sections on or off on the public website.</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SECTIONS.map(([key, label]) => (
              <label key={key} className="flex min-h-11 items-center justify-between gap-3 rounded-lg border border-slate-200 px-4 py-2">
                <span className="text-sm font-medium">{label}</span>
                <input
                  type="checkbox"
                  checked={form.sections[key]}
                  onChange={(e) => setForm({ ...form, sections: { ...form.sections, [key]: e.target.checked } })}
                  className="h-5 w-5 accent-primary"
                />
              </label>
            ))}
          </div>
        </section>

        <div className="flex justify-end">
          <button type="submit" disabled={saving} className="btn-admin">
            {saving ? "Saving..." : "Save settings"}
          </button>
        </div>
      </form>

      <form onSubmit={changePassword} className="space-y-4 rounded-xl bg-white p-5 shadow-sm">
        <h2 className="font-semibold">Change password</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["currentPassword", "Current password", "current-password"],
            ["newPassword", "New password", "new-password"],
            ["confirm", "Confirm new password", "new-password"],
          ].map(([name, label, autoComplete]) => (
            <div key={name}>
              <label htmlFor={`pw-${name}`} className="label-admin">
                {label}
              </label>
              <input
                id={`pw-${name}`}
                type="password"
                value={pw[name]}
                autoComplete={autoComplete}
                required
                onChange={(e) => setPw({ ...pw, [name]: e.target.value })}
                className="input-admin"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <button type="submit" disabled={changing} className="btn-admin">
            {changing ? "Updating..." : "Update password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;