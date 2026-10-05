import { FiExternalLink, FiFileText } from "react-icons/fi";
import { useSite } from "../../context/SiteContext";
import { ensureUrl, formatDate } from "../../utils/format";
import Reveal from "../common/Reveal";
import SectionTitle from "../common/SectionTitle";

const Publications = () => {
  const { data } = useSite();
  const items = data.publications || [];
  if (items.length === 0) return null;

  return (
    <section id="publications" className="section">
      <div className="container-x">
        <SectionTitle eyebrow="Research" title="Publications & Presentations" />

        <ul className="mx-auto max-w-4xl space-y-5">
          {items.map((pub, i) => (
            <li key={pub._id}>
              <Reveal delay={i * 0.05}>
                <article className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5 sm:flex-row sm:p-6">
                  {pub.image?.url ? (
                    <img
                      src={pub.image.url}
                      alt={pub.title}
                      loading="lazy"
                      className="h-40 w-full rounded-xl object-cover sm:h-32 sm:w-44 sm:shrink-0"
                    />
                  ) : (
                    <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/15 text-accent sm:flex">
                      <FiFileText size={20} />
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-accent">
                        {pub.type}
                      </span>
                      {pub.date && (
                        <span className="text-xs font-semibold uppercase tracking-widest text-brass">
                          {formatDate(pub.date)}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2 font-display text-2xl font-semibold leading-snug">{pub.title}</h3>
                    {pub.authors && <p className="mt-1 text-sm italic text-muted">{pub.authors}</p>}
                    {pub.venue && <p className="mt-1 text-sm text-muted">{pub.venue}</p>}
                    {pub.description && (
                      <p className="mt-3 text-sm leading-relaxed text-muted">{pub.description}</p>
                    )}
                    {pub.link && (
                      <a
                        href={ensureUrl(pub.link)}
                        className="mt-4 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-accent hover:text-gold"
                      >
                        Read more <FiExternalLink size={15} />
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Publications;