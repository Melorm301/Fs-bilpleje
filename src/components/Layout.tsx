import { Outlet, useLocation } from "react-router-dom";
import { useScrollReveal } from "../lib/useScrollReveal";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ScrollToTop } from "./ScrollToTop";
import { StickyContact } from "./StickyContact";

export function Layout() {
  const { pathname } = useLocation();
  useScrollReveal(pathname);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <ScrollToTop />
      <a
        href="#indhold"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Spring til indhold
      </a>
      <Header />
      <main id="indhold" className="flex-1 pb-24 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <StickyContact />
    </div>
  );
}
