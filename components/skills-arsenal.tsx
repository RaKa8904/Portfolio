"use client";

import React, { useState } from "react";
import { SKILL_CATEGORIES } from "@/data/skills";
import { BrainCircuit, Server, Database, Layout, ShieldCheck, Cpu, Code2 } from "lucide-react";
import { useSoundFX } from "@/hooks/use-sound-fx";

export function SkillsArsenal() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const { playPop, playClick } = useSoundFX();

  const iconMap: Record<string, React.ElementType> = {
    BrainCircuit,
    Server,
    Database,
    Layout,
    ShieldCheck,
  };

  const categories = ["All", ...SKILL_CATEGORIES.map((c) => c.name)];

  const displayCategories =
    selectedCategory === "All"
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.name === selectedCategory);

  return (
    <section id="skills" className="py-20 border-t border-paper-200/80 relative bg-[#FAF8F5]/60 backdrop-blur-[1px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full clay-pill text-forest-800 text-xs font-mono font-bold shadow-clay-sm">
              <Code2 className="w-3.5 h-3.5 text-forest-700" />
              <span>SKILLS & TECH STACK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink-950 tracking-tight">
              Technical Skills & Arsenal
            </h2>
            <p className="text-ink-600 text-sm sm:text-base max-w-2xl font-sans">
              Engineered with modern languages, asynchronous runtimes, robust ACID datastores, and specialized machine learning frameworks.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl clay-pill shadow-clay-sm self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playPop();
                  setSelectedCategory(cat);
                }}
                className={`px-3 py-1.5 text-xs font-mono rounded-full transition-all ${
                  selectedCategory === cat
                    ? "bg-forest-800 text-white shadow-sm font-semibold"
                    : "text-ink-600 hover:text-ink-900"
                }`}
              >
                {cat === "All" ? "All Arsenal" : cat.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
          {displayCategories.map((cat) => {
            const Icon = iconMap[cat.iconName] || Cpu;
            return (
              <div
                key={cat.name}
                className="p-6 sm:p-7 rounded-3xl clay-card border border-white flex flex-col justify-between space-y-6"
              >
                <div>
                  <div className="flex items-center gap-3 pb-4 border-b border-paper-200">
                    <div className="p-2.5 rounded-2xl bg-forest-800 text-white shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-ink-950 tracking-tight">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-ink-500 mt-0.5 font-sans">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  {/* Skills List in Category */}
                  <div className="divide-y divide-paper-200/60 mt-4">
                    {cat.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-ink-900 font-mono">
                              {skill.name}
                            </span>
                            <span className="px-2 py-0.5 text-[10px] font-mono rounded-full clay-pill text-ink-600 border border-paper-200">
                              {skill.tag}
                            </span>
                          </div>
                          <p className="text-xs text-ink-600 leading-relaxed font-sans">
                            {skill.description}
                          </p>
                        </div>

                        <span
                          className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border self-start sm:self-center flex-shrink-0 font-semibold ${
                            skill.level === "Advanced"
                              ? "bg-forest-100/70 border-forest-300 text-forest-800"
                              : skill.level === "Proficient"
                              ? "bg-terracotta-100/60 border-terracotta-200 text-terracotta-800"
                              : "bg-paper-100 border-paper-200 text-ink-700"
                          }`}
                        >
                          {skill.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
