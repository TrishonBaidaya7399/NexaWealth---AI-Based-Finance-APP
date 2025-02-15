import FeaturedSection from "@/components/LandingPageComponents/FeaturedSection";
import HeroSection from "@/components/LandingPageComponents/HeroSection";
import HowItWorksSection from "@/components/LandingPageComponents/HowItWorks";
import StatsSection from "@/components/LandingPageComponents/StatsSection";
// import dynamic from "next/dynamic";

// // Dynamically import the StatsSection with Suspense support
// const StatsSection = dynamic(
//   () => import("@/components/LandingPageComponents/StatsSection"),
//   {
//     ssr: true,
//   }
// );

export default function Home() {
  return (
    <div className="landing_page_container">
      <HeroSection />
      {/* <Suspense
        fallback={
          <div className="mx-auto py-8 px-12 bg-blue-400 backdrop-blur-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-[125px] w-[250px] rounded-xl"
                />
              ))}
            </div>
          </div>
        }
      > */}
      {/* </Suspense> */}
      <StatsSection />
      <FeaturedSection />
      <HowItWorksSection />
    </div>
  );
}
