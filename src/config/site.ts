/**
 * Overordnet site- og SEO-konfiguration.
 *
 * `url` er det domæne hjemmesiden publiceres på. Ret det til dit eget domæne,
 * hvis siden senere flyttes væk fra GitHub Pages.
 */

export const site = {
  /**
   * Domæne uden afsluttende skråstreg. Kan overskrives ved build med
   * VITE_SITE_URL, fx i GitHub Actions.
   */
  url: import.meta.env.VITE_SITE_URL ?? "https://ditbrugernavn.github.io",
  repo: "fs-bilpleje",
  locale: "da_DK",
  language: "da",
  themeColor: "#111111",
  keywords: [
    "bilpleje",
    "bilklargøring",
    "bilpolering",
    "indvendig bilrengøring",
    "udvendig bilvask",
    "klargøring af bil",
    "FS Bilpleje & Service",
  ],
} as const;

export type PageMeta = {
  path: string;
  title: string;
  description: string;
  /** Kort label til navigationen. Udelades når siden ikke skal i menuen. */
  nav?: string;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
};

export const pages = {
  home: {
    path: "/",
    title: "FS Bilpleje & Service – bilpleje, bilklargøring og polering",
    description:
      "FS Bilpleje & Service tilbyder indvendig bilrengøring, udvendig bilvask, bilpolering og komplet bilklargøring. Kontakt os for et tilbud.",
    changeFrequency: "monthly",
    priority: 1,
  },
  services: {
    path: "/ydelser",
    title: "Ydelser – bilpleje, bilklargøring og polering | FS Bilpleje & Service",
    description:
      "Se udvalget af bilplejeydelser: indvendig bilrengøring, udvendig bilvask, bilpolering, komplet bilklargøring, klargøring før salg og sæde- og tekstilrens.",
    nav: "Ydelser",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  gallery: {
    path: "/galleri",
    title: "Galleri – bilpleje og bilklargøring i billeder | FS Bilpleje & Service",
    description:
      "Se eksempler på bilpleje, polering, indvendig rengøring og klargøring. Billederne er illustrative, indtil de første rigtige kundebilleder foreligger.",
    nav: "Galleri",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  about: {
    path: "/om-os",
    title: "Om os – bilpleje med øje for detaljen | FS Bilpleje & Service",
    description:
      "FS Bilpleje & Service drives af Frederik Sterling og arbejder med bilklargøring, rengøring og polering med fokus på detaljen.",
    nav: "Om os",
    changeFrequency: "yearly",
    priority: 0.6,
  },
  contact: {
    path: "/kontakt",
    title: "Kontakt – få et tilbud på bilpleje | FS Bilpleje & Service",
    description:
      "Kontakt FS Bilpleje & Service for at høre mere om bilpleje, klargøring og polering, og få et tilbud tilpasset din bil.",
    nav: "Kontakt",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  privacy: {
    path: "/privatlivspolitik",
    title: "Privatlivspolitik | FS Bilpleje & Service",
    description:
      "Sådan håndterer FS Bilpleje & Service personoplysninger på denne hjemmeside. Ingen tracking, ingen analytics og ingen ikke-nødvendige cookies.",
    changeFrequency: "yearly",
    priority: 0.2,
  },
  company: {
    path: "/virksomhedsoplysninger",
    title: "Virksomhedsoplysninger | FS Bilpleje & Service",
    description:
      "Virksomhedsoplysninger for FS Bilpleje & Service: CVR 42554995, indehaver Frederik Sterling og kontaktoplysninger.",
    changeFrequency: "yearly",
    priority: 0.2,
  },
} as const satisfies Record<string, PageMeta>;

export const navPages = [pages.services, pages.gallery, pages.about, pages.contact];

export const sitemapPages: PageMeta[] = Object.values(pages);

/** Alle ruter der skal prærenderes til statisk HTML. */
export const prerenderPaths: string[] = [...sitemapPages.map((page) => page.path), "/404"];
