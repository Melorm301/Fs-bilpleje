/**
 * Prærenderer alle ruter til statisk HTML og skriver sitemap.xml, robots.txt
 * og en 404-side. Kør efter `vite build` og `vite build --ssr`.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = join(rootDir, "dist");

const rawBase = process.env.VITE_BASE_PATH ?? "/fs-bilpleje/";
const basePath = rawBase.endsWith("/") ? rawBase : `${rawBase}/`;
const siteUrl = (process.env.VITE_SITE_URL ?? "https://ditbrugernavn.github.io").replace(
  /\/+$/,
  "",
);
const siteName = "FS Bilpleje & Service";

const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function absoluteUrl(path) {
  const cleanBase = basePath.replace(/^\/+|\/+$/g, "");
  const clean = path.replace(/^\/+/, "");
  const parts = [siteUrl, cleanBase, clean].filter(Boolean);
  const url = parts.join("/");
  return clean ? url : `${url}/`;
}

function withBase(path) {
  return `${basePath}${path.replace(/^\/+/, "")}`;
}

/**
 * React 19 lægger automatisk `<link rel="preload">` for billeder foran i
 * markup. De hører hjemme i <head>, og hydration fejler, hvis de bliver i
 * body. Derfor flyttes de over i head.
 */
function splitHoistedLinks(markup) {
  const pattern = /^<link\b[^>]*\/?>/;
  const hoisted = [];
  let rest = markup;
  let match = pattern.exec(rest);
  while (match) {
    hoisted.push(match[0]);
    rest = rest.slice(match[0].length);
    match = pattern.exec(rest);
  }
  return { hoisted: hoisted.join(""), rest };
}

const FALLBACK_PATTERN = /<!--app-fallback-->[\s\S]*?<!--\/app-fallback-->/;

function headTags(meta, path) {
  const canonical = absoluteUrl(path);
  const image = absoluteUrl("/og-image.jpg");
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);

  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<script type="application/ld+json">${JSON.stringify(
      ssr.localBusinessData(path),
    ).replace(/</g, "\\u003c")}</script>`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${siteName}" />`,
    `<meta property="og:locale" content="da_DK" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  ];

  if (path === "/404") {
    tags.push('<meta name="robots" content="noindex, follow" />');
  }

  return tags.join("\n    ");
}

const template = await readFile(join(distDir, "index.html"), "utf8");
const ssrDir = join(rootDir, ".ssr");
const ssr = await import(pathToFileURL(join(ssrDir, "entry-server.js")).href);

for (const path of ssr.prerenderPaths) {
  const markup = ssr.render(withBase(path));
  const meta = ssr.getPageMeta(path);
  const { hoisted, rest } = splitHoistedLinks(markup);
  const html = template
    .replace("<!--app-head-->", `${headTags(meta, path)}\n    ${hoisted}`)
    .replace("<!--app-html-->", rest)
    .replace(FALLBACK_PATTERN, "");

  if (html.includes("app-fallback")) {
    throw new Error(
      `Kildebeskeden i index.html blev ikke fjernet for ruten ${path}.`,
    );
  }

  const outFile =
    path === "/"
      ? join(distDir, "index.html")
      : join(distDir, path.replace(/^\/+/, ""), "index.html");

  await mkdir(dirname(outFile), { recursive: true });
  await writeFile(outFile, html, "utf8");
  console.log(`prærenderet ${path}`);
}

const notFound = await readFile(join(distDir, "404", "index.html"), "utf8");
await writeFile(join(distDir, "404.html"), notFound, "utf8");

const pages = ssr.sitemapPages;
const today = new Date().toISOString().slice(0, 10);
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...pages.map(
    (page) =>
      `  <url>\n    <loc>${absoluteUrl(page.path)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${page.changeFrequency}</changefreq>\n    <priority>${page.priority.toFixed(1)}</priority>\n  </url>`,
  ),
  "</urlset>",
  "",
].join("\n");
await writeFile(join(distDir, "sitemap.xml"), sitemap, "utf8");

const robots = [
  "User-agent: *",
  "Allow: /",
  "",
  `Sitemap: ${absoluteUrl("/sitemap.xml")}`,
  "",
].join("\n");
await writeFile(join(distDir, "robots.txt"), robots, "utf8");

console.log("sitemap.xml, robots.txt og 404.html er skrevet.");
