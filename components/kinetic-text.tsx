"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollUniformStore } from "@/components/smooth-scroll-provider";

gsap.registerPlugin(ScrollTrigger);

interface KineticRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

/**
 * Editorial Text Line Unmasker
 * Wraps content in an overflow:hidden container and reveals via GSAP yPercent from 100 to 0
 */
export function KineticReveal({
  children,
  delay = 0,
  duration = 1.1,
  className = "",
}: KineticRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !innerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        innerRef.current,
        {
          yPercent: 110,
          opacity: 0,
          rotateX: 12,
        },
        {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          duration,
          delay,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [delay, duration]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden perspective-1000 ${className}`}
      style={{ overflow: "hidden" }}
    >
      <div ref={innerRef} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}

/**
 * Infinite Horizontal Marquee Strip
 * Automatically scrolls and accelerates with user scroll velocity
 */
export function KineticMarqueeStrip({
  items = [
    "APPLIED MACHINE LEARNING",
    "DISTRIBUTED MICROSERVICES",
    "WIRE-SPEED PCAP FORENSICS",
    "DGCA PART 117 COMPLIANCE",
    "RANDOM FOREST CIRCARDIAN ENGINES",
    "CLICKHOUSE COLUMNAR OLAP",
    "ACID TRANSACTIONAL INTEGRITY",
  ],
  reverse = false,
}: {
  items?: string[];
  reverse?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    const track = trackRef.current;

    let progress = 0;
    let animId: number;

    const loop = () => {
      // Base drift speed plus scroll velocity boost
      const vel = Math.abs(scrollUniformStore.velocity) * 0.0004;
      const speed = (0.04 + vel) * (reverse ? -1 : 1);
      progress += speed;

      if (progress >= 50) progress = 0;
      if (progress <= 0 && reverse) progress = 50;

      track.style.transform = `translate3d(${-progress}%, 0, 0)`;
      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => cancelAnimationFrame(animId);
  }, [reverse]);

  return (
    <div className="w-full overflow-hidden py-4 border-y border-paper-300/80 bg-[#FAF8F5]/60 backdrop-blur-sm select-none">
      <div
        ref={trackRef}
        className="flex whitespace-nowrap will-change-transform text-xs font-mono font-bold tracking-widest text-ink-700"
      >
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-6 mx-4">
            <span className="text-forest-800 font-extrabold">{item}</span>
            <span className="text-terracotta-600 text-[10px]">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
