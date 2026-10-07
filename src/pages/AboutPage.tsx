import { Link } from "react-router-dom";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { Seo } from "../components/Seo";
import { business } from "../config/business";
import { pages } from "../config/site";
import { asset } from "../lib/asset";
import { ContactCta } from "../sections/ContactCta";
import { WhyUs } from "../sections/WhyUs";

const facts = [
  { label: "Virksomhed", value: business.name },
  { label: "Indehaver", value: business.owner },
  { label: "CVR", value: business.cvr },
  { label: "Arbejdsområde", value: "Bilpleje, klargøring og polering" },
];

export function AboutPage() {
  return (
    <>
      <Seo
        title={pages.about.title}
        description={pages.about.description}
        path={pages.about.path}
      />

      <PageHero
        eyebrow="Om os"
        title="Bilpleje med øje for detaljen"
        intro="FS Bilpleje & Service arbejder med rengøring, polering og klargøring af biler - med udgangspunkt i den enkelte bil og dens stand."
      />

      <section className="bg-white py-16 md:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <Reveal>
            <img
              src={asset("/images/om-os.webp")}
              alt="Bilplejer arbejder med maskinpolering af en bils lak."
              width={1100}
              height={1375}
              loading="lazy"
              decoding="async"
              className="w-full"
            />
            <p className="mt-3 text-xs text-ink-muted">
              Illustrativt stemningsbillede. Et billede af virksomheden selv
              indsættes, når det foreligger.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <h2 className="text-2xl leading-tight md:text-3xl">
              Håndværk, omhu og respekt for bilen
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-muted">
              <p>
                Arbejdet tager udgangspunkt i den enkelte bil. Nogle biler har
                brug for en grundig indvendig rengøring, andre for polering af
                lakken eller en komplet klargøring før salg.
              </p>
              <p>
                Uanset opgaven er tilgangen den samme: Overfladerne behandles
                efter deres type, og der bruges metoder og produkter, der passer
                til bilens stand.
              </p>
              <p>
                FS Bilpleje &amp; Service drives af {business.owner}, og opgaven
                aftales ud fra bilens behov og det ønskede resultat.
              </p>
            </div>

            <dl className="mt-9 divide-y divide-line border-y border-line">
              {facts.map((fact) => (
                <div key={fact.label} className="flex justify-between gap-6 py-4">
                  <dt className="text-sm text-ink-muted">{fact.label}</dt>
                  <dd className="text-right text-sm font-semibold">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link to={pages.services.path} className="btn btn-solid">
                Se ydelser
              </Link>
              <Link to={pages.contact.path} className="btn btn-ghost">
                Kontakt os
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <WhyUs />
      <ContactCta />
    </>
  );
}
