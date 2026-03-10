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

const skillCategories = [
  {
    label: "LANGUAGES",
    skills: ["Python", "TypeScript", "JavaScript", "C++", "SQL"],
  },
  {
    label: "BACKEND & SYSTEMS",
    skills: ["Node.js", "Express", "FastAPI", "REST APIs", "Microservices", "System Design"],
  },
  {
    label: "AI & ML",
    skills: ["LLM APIs", "LangChain", "Agentic AI", "MLOps", "MLflow"],
  },
  {
    label: "CLOUD & INFRA",
    skills: ["AWS", "Azure", "Docker", "CI/CD", "Linux"],
  },
  {
    label: "DATA ENGINEERING",
    skills: ["Kafka", "Apache Iceberg", "Airflow", "ETL/ELT", "PostgreSQL"],
  },
];

const SkillsSection = () => {
  const { ref, inView } = useInView();

  return (
    <section id="skills" className="relative z-10 py-24 px-6">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <div className="mb-12">
          <span className="font-mono text-xs tracking-[0.4em] text-muted-foreground">// 05</span>
          <h2 className="font-display text-2xl sm:text-3xl tracking-wider text-primary text-glow-sm mt-2">SKILL MATRIX</h2>
          <div className="hud-line w-24 mt-4" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat, i) => (
            <div
              key={i}
              className={`jarvis-panel p-5 hud-corner transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <h3 className="font-display text-[10px] tracking-[0.3em] text-primary mb-4">{cat.label}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-[11px] px-2.5 py-1 border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
