/**
 * Copyright (c) 2026 Mohamed Samy
 * https://mohamedsamy.software/
 * All Rights Reserved. Unauthorized use or reproduction is prohibited.
 */
import { Navigation } from "@/components/sections/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesStrip } from "@/components/sections/FeaturesStrip";
import { ModulesSection } from "@/components/sections/ModulesSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { LLMAdvisorySection } from "@/components/sections/LLMAdvisorySection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/sections/Footer";
import { HeroThemeProvider } from "@/lib/hero-theme-context";

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", background: "#0D2B1A" }}>
      <HeroThemeProvider>
        <Navigation />
        <HeroSection />
      </HeroThemeProvider>
      <FeaturesStrip />
      <ModulesSection />
      <StatsSection />
      <LLMAdvisorySection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </div>
  );
}

