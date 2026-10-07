import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { Seo } from "../components/Seo";
import { ServiceCard } from "../components/ServiceCard";
import { pages } from "../config/site";
import { activeServices } from "../data/services";
import { ContactCta } from "../sections/ContactCta";

export function ServicesPage() {
  return (
    <>
      <Seo
        title={pages.services.title}
        description={pages.services.description}
        path={pages.services.path}
      />

      <PageHero
        eyebrow="Ydelser"
        title="Bilpleje, bilklargøring og polering"
        intro="Her er overblikket over de bilplejeydelser, der arbejdes med. Det præcise indhold aftales ud fra bilens stand, størrelse og det ønskede resultat."
      />

      <section className="bg-white py-16 md:py-24">
        <div className="shell">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activeServices.map((service, index) => (
              <Reveal key={service.id} delay={index * 70} className="h-full">
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>

          <div className="mt-12 border-t border-line pt-8">
            <h2 className="text-xl">Priser og aftale</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
              Der oplyses ingen faste priser, fordi opgaven afhænger af bilens
              stand og størrelse. Kontakt os for at høre nærmere og få et tilbud
              på netop din bil.
            </p>
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
