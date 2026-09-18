"use client";

import React, { useState, useEffect } from "react";
import { Mail, Clock, ShieldCheck, Copy, Check, ArrowUpRight, Github, Linkedin, MessageSquare, Sparkles, Sun, Moon, Zap, Instagram } from "lucide-react";
import { PROFILE_INFO } from "@/data/experience";
import { useSoundFX } from "@/hooks/use-sound-fx";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isDaytime, setIsDaytime] = useState<boolean>(true);
  const { playClick, playChime } = useSoundFX();

  // Live Mumbai Clock (Asia/Kolkata, UTC+5:30)
  useEffect(() => {
    const updateClock = () => {
      try {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        };
        const timeStr = new Intl.DateTimeFormat("en-US", options).format(now);
        setCurrentTime(timeStr);

        // Check if day or night in Mumbai (6 AM to 6 PM)
        const hour = parseInt(
          new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Kolkata", hour: "numeric", hour12: false }).format(now)
        );
        setIsDaytime(hour >= 6 && hour < 18);
      } catch {
        setCurrentTime("08:30:00 PM IST");
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const [emailStatus, setEmailStatus] = useState<string>("");

  const handleSendDirectEmail = () => {
    playChime();
    navigator.clipboard.writeText(PROFILE_INFO.email);
    setEmailStatus("Copied to clipboard & opening compose...");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setEmailStatus("");
    }, 4000);

    const subject = encodeURIComponent("Software Engineering Opportunity - Rahul Sharma");
    const body = encodeURIComponent("Hi Rahul,\n\nI came across your portfolio and would like to connect regarding an engineering opportunity.\n\nBest regards,");
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${PROFILE_INFO.email}&su=${subject}&body=${body}`;
    const mailtoUrl = `mailto:${PROFILE_INFO.email}?subject=${subject}&body=${body}`;

    // Try opening Gmail Web Compose directly (works 100% reliably everywhere)
    const newWindow = window.open(gmailUrl, "_blank", "noopener,noreferrer");
    if (!newWindow || newWindow.closed || typeof newWindow.closed === "undefined") {
      // Fallback to mailto if browser prevents popup
      window.location.href = mailtoUrl;
    }
  };

  const handleCopyEmail = () => {
    playChime();
    navigator.clipboard.writeText(PROFILE_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="contact" className="py-20 border-t border-paper-200/80 relative bg-[#FAF8F5]/60 backdrop-blur-[1px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center text-left">
          {/* Left Column: Get In Touch */}
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full clay-pill text-forest-800 text-xs font-mono font-bold shadow-clay-sm">
              <Sparkles className="w-3.5 h-3.5 text-terracotta-600" />
              <span>START A CONVERSATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink-950 tracking-tight leading-[1.15]">
              Let's Build Resilient Systems Together.
            </h2>
            <p className="text-ink-700 text-sm sm:text-base leading-relaxed font-sans">
              I am actively seeking software engineering and applied machine learning roles where high throughput, distributed architectures, and rigorous system reliability matter.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={handleSendDirectEmail}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl clay-btn-primary font-bold text-sm shadow-clay-btn transition-all active:scale-95 cursor-pointer"
                title="Open email compose and copy email address"
              >
                <Mail className="w-4 h-4" />
                <span>Send Direct Email</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl clay-pill border border-paper-200 text-ink-800 text-sm font-mono transition-all active:scale-95 shadow-clay-sm hover:shadow-clay-card cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-forest-600" /> : <Copy className="w-4 h-4 text-terracotta-600" />}
                <span>{copied ? "Email Copied!" : PROFILE_INFO.email}</span>
              </button>
            </div>

            {emailStatus && (
              <p className="text-xs font-mono text-forest-700 font-semibold animate-in fade-in duration-200 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>{emailStatus}</span>
              </p>
            )}
          </div>

          {/* Right Column: Replaced Cards (Live World Clock & Engineering SLA - No private phone/address) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-6 sm:p-7 rounded-3xl clay-card border border-white space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Card 1: Live Mumbai World Clock */}
                <div className="p-4 rounded-2xl clay-inset space-y-2 border border-paper-200/60">
                  <div className="flex items-center justify-between text-xs font-mono text-terracotta-700 font-bold">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>MUMBAI (IST)</span>
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-ink-500">
                      {isDaytime ? <Sun className="w-3 h-3 text-terracotta-600" /> : <Moon className="w-3 h-3 text-forest-600" />}
                      <span>{isDaytime ? "Day" : "Night"}</span>
                    </span>
                  </div>

                  <div className="font-mono text-xl sm:text-2xl font-black text-ink-950 tracking-wider">
                    {currentTime || "Loading..."}
                  </div>
                  <span className="block text-[11px] font-mono text-ink-500">
                    UTC +5:30 Timezone
                  </span>
                </div>

                {/* Card 2: Response SLA */}
                <div className="p-4 rounded-2xl clay-inset space-y-2 border border-paper-200/60">
                  <div className="flex items-center justify-between text-xs font-mono text-forest-700 font-bold">
                    <span className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      <span>RESPONSE SLA</span>
                    </span>
                    <span className="w-2 h-2 rounded-full bg-forest-600 animate-ping" />
                  </div>

                  <div className="font-mono text-xl sm:text-2xl font-black text-ink-950 tracking-wider">
                    &lt; 4 Hours
                  </div>
                  <span className="block text-[11px] font-mono text-ink-500">
                    Direct Email Turnaround
                  </span>
                </div>

                {/* Card 3: Availability & Work Authorization */}
                <div className="p-4 rounded-2xl clay-inset space-y-1.5 sm:col-span-2 border border-paper-200/60">
                  <div className="flex items-center gap-2 text-xs font-mono text-forest-800 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-forest-600" />
                    <span>ENGINEERING COLLABORATION STATUS</span>
                  </div>
                  <p className="text-xs sm:text-sm font-sans text-ink-700 leading-relaxed">
                    Available for full-time Software Engineer, Backend Engineer, and Applied AI roles globally (Remote or On-site).
                  </p>
                </div>
              </div>

              {/* Verified Developer Channels */}
              <div className="pt-4 border-t border-paper-200 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <a
                  href={PROFILE_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playClick(600)}
                  className="flex items-center gap-1.5 text-ink-700 hover:text-forest-700 transition-colors font-medium"
                >
                  <Github className="w-4 h-4 text-ink-900" />
                  <span>github.com/RaKa8904</span>
                </a>

                <a
                  href={PROFILE_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playClick(600)}
                  className="flex items-center gap-1.5 text-ink-700 hover:text-forest-700 transition-colors font-medium"
                >
                  <Linkedin className="w-4 h-4 text-[#0077b5]" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={PROFILE_INFO.instagram}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playClick(600)}
                  className="flex items-center gap-1.5 text-ink-700 hover:text-terracotta-700 transition-colors font-medium"
                >
                  <Instagram className="w-4 h-4 text-terracotta-600" />
                  <span>Instagram</span>
                </a>

                <a
                  href={PROFILE_INFO.discord}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playClick(600)}
                  className="flex items-center gap-1.5 text-ink-700 hover:text-terracotta-700 transition-colors font-medium"
                >
                  <MessageSquare className="w-4 h-4 text-forest-600" />
                  <span>Discord</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
