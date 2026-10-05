import { FiBookOpen } from "react-icons/fi";
import { useSite } from "../../context/SiteContext";
import Reveal from "../common/Reveal";
import SectionTitle from "../common/SectionTitle";

const Education = () => {
  const { data } = useSite();
  const items = data.education || [];
  if (items.length === 0) return null;

  return (
    <section id="education" className="section">
      <div className="container-x">
        <SectionTitle eyebrow="Academics" title="Education" />

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute bottom-2 left-5 top-2 w-px bg-gold/40" aria-hidden="true" />
          <ul className="space-y-8">
            {items.map((item, i) => (
              <li key={item._id}>
                <Reveal delay={i * 0.06} className="relative pl-16">
                  <span className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full border border-gold bg-surface text-accent">
                    <FiBookOpen size={17} />
                  </span>
                  <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
                    {(item.startYear || item.endYear) && (
                      <p className="text-xs font-semibold uppercase tracking-widest text-brass">
                        {[item.startYear, item.endYear].filter(Boolean).join(" – ")}
                      </p>
                    )}
                    <h3 className="mt-1 font-display text-2xl font-semibold">{item.degree}</h3>
                    <p className="mt-1 text-muted">
                      {item.institution}
                      {item.field && ` · ${item.field}`}
                    </p>
                    {item.grade && (
                      <p className="mt-3 inline-block rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-accent">
                        {item.grade}
                      </p>
                    )}
                    {item.description && <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>}
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Education;