import { HeroSection } from "./HeroSection";
import { CommitmentSection } from "./CommitmentSection";
import { StatisticsSection } from "./StatisticsSection";
import CategoriesGrid from "./Sections";
import CareProvider from "./CareProviders";

export const About = () => {
  return (
    <>
      <HeroSection />
      <CategoriesGrid />
      <div className="mt-10">
        <CareProvider />
      </div>
      <CommitmentSection />
      <StatisticsSection />
    </>
  );
};