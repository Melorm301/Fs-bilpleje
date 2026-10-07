import { useEffect } from "react";
import { absoluteAssetUrl, canonicalUrl } from "../lib/seo";

type SeoProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

function upsertMeta(attribute: "name" | "property", key: string, value: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", value);
}

function upsertCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

/**
 * Holder titel og metadata opdateret ved navigation i browseren. Den statiske
 * HTML indeholder de samme tags fra build-tid, saa søgemaskiner ser dem med
 * det samme.
 */
export function Seo({ title, description, path, image = "/og-image.jpg" }: SeoProps) {
  useEffect(() => {
    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", canonicalUrl(path));
    upsertMeta("property", "og:image", absoluteAssetUrl(image));
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", absoluteAssetUrl(image));
    upsertCanonical(canonicalUrl(path));
  }, [title, description, path, image]);

  return null;
}
