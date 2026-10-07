import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  addressLines,
  business,
  hasOpeningHours,
  hasValidEmail,
  hasValidPhone,
  mailtoHref,
  phoneDisplay,
  phoneHref,
} from "../config/business";

type Row = {
  id: string;
  label: string;
  icon: LucideIcon;
  value: string[];
  href: string | null;
  available: boolean;
};

/** Kontaktoplysninger med tydelig markering af det, der mangler endnu. */
export function ContactDetails() {
  const tel = phoneHref();
  const mail = mailtoHref({ subject: `Henvendelse fra ${business.name}-hjemmesiden` });
  const address = addressLines();

  const rows: Row[] = [
    {
      id: "telefon",
      label: "Telefon",
      icon: Phone,
      value: hasValidPhone() ? [phoneDisplay()] : [business.phone],
      href: hasValidPhone() ? tel : null,
      available: hasValidPhone(),
    },
    {
      id: "email",
      label: "E-mail",
      icon: Mail,
      value: [business.email],
      href: hasValidEmail() ? mail : null,
      available: hasValidEmail(),
    },
    {
      id: "adresse",
      label: "Adresse",
      icon: MapPin,
      value: address.length > 0 ? address : [business.address],
      href: null,
      available: address.length > 0,
    },
    {
      id: "aabningstider",
      label: "Åbningstider",
      icon: Clock,
      value: [business.hours],
      href: null,
      available: hasOpeningHours(),
    },
  ];

  return (
    <dl className="divide-y divide-line border-y border-line">
      {rows.map((row) => {
        const available = row.available;
        return (
          <div key={row.id} className="flex gap-4 py-5">
            <row.icon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-ink" />
            <div className="min-w-0">
              <dt className="text-xs font-bold uppercase text-silver-deep">{row.label}</dt>
              <dd className="mt-1 text-base">
                {row.href ? (
                  <a href={row.href} className="link-underline font-semibold text-ink">
                    {row.value.join(", ")}
                  </a>
                ) : (
                  <span className={available ? "text-ink" : "text-ink-muted"}>
                    {row.value.join(", ")}
                  </span>
                )}
                {!available ? (
                  <span className="mt-1 block text-xs text-ink-muted">
                    Oplysningen er ikke bekræftet endnu.
                  </span>
                ) : null}
              </dd>
            </div>
          </div>
        );
      })}
    </dl>
  );
}
