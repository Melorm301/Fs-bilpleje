import { Reveal } from "../components/Reveal";

const focusAreas = [
  { id: "indvendig", title: "Indvendig rengøring", note: "Kabine, sæder og overflader" },
  { id: "udvendig", title: "Udvendig vask", note: "Lak, fælge og ruder" },
  { id: "polering", title: "Polering", note: "Glans og fremtræden" },
  { id: "klargoering", title: "Klargøring", note: "Klar til brug eller salg" },
];

export function Intro() {
  return (
    <section className="border-b border-line bg-white py-20 md:py-28">
      <div className="shell grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow">Om virksomheden</p>
          <h2 className="mt-4 text-3xl leading-tight md:text-4xl">
            Bilpleje med øje for detaljen
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-muted">
            <p>
              FS Bilpleje &amp; Service arbejder med rengøring, polering og
              klargøring af biler. Målet er enkelt: bilen skal fremstå ren,
              velplejet og klar til brug.
            </p>
            <p>
              Opgaven tilpasses bilens stand og det ønskede resultat, og der
              bruges metoder og produkter, der passer til de enkelte overflader.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="eyebrow">Fokusområder</p>
          <ul className="mt-5 grid gap-px border-t border-line sm:grid-cols-2">
            {focusAreas.map((area) => (
              <li
                key={area.id}
                className="border-b border-line py-5 sm:odd:pr-6 sm:even:pl-6 sm:even:border-l"
              >
                <p className="font-bold">{area.title}</p>
                <p className="mt-1 text-sm text-ink-muted">{area.note}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
