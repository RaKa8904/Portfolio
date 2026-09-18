"use client";

import React from "react";
import { Sparkles, Code2, Brain, Cpu, Lightbulb, Zap, Shield, ArrowRight, GraduationCap, Award, Compass } from "lucide-react";
import { KineticReveal } from "./kinetic-text";
import { useSoundFX } from "@/hooks/use-sound-fx";

export function AboutSection() {
  const { playClick, playPop } = useSoundFX();

  const interests = [
    { label: "ARTIFICIAL INTELLIGENCE", icon: Brain },
    { label: "LARGE LANGUAGE MODELS", icon: Sparkles },
    { label: "COMPUTER VISION", icon: Lightbulb },
    { label: "AI PRODUCT DEVELOPMENT", icon: Zap },
    { label: "STARTUP BUILDING", icon: Compass },
    { label: "DISTRIBUTED SYSTEMS", icon: Shield },
  ];

  return (
    <section
      id="about"
      className="py-20 border-t border-paper-200/80 relative bg-[#FAF8F5]/60 backdrop-blur-[1px]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Top Header Badge & Title */}
        <div className="flex flex-col items-start text-left space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full clay-pill text-forest-800 text-xs font-mono font-bold shadow-clay-sm">
            <Sparkles className="w-3.5 h-3.5 text-terracotta-600" />
            <span>GET TO KNOW ME</span>
          </div>

          <KineticReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink-950 tracking-tight flex items-center gap-2 font-sans">
              <span>Who Am I</span>
              <span className="text-terracotta-600 font-mono">?</span>
            </h2>
          </KineticReveal>
          <p className="text-ink-600 text-sm sm:text-base max-w-2xl font-sans">
            An applied machine learning engineer and full-stack systems builder focused on scalable architecture, zero-downtime reliability, and intelligent data-driven applications.
          </p>
        </div>

        {/* Content Layout: Left Profile Card + Right 4 Colored Stat Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: <> PROFILE Card */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl clay-card border border-white shadow-clay-card flex flex-col justify-between space-y-6 text-left">
            <div className="space-y-4">
              {/* Card Sub-Header */}
              <div className="flex items-center justify-between pb-3 border-b border-paper-200/80">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-forest-800">
                  <Code2 className="w-4 h-4 text-forest-700" />
                  <span>&lt;&gt; PROFILE</span>
                </div>
                <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold rounded-full bg-forest-100/80 text-forest-800 border border-forest-200/60">
                  B.E. AI &amp; DATA SCIENCE
                </span>
              </div>

              {/* Bio Paragraph 1 */}
              <p className="text-sm sm:text-base text-ink-800 leading-relaxed font-sans font-medium">
                I am currently pursuing a{" "}
                <span className="clay-pill px-2.5 py-0.5 rounded-lg text-forest-900 font-bold font-mono text-xs sm:text-sm border border-forest-200/70 bg-forest-50/80">
                  Bachelor's degree in Artificial Intelligence and Data Science
                </span>{" "}
                with a strong focus on machine learning engineering, generative AI, and scalable software systems.
              </p>

              {/* Bio Paragraph 2 */}
              <p className="text-sm sm:text-base text-ink-800 leading-relaxed font-sans font-medium">
                I am passionate about building intelligent systems that solve real-world problems. My work spans{" "}
                <span className="clay-pill px-2.5 py-0.5 rounded-lg text-terracotta-900 font-bold font-mono text-xs sm:text-sm border border-terracotta-200/70 bg-terracotta-50/80">
                  machine learning
                </span>
                ,{" "}
                <span className="clay-pill px-2.5 py-0.5 rounded-lg text-amber-900 font-bold font-mono text-xs sm:text-sm border border-amber-200/70 bg-amber-50/80">
                  generative AI
                </span>
                , fairness auditing, computer vision, cloud deployment, and full-stack AI applications.
              </p>
            </div>

            {/* Interests Section */}
            <div className="pt-4 border-t border-paper-200/80 space-y-3">
              <div className="text-xs font-mono font-bold text-ink-600 tracking-wider uppercase flex items-center gap-1.5">
                <span>MY INTERESTS</span>
                <ArrowRight className="w-3.5 h-3.5 text-terracotta-600" />
              </div>

              <div className="flex flex-wrap gap-2">
                {interests.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      onClick={() => playPop()}
                      className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl clay-pill border border-paper-200/80 text-[11px] font-mono font-bold text-ink-800 shadow-clay-sm hover:shadow-clay-card hover:text-forest-800 transition-all cursor-pointer select-none active:scale-95"
                    >
                      <Icon className="w-3.5 h-3.5 text-forest-700" />
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: 4 Cohesive Clay Metric Cards + Status Bar */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {/* 2x2 Grid of Colored Metric Cards Matching Theme */}
            <div className="grid grid-cols-2 gap-4 flex-1">
              {/* Card 1: Warm Terracotta Clay (7.5 CGPA) */}
              <div className="p-5 sm:p-6 rounded-3xl clay-card border border-terracotta-200/80 bg-gradient-to-br from-[#FFF9F6] via-[#FFF3EE] to-[#FCEAE2] shadow-clay-sm hover:shadow-clay-card transition-all flex flex-col justify-between text-left group">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl sm:text-4xl font-extrabold text-terracotta-600 group-hover:scale-105 transition-transform">
                    7.5
                  </span>
                  <div className="w-8 h-8 rounded-full clay-pill flex items-center justify-center text-terracotta-600 shadow-sm border border-terracotta-200/60">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                </div>
                <span className="font-mono text-xs font-bold uppercase text-terracotta-800 tracking-wider mt-4">
                  CGPA
                </span>
              </div>

              {/* Card 2: Deep Forest Sage Clay (7+ AI Projects) */}
              <div className="p-5 sm:p-6 rounded-3xl clay-card border border-forest-200/80 bg-gradient-to-br from-[#F8FAF7] via-[#F1F6F0] to-[#E5EFE4] shadow-clay-sm hover:shadow-clay-card transition-all flex flex-col justify-between text-left group">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl sm:text-4xl font-extrabold text-forest-800 group-hover:scale-105 transition-transform">
                    7+
                  </span>
                  <div className="w-8 h-8 rounded-full clay-pill flex items-center justify-center text-forest-700 shadow-sm border border-forest-200/60">
                    <Brain className="w-4 h-4" />
                  </div>
                </div>
                <span className="font-mono text-xs font-bold uppercase text-forest-900 tracking-wider mt-4">
                  AI PROJECTS
                </span>
              </div>

              {/* Card 3: Warm Sand & Amber Clay (2+ Certifications) */}
              <div className="p-5 sm:p-6 rounded-3xl clay-card border border-amber-200/80 bg-gradient-to-br from-[#FFFEFA] via-[#FCF8EC] to-[#F7EED4] shadow-clay-sm hover:shadow-clay-card transition-all flex flex-col justify-between text-left group">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl sm:text-4xl font-extrabold text-amber-700 group-hover:scale-105 transition-transform">
                    2+
                  </span>
                  <div className="w-8 h-8 rounded-full clay-pill flex items-center justify-center text-amber-700 shadow-sm border border-amber-200/60">
                    <Award className="w-4 h-4" />
                  </div>
                </div>
                <span className="font-mono text-xs font-bold uppercase text-amber-900 tracking-wider mt-4">
                  CERTIFICATIONS
                </span>
              </div>

              {/* Card 4: Celadon Slate Clay (20+ Technologies) */}
              <div className="p-5 sm:p-6 rounded-3xl clay-card border border-celadon-300/80 bg-gradient-to-br from-[#F8FAF9] via-[#EFF4F2] to-[#E3EDE8] shadow-clay-sm hover:shadow-clay-card transition-all flex flex-col justify-between text-left group">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl sm:text-4xl font-extrabold text-ink-950 group-hover:scale-105 transition-transform">
                    20+
                  </span>
                  <div className="w-8 h-8 rounded-full clay-pill flex items-center justify-center text-ink-800 shadow-sm border border-celadon-200/60">
                    <Cpu className="w-4 h-4" />
                  </div>
                </div>
                <span className="font-mono text-xs font-bold uppercase text-ink-800 tracking-wider mt-4">
                  TECHNOLOGIES
                </span>
              </div>
            </div>

            {/* Status Banner - High Contrast Deep Charcoal with Vibrant Emerald & Amber Text */}
            <div className="p-5 rounded-3xl bg-[#121815] text-white shadow-xl border-2 border-forest-700/50 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-amber-300 tracking-wider">
                <span>STATUS</span>
                <ArrowRight className="w-4 h-4 text-terracotta-400" />
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-mono text-xs sm:text-sm font-black text-emerald-300 uppercase tracking-wider">
                  OPEN TO OPPORTUNITIES
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
