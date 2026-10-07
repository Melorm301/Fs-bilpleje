import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "../components/Reveal";
import { ServiceCard } from "../components/ServiceCard";
import { activeServices } from "../data/services";
import { pages } from "../config/site";

export function ServicesPreview() {
  return (
    <section className="border-b border-line bg-mist py-20 md:py-28">
      <div className="shell">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Ydelser</p>
            <h2 className="mt-4 max-w-xl text-3xl leading-tight md:text-4xl">
              Bilpleje tilpasset din bil
            </h2>
          </div>
          <Link to={pages.services.path} className="btn btn-ghost shrink-0">
            Se alle ydelser
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activeServices.map((service, index) => (
            <Reveal key={service.id} delay={index * 70} className="h-full">
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-sm text-ink-muted">
          Priser oplyses efter aftale, da opgaven afhænger af bilens stand og
          størrelse.
        </p>
      </div>
    </section>
  );
}
