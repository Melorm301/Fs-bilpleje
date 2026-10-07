import { ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "../components/Reveal";
import { business, hasValidPhone, phoneHref } from "../config/business";
import { pages } from "../config/site";

export function ContactCta() {
  const tel = phoneHref();

  return (
    <section className="bg-ink py-20 text-white md:py-28">
      <div className="shell grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16">
        <Reveal>
          <p className="eyebrow text-white/50">Kontakt</p>
          <h2 className="mt-4 max-w-xl text-3xl leading-tight text-white md:text-4xl">
            Skal din bil have den pleje, den fortjener?
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70">
            Kontakt {business.name} for at høre mere om mulighederne.
          </p>
        </Reveal>

        <Reveal delay={120} className="flex flex-wrap gap-3 lg:justify-end">
          <Link to={pages.contact.path} className="btn btn-on-dark">
            Kontakt os
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
          {hasValidPhone() && tel ? (
            <a href={tel} className="btn btn-outline-light">
              <Phone aria-hidden="true" className="size-4" />
              Ring til os
            </a>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
