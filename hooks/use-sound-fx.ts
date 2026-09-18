"use client";

import { useState, useEffect, useCallback } from "react";

// Web Audio API Procedural Synthesizer (Zero external audio assets, zero latency)
class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false; // Default unmuted so interactive sounds are heard

  constructor() {
    if (typeof window !== "undefined") {
      const storedMute = localStorage.getItem("rsharma_sound_muted");
      this.isMuted = storedMute !== null ? storedMute === "true" : false;
    }
  }

  private initCtx(): AudioContext | null {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (typeof window !== "undefined") {
      localStorage.setItem("rsharma_sound_muted", String(muted));
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // 1. Tactile Mechanical Click
  public playClick(freq: number = 800) {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.045);
    } catch {}
  }

  // 2. Mario Kart Item Box & Boost Fanfare
  public playMarioKart() {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;

      const now = ctx.currentTime;
      // Iconic Mario Kart ascending arpeggio (C5 -> E5 -> G5 -> C6 -> D6 -> G6)
      const notes = [
        { freq: 523.25, time: 0.00, dur: 0.06 }, // C5
        { freq: 659.25, time: 0.06, dur: 0.06 }, // E5
        { freq: 783.99, time: 0.12, dur: 0.06 }, // G5
        { freq: 1046.50, time: 0.18, dur: 0.07 }, // C6
        { freq: 1174.66, time: 0.25, dur: 0.07 }, // D6
        { freq: 1567.98, time: 0.32, dur: 0.24 }, // G6 triumphant
      ];

      notes.forEach((n) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "square";
        osc.frequency.setValueAtTime(n.freq, now + n.time);

        gain.gain.setValueAtTime(0.001, now + n.time);
        gain.gain.linearRampToValueAtTime(0.08, now + n.time + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, now + n.time + n.dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + n.time);
        osc.stop(now + n.time + n.dur + 0.01);
      });

      // Resonant harmonic support chord (C6 + E6 + G6) at completion
      const triadTime = now + 0.32;
      [1046.50, 1318.51, 1567.98].forEach((f) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(f, triadTime);

        gain.gain.setValueAtTime(0.06, triadTime);
        gain.gain.exponentialRampToValueAtTime(0.001, triadTime + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(triadTime);
        osc.stop(triadTime + 0.36);
      });
    } catch {}
  }

  // 3. Soft Organic Pop (for category pills, tags, interests)
  public playPop() {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(650, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(240, ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.065);
    } catch {}
  }

  // 4. Sci-Fi Futuristic Warp / Whoosh (for Project Deep-Dives)
  public playWarp() {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.045, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    } catch {}
  }

  // 5. Crystal Chime Triad (for Email Copied and Confirmations)
  public playChime() {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;

      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 major triad
      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.06);

        gain.gain.setValueAtTime(0.07, ctx.currentTime + index * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.06 + 0.28);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + index * 0.06);
        osc.stop(ctx.currentTime + index * 0.06 + 0.29);
      });
    } catch {}
  }

  // 6. Mechanical Keyboard Clack (for typing in Terminal HUD)
  public playTerminalKey() {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(1200 + Math.random() * 250, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.022);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.022);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.025);
    } catch {}
  }

  // 7. Tactile Toggle Switch (for Sound Mute toggle)
  public playSwitch() {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(950, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.055);
    } catch {}
  }

  // 8. Slider Notch Tick
  public playTick() {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "square";
      osc.frequency.setValueAtTime(440, ctx.currentTime);

      gain.gain.setValueAtTime(0.025, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.02);
    } catch {}
  }
}

const soundInstance = new SoundEngine();

export function useSoundFX() {
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsMuted(soundInstance.getMuted());
  }, []);

  const toggleSound = useCallback(() => {
    const nextState = !isMuted;
    soundInstance.setMuted(nextState);
    setIsMuted(nextState);
    if (!nextState) {
      soundInstance.playChime();
    }
  }, [isMuted]);

  return {
    isMuted,
    toggleSound,
    playClick: (freq?: number) => soundInstance.playClick(freq),
    playMarioKart: () => soundInstance.playMarioKart(),
    playPop: () => soundInstance.playPop(),
    playWarp: () => soundInstance.playWarp(),
    playChime: () => soundInstance.playChime(),
    playTerminalKey: () => soundInstance.playTerminalKey(),
    playSwitch: () => soundInstance.playSwitch(),
    playTick: () => soundInstance.playTick(),
  };
}
