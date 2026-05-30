import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github } from "lucide-react";

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

const projects = [
  {
  title: "Hotel Booking AI Agent",
  subtitle: "Multi-Channel AI Concierge for Trip Intent → Hotel Discovery & Booking",
  period: "April 2026 – may 2026",
  tech: ["React", "Vite", "TypeScript", "FastAPI", "Python", "PostgreSQL", "SQLAlchemy", "Google Places", "NVIDIA LLM", "Deepgram", "Linq SMS/iMessage", "Booking.com"],
  tags: ["Full-Stack", "Backend", "AI/ML"],
  points: [
    "Built an AI concierge that turns natural language (“I need a room in Sedona next weekend”) into ranked hotels, comparable quotes, and Booking.com prefilled links—with explicit human-in-the-loop approval before any booking step.",
    "Orchestrated multi-channel trip building on one shared backend: web form + mic upload and Linq SMS/iMessage (text + voice notes via Deepgram) feed the same LLM trip extraction, Google Places discovery, quote scoring, and phase-based SMS workflow (collect → search → reply 1/2/… → payment link).",
    "Shipped signed Linq webhooks with dedup, threaded multi-turn session state in Postgres, swappable stub/live hotel providers, and a layered FastAPI architecture (routers → application services → infrastructure adapters) with a React (Vite) UI.",
  ],
  github: "https://github.com/vibhu-dixit/Hotel-Booking-Agent",
},
  {
  title: "Hiiv",
  subtitle: "Timed AI Advisory Sessions for Founders",
  period: " Feb 2026 – Present",
  tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "FastAPI", "PostgreSQL", "SSE", "OpenAI SDK", "Pydantic", "JWT", "Cloudflare Turnstile", "Vercel", "Render"],
  tags: ["Full-Stack", "Backend", "AI/ML"],
  points: [
    "Built a decision helper where five AI advisors debate a real founder choice in a timed session, vote on options, and produce a structured brief with ranked paths, risks, and next steps.",
    "Orchestrated debate, vote extraction, and synthesis on one monotonic session clock with shared in-memory state—~15–20 LLM calls per run at roughly $0.01/session on flash-tier models.",
    "Shipped guest demo with Turnstile captcha, JWT auth, Postgres persistence, and SSE streaming; split deploy on Vercel (web) and Render (API).",
  ],
  github: "https://github.com/vibhu-dixit/HiivBuddy",
  live: "https://hiiv-buddy.vercel.app",
},{
    title: "ZeroETL",
    subtitle: "Python Package for Apache Iceberg",
    period: "May 2025 – Jun 2025",
    tech: ["Python", "Kafka", "Apache Iceberg", "S3"],
    tags: ["Backend", "Data Engineering", "Open Source"],
    points: [
      "Achieved 1.5M rows/min throughput with optimized commit batching.",
      "Released open-source library with 200+ PyPI downloads.",
    ],
    github: "https://github.com/vibhu-dixit/zeroetl",
    pypi: "https://pypi.org/project/zeroetl/",
  },
  {
    title: "BountyHub",
    subtitle: "Freelancing Meets Bounty Hunting · SunHacks 2026",
    period: "2026",
    tech: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB"],
    tags: ["Full-Stack", "Backend", "Hackathon"],
    points: [
      "Web platform blending bounty mechanics with gig work: clients post tasks with rewards, students claim and deliver first-come-first-serve.",
      "Built for speed and fairness—streamlined flow for claiming and delivering tasks across design, dev, writing, and video.",
    ],
    github: "https://github.com/vibhu-dixit/BountyHub_SunHacks-26",
  },
  {
    title: "Mavenly",
    subtitle: "LLM-Driven Intelligence Pipeline",
    period: "Sep – Nov 2025",
    tech: ["FastAPI", "LangChain", "LLM APIs", "Streamlit"],
    tags: ["AI/ML", "Full-Stack", "Backend"],
    points: [
      "Built AI-native service automating dataset reasoning with hallucination guardrails.",
      "Designed validation policies improving reliability across 4 risk categories.",
    ],
    github: "https://github.com/vibhu-dixit/Mavenly",
  },
  {
    title: "LLaMA-2 Optimization",
    subtitle: "Efficient Inference & Adaptation for Large Language Models",
    period: "2025",
    tech: ["Python", "PyTorch", "LoRA", "RoPE", "SwiGLU"],
    tags: ["AI/ML", "Deep Learning", "Research"],
    points: [
      "Implemented LLaMA-2–inspired architecture with RoPE, GMQA, KV caching, SwiGLU, and LoRA; achieved 20% inference speedup vs baseline.",
      "LoRA-enabled inference with optional quantization; BLEU improvements on translation and reduced hallucinations via top-p sampling.",
    ],
    github: "https://github.com/vibhu-dixit/Llama-2",
  },
  {
    title: "OpenMonitor",
    subtitle: "AI Border-Security Platform · Voxel51 Hackathon Runner-up",
    period: "Jan 2025",
    tech: ["YOLOv8", "Python", "Computer Vision", "Real-time"],
    tags: ["AI/ML", "Computer Vision"],
    points: [
      "Analyzed four 1080p video streams achieving 94% recall.",
      "Reduced manual monitoring by 80% with real-time alerts within 1.3 seconds.",
    ],
    github: "https://github.com/vibhu-dixit/OpenMonitor",
  },
  {
    title: "Video Recommendation System",
    subtitle: "Deep Feature Extraction & Clustering",
    period: "2024",
    tech: ["Python", "Deep Learning", "Clustering", "Similarity Search"],
    tags: ["AI/ML", "Data Engineering"],
    points: [
      "Designed personalized video suggestion system achieving 97.2% similarity accuracy.",
      "Improved execution speed by 18% through a streamlined pipeline.",
    ],
    github: "https://github.com/vibhu-dixit/Video-Recommendation-System",
  },
  {
    title: "House Price Prediction",
    subtitle: "End-to-End MLOps Pipeline",
    period: "Jan – Feb 2025",
    tech: ["Azure", "XGBoost", "MLflow", "ZenML"],
    tags: ["AI/ML", "Cloud", "MLOps"],
    points: [
      "Achieved 92% accuracy with automated ZenML/MLflow pipelines.",
      "Reduced deployment time by 60% with scalable cloud deployment.",
    ],
    github: "https://github.com/vibhu-dixit/prices-predictor-system",
  },
  {
    title: "DooFy",
    subtitle: "Revolutionizing CAPTCHA Verification",
    period: "2024",
    tech: ["Python", "CNN", "Image Processing", "Security"],
    tags: ["AI/ML", "Full-Stack", "Computer Vision"],
    points: [
      "Integrated image and drawing-based verification with 95% bot detection rate.",
      "Improved user accessibility by 30% over traditional CAPTCHAs.",
    ],
    github: "https://github.com/vibhu-dixit/DooFy-CAPTCHA_Revolutionized",
  },
];

