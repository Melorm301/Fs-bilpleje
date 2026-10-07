import { ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "../components/Reveal";
import { business, hasValidPhone, phoneHref } from "../config/business";
import { asset } from "../lib/asset";

export function Hero() {
  const tel = phoneHref();

  return (
    <section className="relative isolate overflow-hidden bg-[#0b0b0b] text-white">
      <img
        src={asset("/images/hero.webp")}
        srcSet={`${asset("/images/hero-mobile.webp")} 1000w, ${asset("/images/hero.webp")} 1920w`}
        sizes="100vw"
        alt="Mørk bil i et professionelt bilplejestudie med lysende loftslamper."
        width={1920}
        height={1080}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0b0b0b] from-0% via-[#0b0b0b]/85 via-38% to-transparent to-78%"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[#0b0b0b]/55 md:hidden"
      />

      <div className="shell relative flex min-h-[84vh] flex-col justify-center py-24 md:min-h-[88vh] md:py-32">
        <Reveal className="max-w-xl">
          <p className="eyebrow text-silver">Bilpleje · Bilklargøring · Polering</p>
          <h1 className="mt-5 text-4xl leading-[1.04] text-white sm:text-5xl lg:text-6xl">
            {business.name}
          </h1>
          <p className="mt-5 text-lg font-semibold text-white/90 sm:text-xl">
            {business.tagline}
          </p>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70">
            Vi hjælper med at få din bil til at fremstå fra sin bedste side. Fra
            grundig indvendig rengøring til polering og komplet klargøring.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/kontakt" className="btn btn-on-dark">
              Kontakt os
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <Link to="/ydelser" className="btn btn-outline-light">
              Se vores ydelser
            </Link>
          </div>

          {hasValidPhone() && tel ? (
            <a
              href={tel}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white"
            >
              <Phone aria-hidden="true" className="size-4" />
              Ring til os
            </a>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
