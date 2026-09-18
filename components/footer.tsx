"use client";

import React from "react";
import { ArrowUp, Terminal, ShieldCheck, Github, Linkedin, Cpu } from "lucide-react";
import { PROFILE_INFO } from "@/data/experience";
import { useSoundFX } from "@/hooks/use-sound-fx";

export function Footer() {
  const { playClick } = useSoundFX();

  const scrollToTop = () => {
    playClick(900);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 border-t border-paper-200 bg-[#F5F3EC] text-ink-600 text-xs font-mono relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-paper-300">
          {/* Left Info */}
          <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-ink-950 font-sans">
                {PROFILE_INFO.name}
              </span>
              <span className="px-2 py-0.5 text-[10px] rounded-full clay-pill text-forest-800 font-bold border border-paper-200">
                {PROFILE_INFO.handle}
              </span>
            </div>
            <p className="text-ink-500 text-xs">
              {PROFILE_INFO.title} • {PROFILE_INFO.city}, {PROFILE_INFO.country} ({PROFILE_INFO.utcOffset})
            </p>
          </div>

          {/* System Status Pill */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full clay-pill shadow-clay-sm text-forest-800 border border-paper-200">
            <span className="w-2 h-2 rounded-full bg-forest-600 animate-ping" />
            <span className="text-[11px] font-bold tracking-wider">
              ALL ML ENGINES & APIS OPERATIONAL
            </span>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl clay-pill text-ink-800 hover:text-ink-950 border border-paper-200 transition-all active:scale-95 shadow-clay-sm hover:shadow-clay-card"
          >
            <span className="font-semibold">Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-terracotta-600" />
          </button>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-ink-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Rahul Naresh Sharma. Built with Next.js, Three.js WebGL & Gary Simon UI/UX principles.
          </div>

          <div className="flex items-center gap-5">
            <a
              href={PROFILE_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-forest-800 transition-colors font-semibold"
            >
              GitHub
            </a>
            <a
              href={PROFILE_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-forest-800 transition-colors font-semibold"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${PROFILE_INFO.email}`}
              className="hover:text-terracotta-700 transition-colors font-semibold"
            >
              {PROFILE_INFO.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
