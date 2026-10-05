import { FiBriefcase, FiMapPin } from "react-icons/fi";
import { useSite } from "../../context/SiteContext";
import { formatRange } from "../../utils/format";
import Reveal from "../common/Reveal";
import SectionTitle from "../common/SectionTitle";

const Experience = () => {
  const { data } = useSite();
  const items = data.experience || [];
  if (items.length === 0) return null;

  return (
    <section id="experience" className="section">
      <div className="container-x">
        <SectionTitle eyebrow="Journey" title="Experience & Training" />

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute bottom-2 left-5 top-2 w-px bg-gold/40" aria-hidden="true" />
          <ul className="space-y-8">
            {items.map((item, i) => (
              <li key={item._id}>
                <Reveal delay={i * 0.06} className="relative pl-16">
                  <span className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-gold bg-surface text-accent">
                    {item.image?.url ? (
                      <img src={item.image.url} alt="" className="h-full w-full object-cover" loading="lazy" />
                    ) : (
                      <FiBriefcase size={17} />
                    )}
                  </span>
                  <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-accent">
                        {item.type}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-widest text-brass">
                        {formatRange(item.startDate, item.endDate, item.current)}
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-2xl font-semibold">{item.title}</h3>
                    <p className="mt-1 text-muted">{item.organization}</p>
                    {item.location && (
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                        <FiMapPin size={14} />
                        {item.location}
                      </p>
                    )}
                    {item.description && (
                      <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted">
                        {item.description}
                      </p>
                    )}
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

export default Experience;