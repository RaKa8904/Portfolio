"use client";

import React, { useState } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { Sparkles, Coffee, Check, AlertCircle, Heart, RotateCcw } from "lucide-react";
import { useSoundFX } from "@/hooks/use-sound-fx";

export function QACatEasterEgg() {
  const [caffeine, setCaffeine] = useState(25);
  const [status, setStatus] = useState<string>("Sleeping on keyboard: PR review blocked until coffee arrives.");
  const { playClick, playChime } = useSoundFX();

  const handlePourCoffee = () => {
    playClick(900);
    const nextCaffeine = Math.min(100, caffeine + 25);
    setCaffeine(nextCaffeine);

    if (nextCaffeine === 50) {
      setStatus("Cat opened one eye: 'Suspicious variable naming detected in auth token.'");
    } else if (nextCaffeine === 75) {
      setStatus("Cat batting at cursor: 'Running load tests... 10,000 req/sec sustained.'");
    } else if (nextCaffeine >= 100) {
      playChime();
      setStatus("🎉 PR APPROVED & MERGED TO MAIN! Senior QA Cat purrs with high-velocity approval!");
      // Fire celebratory confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.8 },
          colors: ["#f59e0b", "#2dd4bf", "#fef3c7"],
        });
      } catch {
        // ignore if not supported
      }
    }
  };

  const handleReset = () => {
    playClick(400);
    setCaffeine(25);
    setStatus("Cat went back to sleep on the mechanical keyboard: PR review paused.");
  };

  return (
    <div className="p-6 sm:p-7 rounded-3xl clay-card border border-white flex flex-col lg:flex-row items-center justify-between gap-6 shadow-clay-card text-left bg-[#FAF8F5]">
      <div className="flex items-center gap-5 w-full lg:w-auto">
        <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-paper-300 flex-shrink-0 bg-paper-200 shadow-inner">
          <Image
            src="https://raw.githubusercontent.com/gist/dumbmoron/ea9b6264e6b6183fd590e322d1afab51/raw/bc064a9116403eab89e5b8200b1aa0890419ec0e/cat.gif"
            alt="Senior QA Cat Reviewing Code"
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm sm:text-base font-bold text-ink-950 font-mono">
              Senior QA Code Reviewer in Action
            </span>
            <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold rounded-full bg-forest-100 text-forest-800 border border-forest-300">
              Lead Code Auditor
            </span>
          </div>
          <p className="text-xs text-ink-600 italic font-mono">
            "If it compiles on the first try, don't trust it." — Senior QA Cat
          </p>

          <div className="space-y-1 pt-1">
            <div className="flex justify-between text-[10px] font-mono text-ink-500">
              <span>Reviewer Caffeine Level</span>
              <span className="text-terracotta-700 font-bold">{caffeine}%</span>
            </div>
            <div className="h-2.5 w-full max-w-md bg-paper-200 rounded-full overflow-hidden p-0.5 clay-inset border border-paper-300/60">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  caffeine >= 100
                    ? "bg-forest-600"
                    : caffeine >= 75
                    ? "bg-terracotta-500"
                    : "bg-terracotta-600"
                }`}
                style={{ width: `${caffeine}%` }}
              />
            </div>
          </div>

          <div className="text-xs font-mono text-ink-800 pt-1 flex items-center gap-1.5 animate-in fade-in duration-200">
            {caffeine >= 100 ? (
              <Check className="w-3.5 h-3.5 text-forest-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-3.5 h-3.5 text-terracotta-600 flex-shrink-0" />
            )}
            <span className="font-semibold text-ink-900">{status}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
        <button
          onClick={handlePourCoffee}
          disabled={caffeine >= 100}
          className={`px-4 py-2.5 rounded-2xl font-mono text-xs font-semibold flex items-center gap-2 transition-all active:scale-95 flex-shrink-0 shadow-clay-sm ${
            caffeine >= 100
              ? "bg-forest-100 text-forest-800 border border-forest-300 cursor-default"
              : "clay-btn-primary"
          }`}
        >
          <Coffee className="w-4 h-4 text-white" />
          <span>{caffeine >= 100 ? "Cat Caffeinated!" : "Pour Coffee (+25%)"}</span>
        </button>

        {caffeine >= 100 && (
          <button
            onClick={handleReset}
            className="p-2.5 rounded-2xl clay-pill text-ink-600 hover:text-ink-950 border border-paper-200 transition-colors shadow-clay-sm"
            title="Reset Cat Game"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
