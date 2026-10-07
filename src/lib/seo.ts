import { site } from "../config/site";
import { basePath } from "./asset";

/** Absolut canonical-URL for en rute, baseret på det konfigurerede domæne. */
export function canonicalUrl(path: string): string {
  const root = site.url.replace(/\/+$/, "");
  const base = basePath.replace(/^\/+|\/+$/g, "");
  const clean = path.replace(/^\/+/, "");
  const parts = [root, base, clean].filter(Boolean);
  const url = parts.join("/");
  return clean ? url : `${url}/`;
}

export function absoluteAssetUrl(path: string): string {
  const root = site.url.replace(/\/+$/, "");
  const base = basePath.replace(/^\/+|\/+$/g, "");
  const clean = path.replace(/^\/+/, "");
  return [root, base, clean].filter(Boolean).join("/");
}
