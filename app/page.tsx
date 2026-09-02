import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/Hero/Hero";
import FrontendAlter from "@/components/Alters/FrontendAlter";
import BackendAlter from "@/components/Alters/BackendAlter";
import AIAlter from "@/components/Alters/AIAlter";
import HooriGPT from "@/components/HooriGPT/HooriGPT";
import Ending from "@/components/Footer/Ending";
import ContactRail from "@/components/ContactRail/ContactRail";
import LifeUpdateTicker from "@/components/LifeUpdateTicker";
import JourneyExperience from "@/components/Three/JourneyExperience";

export default function Home() {
  return (
    <>
      <LoadingScreen />

      <LifeUpdateTicker />

      <ContactRail />

      <Hero />

      <FrontendAlter />

      <BackendAlter />

      <AIAlter />

      <HooriGPT />

      <Ending />

      {/* Single persistent 3D character — fixed overlay, covers the whole page */}
      <JourneyExperience />
    </>
  );
}
