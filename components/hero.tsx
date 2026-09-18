"use client";

import React from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Github, Linkedin, Terminal, Sparkles, Shield, Activity, Cpu, Quote } from "lucide-react";
import { KineticReveal } from "./kinetic-text";
import { PROFILE_INFO } from "@/data/experience";
import { useSoundFX } from "@/hooks/use-sound-fx";

interface HeroProps {
  onOpenTerminal: () => void;
}

export function Hero({ onOpenTerminal }: HeroProps) {
  const { playClick } = useSoundFX();

  return (
    <section className="relative pt-28 pb-12 lg:pt-36 lg:pb-16 overflow-hidden">
      {/* Warm Ambient Editorial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] editorial-glow pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Typographic Visual Hierarchy */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-20">
            {/* Status Pill in Soft Celadon Clay */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full clay-pill shadow-clay-sm text-xs font-mono mb-6 text-forest-800">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forest-600 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-forest-700"></span>
              </span>
              <span className="font-bold tracking-wide uppercase">[00] // OPEN TO ROLES</span>
              <span className="text-ink-400 font-sans">•</span>
              <span className="text-ink-600 font-medium">{PROFILE_INFO.city}, {PROFILE_INFO.country}</span>
            </div>

            {/* Greeting Micro-Text with Kinetic Line Reveal */}
            <KineticReveal delay={0.1}>
              <h2 className="font-mono text-xs sm:text-sm text-terracotta-700 font-bold tracking-wider uppercase mb-2">
                Hi, I'm Rahul Naresh Sharma
              </h2>
            </KineticReveal>

            {/* Bold Punchy Headline with Kinetic Reveal and Forest/Terracotta Accents */}
            <KineticReveal delay={0.2} duration={1.2}>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-ink-950 tracking-tight leading-[1.12] mb-6">
                I BUILD{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest-800 via-forest-600 to-terracotta-600">
                  RESILIENT FULL-STACK
                </span>{" "}
                SYSTEMS & APPLIED AI PIPELINES.
              </h1>
            </KineticReveal>

            {/* Concise Value Proposition in Warm Ink */}
            <KineticReveal delay={0.35}>
              <p className="text-base sm:text-lg text-ink-700 leading-relaxed max-w-2xl mb-8 font-sans">
                Specializing in end-to-end distributed architectures, multi-factor ML scoring, passive network threat intelligence, and high-performance backend microservices. Focused on sub-second inference and zero-downtime reliability.
              </p>
            </KineticReveal>

            {/* Social & Verification Badges */}
            <div className="flex flex-wrap items-center gap-4 pt-5 border-t border-paper-200 text-xs font-mono text-ink-600 w-full">
              <a
                href={PROFILE_INFO.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => playClick(600)}
                className="inline-flex items-center gap-1.5 hover:text-forest-800 transition-colors"
              >
                <Github className="w-4 h-4 text-ink-800" />
                <span>github.com/RaKa8904</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </a>

              <span className="text-paper-400">•</span>

              <a
                href={PROFILE_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={() => playClick(600)}
                className="inline-flex items-center gap-1.5 hover:text-forest-800 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-forest-700" />
                <span>LinkedIn Connect</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </a>

              <span className="text-paper-400">•</span>

              <div className="inline-flex items-center gap-1.5 text-forest-700 font-semibold">
                <Shield className="w-3.5 h-3.5 text-forest-600" />
                <span>Stanford ML Certified</span>
              </div>
            </div>
          </div>

          {/* Right Column: raka-core engine window with Rahul's photo */}
          <div className="lg:col-span-5 relative flex flex-col items-center w-full">
            <div className="w-full clay-card p-5 sm:p-6 shadow-clay-card border border-white space-y-4 text-left">
              {/* Terminal Titlebar */}
              <div className="flex items-center justify-between pb-3 border-b border-paper-200">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-forest-600" />
                  <span className="ml-2 text-xs font-mono font-bold text-ink-700">
                    raka-core // engine.py
                  </span>
                </div>
                <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold rounded-full bg-forest-100 text-forest-800 border border-forest-200/60 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-forest-600 animate-ping" />
                  SYSTEM READY
                </span>
              </div>

              {/* Photo Box Inside raka-core */}
              <div className="relative w-full aspect-[4/4.8] sm:aspect-[4/4.5] rounded-2xl overflow-hidden clay-inset border border-paper-200/70 shadow-inner group">
                <Image
                  src="/rahul-photo.jpg"
                  alt="Rahul Naresh Sharma"
                  fill
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                {/* Subtle vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent pointer-events-none" />
                
                {/* Bottom glass badge */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3.5 py-2 rounded-xl bg-ink-950/80 backdrop-blur-md border border-white/20 text-white shadow-lg">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-wide">
                    <span className="w-2 h-2 rounded-full bg-forest-400" />
                    <span>RAHUL NARESH SHARMA</span>
                  </div>
                  <span className="text-[10px] font-mono text-terracotta-300 font-semibold uppercase tracking-wider">
                    AI & Systems
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Engineering Creed & Tech Quote Banner */}
        <div className="mt-12 lg:mt-16 p-6 sm:p-7 clay-card shadow-clay-card relative overflow-hidden text-left group hover:shadow-clay-card-hover transition-all">
          {/* Subtle Ambient Background Watermark */}
          <div className="absolute -right-4 -bottom-6 text-paper-300/40 select-none pointer-events-none font-serif text-8xl font-black">
            &rdquo;
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-paper-200/80">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full clay-pill shadow-clay-sm text-xs font-mono font-bold text-forest-800">
              <Quote className="w-3.5 h-3.5 text-terracotta-600" />
              <span>CORE ENGINEERING CREED</span>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-mono text-ink-500 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>rsharma@raka-core // prod-ready</span>
            </div>
          </div>

          <div className="pt-5 space-y-3">
            <p className="text-base sm:text-lg md:text-xl font-sans font-bold text-ink-950 leading-relaxed">
              &ldquo;Any fool can write code that a computer can understand. Great engineers write systems that <span className="text-terracotta-600 underline decoration-terracotta-400/50 decoration-2 underline-offset-4">don&apos;t wake them up at 3 AM</span>.&rdquo;
            </p>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs font-mono text-ink-600">
              <span className="font-semibold text-forest-800">
                &mdash; Adapted from Martin Fowler &bull; Followed with religious adherence
              </span>
              <span className="px-2.5 py-0.5 rounded-md clay-pill text-[10px] font-bold text-terracotta-700 uppercase tracking-wider shadow-sm">
                99.99% Uptime &amp; Deep Sleep
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
