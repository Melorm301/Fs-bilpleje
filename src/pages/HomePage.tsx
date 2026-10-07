import { Seo } from "../components/Seo";
import { pages } from "../config/site";
import { ContactCta } from "../sections/ContactCta";
import { Hero } from "../sections/Hero";
import { Intro } from "../sections/Intro";
import { ServicesPreview } from "../sections/ServicesPreview";
import { WhyUs } from "../sections/WhyUs";

export function HomePage() {
  return (
    <>
      <Seo
        title={pages.home.title}
        description={pages.home.description}
        path={pages.home.path}
      />
      <Hero />
      <Intro />
      <ServicesPreview />
      <WhyUs />
      <ContactCta />
    </>
  );
}
