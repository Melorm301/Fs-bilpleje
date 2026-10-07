import { Link } from "react-router-dom";
import {
  addressLines,
  business,
  hasOpeningHours,
  hasValidEmail,
  hasValidPhone,
  mailtoHref,
  phoneDisplay,
  phoneHref,
  socialLinks,
} from "../config/business";
import { navPages, pages } from "../config/site";
import { asset } from "../lib/asset";

export function Footer() {
  const tel = phoneHref();
  const mail = mailtoHref({ subject: `Henvendelse fra ${business.name}-hjemmesiden` });
  const lines = addressLines();
  const socials = socialLinks();

  return (
    <footer className="bg-ink text-white">
      <div className="shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:py-20">
        <div className="lg:col-span-2">
          <img
            src={asset("/logo/fs-logo-dark.webp")}
            alt={business.name}
            width={584}
            height={136}
            className="h-10 w-auto"
          />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">
            {business.tagline} Vi arbejder med indvendig og udvendig bilpleje,
            polering og klargøring - tilpasset bilens stand og behov.
          </p>
          <p className="mt-6 text-sm text-white/50">
            CVR {business.cvr} · {business.ownerTitle} {business.owner}
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="text-xs font-bold uppercase text-white/50">Siden</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {navPages.map((page) => (
              <li key={page.path}>
                <Link to={page.path} className="link-underline text-white/80 hover:text-white">
                  {page.nav}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to={pages.company.path}
                className="link-underline text-white/80 hover:text-white"
              >
                Virksomhedsoplysninger
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-bold uppercase text-white/50">Kontakt</h2>
          <ul className="mt-5 space-y-3 text-sm text-white/80">
            <li>
              {hasValidPhone() && tel ? (
                <a href={tel} className="link-underline hover:text-white">
                  {phoneDisplay()}
                </a>
              ) : (
                <span className="text-white/60">Telefon: {business.phone}</span>
              )}
            </li>
            <li>
              {hasValidEmail() && mail ? (
                <a href={mail} className="link-underline hover:text-white">
                  {business.email}
                </a>
              ) : (
                <span className="text-white/60">E-mail: {business.email}</span>
              )}
            </li>
            {lines.length > 0 ? (
              <li>
                {lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </li>
            ) : (
              <li className="text-white/60">Adresse: {business.address}</li>
            )}
            {hasOpeningHours() ? (
              <li>Åbningstider: {business.hours}</li>
            ) : (
              <li className="text-white/60">Åbningstider: {business.hours}</li>
            )}
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  className="link-underline hover:text-white"
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-3 py-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© {business.name}. Alle rettigheder forbeholdes.</p>
          <p className="flex flex-wrap gap-x-4 gap-y-2">
            <Link to={pages.privacy.path} className="link-underline hover:text-white">
              Privatlivspolitik
            </Link>
            <span>Billeder på sitet er illustrative.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
