import { Link } from "react-router-dom";
import { ContactDetails } from "../components/ContactDetails";
import { Notice } from "../components/Notice";
import { PageHero } from "../components/PageHero";
import { Seo } from "../components/Seo";
import { business } from "../config/business";
import { pages } from "../config/site";

export function CompanyPage() {
  return (
    <>
      <Seo
        title={pages.company.title}
        description={pages.company.description}
        path={pages.company.path}
      />

      <PageHero
        eyebrow="Juridisk"
        title="Virksomhedsoplysninger"
        intro="Her finder du de formelle oplysninger om virksomheden bag hjemmesiden."
      />

      <section className="bg-white py-14 md:py-20">
        <div className="shell max-w-3xl">
          <Notice tone="attention">
            <p className="font-semibold">Til gennemgang inden offentliggørelse</p>
            <p>
              Kontaktoplysninger, der endnu ikke er bekræftet, vises som
              pladsholdere. De bør kontrolleres af indehaveren, inden hjemmesiden
              offentliggøres.
            </p>
          </Notice>

          <dl className="mt-10 divide-y divide-line border-y border-line">
            <div className="flex flex-col gap-1 py-4 sm:flex-row sm:justify-between sm:gap-6">
              <dt className="text-sm text-ink-muted">Virksomhedsnavn</dt>
              <dd className="font-semibold">{business.name}</dd>
            </div>
            <div className="flex flex-col gap-1 py-4 sm:flex-row sm:justify-between sm:gap-6">
              <dt className="text-sm text-ink-muted">CVR-nummer</dt>
              <dd className="font-semibold">{business.cvr}</dd>
            </div>
            <div className="flex flex-col gap-1 py-4 sm:flex-row sm:justify-between sm:gap-6">
              <dt className="text-sm text-ink-muted">{business.ownerTitle}</dt>
              <dd className="font-semibold">{business.owner}</dd>
            </div>
            <div className="flex flex-col gap-1 py-4 sm:flex-row sm:justify-between sm:gap-6">
              <dt className="text-sm text-ink-muted">Virksomhedstype</dt>
              <dd className="font-semibold">Servicevirksomhed inden for bilpleje</dd>
            </div>
          </dl>

          <h2 className="mt-12 text-xl md:text-2xl">Kontaktoplysninger</h2>
          <div className="mt-5">
            <ContactDetails />
          </div>

          <p className="mt-10 text-sm text-ink-muted">
            Læs også vores{" "}
            <Link to={pages.privacy.path} className="link-underline font-semibold text-ink">
              privatlivspolitik
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
