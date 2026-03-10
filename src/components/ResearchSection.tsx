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

const publications = [
  {
    title: "Evidence-Guided Schema Normalization for Temporal Tabular Reasoning",
    venue: "arXiv 2025",
    description: "Schema-guided Text-to-SQL framework for temporal reasoning, achieving 16.8% EM improvement over LLM-only baselines.",
  },
  {
    title: "Analysis of Crime Data Visualization and Clustering",
    venue: "IEEE CSITSS 2023",
    description: "Applied PCA and K-Means clustering demonstrating 45% higher clustering quality over manual feature extraction.",
  },
];

const ResearchSection = () => {
  const { ref, inView } = useInView();

  return (
    <section id="research" className="relative z-10 py-24 px-6">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <div className="mb-12">
          <span className="font-mono text-xs tracking-[0.4em] text-muted-foreground">// 04</span>
          <h2 className="font-display text-2xl sm:text-3xl tracking-wider text-primary text-glow-sm mt-2">RESEARCH</h2>
          <div className="hud-line w-24 mt-4" />
        </div>

        <div className="space-y-6">
          {publications.map((pub, i) => (
            <div
              key={i}
              className={`jarvis-panel p-6 hud-corner transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 200}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-xs sm:text-sm tracking-wider text-primary leading-relaxed">{pub.title}</h3>
                  <span className="font-mono text-[10px] text-muted-foreground mt-1 block">{pub.venue}</span>
                </div>
              </div>
              <p className="font-body text-lg font-medium text-muted-foreground leading-relaxed mt-3">{pub.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
