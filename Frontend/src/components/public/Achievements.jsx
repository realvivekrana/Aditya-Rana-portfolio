import { FiStar } from "react-icons/fi";
import { useSite } from "../../context/SiteContext";
import { formatDate } from "../../utils/format";
import Reveal from "../common/Reveal";
import SectionTitle from "../common/SectionTitle";

const Achievements = () => {
  const { data } = useSite();
  const items = data.achievements || [];
  if (items.length === 0) return null;

  return (
    <section id="achievements" className="section">
      <div className="container-x">
        <SectionTitle eyebrow="Milestones" title="Achievements & Awards" />

        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item, i) => (
            <Reveal key={item._id} delay={(i % 2) * 0.08}>
              <article className="flex h-full gap-5 rounded-2xl border border-line bg-surface p-5 sm:p-6">
                {item.image?.url ? (
                  <img
                    src={item.image.url}
                    alt={item.title}
                    loading="lazy"
                    className="h-20 w-20 shrink-0 rounded-xl object-cover sm:h-24 sm:w-24"
                  />
                ) : (
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/15 text-accent">
                    <FiStar size={20} />
                  </span>
                )}
                <div className="min-w-0">
                  {item.date && (
                    <p className="text-xs font-semibold uppercase tracking-widest text-brass">
                      {formatDate(item.date)}
                    </p>
                  )}
                  <h3 className="mt-1 font-display text-2xl font-semibold leading-snug">{item.title}</h3>
                  {item.description && (
                    <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;