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
    period: "Jan 2026 – May 2026",
    points: [
      "Engineered a bulk invoicing module using AWS Textract as OCR tool, enabling document extraction and automation that reduced manual accounting overhead by 80% across vendor and contract workflows for project managers.",
      "Architected the core engine for agentic customized reporting, defining system design and data flow for a flagship feature in a capital project management platform, leading to faster decision making.",
      "Built modular RESTful microservices and accompanying unit/integration test suites, improving reliability and production stability for AI-driven features used in real-time contractor decision-making.",
    ],
  },
  {
    role: "Data Engineer Intern",
    company: "ALCON",
    period: "Feb 2024 – Aug 2024",
    points: [
      "Optimized data persistence layers in DynamoDB for the Inventory Analytics Dashboard, testing different keys for partitioning, improving query performance and data visibility by 40%.",
      "Designed high-availability Airflow ETL pipelines for the Global Telemetry Platform, processing 50M+ events daily to enable real-time health monitoring of surgical equipment.",
      "Containerized Airflow triggered ETL worker services using Docker, ensuring consistent deployment of the Data Ingestion Service across development and production environments.",
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
                  <p className="font-body text-lg font-medium text-secondary-foreground leading-relaxed">{exp.company}</p>
                </div>
                <span className="font-mono text-xs text-muted-foreground mt-1 sm:mt-0">{exp.period}</span>
              </div>
              <ul className="space-y-3">
                {exp.points.map((point, j) => (
                  <li key={j} className="flex items-start gap-3 font-body text-lg font-medium text-muted-foreground leading-relaxed">
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
