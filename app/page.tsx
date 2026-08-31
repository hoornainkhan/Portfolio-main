import Hero from "@/components/Hero/Hero";
import FrontendAlter from "@/components/Alters/FrontendAlter";
import BackendAlter from "@/components/Alters/BackendAlter";
import AIAlter from "@/components/Alters/AIAlter";
import HooriGPT from "@/components/HooriGPT/HooriGPT";
import Ending from "@/components/Footer/Ending";
import ContactRail from "@/components/ContactRail/ContactRail";
import LifeUpdateTicker from "@/components/LifeUpdateTicker";
import JourneyScene from "@/components/Three/JourneyScene";

export default function Home() {
  return (
    <>
      <LifeUpdateTicker />

      <ContactRail />

      <Hero />

      <FrontendAlter />

      <BackendAlter />

      <AIAlter />

      <HooriGPT />

      <Ending />

      {/* Single persistent 3D character — fixed overlay, covers the whole page */}
      <JourneyScene />
    </>
  );
}
