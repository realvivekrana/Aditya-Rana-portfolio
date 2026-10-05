import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiEye } from "react-icons/fi";
import { useSite } from "../../context/SiteContext";
import { formatLongDate } from "../../utils/format";
import Reveal from "../common/Reveal";
import SectionTitle from "../common/SectionTitle";

const PAGE = 6;

const Blog = () => {
  const { data } = useSite();
  const items = data.blogs || [];
  const [visible, setVisible] = useState(PAGE);
  if (items.length === 0) return null;

  return (
    <section id="blog" className="section">
      <div className="container-x">
        <SectionTitle eyebrow="Insights" title="Blog" subtitle="Thoughts, notes and learnings." />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.slice(0, visible).map((post, i) => (
            <Reveal key={post._id} delay={(i % 3) * 0.08}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition duration-300 hover:-translate-y-1 hover:border-gold/60">
                {post.image?.url && (
                  <Link to={`/blog/${post.slug}`} className="block aspect-[16/10] overflow-hidden bg-line" tabIndex={-1}>
                    <img
                      src={post.image.url}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </Link>
                )}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-brass">
                    {formatLongDate(post.createdAt)}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold leading-snug">
                    <Link to={`/blog/${post.slug}`} className="hover:text-gold">
                      {post.title}
                    </Link>
                  </h3>
                  {post.excerpt && (
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>
                  )}
                  <div className="mt-auto flex items-center justify-between pt-5 text-sm">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex min-h-10 items-center gap-2 font-semibold text-accent hover:text-gold"
                    >
                      Read article <FiArrowRight size={15} />
                    </Link>
                    <span className="flex items-center gap-1.5 text-xs text-muted">
                      <FiEye size={14} /> {post.views}
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {visible < items.length && (
          <div className="mt-10 text-center">
            <button onClick={() => setVisible((v) => v + PAGE)} className="btn-outline">
              Show more articles
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;