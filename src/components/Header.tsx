import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { business, hasValidPhone, phoneDisplay, phoneHref } from "../config/business";
import { navPages } from "../config/site";
import { asset } from "../lib/asset";
import { isActivePath } from "../lib/paths";

export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const tel = phoneHref();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="shell flex h-16 items-center justify-between gap-4 md:h-20">
        <Link
          to="/"
          className="flex shrink-0 items-center"
          aria-label={`${business.name} - til forsiden`}
        >
          <img
            src={asset("/logo/fs-logo-light.webp")}
            alt={business.name}
            width={584}
            height={136}
            className="h-9 w-auto md:h-11"
          />
        </Link>

        <nav aria-label="Hovedmenu" className="hidden items-center gap-8 md:flex">
          {navPages.map((page) => {
            const active = isActivePath(pathname, page.path);
            return (
              <Link
                key={page.path}
                to={page.path}
                aria-current={active ? "page" : undefined}
                className={`link-underline text-sm font-semibold transition-colors ${
                  active ? "text-ink" : "text-ink-muted hover:text-ink"
                }`}
              >
                {page.nav}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {hasValidPhone() && tel ? (
            <a
              href={tel}
              className="link-underline inline-flex items-center gap-2 text-sm font-semibold text-ink"
            >
              <Phone aria-hidden="true" className="size-4" />
              {phoneDisplay()}
            </a>
          ) : null}
          <Link to="/kontakt" className="btn btn-solid">
            Kontakt os
          </Link>
        </div>

        <button
          type="button"
          className="-mr-2 inline-flex size-11 items-center justify-center text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Luk menu" : "Åbn menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? (
            <X aria-hidden="true" className="size-6" />
          ) : (
            <Menu aria-hidden="true" className="size-6" />
          )}
        </button>
      </div>

      {open ? (
        <div id="mobile-menu" className="border-t border-line bg-white md:hidden">
          <nav aria-label="Mobilmenu" className="shell flex flex-col py-4">
            {navPages.map((page) => {
              const active = isActivePath(pathname, page.path);
              return (
                <Link
                  key={page.path}
                  to={page.path}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`border-b border-line py-4 text-lg font-semibold ${
                    active ? "text-ink" : "text-ink-muted"
                  }`}
                >
                  {page.nav}
                </Link>
              );
            })}
            <Link
              to="/kontakt"
              className="btn btn-solid mt-5"
              onClick={() => setOpen(false)}
            >
              Kontakt os
            </Link>
            {hasValidPhone() && tel ? (
              <a href={tel} className="btn btn-ghost mt-3">
                <Phone aria-hidden="true" className="size-4" />
                Ring {phoneDisplay()}
              </a>
            ) : null}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
