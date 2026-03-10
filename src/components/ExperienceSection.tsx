import { useEffect, useRef, useState } from "react";

const SectionHeader = ({ label, title }: { label: string; title: string }) => (
  <div className="mb-12">
    <span className="font-mono text-xs tracking-[0.4em] text-muted-foreground">{label}</span>
    <h2 className="font-display text-2xl sm:text-3xl tracking-wider text-primary text-glow-sm mt-2">{title}</h2>
    <div className="hud-line w-24 mt-4" />
  </div>
);

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

const experiences = [
  {
    role: "Software Engineer Intern",
    company: "PRIVV",
    period: "Jan 2026 – Present",
    points: [
      "Architected a Node.js resolution service with structured logging and telemetry, reducing manual ledger navigation by 70%.",
      "Engineered end-to-end invoice system with AWS Textract, achieving 80% reduction in manual data entry.",
      "Implemented production-grade RESTful APIs with 99.9% uptime across microservices.",
      "Improved system reliability by 50% via optimized API latency and distributed tracing.",
    ],
  },
  {
    role: "Data Engineer Intern",
    company: "ALCON",
    period: "Feb 2024 – Aug 2024",
    points: [
      "Built Flask-based microservices for telemetry data, deployed on AWS with Apache Airflow.",
      "Designed distributed ETL processing 50M+ telemetry events/day.",
      "Reduced development cycle time by 43% through automated monitoring and validation.",
    ],
  },
];

const ExperienceSection = () => {
  const { ref, inView } = useInView();

  return (
    <section id="experience" className="relative z-10 py-24 px-6">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <SectionHeader label="// 02" title="EXPERIENCE" />
        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className={`jarvis-panel p-6 hud-corner transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 200}ms` }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                <div>
                  <h3 className="font-display text-sm tracking-wider text-primary">{exp.role}</h3>
                  <p className="font-body text-base text-secondary-foreground">{exp.company}</p>
                </div>
                <span className="font-mono text-xs text-muted-foreground mt-1 sm:mt-0">{exp.period}</span>
              </div>
              <ul className="space-y-2">
                {exp.points.map((point, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground font-body">
                    <span className="text-primary mt-1.5 text-[8px]">▸</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