// Derive all unique tags and featured repo names (for excluding from "More from GitHub")
const allTags = Array.from(new Set(projects.flatMap((p) => p.tags))).sort();
const featuredRepoNames = new Set(projects.map((p) => (p.github || "").split("/").pop()?.toLowerCase()).filter(Boolean));

interface GithubRepo {
  name: string;
  description: string;
  url: string;
  language: string | null;
  topics: string[];
  tech: string[];
  updatedAt: string;
}

const ProjectsSection = () => {
  const { ref, inView } = useInView();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [moreRepos, setMoreRepos] = useState<GithubRepo[]>([]);

  const filtered = activeTag
    ? projects.filter((p) => p.tags.includes(activeTag))
    : projects;

  // TODO: re-enable when fetch-repos output is ready for live
  // useEffect(() => {
  //   const base = import.meta.env.BASE_URL || "/";
  //   fetch(`${base}github-repos.json`)
  //     .then((r) => (r.ok ? r.json() : []))
  //     .then((data: GithubRepo[]) => {
  //       const other = data.filter((r) => !featuredRepoNames.has(r.name.toLowerCase()));
  //       setMoreRepos(other);
  //     })
  //     .catch(() => setMoreRepos([]));
  // }, []);

  return (
    <section id="projects" className="relative z-10 py-24 px-6">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <div className="mb-12">
          <span className="font-mono text-xs tracking-[0.4em] text-muted-foreground">// 03</span>
          <h2 className="font-display text-2xl sm:text-3xl tracking-wider text-primary text-glow-sm mt-2">PROJECTS</h2>
          <div className="hud-line w-24 mt-4" />
        </div>

        {/* Tag filter bar */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveTag(null)}
            className={`font-mono text-[11px] px-3 py-1 border transition-all duration-300 ${
              activeTag === null
                ? "border-primary text-primary border-glow"
                : "border-border text-muted-foreground hover:border-primary/40 hover:text-primary"
            }`}
          >
            ALL
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={`font-mono text-[11px] px-3 py-1 border transition-all duration-300 ${
                activeTag === tag
                  ? "border-primary text-primary border-glow"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-primary"
              }`}
            >
              {tag.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <div
              key={project.title}
              className={`jarvis-panel p-6 hud-corner group hover:border-primary/30 transition-all duration-700 flex flex-col ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-display text-sm tracking-wider text-primary">{project.title}</h3>
                <div className="flex gap-2">
                  {project.pypi && (
                    <a href={project.pypi} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground hover:text-primary transition-colors" />
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-3.5 h-3.5 text-muted-foreground hover:text-primary transition-colors" />
                    </a>
                  )}
                </div>
              </div>
              <p className="font-body text-lg font-medium text-muted-foreground leading-relaxed mb-4">{project.subtitle}</p>

              <ul className="space-y-3 mb-4 flex-1">
                {project.points.map((p, j) => (
                  <li key={j} className="flex items-start gap-2 font-body text-lg font-medium text-muted-foreground leading-relaxed">
                    <span className="text-primary mt-1 text-[6px]">▸</span>
                    {p}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 mb-2">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    onClick={() => setActiveTag(t === activeTag ? null : t)}
                    className="font-mono text-[10px] px-2 py-0.5 border border-primary/30 text-primary/70 cursor-pointer hover:bg-primary/10 transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="font-mono text-[10px] px-2 py-0.5 border border-border text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>

              <span className="block font-mono text-[10px] text-muted-foreground mt-3">{project.period}</span>
            </div>
          ))}
        </div>

        {/* More from GitHub: commented out for now; re-enable when fetch-repos output is ready for live */}
        {/* {moreRepos.length > 0 && (
          <>
            <div className="mt-16 mb-8">
              <span className="font-mono text-xs tracking-[0.4em] text-muted-foreground">MORE FROM GITHUB</span>
              <p className="font-body text-sm text-muted-foreground mt-1">Other repos · tags & tech from README + topics</p>
              <div className="hud-line w-24 mt-4" />
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {moreRepos.map((repo, i) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`jarvis-panel p-6 hud-corner group hover:border-primary/30 transition-all duration-700 flex flex-col block ${
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${(filtered.length + i) * 50}ms` }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-display text-sm tracking-wider text-primary">{repo.name}</h3>
                    <Github className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <p className="font-body text-lg font-medium text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                    {repo.description || "No description"}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-2 mt-auto">
                    {(repo.topics?.length ? repo.topics : []).map((t) => (
                      <span key={t} className="font-mono text-[10px] px-2 py-0.5 border border-primary/30 text-primary/70">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(repo.tech?.length ? repo.tech : repo.language ? [repo.language] : []).map((t) => (
                      <span key={t} className="font-mono text-[10px] px-2 py-0.5 border border-border text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </>
        )} */}
      </div>
    </section>
  );
};

export default ProjectsSection;
