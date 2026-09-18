export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  type: "Work Experience" | "Education" | "Award" | "Certification";
  summary: string;
  highlights: string[];
  badge?: string;
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "shree-laser",
    role: "Junior Software Developer - Internship",
    organization: "Shree Laser Systems",
    location: "Mumbai, India (Remote)",
    period: "July 2026 – August 2026",
    type: "Work Experience",
    badge: "Internship",
    summary: "Built and refined enterprise CRM pipelines and external API synchronizations.",
    highlights: [
      "Engineered automated lead capture pipelines integrating third-party marketing and communication APIs to synchronize client records.",
      "Identified, debugged, and resolved system runtime bottlenecks and database concurrency conflicts, increasing system stability and operator workflow speed.",
      "Collaborated closely with cross-functional product stakeholders to deliver robust, fail-safe backend API endpoints.",
    ],
  },
  {
    id: "stanford-ml",
    role: "Machine Learning Specialization",
    organization: "DeepLearning.AI & Stanford University (Coursera)",
    location: "Stanford Online",
    period: "August 2026",
    type: "Certification",
    badge: "Stanford & Andrew Ng",
    summary: "Rigorous 3-course specialization covering foundational and advanced machine learning paradigms.",
    highlights: [
      "Supervised Machine Learning: Cost functions, gradient descent, regularized regression, and logistic classification.",
      "Advanced Learning Algorithms: Multi-class neural networks, decision trees, random forests, and boosting algorithms.",
      "Unsupervised Learning & Recommenders: K-means clustering, anomaly detection, collaborative filtering, and reinforcement learning.",
    ],
  },
  {
    id: "nptel-data",
    role: "Data Analytics with Python",
    organization: "NPTEL / IIT",
    location: "Online",
    period: "Jan – Apr 2026",
    type: "Certification",
    badge: "Elite Certification",
    summary: "Comprehensive certification on exploratory data analysis, hypothesis testing, and statistical computing in Python.",
    highlights: [
      "Mastered Pandas, NumPy, and statistical hypothesis testing on real-world noisy enterprise datasets.",
      "Implemented predictive regression and classification pipelines evaluated on rigorous proctored examinations.",
    ],
  },
  {
    id: "vectors-26",
    role: "1st Place Champion — Tech Arena",
    organization: "Vectors '26 Annual Technical Festival",
    location: "A. C. Patil College of Engineering",
    period: "February 2026",
    type: "Award",
    badge: "1st Place Winner",
    summary: "Secured first position out of dozens of competitive engineering teams in full-stack debugging and architecture.",
    highlights: [
      "Secured 1st Place in the flagship Tech Arena event at the college annual technical festival.",
      "Demonstrated high-speed technical proficiency across complex code debugging, memory leak identification, and full-stack systems evaluation.",
      "Solved multi-language challenges spanning Python, C/C++, and JavaScript under strict real-time countdown constraints.",
    ],
  },
  {
    id: "acpce-degree",
    role: "B.E. in Artificial Intelligence & Data Science",
    organization: "A. C. Patil College of Engineering",
    location: "Navi Mumbai, India",
    period: "July 2023 – Present (Expected 2027)",
    type: "Education",
    badge: "CGPA: 7.5",
    summary: "Specialized undergraduate degree in Artificial Intelligence, Data Structures, Distributed Systems, and Machine Learning.",
    highlights: [
      "Core Coursework: Operating Systems, Database Management Systems, Machine Learning, Deep Learning, Natural Language Processing, Computer Networks.",
      "Lead developer for institutional capstone: ACPCE Remuneration & Exam Management System automating seating allocation for 1,000+ candidates.",
    ],
  },
];

export const PROFILE_INFO = {
  name: "Rahul Naresh Sharma",
  handle: "RaKa8904",
  brandName: "RaKa.",
  title: "Full-Stack Architect & Applied AI Engineer",
  headline: "I BUILD RESILIENT FULL-STACK SYSTEMS & APPLIED AI PIPELINES.",
  subheadline:
    "Specializing in end-to-end distributed web architectures, multi-factor ML scoring, passive network threat intelligence, and high-performance backend microservices.",
  city: "Mumbai",
  country: "India",
  timezone: "Asia/Kolkata",
  utcOffset: "UTC+5:30",
  email: "ms7212441@gmail.com",
  responseSLA: "< 4 Hours",
  github: "https://github.com/RaKa8904",
  linkedin: "https://www.linkedin.com/in/rahul-sharma-7947a2290",
  instagram: "https://www.instagram.com/anotherrahul_sharma/",
  discord: "https://discord.com/users/899708661457371207",
  status: "Open to Full-Stack & Applied AI Engineering Roles",
};
