import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { App } from "./App";
import { basePath } from "./lib/asset";
import { pages, prerenderPaths, sitemapPages, site } from "./config/site";
import type { PageMeta } from "./config/site";
import { localBusinessData } from "./config/structured-data";
import { absoluteAssetUrl, canonicalUrl } from "./lib/seo";

const basename = basePath.replace(/\/$/, "");

export function render(url: string): string {
  return renderToString(
    <StaticRouter basename={basename || undefined} location={url}>
      <App />
    </StaticRouter>,
  );
}

/** Metadata til build-tidens prærendering af hver rute. */
export function getPageMeta(path: string): PageMeta {
  const page = sitemapPages.find((item) => item.path === path);
  if (page) return page;
  return {
    path,
    title: `Siden blev ikke fundet | ${site.repo}`,
    description: "Siden findes ikke.",
    changeFrequency: "yearly",
    priority: 0.1,
  };
}

export {
  pages,
  prerenderPaths,
  sitemapPages,
  site,
  canonicalUrl,
  absoluteAssetUrl,
  localBusinessData,
};
