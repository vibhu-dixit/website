import { useEffect, useState } from "react";

const HeroSection = () => {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowSubtitle(true), 800);
    const t2 = setTimeout(() => setShowStatus(true), 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-3xl">
        {/* Status indicator */}
        <div className={`flex items-center justify-center gap-2 mb-8 transition-all duration-700 ${showStatus ? "opacity-100" : "opacity-0"}`}>
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
          <span className="font-mono text-xs tracking-[0.4em] text-muted-foreground uppercase">
            System Online
          </span>
        </div>

        {/* Name */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-wider text-primary text-glow animate-flicker mb-4">
          VIBHU DIXIT
        </h1>

        {/* Separator */}
        <div className="hud-line w-48 mx-auto mb-6" />

        {/* Subtitle */}
        <p className={`font-body text-lg sm:text-xl tracking-[0.2em] text-secondary-foreground transition-all duration-1000 ${showSubtitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          FULL-STACK SDE (AI) · MS CS @ ASU
        </p>

        {/* CTA */}
        <div className={`mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-500 ${showStatus ? "opacity-100" : "opacity-0"}`}>
          <a
            href="#projects"
            className="jarvis-panel px-8 py-3 font-mono text-xs tracking-widest text-primary hover:border-primary/50 hover:border-glow-md transition-all duration-300 hud-corner"
          >
            VIEW PROJECTS
          </a>
          <a
            href={`${import.meta.env.BASE_URL}VibhuDixit_Resume.pdf`}
            download
            className="jarvis-panel px-8 py-3 font-mono text-xs tracking-widest text-primary hover:border-primary/50 hover:border-glow-md transition-all duration-300 hud-corner"
          >
            DOWNLOAD RÉSUMÉ
          </a>
          <a
            href="#contact"
            className="px-8 py-3 font-mono text-xs tracking-widest text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            INITIALIZE CONTACT
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
