"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Command, ArrowRight, Github, Linkedin, Terminal, Layers, Cpu, Check, Copy } from "lucide-react";
import { PROJECTS, Project } from "@/data/projects";
import { PROFILE_INFO } from "@/data/experience";
import { useSoundFX } from "@/hooks/use-sound-fx";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  onOpenTerminal: () => void;
}

export function CommandPalette({ isOpen, onClose, onSelectProject, onOpenTerminal }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { playClick, playChime } = useSoundFX();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    playChime();
    navigator.clipboard.writeText(PROFILE_INFO.email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      onClose();
    }, 1200);
  };

  const defaultActions = [
    {
      id: "projects",
      title: "Explore Featured Systems & FIDS Board",
      category: "Navigation",
      icon: Layers,
      action: () => {
        playClick(800);
        window.location.hash = "projects";
        onClose();
      },
    },
    {
      id: "xfactor",
      title: "Launch Flight Duty & Fatigue Risk Sandbox",
      category: "Interactive X-Factor",
      icon: Cpu,
      action: () => {
        playClick(800);
        window.location.hash = "x-factor";
        onClose();
      },
    },
    {
      id: "skills",
      title: "Explore Technical Arsenal & Tooling",
      category: "Capabilities",
      icon: Layers,
      action: () => {
        playClick(800);
        window.location.hash = "skills";
        onClose();
      },
    },
    {
      id: "terminal",
      title: "Launch RaKa-OS Developer CLI HUD",
      category: "Tooling",
      icon: Terminal,
      action: () => {
        playClick(900);
        onClose();
        onOpenTerminal();
      },
    },
    {
      id: "copy-email",
      title: copied ? "Email Copied to Clipboard!" : `Copy Email: ${PROFILE_INFO.email}`,
      category: "Contact",
      icon: copied ? Check : Copy,
      action: handleCopyEmail,
    },
    {
      id: "github",
      title: "Visit GitHub Profile (RaKa8904)",
      category: "External",
      icon: Github,
      action: () => {
        playClick(600);
        window.open(PROFILE_INFO.github, "_blank");
        onClose();
      },
    },
    {
      id: "linkedin",
      title: "Connect on LinkedIn",
      category: "External",
      icon: Linkedin,
      action: () => {
        playClick(600);
        window.open(PROFILE_INFO.linkedin, "_blank");
        onClose();
      },
    },
  ];

  const filteredProjects = PROJECTS.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.stack.some((s) => s.toLowerCase().includes(query.toLowerCase())) ||
      p.tagline.toLowerCase().includes(query.toLowerCase())
  );

  const filteredActions = defaultActions.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 backdrop-blur-md bg-ink-950/40 animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl clay-card bg-paper-50 border border-white rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col">
        {/* Search Input */}
        <div className="p-4 border-b border-paper-200 flex items-center gap-3 bg-paper-100/70">
          <Search className="w-5 h-5 text-forest-700 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, architectures, or commands..."
            className="w-full bg-transparent text-sm text-ink-950 placeholder:text-ink-400 focus:outline-none font-sans"
          />
          <kbd className="hidden sm:inline-block px-2.5 py-0.5 text-[10px] font-mono rounded-lg bg-paper-200 text-ink-600 border border-paper-300">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 divide-y divide-paper-200/60 space-y-1">
          {filteredProjects.length > 0 && (
            <div className="pb-2 text-left">
              <span className="px-3 py-1 block text-[10px] font-mono uppercase text-terracotta-700 font-bold">
                Case Studies
              </span>
              {filteredProjects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    playClick(800);
                    onClose();
                    onSelectProject(p);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-paper-100/80 text-left transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-forest-100 text-forest-800 border border-forest-200">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-ink-950 group-hover:text-forest-800 transition-colors">
                        {p.title}
                      </div>
                      <div className="text-[11px] text-ink-500 line-clamp-1 font-mono">
                        {p.tagline}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-terracotta-600 group-hover:text-terracotta-700 font-semibold">
                    Open Case Study →
                  </span>
                </button>
              ))}
            </div>
          )}

          <div className="pt-2 text-left">
            <span className="px-3 py-1 block text-[10px] font-mono uppercase text-ink-500 font-bold">
              Commands & Links
            </span>
            {filteredActions.map((a) => {
              const Icon = a.icon;
              return (
                <button
                  key={a.id}
                  onClick={a.action}
                  className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-paper-100/80 text-left transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-paper-200/80 text-ink-700 group-hover:text-forest-800">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-ink-800 group-hover:text-ink-950">
                        {a.title}
                      </div>
                      <div className="text-[10px] text-ink-500 font-mono">
                        {a.category}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-ink-400 group-hover:text-forest-700 group-hover:translate-x-0.5 transition-all" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
