import { Mail, Phone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { hasValidEmail, hasValidPhone, mailtoHref, phoneHref } from "../config/business";
import { pages } from "../config/site";
import { normalizePath } from "../lib/paths";

/**
 * Diskret kontaktlinje nederst paa mobil. Vises ikke paa kontaktsiden, hvor
 * kontaktmulighederne allerede fylder hele siden.
 */
export function StickyContact() {
  const { pathname } = useLocation();
  if (normalizePath(pathname) === pages.contact.path) return null;

  const tel = phoneHref();
  const mail = mailtoHref({ subject: "Henvendelse om bilpleje" });

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 backdrop-blur lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="shell flex items-center gap-3 py-3">
        <Link to={pages.contact.path} className="btn btn-solid flex-1">
          Kontakt os
        </Link>
        {hasValidPhone() && tel ? (
          <a href={tel} aria-label="Ring til os" className="btn btn-ghost px-4">
            <Phone aria-hidden="true" className="size-5" />
          </a>
        ) : null}
        {hasValidEmail() && mail ? (
          <a href={mail} aria-label="Send e-mail" className="btn btn-ghost px-4">
            <Mail aria-hidden="true" className="size-5" />
          </a>
        ) : null}
      </div>
    </div>
  );
}
