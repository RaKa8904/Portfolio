"use client";

import React, { useState, useEffect } from "react";
import { Project } from "@/data/projects";
import { X, ExternalLink, Github, Layers, ShieldCheck, BrainCircuit, Activity, CheckCircle2 } from "lucide-react";
import { useSoundFX } from "@/hooks/use-sound-fx";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<"architecture" | "ml" | "security" | "problem">("architecture");
  const { playClick } = useSoundFX();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto backdrop-blur-md bg-ink-950/40 animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl clay-card bg-paper-50 border border-white rounded-3xl shadow-2xl overflow-hidden z-10 my-auto flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-paper-200 flex items-start justify-between bg-paper-100/80">
          <div className="space-y-1 text-left">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold rounded-full bg-forest-100 text-forest-800">
                {project.category}
              </span>
              <span className="text-xs font-mono text-ink-500">Case Study Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink-950 tracking-tight">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-terracotta-700 font-mono font-semibold">
              {project.tagline}
            </p>
          </div>

          <button
            onClick={() => {
              playClick(500);
              onClose();
            }}
            className="p-2 text-ink-600 hover:text-ink-950 clay-pill rounded-full transition-all"
            aria-label="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-paper-200 bg-paper-100/40 overflow-x-auto">
          <button
            onClick={() => {
              playClick(750);
              setActiveTab("architecture");
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-b-2 ${
              activeTab === "architecture"
                ? "border-forest-800 text-forest-800 bg-white"
                : "border-transparent text-ink-500 hover:text-ink-900"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Architecture & Flow</span>
          </button>

          <button
            onClick={() => {
              playClick(750);
              setActiveTab("problem");
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-b-2 ${
              activeTab === "problem"
                ? "border-forest-800 text-forest-800 bg-white"
                : "border-transparent text-ink-500 hover:text-ink-900"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Problem & Scale</span>
          </button>

          {project.caseStudy.mlPipeline && (
            <button
              onClick={() => {
                playClick(750);
                setActiveTab("ml");
              }}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-b-2 ${
                activeTab === "ml"
                  ? "border-terracotta-700 text-terracotta-700 bg-white"
                  : "border-transparent text-ink-500 hover:text-ink-900"
              }`}
            >
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>Applied ML Pipeline</span>
            </button>
          )}

          <button
            onClick={() => {
              playClick(750);
              setActiveTab("security");
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-b-2 ${
              activeTab === "security"
                ? "border-forest-800 text-forest-800 bg-white"
                : "border-transparent text-ink-500 hover:text-ink-900"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Security & Hardening</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-left">
          {activeTab === "architecture" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl clay-inset">
                <h4 className="text-xs font-mono uppercase tracking-wider text-forest-800 mb-2 font-bold">
                  Technical Architecture Overview
                </h4>
                <p className="text-ink-800 leading-relaxed font-sans">
                  {project.caseStudy.architecture.summary}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-ink-500 mb-3 font-bold">
                  Data Pipeline & Component Nodes
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {project.caseStudy.architecture.diagramNodes.map((node) => (
                    <div
                      key={node.step}
                      className="flex items-start gap-4 p-4 rounded-xl clay-card border border-white"
                    >
                      <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-forest-800 text-paper-50">
                        {node.step}
                      </span>
                      <div>
                        <div className="font-bold text-ink-950 text-sm">{node.title}</div>
                        <div className="text-ink-600 text-xs mt-0.5 leading-relaxed font-sans">{node.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-ink-500 mb-2 font-bold">
                  Core Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 text-xs font-mono rounded-lg clay-pill text-ink-700 font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "problem" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl clay-inset">
                <h4 className="text-xs font-mono uppercase tracking-wider text-terracotta-700 mb-2 font-bold">
                  The Real-World Problem
                </h4>
                <p className="text-ink-800 leading-relaxed font-sans">
                  {project.caseStudy.problem}
                </p>
              </div>

              <div className="p-4 rounded-2xl clay-inset">
                <h4 className="text-xs font-mono uppercase tracking-wider text-forest-800 mb-2 font-bold">
                  Scale & Distributed Challenge
                </h4>
                <p className="text-ink-800 leading-relaxed font-sans">
                  {project.caseStudy.scaleChallenge}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-forest-800 mb-3 font-bold">
                  Engineered Outcomes & Impact
                </h4>
                <div className="space-y-2">
                  {project.caseStudy.outcomes.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-ink-800 text-xs sm:text-sm font-sans">
                      <CheckCircle2 className="w-4 h-4 text-forest-700 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "ml" && project.caseStudy.mlPipeline && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl clay-inset">
                  <span className="text-xs font-mono text-ink-500 uppercase tracking-wider font-semibold">Model Architecture</span>
                  <div className="text-sm font-bold text-forest-800 mt-1">
                    {project.caseStudy.mlPipeline.modelType}
                  </div>
                </div>

                <div className="p-4 rounded-2xl clay-inset">
                  <span className="text-xs font-mono text-ink-500 uppercase tracking-wider font-semibold">Inference Latency Budget</span>
                  <div className="text-sm font-bold text-terracotta-700 mt-1">
                    {project.caseStudy.mlPipeline.inferenceTime}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl clay-inset">
                <h4 className="text-xs font-mono uppercase tracking-wider text-ink-500 mb-2 font-bold">
                  Feature Vectors & Dimensionality
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.caseStudy.mlPipeline.features.map((feat) => (
                    <span
                      key={feat}
                      className="px-2.5 py-1 text-xs font-mono rounded-lg clay-pill text-ink-700 font-medium"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl clay-inset">
                <h4 className="text-xs font-mono uppercase tracking-wider text-ink-500 mb-2 font-bold">
                  Weighting Strategy & Model Tuning
                </h4>
                <p className="text-ink-800 leading-relaxed font-sans">
                  {project.caseStudy.mlPipeline.weightsOrStrategy}
                </p>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl clay-inset">
                <h4 className="text-xs font-mono uppercase tracking-wider text-forest-800 mb-2 font-bold">
                  Hardened Security Architecture
                </h4>
                <div className="space-y-3 mt-3">
                  {project.caseStudy.securityAndHardening.map((sec, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-white shadow-sm">
                      <ShieldCheck className="w-4 h-4 text-forest-700 mt-0.5 flex-shrink-0" />
                      <span className="text-ink-800 text-xs sm:text-sm leading-relaxed font-sans">{sec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-paper-200 bg-paper-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-xs font-mono text-ink-500">
            {project.stars !== undefined && (
              <span>★ {project.stars} GitHub Stars</span>
            )}
            {project.forks !== undefined && (
              <span>⑂ {project.forks} Forks</span>
            )}
          </div>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="clay-pill px-4 py-2 text-xs font-mono font-bold text-ink-800 hover:text-forest-800 flex items-center gap-2 shadow-clay-sm"
          >
            <Github className="w-3.5 h-3.5" />
            <span>Inspect Source Code</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
        </div>
      </div>
    </div>
  );
}
