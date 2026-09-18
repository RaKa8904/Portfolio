"use client";

import React, { useEffect, createContext, useContext, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollContextType {
  lenis: Lenis | null;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({ lenis: null });

export const useSmoothScroll = () => useContext(SmoothScrollContext);

// Global reactive store for WebGL background uniforms
export const scrollUniformStore = {
  velocity: 0,
  progress: 0,
  current: 0,
};

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // 2. Synchronize Lenis scroll events with GSAP ScrollTrigger & WebGL store
    lenis.on("scroll", (e: any) => {
      ScrollTrigger.update();

      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScroll > 0 ? e.scroll / totalScroll : 0;

      scrollUniformStore.velocity = e.velocity || 0;
      scrollUniformStore.progress = Math.min(1, Math.max(0, progress));
      scrollUniformStore.current = e.scroll;

      // Broadcast custom event for decoupled subscribers like WebGL shaders
      window.dispatchEvent(
        new CustomEvent("lenis-scroll", {
          detail: {
            velocity: e.velocity || 0,
            progress: scrollUniformStore.progress,
            scroll: e.scroll,
          },
        })
      );
    });

    // 3. Bind GSAP Ticker to Lenis RAF loop for 60fps jitter-free synchronization
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // 4. Anchor scroll helper for internal hash links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor && anchor.hash && anchor.origin === window.location.origin) {
        const el = document.querySelector(anchor.hash);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el as HTMLElement, { offset: -60, duration: 1.2 });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
