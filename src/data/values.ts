export type Value = {
  id: string;
  title: string;
  description: string;
};

/** Værdier til sektionen "Hvorfor vælge os?". Ingen udokumenterede garantier. */
export const values: Value[] = [
  {
    id: "detaljen",
    title: "Fokus på detaljen",
    description:
      "Arbejdet tager udgangspunkt i helheden og i de små steder, hvor forskellen typisk ses.",
  },
  {
    id: "omhyggelig",
    title: "Omhyggelig behandling",
    description:
      "Bilen behandles med metoder og produkter, der passer til dens overflader og stand.",
  },
  {
    id: "personlig",
    title: "Personlig service",
    description:
      "Opgaven aftales direkte med indehaveren, Frederik Sterling, ud fra bilens behov.",
  },
  {
    id: "tilpasset",
    title: "Løsninger tilpasset bilen",
    description:
      "Indholdet i opgaven tilpasses bilens stand og det ønskede resultat.",
  },
];
