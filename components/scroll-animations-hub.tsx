"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Layers, Sliders, Eye, Compass, ArrowRight, Zap, RefreshCw } from "lucide-react";
import { useSoundFX } from "@/hooks/use-sound-fx";

export function ScrollAnimationsHub() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [triggeredCount, setTriggeredCount] = useState(0);
  const [hasTriggered, setHasTriggered] = useState(false);
  const { playClick, playTick } = useSoundFX();

  // Scroll-linked calculation
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      const progress = totalScroll > 0 ? Math.min(100, Math.max(0, Math.round((current / totalScroll) * 100))) : 0;
      setScrollProgress(progress);

      // Triggered effect upon reaching 20% scroll
      if (progress > 15 && !hasTriggered) {
        setHasTriggered(true);
        let count = 0;
        const interval = setInterval(() => {
          count += 12;
          if (count >= 100) {
            setTriggeredCount(100);
            clearInterval(interval);
          } else {
            setTriggeredCount(count);
          }
        }, 30);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasTriggered]);

  return (
    <section className="py-20 border-t border-paper-200 relative bg-[#FAF8F5]/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="space-y-2 mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full clay-pill text-forest-800 text-xs font-mono font-bold shadow-clay-sm">
            <Zap className="w-3.5 h-3.5 text-terracotta-600" />
            <span>CORE INTERACTIVE PHYSICS & ANIMATION ENGINES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink-950 tracking-tight">
            Embedded Scroll & Motion Paradigms
          </h2>
          <p className="text-ink-600 text-sm sm:text-base max-w-2xl font-sans">
            Showcasing four distinct real-time animation concepts engineered into the portfolio for tactile responsiveness and visual delight.
          </p>
        </div>

        {/* 4 Cards Grid explicitly embedding the 4 terms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {/* 1. Scroll-Linked Animation */}
          <div className="clay-card p-6 sm:p-7 shadow-clay-card flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-paper-200">
                <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase font-bold rounded-full bg-forest-100 text-forest-800">
                  Engine 01
                </span>
                <span className="text-xs font-mono text-terracotta-700 font-semibold">1:1 Scrubbable</span>
              </div>

              <h3 className="text-lg font-bold text-ink-950 mt-3 flex items-center gap-2">
                <span>Scroll-Linked Animation</span>
              </h3>
              <p className="text-xs sm:text-sm text-ink-700 leading-relaxed font-sans mt-1">
                Visual parameters and packet pipelines scrub in strict 1:1 synchrony with window scroll coordinates. The progress bar below updates continuously as you traverse the page.
              </p>
            </div>

            {/* Live Interactive Scrub Meter */}
            <div className="p-4 rounded-xl clay-inset space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-ink-600 font-semibold">Viewport Scroll Position</span>
                <span className="text-forest-800 font-bold">{scrollProgress}% Elapsed</span>
              </div>
              <div className="h-3 w-full bg-paper-300 rounded-full overflow-hidden p-0.5 shadow-inner">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-forest-700 to-terracotta-500 transition-all duration-75"
                  style={{ width: `${scrollProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-ink-400">
                <span>0% (Hero Ingress)</span>
                <span>50% (ML Inference)</span>
                <span>100% (Contact Egress)</span>
              </div>
            </div>
          </div>

          {/* 2. Scroll-Triggered Animation */}
          <div className="clay-card p-6 sm:p-7 shadow-clay-card flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-paper-200">
                <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase font-bold rounded-full bg-terracotta-100 text-terracotta-700">
                  Engine 02
                </span>
                <span className="text-xs font-mono text-forest-800 font-semibold">Intersection Observer</span>
              </div>

              <h3 className="text-lg font-bold text-ink-950 mt-3 flex items-center gap-2">
                <span>Scroll-Triggered Animation</span>
              </h3>
              <p className="text-xs sm:text-sm text-ink-700 leading-relaxed font-sans mt-1">
                State transitions and mechanical board letters fire precisely when elements cross the viewport threshold. Discrete events execute without bogging down the main thread.
              </p>
            </div>

            {/* Live Trigger Simulator */}
            <div className="p-4 rounded-xl clay-inset space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-ink-600 font-semibold">Trigger Status</span>
                <span className="text-terracotta-700 font-bold">
                  {hasTriggered ? "ACTIVATED AT 20% SCROLL" : "AWAITING SCROLL"}
                </span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="font-mono text-2xl font-black text-ink-950">
                  {triggeredCount} / 100
                </span>
                <button
                  onClick={() => {
                    playClick(800);
                    setHasTriggered(false);
                    setTriggeredCount(0);
                    setTimeout(() => setHasTriggered(true), 100);
                  }}
                  className="px-3 py-1.5 rounded-lg clay-pill text-xs font-mono text-ink-700 hover:text-forest-800 flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Retrigger</span>
                </button>
              </div>
            </div>
          </div>

          {/* 3. Parallax Scrolling */}
          <div className="clay-card p-6 sm:p-7 shadow-clay-card flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-paper-200">
                <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase font-bold rounded-full bg-forest-100 text-forest-800">
                  Engine 03
                </span>
                <span className="text-xs font-mono text-ink-500 font-semibold">Multi-Depth Layers</span>
              </div>

              <h3 className="text-lg font-bold text-ink-950 mt-3 flex items-center gap-2">
                <span>Parallax Scrolling</span>
              </h3>
              <p className="text-xs sm:text-sm text-ink-700 leading-relaxed font-sans mt-1">
                Background architectural blueprints, glass geometry, and foreground data panels translate at differential velocities, establishing organic spatial dimensionality.
              </p>
            </div>

            {/* Parallax Depth Visualizer */}
            <div className="relative h-24 rounded-xl clay-inset overflow-hidden flex items-center justify-center p-3">
              <div
                className="absolute inset-0 bg-paper-300/40 rounded-xl transition-transform duration-100"
                style={{ transform: `translateY(${(scrollProgress - 50) * 0.15}px)` }}
              />
              <div
                className="relative z-10 px-4 py-2 rounded-lg clay-pill shadow-clay-sm text-xs font-mono font-bold text-forest-800"
                style={{ transform: `translateY(${(scrollProgress - 50) * -0.25}px)` }}
              >
                Differential Layer Drift ({((scrollProgress - 50) * -0.25).toFixed(1)}px)
              </div>
            </div>
          </div>

          {/* 4. Scrollytelling */}
          <div className="clay-card p-6 sm:p-7 shadow-clay-card flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-paper-200">
                <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase font-bold rounded-full bg-terracotta-100 text-terracotta-700">
                  Engine 04
                </span>
                <span className="text-xs font-mono text-forest-800 font-semibold">Narrative Architecture</span>
              </div>

              <h3 className="text-lg font-bold text-ink-950 mt-3 flex items-center gap-2">
                <span>Scrollytelling</span>
              </h3>
              <p className="text-xs sm:text-sm text-ink-700 leading-relaxed font-sans mt-1">
                Replacing isolated static portfolio cards with a structured technical narrative that unfolds chapter-by-chapter as recruiters navigate through the codebase evolution.
              </p>
            </div>

            <a
              href="#scrollytelling"
              onClick={() => playClick(850)}
              className="clay-btn-forest py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-2"
            >
              <span>Scroll to The Systems Journey</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
