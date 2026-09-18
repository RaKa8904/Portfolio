"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Layers, ShieldCheck, Cpu, Database, Activity, ArrowDown } from "lucide-react";
import { useSoundFX } from "@/hooks/use-sound-fx";

interface Chapter {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  tech: string[];
  metrics: { label: string; value: string };
  codeSnippet: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: "chapter-1",
    step: "01",
    title: "Wire-Speed Passive Ingest",
    subtitle: "Zero-Transmit Packet Stream Processing",
    badge: "ThreatLens Core",
    description:
      "Capturing raw network packets at 100,000+ packets/sec across promiscuous NIC interfaces without dropping frames or emitting probe packets that alert adversaries. Aggregating multi-tier sliding windows in Redis sorted sets.",
    tech: ["Python", "Zeek", "Kafka", "Redis", "PCAP"],
    metrics: { label: "Ingest Velocity", value: "100K+ pkts/s" },
    codeSnippet: `# Sliding window threat aggregation
def process_flow_stream(flow_id, packet_bytes):
    timestamp = time.time()
    redis_client.zadd(f"window:10s:{flow_id}", {packet_bytes: timestamp})
    redis_client.zremrangebyscore(f"window:10s:{flow_id}", 0, timestamp - 10)
    return evaluate_entropy_vector(flow_id)`,
  },
  {
    id: "chapter-2",
    step: "02",
    title: "Non-Linear Circadian Inference",
    subtitle: "Random Forest Pilot Fatigue Modeling",
    badge: "SmartCrew Engine",
    description:
      "Evaluating flight duty periods against strict DGCA CAR Section 7 & FAA Part 117 rules. Combining prior 24-hour sleep deficit, early morning departure windows, and multi-sector strain to produce real-time fatigue risk scores in under 10ms.",
    tech: ["Scikit-Learn", "Node.js", "Python", "WebSockets"],
    metrics: { label: "Model Latency", value: "< 9.4ms per pairing" },
    codeSnippet: `# Random forest circadian risk regressor
def predict_crew_fatigue(duty_hours, sleep_deficit, night_wocl):
    features = np.array([[duty_hours, sleep_deficit, night_wocl, sectors, tz]])
    risk_score = rf_model.predict_proba(features)[0][1] * 100
    is_legal = duty_hours <= 13.0 and sleep_deficit < 4.0
    return {"risk": round(risk_score), "legal": is_legal}`,
  },
  {
    id: "chapter-3",
    step: "03",
    title: "Dual-Tier Relational & OLAP State",
    subtitle: "ACID Concurrency Meets Columnar Analytics",
    badge: "SmartPOS & ClickHouse",
    description:
      "Balancing real-time, stock-aware checkout billing in PostgreSQL with row-level locks against high-throughput analytical event logs stored in ClickHouse columnar storage for sub-second business intelligence.",
    tech: ["FastAPI", "PostgreSQL", "ClickHouse", "SQLAlchemy"],
    metrics: { label: "Query Speed", value: "< 85ms Analytical" },
    codeSnippet: `# Row-level locked stock decrement
async def execute_atomic_checkout(db, item_id, qty):
    async with db.transaction():
        item = await db.query(Item).filter_by(id=item_id).with_for_update().first()
        if item.stock < qty: raise StockoutException()
        item.stock -= qty
        await clickhouse_client.insert("pos_events", [{"item_id": item_id, "qty": qty}])`,
  },
];

export function ScrollytellingSection() {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { playClick } = useSoundFX();

  // Scroll listener to update active chapter
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const chapterEls = containerRef.current.querySelectorAll(".scrolly-card");
      const windowHeight = window.innerHeight;

      chapterEls.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.2) {
          setActiveChapterIndex(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeChapter = CHAPTERS[activeChapterIndex] || CHAPTERS[0];

  return (
    <section id="scrollytelling" ref={containerRef} className="py-20 border-t border-paper-200 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <div className="space-y-2 mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full clay-pill text-forest-800 text-xs font-mono font-bold shadow-clay-sm">
            <Sparkles className="w-3.5 h-3.5 text-terracotta-600" />
            <span>SCROLLYTELLING • THE SYSTEMS JOURNEY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink-950 tracking-tight">
            How I Architect Resilient Software
          </h2>
          <p className="text-ink-600 text-sm sm:text-base max-w-2xl font-sans">
            Scroll down to explore the step-by-step engineering narrative—from wire-speed packet capture to applied machine learning and resilient distributed storage.
          </p>
        </div>

        {/* Scrollytelling Layout: Sticky HUD on Desktop Left, Scrolling Cards on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sticky Chapter Indicator & HUD (Left Column) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-4 text-left">
            <div className="clay-card p-6 shadow-clay-card space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-paper-200">
                <span className="text-xs font-mono text-terracotta-700 font-bold uppercase tracking-wider">
                  Active Narrative Chapter
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-full bg-forest-100 text-forest-800">
                  {activeChapter.step} of 03
                </span>
              </div>

              {/* Chapter Title Big */}
              <div>
                <span className="text-xs font-mono text-ink-500 font-semibold uppercase">
                  {activeChapter.badge}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-ink-950 mt-1 leading-tight">
                  {activeChapter.title}
                </h3>
                <p className="text-xs font-mono text-forest-700 font-semibold mt-1">
                  {activeChapter.subtitle}
                </p>
              </div>

              {/* Key Metric Spotlight */}
              <div className="p-3.5 rounded-xl clay-inset">
                <span className="text-[10px] font-mono text-ink-500 uppercase tracking-wider">
                  {activeChapter.metrics.label}
                </span>
                <div className="text-xl font-mono font-black text-forest-800 mt-0.5">
                  {activeChapter.metrics.value}
                </div>
              </div>

              {/* Chapter Navigation Buttons */}
              <div className="flex items-center gap-2 pt-2">
                {CHAPTERS.map((chap, idx) => (
                  <button
                    key={chap.id}
                    onClick={() => {
                      playClick(750);
                      const target = document.getElementById(chap.id);
                      target?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                      activeChapterIndex === idx
                        ? "bg-forest-800 text-paper-50 shadow-sm"
                        : "clay-pill text-ink-600 hover:text-forest-800"
                    }`}
                  >
                    Ch. {chap.step}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Scrolling Story Cards (Right Column) */}
          <div className="lg:col-span-7 space-y-12 text-left">
            {CHAPTERS.map((chap) => (
              <div
                key={chap.id}
                id={chap.id}
                className="scrolly-card clay-card p-6 sm:p-8 shadow-clay-card space-y-5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-forest-800 text-paper-50">
                    Chapter {chap.step}
                  </span>
                  <span className="text-xs font-mono text-terracotta-700 font-semibold">
                    {chap.badge}
                  </span>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-ink-950">
                    {chap.title}
                  </h4>
                  <p className="text-xs font-mono text-forest-700 font-medium mt-0.5">
                    {chap.subtitle}
                  </p>
                </div>

                <p className="text-sm text-ink-700 leading-relaxed font-sans">
                  {chap.description}
                </p>

                {/* Code Snippet Box */}
                <div className="rounded-xl bg-[#181D1A] p-4 text-paper-50 overflow-x-auto shadow-inner">
                  <pre className="font-mono text-xs leading-relaxed text-celadon-100">
                    <code>{chap.codeSnippet}</code>
                  </pre>
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {chap.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 text-xs font-mono rounded-lg clay-pill text-ink-700 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
