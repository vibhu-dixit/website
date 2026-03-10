import { useEffect, lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

const BelowFold = lazy(() => import("@/components/BelowFold"));

const Index = () => {
  useEffect(() => {
    let destroyed = false;
    let lenisInstance: { destroy: () => void } | null = null;
    const initLenis = () => {
      import("lenis").then(({ default: Lenis }) => {
        if (destroyed) return;
        const lenis = new Lenis({
          duration: 1.8,
          easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          lerp: 0.06,
          wheelMultiplier: 0.9,
          touchMultiplier: 1.2,
        });
        lenisInstance = lenis;
        const raf = (time: number) => {
          if (destroyed) return;
          lenis.raf(time);
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
      });
    };
    const id = window.requestIdleCallback
      ? window.requestIdleCallback(initLenis, { timeout: 2000 })
      : setTimeout(initLenis, 300);
    return () => {
      destroyed = true;
      lenisInstance?.destroy();
      if (typeof id === "number") {
        window.cancelIdleCallback?.(id);
      } else {
        clearTimeout(id);
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <Suspense fallback={null}>
        <BelowFold />
      </Suspense>
    </div>
  );
};

export default Index;
