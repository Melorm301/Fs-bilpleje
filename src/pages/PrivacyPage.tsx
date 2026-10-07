import { Notice } from "../components/Notice";
import { PageHero } from "../components/PageHero";
import { Seo } from "../components/Seo";
import { business, hasValidEmail, hasValidPhone } from "../config/business";
import { pages } from "../config/site";

const sections = [
  {
    id: "dataansvarlig",
    title: "Dataansvarlig",
    body: [
      `Denne hjemmeside drives af ${business.name}, CVR ${business.cvr}, med ${business.owner} som indehaver.`,
      "Virksomheden er dataansvarlig for de oplysninger, der behandles i forbindelse med hjemmesiden og henvendelser til virksomheden.",
    ],
  },
  {
    id: "hjemmesiden",
    title: "Hvad hjemmesiden gør",
    body: [
      "Hjemmesiden er en statisk hjemmeside uden backend, database og login. Der oprettes ingen brugerprofiler, og der gemmes ingen oplysninger om besøgende i hjemmesiden selv.",
      "Der bruges ingen cookies, ingen analyseværktøjer, ingen annonceringspixels og ingen eksterne indlejringer som kort, videoer eller sociale plugins.",
      "Skrifttyper og billeder leveres fra hjemmesidens eget domæne. Der sendes derfor ingen forespørgsler til tredjeparter, når du besøger siden.",
    ],
  },
  {
    id: "hosting",
    title: "Hosting",
    body: [
      "Hjemmesiden hostes på GitHub Pages. GitHub kan i den forbindelse behandle tekniske oplysninger som IP-adresse og tidspunkt i forbindelse med serverlogfiler for at kunne levere og beskytte tjenesten.",
      "Behandlingen sker på grundlag af den legitime interesse i at kunne drive og sikre hjemmesiden, jf. databeskyttelsesforordningens artikel 6, stk. 1, litra f.",
    ],
  },
  {
    id: "henvendelser",
    title: "Når du kontakter os",
    body: [
      "Kontaktformularen sender ikke data til hjemmesiden. Den åbner i stedet din egen mailklient med oplysningerne forudfyldt, og du beslutter selv, om beskeden skal sendes.",
      "Skriver eller ringer du til virksomheden, behandles de oplysninger, du selv giver, for eksempel navn, telefonnummer, e-mailadresse og oplysninger om bilen.",
      "Oplysningerne bruges alene til at besvare henvendelsen og til at kunne aftale og udføre opgaven. Grundlaget er aftaleindgåelse eller den legitime interesse i at besvare henvendelser, jf. artikel 6, stk. 1, litra b og f.",
      "Henvendelser opbevares, så længe det er nødvendigt for at besvare dem og for at overholde eventuelle bogføringsforpligtelser, hvorefter de slettes.",
    ],
  },
  {
    id: "rettigheder",
    title: "Dine rettigheder",
    body: [
      "Du har ret til at få indsigt i, hvilke oplysninger der behandles om dig, og til at få urigtige oplysninger rettet eller slettet.",
      "Du kan også gøre indsigelse mod behandlingen eller bede om at få behandlingen begrænset. Henvendelser om dette kan rettes til virksomhedens kontaktoplysninger nedenfor.",
      "Er du utilfreds med behandlingen, kan du klage til Datatilsynet.",
    ],
  },
];

export function PrivacyPage() {
  const contact: string[] = [];
  if (hasValidPhone()) contact.push(business.phone);
  if (hasValidEmail()) contact.push(business.email);

  return (
    <>
      <Seo
        title={pages.privacy.title}
        description={pages.privacy.description}
        path={pages.privacy.path}
      />

      <PageHero
        eyebrow="Juridisk"
        title="Privatlivspolitik"
        intro="Her kan du læse, hvordan denne hjemmeside og virksomheden håndterer personoplysninger."
      />

      <section className="bg-white py-14 md:py-20">
        <div className="shell max-w-3xl">
          <Notice tone="attention">
            <p className="font-semibold">Til gennemgang inden offentliggørelse</p>
            <p>
              Teksten beskriver den faktiske tekniske løsning på hjemmesiden og
              er skrevet som udkast. Den bør læses igennem og godkendes af
              indehaveren, inden hjemmesiden offentliggøres.
            </p>
          </Notice>

          <div className="mt-10 space-y-10">
            {sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2 className="text-xl md:text-2xl">{section.title}</h2>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-muted">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}

            <section id="kontakt">
              <h2 className="text-xl md:text-2xl">Kontakt om persondata</h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-muted">
                <p>
                  {business.name}, CVR {business.cvr}, {business.ownerTitle}{" "}
                  {business.owner}.
                </p>
                <p>
                  {contact.length > 0
                    ? `Kontakt: ${contact.join(" · ")}`
                    : "Virksomhedens kontaktoplysninger er endnu ikke bekræftet og tilføjes, inden hjemmesiden offentliggøres."}
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
