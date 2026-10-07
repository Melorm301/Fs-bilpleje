import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Sørger for at siden starter øverst ved navigation mellem ruter. */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}
