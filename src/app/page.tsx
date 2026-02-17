import Hero from "@/components/sections/Hero";
import AboutPreview from "@/components/sections/AboutPreview";
import Skills from "@/components/sections/Skills";
import Services from "@/components/sections/Services";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Process from "@/components/sections/Process"; // New
import Testimonials from "@/components/sections/Testimonials"; // New
import Gallery from "@/components/sections/Gallery"; // New
import WorkExperience from "@/components/sections/WorkExperience";
import Insights from "@/components/sections/Insights"; // New
import CallToAction from "@/components/sections/CallToAction"; // New
// import ContactCTA from "@/components/sections/ContactCTA"; // Identifying overlap with CallToAction

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <AboutPreview />
      <Skills />
      <Services />
      <FeaturedProjects />
      <Process />
      <WorkExperience />
      <Gallery />
      <Testimonials />
      <Insights />
      <CallToAction />
      {/* Spacer for bottom padding if needed, handled by Footer margin typically */}
    </div>
  );
}
