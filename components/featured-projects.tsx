"use client";

import React, { useState, useRef } from "react";
import { PROJECTS, Project } from "@/data/projects";
import { Github, ArrowRight, Star, GitFork, Sparkles } from "lucide-react";
import { useSoundFX } from "@/hooks/use-sound-fx";

interface FeaturedProjectsProps {
  onSelectProject: (project: Project) => void;
}

function ProjectCard({ project, index, onSelect }: { project: Project; index: number; onSelect: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<string>("");
  const { playClick, playWarp } = useSoundFX();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`);
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: "transform 0.15s ease-out" }}
      className="group relative flex flex-col justify-between p-6 sm:p-7 clay-card shadow-clay-card hover:shadow-clay-card-hover text-left interactive-card"
    >
      <div className="space-y-4">
        {/* Top Tag & Stars */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold text-terracotta-700">
              [0{index + 1}]
            </span>
            <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider font-bold rounded-md bg-forest-100 text-forest-800">
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-ink-500">
            {project.stars !== undefined && (
              <span className="flex items-center gap-1 font-semibold text-terracotta-700">
                <Star className="w-3.5 h-3.5 fill-terracotta-500 text-terracotta-500" />
                {project.stars}
              </span>
            )}
            {project.forks !== undefined && (
              <span className="flex items-center gap-1">
                <GitFork className="w-3.5 h-3.5" />
                {project.forks}
              </span>
            )}
          </div>
        </div>

        {/* Title & Tagline */}
        <div>
          <h3 className="text-xl font-bold text-ink-950 group-hover:text-forest-800 transition-colors">
            {project.title}
          </h3>
          <p className="text-xs font-mono text-terracotta-700 font-semibold mt-1 line-clamp-1">
            {project.tagline}
          </p>
        </div>

        {/* Summary Description */}
        <p className="text-xs sm:text-sm text-ink-700 leading-relaxed line-clamp-3 font-sans">
          {project.summary}
        </p>

        {/* Metrics Chips Grid */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          {project.metrics.slice(0, 2).map((m, idx) => (
            <div
              key={idx}
              className="px-3 py-2 rounded-xl clay-inset"
            >
              <span className="block text-[10px] font-mono uppercase text-ink-500 font-semibold">
                {m.label}
              </span>
              <span className="block text-xs font-mono font-bold text-forest-800">
                {m.value}
              </span>
            </div>
          ))}
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.5 text-[11px] font-mono rounded-lg clay-pill text-ink-700 font-medium"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="px-1.5 py-0.5 text-[10px] font-mono rounded-lg clay-pill text-ink-500">
              +{project.stack.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="pt-6 mt-6 border-t border-paper-200 flex items-center justify-between gap-3">
        <button
          onClick={() => {
            playWarp();
            onSelect();
          }}
          className="flex items-center gap-1.5 text-xs font-bold text-terracotta-700 hover:text-terracotta-800 transition-colors group/btn"
        >
          <span>Deep-Dive Case Study</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
        </button>

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() => playClick(600)}
          className="p-2 text-ink-600 hover:text-ink-950 clay-pill transition-colors"
          title="View Source on GitHub"
        >
          <Github className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

export function FeaturedProjects({ onSelectProject }: FeaturedProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const { playPop } = useSoundFX();

  const categories = ["All", "Applied AI / ML", "Full-Stack System", "Cybersecurity & Forensics"];

  const filteredProjects =
    selectedCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 border-t border-paper-200 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full clay-pill text-forest-800 text-xs font-mono font-bold shadow-clay-sm">
              <Sparkles className="w-3.5 h-3.5 text-terracotta-600" />
              <span>PROJECTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink-950 tracking-tight">
              Featured Projects & Architectures
            </h2>
            <p className="text-ink-600 text-sm sm:text-base max-w-2xl font-sans">
              Production systems architected for high-concurrency data streams, strict regulatory compliance, and sub-second machine learning inference.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl clay-card shadow-clay-sm self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playPop();
                  setSelectedCategory(cat);
                }}
                className={`px-3 py-1.5 text-xs font-mono font-bold rounded-xl transition-all ${
                  selectedCategory === cat
                    ? "bg-forest-800 text-paper-50 shadow-sm"
                    : "text-ink-600 hover:text-ink-950"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Perspective Tilt Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onSelect={() => onSelectProject(project)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
