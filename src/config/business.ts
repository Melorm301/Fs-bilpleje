/**
 * Central virksomhedskonfiguration for FS Bilpleje & Service.
 *
 * Ret kontaktoplysningerne her - hele hjemmesiden opdateres automatisk.
 * Så længe en værdi står som "Ukendt", vises den som en pladsholder, og der
 * oprettes ikke ugyldige tel:- eller mailto:-links.
 */

export const business = {
  name: "FS Bilpleje & Service",
  shortName: "FS Bilpleje",
  cvr: "42554995",
  owner: "Frederik Sterling",
  ownerTitle: "Indehaver",
  tagline: "Professionel bilpleje med fokus på detaljen.",

  // Kontaktoplysninger - udskift pladsholderne når de er bekræftet.
  phone: "+45 ukendt",
  email: "ukendt@ukendt.dk",
  address: "Ukendt",
  postalCode: "",
  city: "Ukendt",
  hours: "Ukendt",

  // Sociale profiler - tilføj fulde links når de findes.
  social: {
    facebook: "",
    instagram: "",
  },
} as const;

export type Business = typeof business;

const PLACEHOLDER_MARKERS = ["ukendt", "unknown", "tbd", "kommer snart"];

/** Sand hvis feltet stadig indeholder en pladsholder eller er tomt. */
export function isPlaceholder(value: string | undefined | null): boolean {
  if (!value) return true;
  const normalized = value.trim().toLowerCase();
  if (!normalized) return true;
  return PLACEHOLDER_MARKERS.some((marker) => normalized.includes(marker));
}

/**
 * Normaliserer et telefonnummer til et E.164-agtigt format.
 * Returnerer null når nummeret ikke er et rigtigt nummer.
 */
export function normalizePhone(phone: string = business.phone): string | null {
  if (isPlaceholder(phone)) return null;
  const digits = phone.replace(/[^\d]/g, "");
  if (digits.length < 8 || digits.length > 15) return null;
  if (digits.length === 8) return `+45${digits}`;
  if (digits.startsWith("00")) return `+${digits.slice(2)}`;
  return `+${digits}`;
}

/** tel:-link, eller null når nummeret mangler. */
export function phoneHref(phone: string = business.phone): string | null {
  const normalized = normalizePhone(phone);
  return normalized ? `tel:${normalized}` : null;
}

/** Telefonnummer til visning. Falder tilbage til pladsholderen. */
export function phoneDisplay(phone: string = business.phone): string {
  if (isPlaceholder(phone)) return phone;
  const digits = phone.replace(/[^\d]/g, "");
  if (digits.length === 8) {
    return `+45 ${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(4, 6)} ${digits.slice(6, 8)}`;
  }
  return phone;
}

export function hasValidPhone(phone: string = business.phone): boolean {
  return normalizePhone(phone) !== null;
}

export function hasValidEmail(email: string = business.email): boolean {
  if (isPlaceholder(email)) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

/** mailto:-link med valgfrit emne og brødtekst, eller null når e-mail mangler. */
export function mailtoHref(
  options: { subject?: string; body?: string; email?: string } = {},
): string | null {
  const email = options.email ?? business.email;
  if (!hasValidEmail(email)) return null;
  const params = new URLSearchParams();
  if (options.subject) params.set("subject", options.subject);
  if (options.body) params.set("body", options.body);
  const query = params.toString();
  return `mailto:${email.trim()}${query ? `?${query}` : ""}`;
}

export function hasAddress(address: string = business.address): boolean {
  return !isPlaceholder(address);
}

export function hasCity(city: string = business.city): boolean {
  return !isPlaceholder(city);
}

export function hasOpeningHours(hours: string = business.hours): boolean {
  return !isPlaceholder(hours);
}

/** Fulde adresselinjer, klar til visning. Tom liste når adressen mangler. */
export function addressLines(): string[] {
  if (!hasAddress()) return [];
  const lines: string[] = [business.address];
  const cityLine = [business.postalCode, hasCity() ? business.city : ""].filter(Boolean).join(" ");
  if (cityLine) lines.push(cityLine);
  return lines;
}

export function socialLinks(): { label: string; href: string }[] {
  const links: { label: string; href: string }[] = [];
  if (business.social.facebook) links.push({ label: "Facebook", href: business.social.facebook });
  if (business.social.instagram) links.push({ label: "Instagram", href: business.social.instagram });
  return links;
}
