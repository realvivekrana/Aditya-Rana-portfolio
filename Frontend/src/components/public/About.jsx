import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { useSite } from "../../context/SiteContext";
import { getVisibleSections } from "../../utils/sections";
import Reveal from "../common/Reveal";
import SectionTitle from "../common/SectionTitle";

const About = () => {
  const { profile, settings, data } = useSite();
  if (!getVisibleSections(profile, settings, data).some((s) => s.id === "about")) return null;

  const stats = [
    { label: "Projects", value: data.projects?.length },
    { label: "Publications", value: data.publications?.length },
    { label: "Certificates", value: data.certificates?.length },
    { label: "Achievements", value: data.achievements?.length },
  ].filter((s) => s.value > 0);

  const info = [
    { icon: FiMail, label: "Email", value: profile.email, href: profile.email && `mailto:${profile.email}` },
    { icon: FiPhone, label: "Phone", value: profile.phone, href: profile.phone && `tel:${profile.phone.replace(/\s/g, "")}` },
    { icon: FiMapPin, label: "Location", value: profile.location },
  ].filter((i) => i.value);

  return (
    <section id="about" className="section">
      <div className="container-x">
        <SectionTitle eyebrow="About me" title="A little about myself" />

        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
          <Reveal>
            {profile.bio ? (
              <div className="space-y-4 text-base leading-[1.9] text-muted sm:text-lg">
                {profile.bio.split(/\n+/).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            ) : (
              <p className="text-muted">Get in touch to know more.</p>
            )}
          </Reveal>

          <Reveal delay={0.1} className="space-y-6">
            {info.length > 0 && (
              <ul className="space-y-4 rounded-2xl border border-line bg-surface p-6">
                {info.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/15 text-accent">
                      <Icon size={18} />
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

            {stats.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {stats.map(({ label, value }) => (
                  <div key={label} className="rounded-2xl border border-line bg-surface p-5 text-center">
                    <p className="font-display text-4xl font-semibold text-accent">{value}</p>
                    <p className="mt-1 text-xs uppercase tracking-widest text-muted">{label}</p>
                  </div>
                ))}
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;