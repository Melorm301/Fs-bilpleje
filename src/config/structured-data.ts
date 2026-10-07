import { absoluteAssetUrl, canonicalUrl } from "../lib/seo";
import {
  addressLines,
  business,
  hasValidEmail,
  hasValidPhone,
  phoneDisplay,
} from "./business";

/**
 * JSON-LD for virksomheden med kun de oplysninger, der faktisk er bekræftet.
 * Adresse, telefon og e-mail tilføjes automatisk, når de er udfyldt i
 * konfigurationen. Bruges af prærenderingen, så scriptet ligger i <head>.
 */
export function localBusinessData(path: string): Record<string, unknown> {
  const lines = addressLines();

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    url: canonicalUrl(path),
    image: absoluteAssetUrl("/og-image.jpg"),
    description: `${business.name} tilbyder bilpleje, bilklargøring og polering.`,
    identifier: {
      "@type": "PropertyValue",
      name: "CVR",
      value: business.cvr,
    },
    founder: {
      "@type": "Person",
      name: business.owner,
    },
  };

  if (hasValidPhone()) {
    data.telephone = phoneDisplay();
  }

  if (hasValidEmail()) {
    data.email = business.email;
  }

  if (lines.length > 0) {
    data.address = {
      "@type": "PostalAddress",
      streetAddress: lines[0],
      addressLocality: lines[1],
      addressCountry: "DK",
    };
  }

  return data;
}
