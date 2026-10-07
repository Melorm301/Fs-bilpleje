import { Reveal } from "../components/Reveal";
import { values } from "../data/values";

export function WhyUs() {
  return (
    <section className="border-b border-line bg-white py-20 md:py-28">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">Hvorfor vælge os</p>
          <h2 className="mt-4 max-w-2xl text-3xl leading-tight md:text-4xl">
            Et gennemført resultat kræver omhu hele vejen
          </h2>
        </Reveal>

        <dl className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <Reveal key={value.id} delay={index * 70}>
              <dt className="flex items-baseline gap-3">
                <span className="text-sm font-bold text-silver-deep">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-lg font-bold">{value.title}</span>
              </dt>
              <dd className="mt-3 text-sm leading-relaxed text-ink-muted">
                {value.description}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
