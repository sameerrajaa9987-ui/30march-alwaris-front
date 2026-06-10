import { useEffect } from "react";
import { LandingNav } from "../components/LandingNav";
import { HeroSection } from "../components/HeroSection";
import { Marquee } from "../components/Marquee";
import { AboutSection } from "../components/AboutSection";
import { WhyChooseUs } from "../components/WhyChooseUs";
import { ServicesSection } from "../components/ServicesSection";
import { ProcessSection } from "../components/ProcessSection";
import { ValuesQuotes } from "../components/ValuesQuotes";
import { CtaBanner } from "../components/CtaBanner";
import { FaqSection } from "../components/FaqSection";
import { ContactSection } from "../components/ContactSection";
import { LandingFooter } from "../components/LandingFooter";

export function LandingPage() {
  // The public site is always presented in light mode regardless of the
  // portal's theme preference, so brand colours render consistently.
  useEffect(() => {
    const root = document.documentElement;
    const hadDark = root.classList.contains("dark");
    root.classList.remove("dark");
    return () => {
      if (hadDark) root.classList.add("dark");
    };
  }, []);

  return (
    <div className="landing-scroll min-h-screen bg-background">
      <LandingNav />
      <main>
        <HeroSection />
        <Marquee />
        <AboutSection />
        <WhyChooseUs />
        <ServicesSection />
        <ProcessSection />
        <ValuesQuotes />
        <CtaBanner />
        <FaqSection />
        <ContactSection />
      </main>
      <LandingFooter />
    </div>
  );
}

export default LandingPage;
