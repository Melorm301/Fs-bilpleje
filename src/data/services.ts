import { asset } from "../lib/asset";

export type Service = {
  id: string;
  title: string;
  /** Kort beskrivelse til forsidens overblik. */
  short: string;
  /** Beskrivelse på ydelsessiden. */
  description: string;
  image: string;
  alt: string;
  /** Slå til/fra her, når Frederik har bekræftet sortimentet. */
  enabled: boolean;
};

/**
 * Ydelseskatalog. Dette er et forslag til sortiment og skal bekræftes af
 * indehaveren. Sæt `enabled: false` for at skjule en ydelse på hele sitet.
 * Der oplyses ingen priser - alle opgaver aftales individuelt.
 */
export const services: Service[] = [
  {
    id: "indvendig-bilrengoering",
    title: "Indvendig bilrengøring",
    short: "Grundig rengøring af kabinen med fokus på sæder, måtter og instrumentbord.",
    description:
      "Grundig rengøring af bilens kabine med fokus på sæder, måtter, instrumentbord og andre indvendige overflader.",
    image: asset("/images/service-indvendig.webp"),
    alt: "Indvendig bilrengøring, hvor instrumentbord og paneler renses med børste og klud.",
    enabled: true,
  },
  {
    id: "udvendig-bilvask",
    title: "Udvendig bilvask",
    short: "Skånsom vask og rengøring af bilens udvendige overflader.",
    description: "Skånsom vask og rengøring af bilens udvendige overflader.",
    image: asset("/images/service-udvendig.webp"),
    alt: "Udvendig bilvask, hvor bilen er dækket af aktivt skum før afskylning.",
    enabled: true,
  },
  {
    id: "bilpolering",
    title: "Bilpolering",
    short: "Polering med fokus på at forbedre lakoverfladens udseende og glans.",
    description:
      "Polering med fokus på at forbedre lakoverfladens udseende og glans.",
    image: asset("/images/service-polering.webp"),
    alt: "Bilpolering, hvor en maskinpoleringsmaskine arbejder på bilens lak.",
    enabled: true,
  },
  {
    id: "komplet-bilklargoering",
    title: "Komplet bilklargøring",
    short: "En samlet løsning med indvendig og udvendig rengøring, tilpasset bilen.",
    description:
      "En samlet løsning med indvendig og udvendig rengøring, tilpasset bilens behov.",
    image: asset("/images/service-komplet.webp"),
    alt: "Komplet bilklargøring, hvor bilen vaskes udvendigt og gøres klar indvendigt.",
    enabled: true,
  },
  {
    id: "klargoering-foer-salg",
    title: "Klargøring før salg",
    short: "Gør bilen præsentabel før fotografering, fremvisning eller salg.",
    description: "Gør bilen præsentabel før fotografering, fremvisning eller salg.",
    image: asset("/images/service-klargoering.webp"),
    alt: "Klargøring før salg, hvor en nyvasket bil med vandperler på lakken fremstår præsentabel.",
    enabled: true,
  },
  {
    id: "saede-og-tekstilrens",
    title: "Sæde- og tekstilrens",
    short: "Rengøring af tekstiloverflader med fokus på snavs og pletter.",
    description: "Rengøring af bilens tekstiloverflader med fokus på snavs og pletter.",
    image: asset("/images/service-tekstil.webp"),
    alt: "Sæde- og tekstilrens, hvor et bilsæde renses med klud og rengøringsmiddel.",
    enabled: true,
  },
];

export const activeServices = services.filter((service) => service.enabled);
