"use client";

import React from "react";
import { EXPERIENCES } from "@/data/experience";
import { Briefcase, Trophy, Award, GraduationCap, Calendar, MapPin, CheckCircle2 } from "lucide-react";

export function ExperienceTimeline() {
  const iconMap = {
    "Work Experience": Briefcase,
    "Award": Trophy,
    "Certification": Award,
    "Education": GraduationCap,
  };

  return (
    <section id="journey" className="py-20 border-t border-paper-200/80 relative bg-[#F7F6F1]/60 backdrop-blur-[1px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="space-y-2 mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full clay-pill text-forest-800 text-xs font-mono font-bold shadow-clay-sm">
            <Trophy className="w-3.5 h-3.5 text-terracotta-600" />
            <span>JOURNEY & MILESTONES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink-950 tracking-tight">
            Industry Experience & Credentials
          </h2>
          <p className="text-ink-600 text-sm sm:text-base max-w-2xl font-sans">
            Practical engineering experience at Shree Laser Systems, 1st place championship at Vectors '26 Tech Arena, and formal machine learning specializations from Stanford & DeepLearning.AI.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative border-l-2 border-paper-300 ml-4 sm:ml-6 space-y-10 pl-6 sm:pl-10 text-left">
          {EXPERIENCES.map((item) => {
            const Icon = iconMap[item.type] || Award;
            return (
              <div key={item.id} className="relative group">
                {/* Timeline Pin */}
                <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 flex items-center justify-center w-8 h-8 rounded-full bg-forest-800 text-white group-hover:bg-terracotta-600 group-hover:scale-110 transition-all shadow-clay-sm">
                  <Icon className="w-4 h-4" />
                </div>

                {/* Card */}
                <div className="p-6 sm:p-7 rounded-3xl clay-card border border-white space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-lg sm:text-xl font-bold text-ink-950 group-hover:text-forest-800 transition-colors">
                          {item.role}
                        </span>
                        {item.badge && (
                          <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase rounded-full bg-terracotta-100/70 border border-terracotta-300 text-terracotta-800">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-semibold text-ink-700 mt-0.5">
                        {item.organization}
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end text-xs font-mono text-ink-500 space-y-1">
                      <div className="flex items-center gap-1.5 text-forest-700 font-semibold">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.period}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-ink-500">
                        <MapPin className="w-3.5 h-3.5 text-terracotta-600" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-ink-700 leading-relaxed font-sans">
                    {item.summary}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-paper-200">
                    {item.highlights.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink-700 font-sans">
                        <CheckCircle2 className="w-4 h-4 text-forest-600 mt-0.5 flex-shrink-0" />
                        <span className="leading-relaxed">{point}</span>
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
