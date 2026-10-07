import { useSearchParams } from "react-router-dom";
import { ContactDetails } from "../components/ContactDetails";
import { ContactForm } from "../components/ContactForm";
import { Notice } from "../components/Notice";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { Seo } from "../components/Seo";
import {
  hasAddress,
  hasCity,
  hasOpeningHours,
  hasValidEmail,
  hasValidPhone,
} from "../config/business";
import { pages } from "../config/site";
import { activeServices } from "../data/services";

export function ContactPage() {
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get("ydelse");
  const service = activeServices.find((item) => item.id === serviceId);
  const subject = service ? `Tilbud på ${service.title.toLowerCase()}` : undefined;

  const missing: string[] = [];
  if (!hasValidPhone()) missing.push("telefonnummer");
  if (!hasValidEmail()) missing.push("e-mailadresse");
  if (!hasAddress()) missing.push("adresse");
  if (!hasCity()) missing.push("by");
  if (!hasOpeningHours()) missing.push("åbningstider");

  return (
    <>
      <Seo
        title={pages.contact.title}
        description={pages.contact.description}
        path={pages.contact.path}
      />

      <PageHero
        eyebrow="Kontakt"
        title="Få et tilbud på bilpleje"
        intro="Fortæl kort om bilen og hvilken behandling du er interesseret i, så vender vi tilbage med et tilbud."
      />

      <section className="bg-white py-16 md:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <h2 className="text-2xl">Kontaktoplysninger</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Her finder du de oplysninger, der er bekræftet for virksomheden.
            </p>

            <div className="mt-7">
              <ContactDetails />
            </div>

            {missing.length > 0 ? (
              <Notice className="mt-7" tone="attention">
                <p className="font-semibold">Oplysninger der mangler endnu</p>
                <p>
                  Følgende er ikke bekræftet og vises derfor uden link:{" "}
                  {missing.join(", ")}. Så snart oplysningerne er lagt ind i{" "}
                  <code>src/config/business.ts</code>, bliver klik-for-at-ringe,
                  e-mail og øvrige kontaktmuligheder aktiveret automatisk.
                </p>
              </Notice>
            ) : null}
          </Reveal>

          <Reveal delay={120}>
            <h2 className="text-2xl">Send en henvendelse</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Udfyld felterne, så åbner formularen din egen mailklient med
              oplysningerne klar til afsendelse.
            </p>
            <div className="mt-7">
              <ContactForm defaultSubject={subject} />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
