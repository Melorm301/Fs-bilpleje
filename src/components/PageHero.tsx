import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: ReactNode;
};

/** Fælles sidehoved til undersiderne. */
export function PageHero({ eyebrow, title, intro, children }: PageHeroProps) {
  return (
    <section className="border-b border-line bg-mist">
      <div className="shell py-14 md:py-20">
        <Reveal>
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h1 className="mt-4 max-w-4xl text-3xl leading-[1.08] md:text-5xl">{title}</h1>
          {intro ? (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted md:text-lg">
              {intro}
            </p>
          ) : null}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
