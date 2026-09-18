"use client";

import React, { useState, useEffect } from "react";
import { Plane, Clock } from "lucide-react";

interface FlightEntry {
  flight: string;
  route: string;
  dutyStatus: string;
  fatigueIndex: string;
  verdict: "LEGAL" | "CAUTION" | "GROUNDED";
}

const SAMPLE_FLIGHTS: FlightEntry[] = [
  { flight: "AI-802", route: "BOM -> DEL", dutyStatus: "08:30 FDP", fatigueIndex: "24/100", verdict: "LEGAL" },
  { flight: "EK-505", route: "BOM -> DXB", dutyStatus: "11:15 FDP", fatigueIndex: "58/100", verdict: "CAUTION" },
  { flight: "6E-241", route: "BLR -> BOM", dutyStatus: "05:45 FDP", fatigueIndex: "18/100", verdict: "LEGAL" },
  { flight: "BA-138", route: "BOM -> LHR", dutyStatus: "14:10 FDP", fatigueIndex: "86/100", verdict: "GROUNDED" },
];

function SplitFlapText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let iteration = 0;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-/> ";
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2;
    }, 35);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className="font-mono font-bold tracking-wider">
      {displayText}
    </span>
  );
}

export function SplitFlapBoard() {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCycle((prev) => prev + 1);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-[#141A17] border border-forest-900/40 shadow-2xl space-y-4 text-paper-50">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Plane className="w-4 h-4 text-terracotta-400 animate-pulse" />
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-terracotta-300">
            SMARTCREW LIVE FIDS DISPATCH BOARD
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-celadon-300">
          <Clock className="w-3 h-3 text-celadon-200" />
          <span>REAL-TIME FLIGHT ROSTER SYNC</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="text-celadon-300/80 text-[10px] uppercase border-b border-white/5 pb-2">
              <th className="pb-2">Flight</th>
              <th className="pb-2">Sector Route</th>
              <th className="pb-2">Duty Time</th>
              <th className="pb-2">Fatigue Index</th>
              <th className="pb-2 text-right">DGCA Verdict</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {SAMPLE_FLIGHTS.map((f) => (
              <tr key={`${f.flight}-${cycle}`} className="hover:bg-white/5 transition-colors">
                <td className="py-2.5 font-bold text-terracotta-300">
                  <SplitFlapText text={f.flight} />
                </td>
                <td className="py-2.5 text-paper-100">
                  <SplitFlapText text={f.route} />
                </td>
                <td className="py-2.5 text-celadon-200">
                  <SplitFlapText text={f.dutyStatus} />
                </td>
                <td className="py-2.5 font-semibold text-paper-50">
                  <SplitFlapText text={f.fatigueIndex} />
                </td>
                <td className="py-2.5 text-right">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                      f.verdict === "LEGAL"
                        ? "bg-forest-600/40 text-celadon-200 border border-forest-500/40"
                        : f.verdict === "CAUTION"
                        ? "bg-amber-950/60 text-amber-300 border border-amber-500/40"
                        : "bg-terracotta-900/80 text-terracotta-200 border border-terracotta-600/50"
                    }`}
                  >
                    {f.verdict}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
