import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Service } from "../data/services";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group flex h-full flex-col border border-line bg-white">
      <div className="relative aspect-[4/3] overflow-hidden bg-mist">
        <img
          src={service.image}
          alt={service.alt}
          width={1100}
          height={825}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl leading-tight">{service.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
          {service.description}
        </p>

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-5">
          <span className="text-xs font-bold uppercase text-silver-deep">
            Pris efter aftale
          </span>
          <Link
            to={`/kontakt?ydelse=${service.id}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink"
          >
            Få et tilbud
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
