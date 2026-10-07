import { useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryItem } from "../data/gallery";

type LightboxProps = {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const item = items[index];

  const goPrev = useCallback(() => {
    onNavigate((index - 1 + items.length) % items.length);
  }, [index, items.length, onNavigate]);

  const goNext = useCallback(() => {
    onNavigate((index + 1) % items.length);
  }, [index, items.length, onNavigate]);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, goPrev, goNext]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Billede ${index + 1} af ${items.length}: ${item.caption}`}
      className="fixed inset-0 z-50 flex flex-col bg-ink/95 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">
        <p className="text-sm text-white/70">
          {index + 1} / {items.length}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="inline-flex size-11 items-center justify-center text-white hover:bg-white/10"
          aria-label="Luk billedvisning"
        >
          <X aria-hidden="true" className="size-6" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 pb-2 md:px-16">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Forrige billede"
          className="absolute left-1 z-10 inline-flex size-12 items-center justify-center text-white hover:bg-white/10 md:left-4"
        >
          <ChevronLeft aria-hidden="true" className="size-7" />
        </button>

        <img
          src={item.src}
          alt={item.alt}
          className="max-h-full max-w-full object-contain"
          decoding="async"
        />

        <button
          type="button"
          onClick={goNext}
          aria-label="Næste billede"
          className="absolute right-1 z-10 inline-flex size-12 items-center justify-center text-white hover:bg-white/10 md:right-4"
        >
          <ChevronRight aria-hidden="true" className="size-7" />
        </button>
      </div>

      <p className="px-4 pb-6 text-center text-sm text-white/70 md:px-8">
        {item.caption}
      </p>
    </div>
  );
}
