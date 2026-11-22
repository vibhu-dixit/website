import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

const BelowFold = lazy(() => import("@/components/BelowFold"));

const Index = () => (
  <div className="portfolio-page">
    <Navbar />
    <main id="main">
      <HeroSection />
      <Suspense fallback={null}><BelowFold /></Suspense>
    </main>
  </div>
);

export default Index;
