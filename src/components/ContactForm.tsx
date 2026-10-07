import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Send } from "lucide-react";
import { business, hasValidEmail, mailtoHref } from "../config/business";
import { Notice } from "./Notice";

const fieldClass =
  "w-full border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-silver-deep focus:border-ink disabled:cursor-not-allowed disabled:bg-mist disabled:text-ink-muted";

type ContactFormProps = {
  /** Emne og kontekst, fx "Tilbud på bilpolering". */
  defaultSubject?: string;
};

/**
 * Kontaktformular uden backend. Den åbner besøgendes egen mailklient med
 * oplysningerne forudfyldt, og den aktiveres først, når der er en gyldig
 * e-mailadresse i konfigurationen. Der vises aldrig en falsk kvittering.
 */
export function ContactForm({ defaultSubject }: ContactFormProps) {
  const enabled = hasValidEmail();
  const subject = defaultSubject ?? `Henvendelse fra ${business.name}-hjemmesiden`;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const subjectPreview = useMemo(() => subject, [subject]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enabled) return;

    if (!name.trim() || !message.trim()) {
      setError("Udfyld venligst navn og besked, så henvendelsen kan besvares.");
      return;
    }

    const body = [
      `Navn: ${name.trim()}`,
      email.trim() ? `E-mail: ${email.trim()}` : null,
      phone.trim() ? `Telefon: ${phone.trim()}` : null,
      "",
      message.trim(),
    ]
      .filter((line): line is string => line !== null)
      .join("\n");

    const href = mailtoHref({ subject: subjectPreview, body });
    if (href) {
      setError(null);
      window.location.href = href;
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {!enabled ? (
        <Notice tone="attention">
          <p className="font-semibold">Kontaktformularen er ikke aktiv endnu.</p>
          <p>
            Formularen sender til virksomhedens e-mail og aktiveres automatisk, når
            adressen er lagt ind i <code>src/config/business.ts</code>. Indtil da kan
            du bruge de kontaktoplysninger, der er vist på siden.
          </p>
        </Notice>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="navn" className="mb-2 block text-sm font-semibold">
            Navn
          </label>
          <input
            id="navn"
            name="navn"
            type="text"
            autoComplete="name"
            required
            disabled={!enabled}
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="telefon" className="mb-2 block text-sm font-semibold">
            Telefon <span className="font-normal text-ink-muted">(valgfrit)</span>
          </label>
          <input
            id="telefon"
            name="telefon"
            type="tel"
            autoComplete="tel"
            disabled={!enabled}
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-semibold">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          disabled={!enabled}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="besked" className="mb-2 block text-sm font-semibold">
          Besked
        </label>
        <textarea
          id="besked"
          name="besked"
          rows={5}
          required
          disabled={!enabled}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Fortæl kort om bilen og hvilken behandling du er interesseret i."
          className={fieldClass}
        />
      </div>

      {error ? (
        <p role="alert" className="text-sm font-semibold text-ink">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-solid" disabled={!enabled}>
          <Send aria-hidden="true" className="size-4" />
          Send henvendelse
        </button>
        <p className="text-xs text-ink-muted">
          Knappen åbner din egen mailklient med oplysningerne forudfyldt.
        </p>
      </div>
    </form>
  );
}
