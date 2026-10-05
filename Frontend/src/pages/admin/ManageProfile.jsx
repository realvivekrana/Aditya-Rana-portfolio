import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FiExternalLink, FiFileText, FiUpload } from "react-icons/fi";
import { getErrorMessage, profileApi } from "../../api/services";
import useFetch from "../../hooks/useFetch";
import ImageUpload from "../../components/common/ImageUpload";
import Loader from "../../components/common/Loader";

const SOCIALS = ["linkedin", "github", "twitter", "instagram", "facebook", "website"];

const toForm = (profile = {}) => ({
  fullName: profile.fullName || "",
  tagline: profile.tagline || "",
  roles: (profile.roles || []).join(", "),
  bio: profile.bio || "",
  email: profile.email || "",
  phone: profile.phone || "",
  location: profile.location || "",
  ...Object.fromEntries(SOCIALS.map((s) => [s, profile.socials?.[s] || ""])),
});

const ManageProfile = () => {
  const { data, loading, error, refetch } = useFetch(profileApi.get);
  const [form, setForm] = useState(toForm());
  const [photo, setPhoto] = useState(null);
  const [resume, setResume] = useState(null);
  const [saving, setSaving] = useState(false);
  const resumeRef = useRef(null);

  useEffect(() => {
    if (data) setForm(toForm(data));
  }, [data]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleResume = (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (file.type !== "application/pdf") return toast.error("Resume must be a PDF file");
    if (file.size > 10 * 1024 * 1024) return toast.error("Resume is too large (max 10MB)");
    setResume(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = new FormData();
    Object.entries(form).forEach(([key, value]) => body.append(key, value));
    if (photo) body.append("photo", photo);
    if (resume) body.append("resume", resume);

    setSaving(true);
    try {
      await profileApi.update(body);
      toast.success("Profile updated successfully");
      setPhoto(null);
      setResume(null);
      refetch();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSaving(false);
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

  const input = (name, label, props = {}) => (
    <div className={props.full ? "sm:col-span-2" : ""}>
      <label htmlFor={`p-${name}`} className="label-admin">
        {label}
      </label>
      <input id={`p-${name}`} name={name} value={form[name]} onChange={handleChange} className="input-admin" {...props.input} />
      {props.help && <p className="mt-1 text-xs text-slate-500">{props.help}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Profile</h1>
          <p className="text-sm text-slate-500">This information appears in the hero, about and contact sections.</p>
        </div>
        <button type="submit" disabled={saving} className="btn-admin">
          {saving ? "Saving..." : "Save profile"}
        </button>
      </div>

      <section className="space-y-5 rounded-xl bg-white p-5 shadow-sm">
        <h2 className="font-semibold">Photo & resume</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <ImageUpload label="Profile photo" shape="round" currentUrl={data?.photo?.url} file={photo} onFile={setPhoto} />

          <div>
            <span className="label-admin">Resume (PDF)</span>
            <div className="flex flex-wrap items-center gap-3">
              <button type="button" onClick={() => resumeRef.current?.click()} className="btn-admin-ghost">
                <FiUpload size={16} />
                {data?.resume?.url || resume ? "Replace PDF" : "Upload PDF"}
              </button>
              <input ref={resumeRef} type="file" accept="application/pdf" onChange={handleResume} className="hidden" />
              {resume && (
                <span className="flex items-center gap-2 text-sm text-slate-600">
                  <FiFileText /> {resume.name}
                </span>
              )}
              {!resume && data?.resume?.url && (
                <a
                  href={data.resume.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-primary underline"
                >
                  View current resume <FiExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 font-semibold">Basic information</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {input("fullName", "Full name", { input: { required: true, placeholder: "Aditya Rana" } })}
          {input("location", "Location", { input: { placeholder: "City, Country" } })}
          {input("roles", "Roles", {
            full: true,
            input: { placeholder: "B.Pharm Student, Researcher, Aspiring Pharmacist" },
            help: "Separate roles with commas. They rotate in the hero section.",
          })}
          {input("tagline", "Tagline", { full: true, input: { placeholder: "One short line about you" } })}
          <div className="sm:col-span-2">
            <label htmlFor="p-bio" className="label-admin">
              Bio
            </label>
            <textarea
              id="p-bio"
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={7}
              className="input-admin"
              placeholder="Write about yourself. Leave a blank line to start a new paragraph."
            />
          </div>
        </div>
      </section>

      <section className="rounded-xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 font-semibold">Contact details</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {input("email", "Email", { input: { type: "email", placeholder: "name@example.com" } })}
          {input("phone", "Phone", { input: { type: "tel", placeholder: "+91 98765 43210" } })}
        </div>
      </section>

      <section className="rounded-xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 font-semibold">Social links</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {SOCIALS.map((s) =>
            input(s, s.charAt(0).toUpperCase() + s.slice(1), { input: { placeholder: "https://..." } })
          )}
        </div>
      </section>

      <div className="flex justify-end">
        <button type="submit" disabled={saving} className="btn-admin">
          {saving ? "Saving..." : "Save profile"}
        </button>
      </div>
    </form>
  );
};

export default ManageProfile;