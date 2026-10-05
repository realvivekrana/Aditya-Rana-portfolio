import { useMemo, useState } from "react";
import { FiAward, FiExternalLink, FiMaximize2 } from "react-icons/fi";
import { useSite } from "../../context/SiteContext";
import { ensureUrl, formatDate } from "../../utils/format";
import Lightbox from "../common/Lightbox";
import Reveal from "../common/Reveal";
import SectionTitle from "../common/SectionTitle";

const Certificates = () => {
  const { data } = useSite();
  const items = data.certificates || [];
  const [index, setIndex] = useState(null);

  const withImages = useMemo(() => items.filter((c) => c.image?.url), [items]);
  const lightboxItems = useMemo(
    () => withImages.map((c) => ({ src: c.image.url, title: c.title, caption: c.issuer })),
    [withImages]
  );

  if (items.length === 0) return null;

  return (
    <section id="certificates" className="section">
      <div className="container-x">
        <SectionTitle eyebrow="Credentials" title="Certificates" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((cert, i) => {
            const imageIndex = withImages.findIndex((c) => c._id === cert._id);
            return (
              <Reveal key={cert._id} delay={(i % 3) * 0.08}>
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface">
                  {cert.image?.url ? (
                    <button
                      onClick={() => setIndex(imageIndex)}
                      aria-label={`View certificate: ${cert.title}`}
                      className="group relative aspect-[4/3] overflow-hidden bg-line"
                    >
                      <img
                        src={cert.image.url}
                        alt={cert.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-deep/70 text-white opacity-100 sm:opacity-0 sm:transition sm:group-hover:opacity-100">
                        <FiMaximize2 size={15} />
                      </span>
                    </button>
                  ) : (
                    <div className="flex aspect-[4/3] items-center justify-center bg-gold/10 text-gold">
                      <FiAward size={44} />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-xl font-semibold leading-snug">{cert.title}</h3>
                    <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
                    <div className="mt-2 space-y-0.5 text-xs text-muted">
                      {cert.issueDate && <p>Issued {formatDate(cert.issueDate)}</p>}
                      {cert.credentialId && <p className="break-all">Credential ID: {cert.credentialId}</p>}
                    </div>
                    {cert.credentialUrl && (
                      <a
                        href={ensureUrl(cert.credentialUrl)}
                        className="mt-4 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-accent hover:text-gold"
                      >
                        Verify credential <FiExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>

      <Lightbox items={lightboxItems} index={index} onIndex={setIndex} onClose={() => setIndex(null)} />
    </section>
  );
};

export default Certificates;