import { PageAnalytics } from "@/components/PageAnalytics";
import { Adventures } from "@/components/sections/Adventures";
import { Ages } from "@/components/sections/Ages";
import { Different } from "@/components/sections/Different";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { Founding } from "@/components/sections/Founding";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Problem } from "@/components/sections/Problem";
import { RealTools } from "@/components/sections/RealTools";
import { Skills } from "@/components/sections/Skills";
import { StickyCta } from "@/components/sections/StickyCta";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Problem />
        <HowItWorks />
        <Adventures />
        <Different />
        <RealTools />
        <Skills />
        <Ages />
        <Founding />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyCta />
      <PageAnalytics />
    </>
  );
}
