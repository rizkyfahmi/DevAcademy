import { Metadata } from "next";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { HeroSection } from "@/components/landing/HeroSection";
import { WhatToLearnSection } from "@/components/landing/WhatToLearnSection";
import { AllLanguagesSection } from "@/components/landing/AllLanguagesSection";
import { SaveProgressSection } from "@/components/landing/SaveProgressSection";
import { DarkFooter } from "@/components/landing/DarkFooter";

export const metadata: Metadata = {
  title: "DevAcademy — Learn to Code Step by Step",
  description: "Belajar coding step-by-step dari HTML, CSS, JavaScript hingga Python dan SQL di DevAcademy.",
};

export default function RootLandingPage() {
  return (
    <div className="w3-landing-root">
      <LandingHeader />
      <HeroSection />
      <WhatToLearnSection />
      <AllLanguagesSection />
      <SaveProgressSection />
      <DarkFooter />
    </div>
  );
}

