import Hero from "@/components/Hero/Hero";
import FrontendAlter from "@/components/Alters/FrontendAlter";
import BackendAlter from "@/components/Alters/BackendAlter";
import AIAlter from "@/components/Alters/AIAlter";
import HooriGPT from "@/components/HooriGPT/HooriGPT";
import Ending from "@/components/Footer/Ending";
import ContactRail from "@/components/ContactRail/ContactRail";

export default function Home() {
  return (
    <>
      <ContactRail />

      <Hero />

      <FrontendAlter />

      <BackendAlter />

      <AIAlter />

      <HooriGPT />

      <Ending />
    </>
  );
}
