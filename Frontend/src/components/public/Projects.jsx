import { useMemo, useState } from "react";
import { FiExternalLink, FiStar } from "react-icons/fi";
import { useSite } from "../../context/SiteContext";
import { ensureUrl } from "../../utils/format";
import Reveal from "../common/Reveal";
import SectionTitle from "../common/SectionTitle";

const Projects = () => {
  const { data } = useSite();
  const items = data.projects || [];
  const [filter, setFilter] = useState("All");

  const categories = useMemo(() => ["All", ...new Set(items.map((p) => p.category).filter(Boolean))], [items]);
  if (items.length === 0) return null;

  const visible = filter === "All" ? items : items.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section">
      <div className="container-x">
        <SectionTitle eyebrow="Work" title="Projects" />

        {categories.length > 2 && (
          <div className="-mt-6 mb-10 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Project categories">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={filter === cat}
                onClick={() => setFilter(cat)}
                className={`min-h-10 rounded-full border px-5 text-sm font-medium transition ${
                  filter === cat
                    ? "border-gold bg-gold text-deep"
                    : "border-line text-muted hover:border-gold hover:text-ink"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, i) => (
            <Reveal key={project._id} delay={(i % 3) * 0.08}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition duration-300 hover:-translate-y-1 hover:border-gold/60">
                {project.image?.url && (
                  <div className="aspect-[16/10] overflow-hidden bg-line">
                    <img
                      src={project.image.url}
                      alt={project.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-widest text-brass">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="flex items-center gap-1 rounded-full bg-gold/15 px-2.5 py-1 text-xs font-semibold text-accent">
                        <FiStar size={12} /> Featured
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-semibold leading-snug">{project.title}</h3>
                  {project.description && (
                    <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-muted">{project.description}</p>
                  )}
                  {project.tags?.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <li key={tag} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}
                  {project.link && (
                    <a
                      href={ensureUrl(project.link)}
                      className="mt-5 inline-flex min-h-10 items-center gap-2 pt-1 text-sm font-semibold text-accent hover:text-gold"
                    >
                      View project <FiExternalLink size={15} />
                    </a>
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

export default Projects;