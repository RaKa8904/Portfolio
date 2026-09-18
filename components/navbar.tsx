"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Volume2, VolumeX, ArrowUpRight, Menu, X, Code2, Terminal } from "lucide-react";
import { useSoundFX } from "@/hooks/use-sound-fx";
import { PROFILE_INFO } from "@/data/experience";

interface NavbarProps {
  onOpenTerminal: () => void;
  onOpenCommandPalette: () => void;
}

export function Navbar({ onOpenTerminal, onOpenCommandPalette }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isMuted, toggleSound, playClick, playMarioKart, playPop, playSwitch } = useSoundFX();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 5 navigation links matching reference layout
  const navLinks = [
    { name: "ABOUT", href: "#about" },
    { name: "SKILLS", href: "#skills" },
    { name: "PROJECTS", href: "#projects" },
    { name: "JOURNEY", href: "#journey" },
    { name: "CONTACT", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#F7F6F1]/90 backdrop-blur-md py-3 shadow-sm border-b border-paper-200/60"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Left: RaKa Tech Brand Mark */}
        <Link
          href="#"
          onClick={() => playClick(800)}
          className="group flex items-center gap-2.5 text-ink-900 transition-colors"
        >
          {/* Logo badge with geometric code emblem */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-ink-950 text-white font-mono font-black text-sm shadow-clay-btn group-hover:scale-105 transition-transform border border-ink-800">
            <Code2 className="w-4 h-4 text-terracotta-400" />
            <span className="tracking-tight">RaKa.</span>
          </div>
        </Link>

        {/* Center: Airy, Floating Neumorphic Pill Navbar */}
        <nav className="hidden md:flex items-center gap-1 clay-pill px-4 py-1.5 shadow-clay-sm border border-paper-200/80">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => playPop()}
              className="px-3 py-1 text-xs font-mono font-bold text-ink-700 hover:text-forest-800 rounded-full transition-all duration-200 tracking-wider"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right: RaKa-OS CLI + Sound Toggle + HIRE ME CTA */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* RaKa-OS CLI Button with Website Orange/Terracotta Color & Mario Kart Sound */}
          <button
            onClick={() => {
              playMarioKart();
              onOpenTerminal();
            }}
            className="px-3.5 py-1.5 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white shadow-clay-btn text-xs font-mono font-bold flex items-center gap-1.5 transition-all active:scale-95 border border-terracotta-700 hover:shadow-md cursor-pointer"
            title="Launch RaKa-OS Developer CLI (Cmd/Ctrl + K)"
          >
            <Terminal className="w-3.5 h-3.5 text-white" />
            <span>RaKa-OS CLI</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={() => {
              playSwitch();
              toggleSound();
            }}
            className="p-2 rounded-full text-ink-500 hover:text-ink-900 clay-pill shadow-clay-sm transition-transform active:scale-95 cursor-pointer"
            title={isMuted ? "Unmute Sound FX" : "Mute Sound FX"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-ink-400" /> : <Volume2 className="w-3.5 h-3.5 text-forest-700" />}
          </button>

          {/* HIRE ME Button (High-Contrast Neubrutalist/Clay with Instagram link) */}
          <a
            href={PROFILE_INFO.instagram}
            target="_blank"
            rel="noreferrer"
            onClick={() => playClick(850)}
            className="px-5 py-2 rounded-xl bg-ink-950 hover:bg-forest-900 text-white text-xs font-mono font-black tracking-wider uppercase shadow-md transition-all active:scale-95 hover:shadow-lg flex items-center gap-1.5 cursor-pointer"
          >
            <span>HIRE ME</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-terracotta-400" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => {
              playMarioKart();
              onOpenTerminal();
            }}
            className="p-2 rounded-xl bg-terracotta-600 text-white shadow-sm cursor-pointer"
            title="Launch RaKa-OS CLI"
          >
            <Terminal className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={() => {
              playSwitch();
              toggleSound();
            }}
            className="p-2 rounded-full clay-pill text-ink-500 cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-forest-700" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl clay-pill text-ink-800"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-5 bg-paper-50/95 backdrop-blur-xl border-b border-paper-200 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-2 text-left">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  playClick(650);
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-2.5 text-sm font-mono font-bold text-ink-800 hover:bg-paper-200/60 rounded-xl"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-paper-200">
              <a
                href={PROFILE_INFO.instagram}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  playClick(850);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-ink-950 text-white text-center text-xs font-mono font-bold block"
              >
                HIRE ME ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
