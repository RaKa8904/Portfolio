export interface SkillCategory {
  name: string;
  description: string;
  iconName: string;
  skills: {
    name: string;
    level: "Advanced" | "Proficient" | "Working Knowledge";
    tag: string;
    description: string;
  }[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "AI / Machine Learning & Data",
    description: "Applied statistical modeling, feature engineering, and real-time inference microservices.",
    iconName: "BrainCircuit",
    skills: [
      { name: "Scikit-Learn", level: "Advanced", tag: "ML Engine", description: "Random Forests, Isolation Forests, K-Means clustering, and regression modeling." },
      { name: "Supervised ML", level: "Advanced", tag: "Algorithms", description: "Ensemble methods, gradient boosting, multi-class classification, and loss optimization." },
      { name: "Pandas & NumPy", level: "Advanced", tag: "Data Prep", description: "Vectorized data transformations, sliding window aggregations, and matrix computations." },
      { name: "NLP (spaCy & NLTK)", level: "Proficient", tag: "Language AI", description: "Named Entity Recognition, tokenization, semantic vector distances, and text parsing." },
      { name: "Unsupervised & Recommenders", level: "Proficient", tag: "Discovery", description: "Collaborative filtering, RFM customer segmentation, and anomaly detection." },
    ],
  },
  {
    name: "Backend & Systems Architecture",
    description: "High-throughput asynchronous APIs, security hardening, and resilient microservices.",
    iconName: "Server",
    skills: [
      { name: "FastAPI", level: "Advanced", tag: "Python Web", description: "Async ASGI endpoints, Pydantic type validation, background tasks, and low latency." },
      { name: "Node.js & Express", level: "Advanced", tag: "Runtime", description: "Event-driven asynchronous services, middleware security layers, and RESTful APIs." },
      { name: "Python", level: "Advanced", tag: "Core Lang", description: "Object-oriented design, async concurrency, type hinting, and data engineering." },
      { name: "TypeScript", level: "Advanced", tag: "Typed Lang", description: "End-to-end type safety, generic interfaces, and enterprise frontend/backend architectures." },
      { name: "WebSockets & Telemetry", level: "Proficient", tag: "Real-time", description: "Bidirectional state syncing, live flight boards, and event broadcasts." },
    ],
  },
  {
    name: "Databases, OLAP & Caching",
    description: "ACID relational databases, distributed columnar analytics, and in-memory caches.",
    iconName: "Database",
    skills: [
      { name: "PostgreSQL", level: "Advanced", tag: "Relational", description: "Schema normalization, row-level locking, complex indexing, and ACID transactions." },
      { name: "ClickHouse OLAP", level: "Proficient", tag: "Columnar", description: "High-speed analytical queries, time-series data aggregation, and wire-speed forensics." },
      { name: "Redis", level: "Proficient", tag: "In-Memory", description: "Sliding-window rate limiters, session token stores, and low-latency cache buffers." },
      { name: "SQLAlchemy & Prisma ORM", level: "Advanced", tag: "Data Layer", description: "Type-safe database migrations, connection pooling, and optimized queries." },
      { name: "Apache Kafka", level: "Working Knowledge", tag: "Streaming", description: "Distributed partition topics, decoupled producer-consumer pipelines." },
    ],
  },
  {
    name: "Frontend Engineering & UI",
    description: "Responsive, high-contrast user interfaces built with performance and snappy responsiveness.",
    iconName: "Layout",
    skills: [
      { name: "React 19 & Next.js", level: "Advanced", tag: "UI Framework", description: "Server components, reactive hooks, optimistic UI updates, and layout composition." },
      { name: "Tailwind CSS", level: "Advanced", tag: "Design System", description: "Utility-first design tokens, dark mode visual hierarchy, and accessible styling." },
      { name: "Framer Motion", level: "Advanced", tag: "Motion", description: "Snappy micro-interactions (<0.4s), spring physics, and layout animations." },
      { name: "Three.js & Canvas", level: "Proficient", tag: "3D Graphics", description: "Interactive particle systems, WebGL scene graphs, and cursor-reactive meshes." },
    ],
  },
  {
    name: "Security, DevOps & Tooling",
    description: "Production defensive controls, token security, and robust development workflows.",
    iconName: "ShieldCheck",
    skills: [
      { name: "Auth Hardening", level: "Advanced", tag: "AppSec", description: "HttpOnly SameSite cookies, in-memory JWTs, anti-XSS, and sliding rate limiters." },
      { name: "Docker", level: "Proficient", tag: "Containers", description: "Multi-stage production builds, containerized microservice orchestration." },
      { name: "Git & GitHub", level: "Advanced", tag: "VCS", description: "Git workflows, branch protection, CI/CD integration, and open source collaboration." },
      { name: "Linux & Bash", level: "Proficient", tag: "SysAdmin", description: "Kernel networking parameters, shell automation, and service deployment." },
    ],
  },
];
