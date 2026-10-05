import { useEffect } from "react";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

// items: [{ src, title, caption }]
const Lightbox = ({ items, index, onClose, onIndex }) => {
  const open = index !== null && index !== undefined && items[index];

  useEffect(() => {
    if (!open) return undefined;

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % items.length);
      if (e.key === "ArrowLeft") onIndex((index - 1 + items.length) % items.length);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, index, items.length, onClose, onIndex]);

  if (!open) return null;
  const item = items[index];

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col bg-black/90 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={item.title || "Image preview"}
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-4 py-3 text-white/80">
        <span className="text-sm">
          {index + 1} / {items.length}
        </span>
        <button
          onClick={onClose}
          aria-label="Close preview"
          className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10"
        >
          <FiX size={22} />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-16">
        {items.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onIndex((index - 1 + items.length) % items.length);
            }}
            aria-label="Previous image"
            className="absolute left-2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-4"
          >
            <FiChevronLeft size={22} />
          </button>
        )}

        <img
          src={item.src}
          alt={item.title || item.caption || "Gallery image"}
          onClick={(e) => e.stopPropagation()}
          className="max-h-full max-w-full rounded-lg object-contain"
        />

        {items.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onIndex((index + 1) % items.length);
            }}
            aria-label="Next image"
            className="absolute right-2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-4"
          >
            <FiChevronRight size={22} />
          </button>
        )}
      </div>

      {(item.title || item.caption) && (
        <div className="px-4 py-4 text-center text-white" onClick={(e) => e.stopPropagation()}>
          {item.title && <p className="font-display text-xl">{item.title}</p>}
          {item.caption && <p className="mt-1 text-sm text-white/70">{item.caption}</p>}
        </div>
      )}
    </div>
  );
};

export default Lightbox;