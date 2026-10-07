import { asset } from "../lib/asset";

export type GalleryCategoryId = "indvendig" | "udvendig" | "polering" | "klargoering";

export type GalleryCategory = {
  id: GalleryCategoryId | "alle";
  label: string;
};

export type GalleryItem = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  category: GalleryCategoryId;
};

export const galleryCategories: GalleryCategory[] = [
  { id: "alle", label: "Alle" },
  { id: "indvendig", label: "Indvendig" },
  { id: "udvendig", label: "Udvendig" },
  { id: "polering", label: "Polering" },
  { id: "klargoering", label: "Klargøring" },
];

/**
 * Galleribilleder. Billederne er illustrative demonstrationsbilleder, indtil
 * der foreligger rigtige kundebilleder. Tilføj nye billeder ved at lægge dem i
 * public/images og oprette et nyt objekt her.
 */
export const galleryItems: GalleryItem[] = [
  {
    id: "interior-clean",
    src: asset("/images/galleri-interior-clean.webp"),
    width: 1400,
    height: 1050,
    alt: "Rent bilinteriør med læderrat og instrumentbord efter indvendig rengøring.",
    caption: "Interiør efter indvendig rengøring",
    category: "indvendig",
  },
  {
    id: "steam",
    src: asset("/images/galleri-steam.webp"),
    width: 1400,
    height: 933,
    alt: "Kabinen renses med damp på instrumentbord og betjeningspanel.",
    caption: "Damprens af kabinen",
    category: "indvendig",
  },
  {
    id: "interior-leather",
    src: asset("/images/galleri-interior-leather.webp"),
    width: 1400,
    height: 935,
    alt: "Indvendigt billede af sæder, rat og midterkonsol efter rengøring.",
    caption: "Sæder og paneler efter rengøring",
    category: "indvendig",
  },
  {
    id: "wheel",
    src: asset("/images/galleri-wheel.webp"),
    width: 1400,
    height: 1867,
    alt: "Nærbillede af fælg, der renses med handske og mikrofiberklud.",
    caption: "Detaljearbejde på fælg",
    category: "udvendig",
  },
  {
    id: "handwash",
    src: asset("/images/galleri-handwash.webp"),
    width: 1400,
    height: 2100,
    alt: "Håndvask af bilens lak med svamp og sæbe.",
    caption: "Håndvask af lak og paneler",
    category: "udvendig",
  },
  {
    id: "foam-suv",
    src: asset("/images/galleri-foam-suv.webp"),
    width: 1400,
    height: 2489,
    alt: "Bil dækket af skum i en vaskehal med vådt gulv.",
    caption: "Skumbad før afskylning",
    category: "udvendig",
  },
  {
    id: "foam-car",
    src: asset("/images/galleri-foam-car.webp"),
    width: 1400,
    height: 2100,
    alt: "Bil helt dækket af aktivt skum før vask i vaskehallen.",
    caption: "Aktivt skum på hele bilen",
    category: "udvendig",
  },
  {
    id: "black-foam",
    src: asset("/images/galleri-black-foam.webp"),
    width: 1400,
    height: 2100,
    alt: "Mørk bil med skum på lakken set fra en lav vinkel.",
    caption: "Skumproces på mørk lak",
    category: "udvendig",
  },
  {
    id: "polering",
    src: asset("/images/galleri-polering.webp"),
    width: 1400,
    height: 788,
    alt: "Polering af en bilpanel, hvor lakken efterbehandles med en klud.",
    caption: "Håndpolering af lakflade",
    category: "polering",
  },
  {
    id: "wax",
    src: asset("/images/galleri-wax.webp"),
    width: 1400,
    height: 1867,
    alt: "Polering og efterbehandling af bilens lak i en hal.",
    caption: "Polering og efterbehandling",
    category: "polering",
  },
  {
    id: "reflection",
    src: asset("/images/galleri-reflection.webp"),
    width: 1400,
    height: 2100,
    alt: "Vandperler på nybehandlet, mørk lak efter vask.",
    caption: "Vandperler på nybehandlet lak",
    category: "klargoering",
  },
  {
    id: "studio-blue",
    src: asset("/images/galleri-studio-blue.webp"),
    width: 1400,
    height: 2100,
    alt: "Bil i en moderne vaskehal med lysende loftslamper efter endt behandling.",
    caption: "Klar til afhentning efter behandling",
    category: "klargoering",
  },
  {
    id: "garage-light",
    src: asset("/images/galleri-garage-light.webp"),
    width: 1400,
    height: 2099,
    alt: "Bil i en hal med tændte baglygter efter endt behandling.",
    caption: "Færdig i hallen efter behandling",
    category: "klargoering",
  },
];
