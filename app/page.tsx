"use client";

import React, { useState } from "react";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { CyberneticCoreBackground } from "@/components/cybernetic-core-background";
import { CustomCursor } from "@/components/custom-cursor";
import { FilmGrainOverlay } from "@/components/film-grain-overlay";
import { KineticMarqueeStrip } from "@/components/kinetic-text";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { AboutSection } from "@/components/about-section";
import { SkillsArsenal } from "@/components/skills-arsenal";
import { FeaturedProjects } from "@/components/featured-projects";
import { XFactorLab } from "@/components/x-factor-lab";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { TerminalHUD } from "@/components/terminal-hud";
import { CommandPalette } from "@/components/command-palette";
import { ProjectModal } from "@/components/project-modal";
import { Project } from "@/data/projects";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [terminalOpen, setTerminalOpen] = useState<boolean>(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);

  return (
    <SmoothScrollProvider>
      {/* Full-Screen 3D Cybernetic Crazy Core WebGL Background */}
      <CyberneticCoreBackground />

      {/* Tactile Magnetic Cursor Follower with Difference Inversion */}
      <CustomCursor />

      {/* Subtle Filmic Grain Texture Overlay */}
      <FilmGrainOverlay />

      <div className="relative min-h-screen text-ink-900 flex flex-col selection:bg-terracotta-100 selection:text-terracotta-800">
        {/* Airy, Decluttered Clay Floating Navbar */}
        <Navbar
          onOpenTerminal={() => setTerminalOpen(true)}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        />

        {/* Main Content Sections */}
        <main className="flex-1 flex flex-col relative z-10">
          {/* Hero Section */}
          <Hero onOpenTerminal={() => setTerminalOpen(true)} />

          {/* Kinetic Horizontal Marquee Strip */}
          <KineticMarqueeStrip />

          {/* 1. ABOUT: Profile, Interests & Metric Cards (Exact Reference Design) */}
          <AboutSection />

          {/* 2. SKILLS: Technical Arsenal & Tooling */}
          <SkillsArsenal />

          {/* 3. PROJECTS: Featured Case Studies & Architectures (No FIDS Board) */}
          <FeaturedProjects onSelectProject={(p) => setSelectedProject(p)} />

          {/* 4. APPLIED ML SANDBOX: Interactive Machine Learning Playground */}
          <XFactorLab />

          {/* 5. JOURNEY: Track Record, Stanford ML Specialization & Education */}
          <ExperienceTimeline />

          {/* 6. CONTACT: Direct Channels, Instagram, & Live Mumbai World Clock */}
          <ContactSection />
        </main>

        {/* Minimalist Editorial Paper Footer */}
        <Footer />

        {/* Interactive Modals & Overlays */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

        <TerminalHUD
          isOpen={terminalOpen}
          onClose={() => setTerminalOpen(false)}
        />

        <CommandPalette
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
          onSelectProject={(p) => setSelectedProject(p)}
          onOpenTerminal={() => setTerminalOpen(true)}
        />
      </div>
    </SmoothScrollProvider>
  );
}


