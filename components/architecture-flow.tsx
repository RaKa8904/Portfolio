"use client";

import React, { useState } from "react";
import { Server, Database, Shield, Cpu, Wifi, Layers, ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { useSoundFX } from "@/hooks/use-sound-fx";

interface NodeDetail {
  id: string;
  name: string;
  category: string;
  icon: React.ElementType;
  tech: string[];
  latency: string;
  role: string;
  security: string[];
  designRationale: string;
}

const NODES: NodeDetail[] = [
  {
    id: "client",
    name: "01. Client & Presentation Layer",
    category: "Edge UI",
    icon: Wifi,
    tech: ["React 19", "Next.js", "Tailwind CSS", "WebSockets"],
    latency: "< 16ms render loop",
    role: "Optimistic UI mutations, responsive state synchronization, and real-time Gantt/FIDS rendering.",
    security: ["Zero persistent storage of sensitive auth tokens in localStorage to prevent XSS exfiltration.", "Strict Content Security Policy (CSP) headers."],
    designRationale: "Modern React with server components and WebSocket event listeners keeps the UI snappy while offloading compute to backend workers.",
  },
  {
    id: "gateway",
    name: "02. API Gateway & Rate Limiter",
    category: "Reverse Proxy & Ingress",
    icon: Server,
    tech: ["FastAPI", "Node.js/Express", "Redis", "Nginx"],
    latency: "< 4ms proxy overhead",
    role: "Asynchronous ingress routing, TLS termination, schema validation via Pydantic, and IP token-bucket rate limiting.",
    security: ["Sliding-window IP and session rate limiting mitigating DDoS and brute-force attacks.", "Strict CORS whitelisting."],
    designRationale: "FastAPI's async ASGI event loop handles thousands of concurrent requests with minimal thread overhead.",
  },
  {
    id: "auth",
    name: "03. Hardened Auth & Session Shield",
    category: "Security Core",
    icon: Lock,
    tech: ["In-Memory JWT", "HttpOnly Cookies", "Bcrypt", "RBAC"],
    latency: "< 2ms verification",
    role: "Cryptographic token verification, role-based access control (RBAC), and session freshness checks.",
    security: ["Refresh tokens stored exclusively in secure, HttpOnly SameSite=Strict cookies.", "Short-lived access tokens retained solely in application runtime memory."],
    designRationale: "Prevents token theft from cross-site scripting (XSS) while eliminating cross-site request forgery (CSRF) vectors.",
  },
  {
    id: "broker",
    name: "04. Event Streaming & Window Buffers",
    category: "Message Queue",
    icon: Layers,
    tech: ["Apache Kafka", "Redis Pub/Sub", "Sliding Windows"],
    latency: "< 8ms queue delay",
    role: "Decouples packet capture streams and schedule mutation requests from heavy analytical computation.",
    security: ["TLS encrypted broker connections.", "Partition-level consumer group authorization."],
    designRationale: "Redis sliding-window sorted sets aggregate flow metrics (10s, 60s, 300s) without database write locks.",
  },
  {
    id: "ml",
    name: "05. Applied ML Inference Engines",
    category: "Machine Learning Core",
    icon: Cpu,
    tech: ["Scikit-Learn", "NumPy", "Pandas", "Random Forest", "Isolation Forest"],
    latency: "< 12ms per inference",
    role: "Real-time pilot fatigue risk scoring, network anomaly detection, RFM customer clustering, and dynamic pricing.",
    security: ["Pre-computed feature vectors and input range clipping to prevent adversarial data poisoning.", "Deterministic seed configuration."],
    designRationale: "Trained Random Forest and Isolation Forest models loaded into memory provide microsecond-scale predictions without external GPU dependency.",
  },
  {
    id: "storage",
    name: "06. Dual-Tier Storage Layer",
    category: "Database & OLAP",
    icon: Database,
    tech: ["PostgreSQL", "ClickHouse Columnar OLAP", "SQLAlchemy", "Prisma"],
    latency: "Sub-50ms analytical queries",
    role: "ACID transactions for billing/schedules in PostgreSQL; billions of forensic connection logs in ClickHouse.",
    security: ["Row-level locks for inventory decrement.", "Parameterized queries strictly eliminating SQL injection."],
    designRationale: "Separating transactional POS/crew state from high-throughput network forensics preserves ACID guarantees while scaling analytics.",
  },
];

export function ArchitectureFlow() {
  const [selectedNode, setSelectedNode] = useState<NodeDetail>(NODES[0]);
  const { playClick } = useSoundFX();

  return (
    <section id="architecture" className="py-20 border-t border-paper-200 relative bg-[#F7F6F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-2 mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full clay-pill text-forest-800 text-xs font-mono font-bold shadow-clay-sm">
            <Layers className="w-3.5 h-3.5 text-forest-700" />
            <span>SYSTEM DESIGN & BLUEPRINT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink-950 tracking-tight">
            End-to-End Applied AI Architecture
          </h2>
          <p className="text-ink-600 text-sm sm:text-base max-w-2xl font-sans">
            How data flows through my production platforms—from wire-speed packet ingest and rate-limited gateways to in-memory ML inference and dual-tier OLAP storage.
          </p>
        </div>

        {/* Interactive Architecture Flow Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Node Pipeline Buttons */}
          <div className="lg:col-span-6 space-y-3">
            {NODES.map((node) => {
              const Icon = node.icon;
              const isSelected = selectedNode.id === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => {
                    playClick(750);
                    setSelectedNode(node);
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between ${
                    isSelected
                      ? "bg-white border-forest-600 shadow-clay-card text-ink-950 translate-x-1"
                      : "bg-[#FAF8F5]/80 hover:bg-white border-paper-200 hover:border-paper-300 text-ink-700 hover:shadow-clay-sm"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`p-2.5 rounded-xl transition-colors ${
                        isSelected
                          ? "bg-forest-800 text-white shadow-sm"
                          : "bg-paper-200/80 text-ink-600"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-terracotta-700 font-bold uppercase tracking-wider">
                        {node.category}
                      </div>
                      <div className="text-sm font-bold text-ink-900 mt-0.5">
                        {node.name}
                      </div>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected
                        ? "text-forest-700 translate-x-1"
                        : "text-ink-400"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Detailed Inspector Panel */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl clay-card flex flex-col justify-between space-y-6 text-left border border-white">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-paper-200">
                <div>
                  <span className="text-xs font-mono text-terracotta-600 font-bold uppercase tracking-wider">
                    {selectedNode.category}
                  </span>
                  <h3 className="text-2xl font-bold text-ink-950 mt-1">
                    {selectedNode.name}
                  </h3>
                </div>

                <div className="px-3 py-1 rounded-full clay-pill text-forest-800 font-mono text-xs font-bold shadow-clay-sm border border-paper-200">
                  {selectedNode.latency}
                </div>
              </div>

              {/* Role & Responsibility */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-mono uppercase text-ink-500 tracking-wider font-bold">
                  Core Responsibility
                </h4>
                <p className="text-ink-700 text-sm leading-relaxed font-sans">
                  {selectedNode.role}
                </p>
              </div>

              {/* Design Rationale */}
              <div className="p-4 rounded-2xl clay-inset space-y-1.5 border border-paper-200/60">
                <h4 className="text-xs font-mono uppercase text-forest-700 tracking-wider font-bold">
                  Architectural Rationale
                </h4>
                <p className="text-ink-800 text-xs sm:text-sm leading-relaxed font-sans">
                  {selectedNode.designRationale}
                </p>
              </div>

              {/* Security & Controls */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase text-terracotta-700 tracking-wider font-bold">
                  Defensive Controls & Hardening
                </h4>
                <div className="space-y-2">
                  {selectedNode.security.map((sec, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-ink-700 font-sans">
                      <CheckCircle2 className="w-3.5 h-3.5 text-forest-600 mt-0.5 flex-shrink-0" />
                      <span>{sec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Chips */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase text-ink-500 tracking-wider font-bold">
                  Implemented Tooling
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedNode.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-xs font-mono rounded-lg clay-pill text-ink-800 font-semibold shadow-clay-sm border border-paper-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
