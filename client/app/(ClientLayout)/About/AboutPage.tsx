import ExperienceSection from "@/components/AboutPageCom/Experince-Section";
import GallerySection from "@/components/AboutPageCom/Gellary-Section";
import HeroSection from "@/components/AboutPageCom/Hero-Section";
import LocationsSection from "@/components/AboutPageCom/Location-Section";
import ProjectsSection from "@/components/AboutPageCom/Project-Section";
import SocialLinks from "@/components/AboutPageCom/SocialLink";
import StatsSection from "@/components/AboutPageCom/Stats-Section";
import StorytellingSection from "@/components/AboutPageCom/StoryTelling-Section";
import BrandingVideo from "@/components/AboutPageCom/Video-Section"; 

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <BrandingVideo />
      <StatsSection />
      <ProjectsSection />
      <ExperienceSection />
      <StorytellingSection />
      <LocationsSection />
      <GallerySection />
      <SocialLinks />
    </main>
  );
};

export default AboutPage;
