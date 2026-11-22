export const aboutParagraphs = [
  "Full-Stack Software Engineer with focus on high-velocity product delivery. Experienced in building end-to-end AI applications, pursuing an MS in Computer Science at Arizona State University.",
  "Proven track record of operating autonomously and deploying production-ready integrations — from AWS Textract invoicing and agentic reporting at PRIVV to high-availability Airflow ETL pipelines processing 50M+ events daily at Alcon.",
];

export const experiences = [
  {
    role: "Founding Engineer",
    company: "CASURO",
    period: "Aug 2026 – Present",
    points: [
      "Built AI Mate communication across Slack and phone, including direct Slack connections, streamed voice responses, caller verification, and agent-to-agent messaging.",
      "Developed reusable deliverables workspaces and AI candidate evaluation tools, with configurable candidate profiles and leaderboards that compare ratings with run cost.",
      "Built Younie's conversational VC avatar platform, adding public video sharing, RSVP and admin workflows, and scheduled investor conversation digests.",
      "Worked with Convex as a backend and the Flue framework, alongside Lemonslice, FishAudio, and Agora RTC for conversational experiences.",
    ],
  },
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

export const projects = [
  {
  title: "Hotel Booking AI Agent",
  subtitle: "Multi-Channel AI Concierge for Trip Intent → Hotel Discovery & Booking",
  period: "Mar 2026 – Apr 2026",
  tech: ["React", "Vite", "TypeScript", "FastAPI", "Python", "PostgreSQL", "SQLAlchemy", "Google Places", "NVIDIA LLM", "Deepgram", "Linq SMS/iMessage", "Booking.com"],
  tags: ["Full-Stack", "Backend", "AI/ML"],
  points: [
    "Built Linq webhooks and SMS trip extraction flows using single JSON calls per turn (12k-char input, 2048-token output), converting unstructured text into structured trip state with lower latency.",
    "Engineered a voice pipeline using STT and relevance filtering to extract travel entities before mapping, reducing token payloads and improving structured extraction efficiency.",
    "Exposed 14 REST routes across eight modules using Python, SQLAlchemy, and PostgreSQL, enabling a unified backend for Linq SMS and web clients.",
  ],
  github: "https://github.com/vibhu-dixit/Hotel-Booking-Agent",
},
  {
  title: "Hiiv",
  subtitle: "Timed AI Advisory Sessions for Founders",
  period: "Jan 2026 – Feb 2026",
  tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "FastAPI", "PostgreSQL", "SSE", "OpenAI SDK", "Pydantic", "JWT", "Cloudflare Turnstile", "Vercel", "Render"],
  tags: ["Full-Stack", "Backend", "AI/ML"],
  points: [
    "Developed an autonomous AI framework with five specialized roles and OpenAI-compatible LLM integration, designing the pipeline architecture and iterating implementation using Claude Code.",
    "Constructed the complete technical engine, reducing initial user-wait times to <200ms through non-blocking streaming data flow.",
    "Templatized a modular design, reducing feature addition time from several days to under 3 hours.",
  ],
  github: "https://github.com/vibhu-dixit/HiivBuddy",
  live: "https://hiiv-buddy.vercel.app/",
},{
    title: "ZeroETL",
    subtitle: "Open Source High-Throughput Ingestion Library",
    period: "May 2025 – Jun 2025",
    tech: ["Python", "PySpark", "Apache Iceberg", "Kafka"],
    tags: ["Backend", "Data Engineering", "Open Source"],
    points: [
      "Designed and implemented a zero-ETL PySpark ingestion framework for Apache Iceberg with deduplication, snapshot management, and time-travel queries, enabling reliable and reproducible data states across batch pipelines.",
      "Open-sourced the library and improved ingestion reliability and operational efficiency for small-business data workflows by reducing manual processing overhead and improving pipeline performance and consistency with close to 820 downloads.",
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
    subtitle: "LLM Intelligence Pipeline",
    period: "Nov 2025 – Dec 2025",
    tech: ["LangChain", "LangGraph", "Streamlit", "Python"],
    tags: ["AI/ML", "Full-Stack", "Backend"],
    points: [
      "Developed a backend service with LangChain and LangGraph that analyzes datasets from natural language and returns structured results with quality guardrails.",
      "Implemented multi-agent ReAct workflows that improved reasoning reliability across multiple risk categories. Created a Streamlit interface that allows non-technical users to get accurate insights quickly.",
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

export const publications = [
  {
    title: "Evidence-Guided Schema Normalization for Temporal Tabular Reasoning",
    venue: "EMNLP Workshops · AKBC & DocInsights",
    description: "Schema-guided Text-to-SQL framework for temporal reasoning, achieving 16.8% EM improvement over LLM-only baselines.",
  },
  {
    title: "Analysis of Crime Data Visualization and Clustering",
    venue: "IEEE CSITSS 2023",
    description: "Applied PCA and K-Means clustering demonstrating 45% higher clustering quality over manual feature extraction.",
  },
];

export const skillCategories = [
  {
    label: "LANGUAGES",
    skills: ["Python", "TypeScript", "JavaScript", "SQL"],
  },
  {
    label: "FRONTEND",
    skills: ["React", "Next.js", "Astro", "Vite", "Tailwind CSS", "Streamlit"],
  },
  {
    label: "BACKEND & APIS",
    skills: ["FastAPI", "Node.js", "Express", "Convex", "REST APIs", "PostgreSQL", "MongoDB", "SQLAlchemy", "SSE"],
  },
  {
    label: "AI & ML",
    skills: ["LangChain", "LangGraph", "PyTorch", "Computer Vision", "Deep Learning", "OpenAI SDK", "Agentic AI", "MLOps"],
  },
  {
    label: "DATA ENGINEERING",
    skills: ["PySpark", "Apache Iceberg", "Kafka", "ETL/ELT", "Clustering", "MLflow"],
  },
  {
    label: "CLOUD & DEPLOY",
    skills: ["Azure", "Vercel", "Render", "XGBoost", "ZenML", "Real-time Systems"],
  },
];
