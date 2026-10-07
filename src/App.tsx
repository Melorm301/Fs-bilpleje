import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AboutPage } from "./pages/AboutPage";
import { CompanyPage } from "./pages/CompanyPage";
import { ContactPage } from "./pages/ContactPage";
import { GalleryPage } from "./pages/GalleryPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { ServicesPage } from "./pages/ServicesPage";

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="ydelser" element={<ServicesPage />} />
        <Route path="galleri" element={<GalleryPage />} />
        <Route path="om-os" element={<AboutPage />} />
        <Route path="kontakt" element={<ContactPage />} />
        <Route path="privatlivspolitik" element={<PrivacyPage />} />
        <Route path="virksomhedsoplysninger" element={<CompanyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
