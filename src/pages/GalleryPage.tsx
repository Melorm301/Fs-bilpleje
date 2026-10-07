import { useMemo, useState } from "react";
import { Lightbox } from "../components/Lightbox";
import { Notice } from "../components/Notice";
import { PageHero } from "../components/PageHero";
import { Seo } from "../components/Seo";
import { pages } from "../config/site";
import { galleryCategories, galleryItems } from "../data/gallery";
import type { GalleryCategoryId } from "../data/gallery";
import { ContactCta } from "../sections/ContactCta";

type Filter = GalleryCategoryId | "alle";

export function GalleryPage() {
  const [filter, setFilter] = useState<Filter>("alle");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = useMemo(
    () =>
      filter === "alle"
        ? galleryItems
        : galleryItems.filter((item) => item.category === filter),
    [filter],
  );

  return (
    <>
      <Seo
        title={pages.gallery.title}
        description={pages.gallery.description}
        path={pages.gallery.path}
      />

      <PageHero
        eyebrow="Galleri"
        title="Bilpleje i billeder"
        intro="Et indblik i de arbejdsgange og resultater, der arbejdes med - fra indvendig rengøring over polering til færdig klargøring."
      />

      <section className="bg-white py-14 md:py-20">
        <div className="shell">
          <Notice tone="attention">
            <p className="font-semibold">Billederne er illustrative.</p>
            <p>
              Der er endnu ikke fotograferet rigtige kundeopgaver. Billederne
              viser eksempler på arbejdsgange og resultater og bliver udskiftet,
              når de første egne billeder foreligger.
            </p>
          </Notice>

          <div
            role="group"
            aria-label="Filtrer billeder efter kategori"
            className="mt-8 flex flex-wrap gap-2"
          >
            {galleryCategories.map((category) => {
              const isActive = filter === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => {
                    setFilter(category.id);
                    setOpenIndex(null);
                  }}
                  className={`border px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? "border-ink bg-ink text-white"
                      : "border-line text-ink-muted hover:border-ink hover:text-ink"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>

          <ul className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
            {items.map((item, index) => (
              <li key={item.id} className="mb-5 break-inside-avoid">
                <button
                  type="button"
                  onClick={() => setOpenIndex(index)}
                  className="group block w-full overflow-hidden border border-line bg-mist text-left"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    decoding="async"
                    className="w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <span className="flex items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-ink">
                    {item.caption}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {openIndex !== null ? (
        <Lightbox
          items={items}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      ) : null}

      <ContactCta />
    </>
  );
}
