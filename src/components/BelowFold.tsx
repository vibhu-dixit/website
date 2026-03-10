import { lazy, Suspense } from "react";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import ResearchSection from "@/components/ResearchSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";

const JarvisBackground = lazy(() => import("@/components/JarvisBackground"));

const BelowFold = () => (
  <>
    <Suspense fallback={null}>
      <JarvisBackground />
    </Suspense>
    <AboutSection />
    <ExperienceSection />
    <ProjectsSection />
    <ResearchSection />
    <SkillsSection />
    <ContactSection />
  </>
);

export default BelowFold;
