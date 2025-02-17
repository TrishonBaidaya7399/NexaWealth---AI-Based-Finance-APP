import CallToActionSection from "@/components/LandingPageComponents/CallToActionSection";
import FeaturedSection from "@/components/LandingPageComponents/FeaturedSection";
import HeroSection from "@/components/LandingPageComponents/HeroSection";
import HowItWorksSection from "@/components/LandingPageComponents/HowItWorks";
import StatsSection from "@/components/LandingPageComponents/StatsSection";
import TestimonialSection from "@/components/LandingPageComponents/Testimonials";
import React from "react";

const LandingPage = () => {
  return (
    <div className="landing_page_container custom_scrollbar">
      <HeroSection />
      <StatsSection />
      <FeaturedSection />
      <HowItWorksSection />
      <TestimonialSection />
      <CallToActionSection />
    </div>
  );
};

export default LandingPage;
