import { useMemo, useState } from "react";
import { useSite } from "../../context/SiteContext";
import Lightbox from "../common/Lightbox";
import Reveal from "../common/Reveal";
import SectionTitle from "../common/SectionTitle";

const Gallery = () => {
  const { data } = useSite();
  const items = data.gallery || [];
  const [filter, setFilter] = useState("All");
  const [index, setIndex] = useState(null);

  const categories = useMemo(() => ["All", ...new Set(items.map((g) => g.category).filter(Boolean))], [items]);
  const visible = useMemo(
    () => (filter === "All" ? items : items.filter((g) => g.category === filter)),
    [items, filter]
  );
  const lightboxItems = useMemo(
    () => visible.map((g) => ({ src: g.image.url, title: g.title, caption: g.caption })),
    [visible]
  );

  if (items.length === 0) return null;

  return (
    <section id="gallery" className="section">
      <div className="container-x">
        <SectionTitle eyebrow="Moments" title="Gallery" />

        {categories.length > 2 && (
          <div className="-mt-6 mb-10 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Gallery categories">
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

        <div className="columns-2 gap-3 sm:gap-4 md:columns-3">
          {visible.map((item, i) => (
            <Reveal key={item._id} delay={(i % 3) * 0.06} className="mb-3 break-inside-avoid sm:mb-4">
              <button
                onClick={() => setIndex(i)}
                aria-label={`Open image${item.title ? `: ${item.title}` : ""}`}
                className="group relative block w-full overflow-hidden rounded-xl border border-line bg-line"
              >
                <img
                  src={item.image.url}
                  alt={item.title || item.caption || "Gallery image"}
                  loading="lazy"
                  className="w-full transition duration-500 group-hover:scale-105"
                />
                {(item.title || item.caption) && (
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep/90 to-transparent p-3 pt-10 text-left text-sm text-white opacity-100 sm:opacity-0 sm:transition sm:group-hover:opacity-100">
                    {item.title || item.caption}
                  </span>
                )}
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <Lightbox items={lightboxItems} index={index} onIndex={setIndex} onClose={() => setIndex(null)} />
    </section>
  );
};

export default Gallery;