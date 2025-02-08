import { HeroSection } from "./HeroSection";
import CategoriesGrid from "../AboutPage/Sections";

export const Services = () => (
  <main className="pt-16">
    <HeroSection />
    <section className="py-16 bg-white">
      <div className="container mx-auto px-8 max-w-5xl">
        <CategoriesGrid />
      </div>
    </section>
  </main>
);

export default Services;