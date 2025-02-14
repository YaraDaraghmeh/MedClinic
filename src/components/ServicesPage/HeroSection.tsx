
import FeaturesList from "./FeaturesList";
import { HeroContent } from "./HeroContent";
import { WaveDivider } from "./WaveDivider";
export const HeroSection = () => (
    <section className="relative bg-gradient-to-br from-blue-900 to-indigo-800 !text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('./src/assets/ServicesImage.jpg')" }}></div>
      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between  !text-white-300">
          <HeroContent />
          <FeaturesList />
        </div>
      </div>
      <WaveDivider />
    </section>
  );