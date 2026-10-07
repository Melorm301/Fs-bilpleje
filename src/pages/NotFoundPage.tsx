import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { business } from "../config/business";
import { navPages } from "../config/site";

export function NotFoundPage() {
  return (
    <>
      <Seo
        title={`Siden blev ikke fundet | ${business.name}`}
        description="Siden findes ikke. Gå til forsiden, eller find ydelser, galleri og kontaktoplysninger."
        path="/404"
      />

      <section className="bg-white py-24 md:py-32">
        <div className="shell max-w-2xl">
          <p className="eyebrow">Fejl 404</p>
          <h1 className="mt-4 text-4xl md:text-5xl">Siden blev ikke fundet</h1>
          <p className="mt-5 text-base leading-relaxed text-ink-muted">
            Adressen findes ikke, eller siden er flyttet. Prøv en af siderne
            herunder.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/" className="btn btn-solid">
              Til forsiden
            </Link>
            {navPages.map((page) => (
              <Link key={page.path} to={page.path} className="btn btn-ghost">
                {page.nav}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
