import { useState } from "react";
import toast from "react-hot-toast";
import { FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";
import { getErrorMessage, messageApi } from "../../api/services";
import { useSite } from "../../context/SiteContext";
import Reveal from "../common/Reveal";
import SectionTitle from "../common/SectionTitle";
import SocialLinks from "../common/SocialLinks";

const EMPTY = { name: "", email: "", subject: "", message: "", website: "" };

const Contact = () => {
  const { profile, settings } = useSite();
  const [form, setForm] = useState(EMPTY);
  const [sending, setSending] = useState(false);

  if (settings.sections?.contact === false) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // hidden "website" field is only filled by bots
    if (form.website) {
      setForm(EMPTY);
      return toast.success("Thank you! Your message has been sent.");
    }
    if (form.message.trim().length < 10) {
      return toast.error("Please write a message of at least 10 characters.");
    }

    setSending(true);
    try {
      const { name, email, subject, message } = form;
      await messageApi.send({ name, email, subject, message });
      toast.success("Thank you! Your message has been sent.");
      setForm(EMPTY);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSending(false);
    }
  };

  const info = [
    { icon: FiMail, label: "Email", value: profile.email, href: profile.email && `mailto:${profile.email}` },
    { icon: FiPhone, label: "Phone", value: profile.phone, href: profile.phone && `tel:${profile.phone.replace(/\s/g, "")}` },
    { icon: FiMapPin, label: "Location", value: profile.location },
  ].filter((i) => i.value);

  return (
    <section id="contact" className="section">
      <div className="container-x">
        <SectionTitle
          eyebrow="Contact"
          title="Let's get in touch"
          subtitle="Have a question or an opportunity in mind? Send me a message and I will get back to you soon."
        />

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          <Reveal className="space-y-6">
            {info.length > 0 && (
              <ul className="space-y-5">
                {info.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/15 text-accent">
                      <Icon size={19} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-widest text-muted">{label}</p>
                      {href ? (
                        <a href={href} className="break-words font-medium hover:text-gold">
                          {value}
                        </a>
                      ) : (
                        <p className="break-words font-medium">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <SocialLinks socials={profile.socials} tone="dark" />
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 rounded-2xl border border-line bg-surface p-5 sm:p-8"
              noValidate={false}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium">Your name</span>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    autoComplete="name"
                    className="input-lux"
                    placeholder="John Doe"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium">Email address</span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    className="input-lux"
                    placeholder="you@example.com"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">Subject (optional)</span>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  maxLength={150}
                  className="input-lux"
                  placeholder="How can I help you?"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">Message</span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  maxLength={2000}
                  className="input-lux resize-y"
                  placeholder="Write your message here..."
                />
                <span className="mt-1 block text-right text-xs text-muted">{form.message.length}/2000</span>
              </label>

              {/* honeypot field */}
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />

              <button type="submit" disabled={sending} className="btn-primary w-full sm:w-auto disabled:opacity-60">
                <FiSend size={16} />
                {sending ? "Sending..." : "Send message"}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;