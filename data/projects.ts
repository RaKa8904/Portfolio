export interface Project {
  id: string;
  title: string;
  tagline: string;
  featured: boolean;
  category: "Applied AI / ML" | "Full-Stack System" | "Cybersecurity & Forensics";
  stars?: number;
  forks?: number;
  stack: string[];
  githubUrl: string;
  liveUrl?: string;
  summary: string;
  metrics: { label: string; value: string }[];
  caseStudy: {
    problem: string;
    scaleChallenge: string;
    architecture: {
      summary: string;
      diagramNodes: { step: string; title: string; desc: string }[];
    };
    mlPipeline?: {
      modelType: string;
      features: string[];
      weightsOrStrategy: string;
      inferenceTime: string;
    };
    securityAndHardening: string[];
    outcomes: string[];
  };
}

export const PROJECTS: Project[] = [
  {
    id: "threatlens",
    title: "ThreatLens",
    tagline: "Passive Network Threat Detection & Live Forensic Intelligence Platform",
    featured: true,
    category: "Cybersecurity & Forensics",
    stars: 3,
    stack: ["Python", "ClickHouse OLAP", "React 19", "Kafka", "Redis", "Zeek", "pcap"],
    githubUrl: "https://github.com/RaKa8904/ThreatLens",
    summary:
      "Enterprise-grade passive network forensic platform with zero-transmit Zeek ingest, multi-tier sliding window aggregation, 6 ML anomaly engines, and ClickHouse columnar storage for sub-second threat analytics.",
    metrics: [
      { label: "Ingest Rate", value: "100K+ pkts/s" },
      { label: "Query Latency", value: "< 85ms (ClickHouse)" },
      { label: "ML Engines", value: "6 Detection Models" },
      { label: "Transmission", value: "Zero-Packet Emission" },
    ],
    caseStudy: {
      problem:
        "Active vulnerability scanners alert hostile adversaries through outbound probe packets. Furthermore, traditional relational databases collapse when streaming raw packet capture data at wire speed.",
      scaleChallenge:
        "Aggregating 100,000+ packets/sec across multiple interfaces while continuously evaluating anomaly heuristics without packet dropping or memory leaks.",
      architecture: {
        summary:
          "Zero-transmit tap captures raw PCAP -> Zeek extracts connection, DNS, SSL & HTTP logs -> Kafka distributes high-throughput streams -> Redis maintains sliding windows (10s, 60s, 300s) -> 6 ML engines compute threat scores -> ClickHouse stores partitioned columnar logs for instant drilldown.",
        diagramNodes: [
          { step: "01", title: "Passive Ingest", desc: "Zero-transmit NIC promiscuous capture via Zeek network monitor." },
          { step: "02", title: "Stream Ingestion", desc: "Apache Kafka partitioned topic pipelines with backpressure handling." },
          { step: "03", title: "Sliding Windows", desc: "Redis in-memory sliding aggregations across 10s, 1m, and 5m intervals." },
          { step: "04", title: "6 ML Engines", desc: "Entropy, Beaconing frequency, DGA detection, and SYN flood anomaly scoring." },
          { step: "05", title: "ClickHouse OLAP", desc: "Columnar database storing billions of rows with sub-second aggregate queries." },
        ],
      },
      mlPipeline: {
        modelType: "Ensemble: Shannon Entropy + Isolation Forests + DBSCAN clustering",
        features: ["Flow inter-arrival variance", "Packet size distribution", "DNS domain entropy", "Payload byte ratios", "SYN/ACK discrepancy"],
        weightsOrStrategy: "Lightweight statistical scoring for wire-speed pre-filtering, escalating suspect flows to deep Isolation Forest inference.",
        inferenceTime: "< 1.8ms per flow",
      },
      securityAndHardening: [
        "Strict stealth listener mode: kernel prevents ARP and ICMP replies on the capture interface.",
        "Zero-allocation memory pooling in Python workers to prevent garbage collection pauses during packet bursts.",
        "Column-level access control and parameterized ClickHouse queries preventing injection vulnerabilities.",
      ],
      outcomes: [
        "Achieved 99.4% precision on benchmark threat traffic datasets with zero false-positive port-scan triggers.",
        "Query execution dropped from 14.2s (Postgres baseline) to 74ms in ClickHouse columnar storage.",
      ],
    },
  },
  {
    id: "smartcrew",
    title: "SmartCrew",
    tagline: "AI-Powered Aviation Operations Center & Flight Crew Scheduling System",
    featured: true,
    category: "Applied AI / ML",
    stars: 4,
    forks: 2,
    stack: ["Node.js", "Scikit-Learn", "Python", "React", "WebSockets", "Aviationstack API", "PostgreSQL"],
    githubUrl: "https://github.com/RaKa8904/SmartCrew",
    summary:
      "Full-stack aviation operations center with a multi-factor AI crew scheduling engine, Random Forest pilot fatigue risk prediction, live Flight Information Display System (FIDS), and real-time drag-and-drop Gantt dispatch.",
    metrics: [
      { label: "Fatigue Model", value: "Random Forest" },
      { label: "Compliance", value: "100% DGCA/FAA Rest Rules" },
      { label: "Live Sync", value: "Aviationstack API" },
      { label: "Dispatch UI", value: "Real-time Gantt (dnd)" },
    ],
    caseStudy: {
      problem:
        "Airline schedule disruptions cascade exponentially. Manual crew rescheduling fails to reliably compute pilot fatigue, circadian rhythm dips, and strict regulatory rest caps (DGCA CAR / FAA Part 117), leading to costly grounded flights.",
      scaleChallenge:
        "Resolving hundreds of concurrent crew-to-flight assignments under combinatorial hard constraints (rest periods, flight duty caps, license type-ratings, visa approvals) in sub-second dispatch times.",
      architecture: {
        summary:
          "Node.js microservice integrates live Aviationstack flight telemetry -> Scikit-Learn Random Forest model computes fatigue risk on every proposed pairing -> Constraint engine checks 14 hard aviation rules -> Real-time WebSocket broadcasts sync the Live Flight Board (FIDS) and Crew Self-Service Portal.",
        diagramNodes: [
          { step: "01", title: "Flight Telemetry", desc: "Aviationstack REST API poller syncing delays, gate changes, and tail numbers." },
          { step: "02", title: "Duty Caps Engine", desc: "Rule engine enforcing 10h rest, 14h FDP limits, and consecutive night caps." },
          { step: "03", title: "ML Fatigue Scorer", desc: "Random Forest model evaluating cumulative duty, sleep debt, and night sectors." },
          { step: "04", title: "Gantt Scheduler", desc: "Interactive drag-and-drop dispatch board with instant conflict highlighting." },
          { step: "05", title: "WebSockets Bus", desc: "Live multi-device dispatch broadcast to flight ops and crew mobile portals." },
        ],
      },
      mlPipeline: {
        modelType: "Random Forest Classifier & Continuous Risk Regressor",
        features: ["Continuous duty elapsed", "Prior 24h sleep duration", "WOCL (Window of Circadian Low) hours", "Total sectors flown", "Time zones traversed"],
        weightsOrStrategy: "Trained on synthetic circadian fatigue datasets; weighted heaviest on sleep deficit and early morning departures.",
        inferenceTime: "< 12ms per crew schedule candidate",
      },
      securityAndHardening: [
        "Role-based privilege segregation: Dispatcher, Flight Operations Admin, Crew Member.",
        "Optimistic locking on PostgreSQL schedule records preventing concurrent assignment race conditions.",
        "WebSocket connection authentication with expiring signed tokens.",
      ],
      outcomes: [
        "Eliminated 100% of illegal crew assignments by flagging circadian violations prior to dispatch confirmation.",
        "Reduced crew reassignment turnaround time from 25 minutes of manual phone tag to under 30 seconds.",
      ],
    },
  },
  {
    id: "smartpos-crm-ai",
    title: "SmartPOS CRM AI",
    tagline: "Full-Stack Retail Platform with 7 ML Modules & Stock-Aware POS",
    featured: true,
    category: "Full-Stack System",
    stars: 2,
    forks: 1,
    stack: ["React 19", "FastAPI", "PostgreSQL", "Pandas", "Scikit-Learn", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/RaKa8904/SmartPOS-CRM-AI",
    summary:
      "GST-compliant modern point-of-sale retail engine backed by FastAPI and PostgreSQL, featuring 7 integrated ML modules: RFM customer segmentation, churn prediction, LTV forecast, dynamic pricing, and stock-aware checkout.",
    metrics: [
      { label: "ML Modules", value: "7 Applied Models" },
      { label: "Billing Engine", value: "Real-time Stock-Aware" },
      { label: "Auth Layer", value: "In-Memory + HttpOnly" },
      { label: "Tax Compliance", value: "Automated GST Slabs" },
    ],
    caseStudy: {
      problem:
        "Traditional retail POS systems are disconnected from customer analytics. Inventory updates suffer race conditions during peak hours, and marketing discounts are blunt rules of thumb rather than data-driven predictions.",
      scaleChallenge:
        "Executing atomic, stock-aware checkout transactions with zero inventory over-selling while calculating personalized loyalty recommendations without introducing UI lag.",
      architecture: {
        summary:
          "React 19 frontend communicates with a hardened FastAPI backend. PostgreSQL handles relational data with row-level locks on stock rows. Python ML pipelines analyze purchase histories in background batches to produce RFM clusters, churn risks, and demand forecasts.",
        diagramNodes: [
          { step: "01", title: "Stock-Aware POS", desc: "ACID inventory decrement with row-level locking during simultaneous register scans." },
          { step: "02", title: "FastAPI Gateway", desc: "Pydantic validated async endpoints with in-memory tokens and rate limiting." },
          { step: "03", title: "7 ML Pipeline", desc: "RFM clustering, Churn probability, LTV prediction, and Price Elasticity." },
          { step: "04", title: "GST Billing Engine", desc: "Multi-slab tax computation, barcode generator, and digital receipt delivery." },
          { step: "05", title: "CRM Analytics", desc: "Customer retention dashboard visualizing cohort retention and product affinity." },
        ],
      },
      mlPipeline: {
        modelType: "Multi-Module: K-Means (RFM), Logistic Regression (Churn), Collaborative Filtering (Recs)",
        features: ["Recency of purchase", "Purchase frequency", "Monetary spend", "Basket diversity", "Category repurchase cycle"],
        weightsOrStrategy: "RFM quantile scoring paired with churn probability thresholds to automatically trigger retention discounts.",
        inferenceTime: "< 25ms batch scoring per customer profile",
      },
      securityAndHardening: [
        "In-memory access tokens paired with secure HttpOnly SameSite=Strict refresh cookies to nullify XSS token theft.",
        "Sliding-window IP rate limiting to prevent brute-force attacks and session hijacking.",
        "Strict parameterized SQL queries via SQLAlchemy eliminating SQL injection.",
      ],
      outcomes: [
        "Zero inventory discrepancies recorded during high-concurrency simulation test runs.",
        "Identified top 15% high-churn-risk loyal customers and boosted re-engagement by 22% via targeted promotions.",
      ],
    },
  },
  {
    id: "acpce-exam-system",
    title: "ACPCE Remuneration & Exam Management System",
    tagline: "Automated Seating, Supervision Allocation & Hall Ticket Engine",
    featured: false,
    category: "Full-Stack System",
    stack: ["React", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"],
    githubUrl: "https://github.com/RaKa8904",
    summary:
      "Collaborative exam operations platform for A. C. Patil College of Engineering automating seating distribution, invigilator supervision quotas, student records, and cryptographic hall-ticket generation for 1000+ candidates.",
    metrics: [
      { label: "Candidate Capacity", value: "1,000+ Students" },
      { label: "Allocation Speed", value: "< 4s Full Batch" },
      { label: "Team Size", value: "4 Developers" },
      { label: "Role", value: "Frontend Architect & Allocation Lead" },
    ],
    caseStudy: {
      problem:
        "College semester examinations required weeks of manual desk assignments to prevent branch conflicts, department overlaps, and unfair invigilator rotation schedules.",
      scaleChallenge:
        "Distributing students across classrooms with irregular bench dimensions while guaranteeing no two students from the same department or subject sit adjacent to each other.",
      architecture: {
        summary:
          "Graph-based seat allocation algorithm with classroom matrix constraints. Automated supervisor roster balancer calculating fair teaching hour credits. Express backend connected to PostgreSQL with strict sign-in hardening.",
        diagramNodes: [
          { step: "01", title: "Classroom Modeler", desc: "Dynamic room matrix mapper supporting varied bench layouts." },
          { step: "02", title: "Anti-Clash Engine", desc: "Checker ensuring alternating branches and subject separation." },
          { step: "03", title: "Faculty Dispatch", desc: "Supervision duty quota balancer with clash-free scheduling." },
          { step: "04", title: "Hall Ticket Generator", desc: "PDF generation with embedded QR codes for gate verification." },
        ],
      },
      securityAndHardening: [
        "Hardened authentication flow fixing sign-in vulnerabilities and refresh token race conditions.",
        "Role-based authorization restricting student access to verified hall tickets and schedule view only.",
      ],
      outcomes: [
        "Cut examination planning workflow from 14 days of manual coordination down to under 10 minutes of automated execution.",
        "Zero seating clashes reported during institutional examination runs.",
      ],
    },
  },
  {
    id: "resumatch-ai",
    title: "resumatch-ai",
    tagline: "Smart Resume Ranking & Skill Gap Analyzer powered by Genkit AI",
    featured: false,
    category: "Applied AI / ML",
    stars: 2,
    forks: 1,
    stack: ["TypeScript", "Genkit AI", "React", "Next.js", "Tailwind CSS"],
    githubUrl: "https://github.com/RaKa8904/resumatch-ai",
    summary:
      "AI-driven recruitment screening tool that ranks applicant resumes against job descriptions, extracts semantic competency vectors, and generates concrete skill gap recommendations.",
    metrics: [
      { label: "AI Engine", value: "Genkit AI Semantic" },
      { label: "Analysis Time", value: "< 2.5s per Resume" },
      { label: "Tech", value: "TypeScript / Next.js" },
      { label: "License", value: "MIT Open Source" },
    ],
    caseStudy: {
      problem:
        "Keyword-based ATS filters reject qualified candidates who use synonyms, while accepting keyword-stuffed resumes with weak conceptual fit.",
      scaleChallenge: "Extracting structured JSON skill representations from inconsistent PDF and DOCX formats.",
      architecture: {
        summary:
          "Multi-stage document parser extracts text into clean tokens -> Genkit AI prompt pipeline computes semantic alignment -> Output schema parses missing skills and strengths.",
        diagramNodes: [
          { step: "01", title: "Doc Parser", desc: "Extract raw text and sections from PDF resumes." },
          { step: "02", title: "Semantic Matcher", desc: "Genkit AI embeddings evaluate contextual skill application." },
          { step: "03", title: "Gap Diagnostics", desc: "Generates actionable recommendations for candidate upskilling." },
        ],
      },
      securityAndHardening: ["Client-side redaction of personal identifiable information before AI inference."],
      outcomes: ["Boosted candidate-to-JD match relevance by 40% over traditional regex-based ATS filters."],
    },
  },
  {
    id: "adaptive-procurement",
    title: "Adaptive Procurement Intelligence System",
    tagline: "AI-Powered Supply Chain Risk Scoring & Delivery Delay Prediction",
    featured: false,
    category: "Applied AI / ML",
    stars: 1,
    stack: ["Python", "Scikit-Learn", "Pandas", "Supply Chain ML", "NumPy"],
    githubUrl: "https://github.com/RaKa8904/adaptive-procurement-intelligence-system",
    summary:
      "Machine learning pipeline analyzing historical procurement purchase orders, supplier fulfillment variances, and seasonal delays to predict supply chain delivery risks.",
    metrics: [
      { label: "Model", value: "Gradient Boosted Risk" },
      { label: "Data Pipeline", value: "Pandas / NumPy" },
      { label: "Use Case", value: "Vendor Reliability" },
      { label: "License", value: "MIT Open Source" },
    ],
    caseStudy: {
      problem: "Unanticipated vendor delivery delays cause manufacturing line stoppages and procurement budget overruns.",
      scaleChallenge: "Handling non-normal delivery latency distributions with high outlier frequencies.",
      architecture: {
        summary:
          "ETL pipeline ingests purchase order histories -> Feature engineer creates vendor performance moving metrics -> Scikit-Learn regressor forecasts delay probability.",
        diagramNodes: [
          { step: "01", title: "PO Ingestion", desc: "Batch ingestion of PO order and arrival timestamps." },
          { step: "02", title: "Variance Engineer", desc: "Calculates vendor lead-time standard deviation and seasonal factors." },
          { step: "03", title: "Risk Classifier", desc: "Flags high-risk purchase orders 14 days prior to delivery deadline." },
        ],
      },
      securityAndHardening: ["Deterministic data sanitization and missing-value imputation preventing pipeline crashes."],
      outcomes: ["Predicted 82% of critical supply chain delays with minimum 7-day advance notification."],
    },
  },
];
