import { useEffect, useRef, useState } from "react";

const useInView = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
};

const AboutSection = () => {
  const { ref, inView } = useInView();

  return (
    <section id="about" className="relative z-10 py-24 px-6">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <div className="mb-12">
          <span className="font-mono text-xs tracking-[0.4em] text-muted-foreground">// 01</span>
          <h2 className="font-display text-2xl sm:text-3xl tracking-wider text-primary text-glow-sm mt-2">ABOUT</h2>
          <div className="hud-line w-24 mt-4" />
        </div>

        <div
          className={`jarvis-panel p-8 hud-corner transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="font-body text-lg font-medium text-muted-foreground leading-relaxed mb-4">
                Full-stack AI engineer pursuing an MS in Computer Science at Arizona State University,
                focused on building end-to-end intelligent systems — from scalable cloud backends to
                LLM-powered applications.
              </p>
              <p className="font-body text-lg font-medium text-muted-foreground leading-relaxed">
                Currently building production systems at PRIVV — from invoice automation with AWS Textract
                to high-reliability microservices with 99.9% uptime. Previously engineered data pipelines
                processing 50M+ events/day at Alcon.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] tracking-widest text-muted-foreground w-20">DEGREE</span>
                <span className="font-body text-sm text-secondary-foreground">MS Computer Science (STEM)</span>
              </div>
              <div className="hud-line" />
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] tracking-widest text-muted-foreground w-20">SCHOOL</span>
                <span className="font-body text-sm text-secondary-foreground">Arizona State University</span>
              </div>
              <div className="hud-line" />
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] tracking-widest text-muted-foreground w-20">PERIOD</span>
                <span className="font-body text-sm text-secondary-foreground">Aug 2024 – May 2026</span>
              </div>
              <div className="hud-line" />
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] tracking-widest text-muted-foreground w-20">FOCUS</span>
                <span className="font-body text-sm text-secondary-foreground">Full-Stack · AI/ML · Cloud</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
