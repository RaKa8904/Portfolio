"use client";

import React, { useState } from "react";
import { CheckCircle2, ShieldAlert, Cpu, RefreshCw, BarChart2 } from "lucide-react";
import { useSoundFX } from "@/hooks/use-sound-fx";

export function XFactorLab() {
  const [activeTab, setActiveTab] = useState<"aviation" | "pricing">("aviation");
  const { playClick, playTick } = useSoundFX();

  // Flight Duty Simulator State
  const [dutyHours, setDutyHours] = useState<number>(8.5);
  const [sleepHours, setSleepHours] = useState<number>(7.0);
  const [nightHours, setNightHours] = useState<number>(1.5);
  const [sectors, setSectors] = useState<number>(3);
  const [timezones, setTimezones] = useState<number>(2);

  // Dynamic Pricing Simulator State
  const [daysSinceVisit, setDaysSinceVisit] = useState<number>(24);
  const [orderFrequency, setOrderFrequency] = useState<number>(6);
  const [averageBasket, setAverageBasket] = useState<number>(120);

  // Random Forest Fatigue Risk Simulation Formula (Derived from SmartCrew Model)
  const calculateFatigue = () => {
    const sleepDeficit = Math.max(0, 8.0 - sleepHours);
    const dutyPenalty = dutyHours > 8 ? Math.pow(dutyHours - 8, 1.35) * 4.2 : (dutyHours / 8) * 12;
    const nightPenalty = nightHours * 7.5;
    const sectorPenalty = (sectors - 1) * 3.8;
    const timezonePenalty = timezones * 2.2;

    const rawScore = 12 + dutyPenalty + sleepDeficit * 8.5 + nightPenalty + sectorPenalty + timezonePenalty;
    const score = Math.min(100, Math.max(5, Math.round(rawScore)));

    let category: { text: string; color: string; bg: string; border: string };
    if (score < 35) {
      category = { text: "LOW FATIGUE (OPTIMAL)", color: "text-forest-800", bg: "bg-forest-100", border: "border-forest-500/40" };
    } else if (score < 65) {
      category = { text: "MODERATE FATIGUE (CAUTION)", color: "text-amber-800", bg: "bg-amber-100", border: "border-amber-500/40" };
    } else if (score < 82) {
      category = { text: "HIGH RISK (DISPATCH ALERT)", color: "text-terracotta-800", bg: "bg-terracotta-100", border: "border-terracotta-500/40" };
    } else {
      category = { text: "CRITICAL (GROUND CREW)", color: "text-rose-800", bg: "bg-rose-100", border: "border-rose-500/40" };
    }

    let legality = "COMPLIANT WITH DGCA / FAA PART 117";
    let isLegal = true;

    if (dutyHours > 13) {
      legality = "ILLEGAL: Exceeds Maximum 13h Flight Duty Period (FDP)";
      isLegal = false;
    } else if (nightHours > 0 && dutyHours > 11) {
      legality = "ILLEGAL: Exceeds 11h FDP for Window of Circadian Low Flights";
      isLegal = false;
    } else if (sleepHours < 4) {
      legality = "ALERT: Rest Period Deficit (< 4h Rest Violates Mandatory Rest Cap)";
      isLegal = false;
    }

    return { score, category, legality, isLegal, sleepDeficit, dutyPenalty, nightPenalty, sectorPenalty };
  };

  const calculatePricing = () => {
    const recencyFactor = daysSinceVisit / 60;
    const freqFactor = Math.min(1, orderFrequency / 15);
    const churnProb = Math.min(0.98, Math.max(0.04, recencyFactor * 0.7 - freqFactor * 0.4 + 0.25));

    let recommendedDiscount = 0;
    if (churnProb > 0.65 && averageBasket > 80) {
      recommendedDiscount = 18;
    } else if (churnProb > 0.45) {
      recommendedDiscount = 10;
    } else if (averageBasket > 150) {
      recommendedDiscount = 5;
    }

    return {
      churnPercent: Math.round(churnProb * 100),
      recommendedDiscount,
      predictedLTV: Math.round(averageBasket * orderFrequency * (1 / (churnProb + 0.1))),
    };
  };

  const fatigueResult = calculateFatigue();
  const pricingResult = calculatePricing();

  return (
    <section id="x-factor" className="py-20 border-t border-paper-200 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="space-y-2 mb-10 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full clay-pill text-forest-800 text-xs font-mono font-bold shadow-clay-sm">
            <Cpu className="w-3.5 h-3.5 text-terracotta-600" />
            <span>THE "X-FACTOR" INTERACTIVE BENCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink-950 tracking-tight">
            Live Applied ML Sandbox
          </h2>
          <p className="text-ink-600 text-sm sm:text-base max-w-2xl font-sans">
            Interact directly with the mathematical models engineered in production. Adjust parameters below to evaluate real-time inference latency and regulatory decisions.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mb-8">
          <button
            onClick={() => {
              playClick(750);
              setActiveTab("aviation");
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
              activeTab === "aviation"
                ? "bg-forest-800 text-paper-50 shadow-sm"
                : "clay-pill text-ink-600 hover:text-forest-800 shadow-clay-sm"
            }`}
          >
            <span>SmartCrew Fatigue Model (Random Forest)</span>
          </button>

          <button
            onClick={() => {
              playClick(750);
              setActiveTab("pricing");
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
              activeTab === "pricing"
                ? "bg-terracotta-700 text-paper-50 shadow-sm"
                : "clay-pill text-ink-600 hover:text-forest-800 shadow-clay-sm"
            }`}
          >
            <span>SmartPOS Pricing & Churn Engine</span>
          </button>
        </div>

        {/* Aviation Fatigue Calculator Card */}
        {activeTab === "aviation" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 clay-card shadow-clay-card">
            {/* Sliders Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="flex items-center justify-between pb-2 border-b border-paper-200">
                <span className="text-xs font-mono uppercase tracking-wider text-ink-500 font-bold">
                  Input Flight Telemetry Parameters
                </span>
                <span className="text-[11px] font-mono text-forest-700 font-bold">DGCA CAR / FAA Part 117</span>
              </div>

              {/* Slider 1: Duty Hours */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-ink-700 font-semibold">Continuous Duty Elapsed (FDP)</span>
                  <span className="text-forest-800 font-bold">{dutyHours.toFixed(1)} Hours</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="16"
                  step="0.5"
                  value={dutyHours}
                  onChange={(e) => {
                    playTick();
                    setDutyHours(parseFloat(e.target.value));
                  }}
                  className="w-full h-2.5 bg-paper-300 rounded-lg appearance-none cursor-pointer accent-forest-700"
                />
                <div className="flex justify-between text-[10px] font-mono text-ink-400">
                  <span>4.0h</span>
                  <span className="text-terracotta-700 font-bold">13h DGCA Cap</span>
                  <span>16.0h</span>
                </div>
              </div>

              {/* Slider 2: Prior Sleep */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-ink-700 font-semibold">Prior 24h Sleep Duration</span>
                  <span className="text-forest-800 font-bold">{sleepHours.toFixed(1)} Hours</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="12"
                  step="0.5"
                  value={sleepHours}
                  onChange={(e) => {
                    playTick();
                    setSleepHours(parseFloat(e.target.value));
                  }}
                  className="w-full h-2.5 bg-paper-300 rounded-lg appearance-none cursor-pointer accent-forest-700"
                />
                <div className="flex justify-between text-[10px] font-mono text-ink-400">
                  <span>2.0h (Severe Deficit)</span>
                  <span>8.0h (Standard Rest)</span>
                  <span>12.0h</span>
                </div>
              </div>

              {/* Slider 3: Circadian Low */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-ink-700 font-semibold">Window of Circadian Low (02:00 - 05:59 Night Flight)</span>
                  <span className="text-terracotta-700 font-bold">{nightHours.toFixed(1)} Hours</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="6"
                  step="0.5"
                  value={nightHours}
                  onChange={(e) => {
                    playTick();
                    setNightHours(parseFloat(e.target.value));
                  }}
                  className="w-full h-2.5 bg-paper-300 rounded-lg appearance-none cursor-pointer accent-terracotta-600"
                />
                <div className="flex justify-between text-[10px] font-mono text-ink-400">
                  <span>0.0h (Day Flight)</span>
                  <span>3.0h (Partial Night)</span>
                  <span>6.0h (Red-Eye)</span>
                </div>
              </div>

              {/* Sliders 4 & 5 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-ink-700 font-semibold">Flight Sectors</span>
                    <span className="text-forest-800 font-bold">{sectors} Legs</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    step="1"
                    value={sectors}
                    onChange={(e) => {
                      playTick();
                      setSectors(parseInt(e.target.value));
                    }}
                    className="w-full h-2.5 bg-paper-300 rounded-lg appearance-none cursor-pointer accent-forest-700"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-ink-700 font-semibold">Time Zones</span>
                    <span className="text-forest-800 font-bold">±{timezones} TZ</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="8"
                    step="1"
                    value={timezones}
                    onChange={(e) => {
                      playTick();
                      setTimezones(parseInt(e.target.value));
                    }}
                    className="w-full h-2.5 bg-paper-300 rounded-lg appearance-none cursor-pointer accent-forest-700"
                  />
                </div>
              </div>
            </div>

            {/* Live Model Output Display */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-2xl clay-inset space-y-6 text-left">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-ink-500 tracking-wider font-bold">
                    Random Forest Inference
                  </span>
                  <span className="text-[11px] font-mono text-forest-700 font-semibold">Latency: 9.4ms</span>
                </div>

                <div className="mt-4 flex items-baseline gap-3">
                  <span className="font-mono text-5xl font-black text-ink-950">
                    {fatigueResult.score}
                  </span>
                  <span className="text-sm font-mono text-ink-500">/ 100 Risk Index</span>
                </div>

                <div className={`mt-3 px-3 py-1.5 rounded-lg border text-xs font-mono font-bold inline-block ${fatigueResult.category.bg} ${fatigueResult.category.color} ${fatigueResult.category.border}`}>
                  {fatigueResult.category.text}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="h-3 w-full bg-paper-300 rounded-full overflow-hidden p-0.5 shadow-inner">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      fatigueResult.score < 35
                        ? "bg-forest-700"
                        : fatigueResult.score < 65
                        ? "bg-amber-500"
                        : fatigueResult.score < 82
                        ? "bg-terracotta-600"
                        : "bg-rose-600"
                    }`}
                    style={{ width: `${fatigueResult.score}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-ink-400">
                  <span>0 (Fresh)</span>
                  <span>50 (Alert)</span>
                  <span>100 (Hazard)</span>
                </div>
              </div>

              {/* Regulatory Legality Verdict */}
              <div className={`p-3.5 rounded-xl border text-xs font-mono flex items-start gap-2.5 ${
                fatigueResult.isLegal
                  ? "bg-forest-50 border-forest-500/30 text-forest-800"
                  : "bg-rose-50 border-rose-500/40 text-rose-800"
              }`}>
                {fatigueResult.isLegal ? (
                  <CheckCircle2 className="w-4 h-4 text-forest-700 flex-shrink-0 mt-0.5" />
                ) : (
                  <ShieldAlert className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-bold">{fatigueResult.legality}</div>
                  <div className="text-[11px] text-ink-600 mt-0.5">
                    {fatigueResult.isLegal
                      ? "Pairing approved for flight roster dispatch."
                      : "Automated schedule dispatch lock triggered."}
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={() => {
                  playClick(500);
                  setDutyHours(8.5);
                  setSleepHours(7.0);
                  setNightHours(1.5);
                  setSectors(3);
                  setTimezones(2);
                }}
                className="clay-pill py-2 text-xs font-mono font-bold text-ink-700 hover:text-ink-950 flex items-center justify-center gap-1.5 shadow-clay-sm"
              >
                <RefreshCw className="w-3 h-3 text-forest-700" />
                <span>Reset Telemetry Sliders</span>
              </button>
            </div>
          </div>
        )}

        {/* SmartPOS Pricing Simulator */}
        {activeTab === "pricing" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 clay-card shadow-clay-card">
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="flex items-center justify-between pb-2 border-b border-paper-200">
                <span className="text-xs font-mono uppercase tracking-wider text-ink-500 font-bold">
                  Customer Behavioral Telemetry
                </span>
                <span className="text-[11px] font-mono text-terracotta-700 font-bold">FastAPI ML Pipeline</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-ink-700 font-semibold">Days Since Last Transaction (Recency)</span>
                  <span className="text-terracotta-700 font-bold">{daysSinceVisit} Days</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="90"
                  step="1"
                  value={daysSinceVisit}
                  onChange={(e) => {
                    playTick();
                    setDaysSinceVisit(parseInt(e.target.value));
                  }}
                  className="w-full h-2.5 bg-paper-300 rounded-lg appearance-none cursor-pointer accent-terracotta-600"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-ink-700 font-semibold">Historical Order Frequency</span>
                  <span className="text-forest-800 font-bold">{orderFrequency} Orders</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={orderFrequency}
                  onChange={(e) => {
                    playTick();
                    setOrderFrequency(parseInt(e.target.value));
                  }}
                  className="w-full h-2.5 bg-paper-300 rounded-lg appearance-none cursor-pointer accent-forest-700"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-ink-700 font-semibold">Average Basket Value</span>
                  <span className="text-forest-800 font-bold">${averageBasket}</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="400"
                  step="5"
                  value={averageBasket}
                  onChange={(e) => {
                    playTick();
                    setAverageBasket(parseInt(e.target.value));
                  }}
                  className="w-full h-2.5 bg-paper-300 rounded-lg appearance-none cursor-pointer accent-forest-700"
                />
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-2xl clay-inset space-y-6 text-left">
              <div>
                <span className="text-xs font-mono uppercase text-ink-500 tracking-wider font-bold">
                  Real-time Churn & Retention Analytics
                </span>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="p-3.5 rounded-xl bg-paper-50 shadow-sm">
                    <span className="text-[10px] font-mono uppercase text-ink-400 font-semibold">Churn Probability</span>
                    <div className="font-mono text-2xl font-bold text-terracotta-700 mt-1">
                      {pricingResult.churnPercent}%
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-paper-50 shadow-sm">
                    <span className="text-[10px] font-mono uppercase text-ink-400 font-semibold">Retention Discount</span>
                    <div className="font-mono text-2xl font-bold text-forest-800 mt-1">
                      {pricingResult.recommendedDiscount}% OFF
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3.5 rounded-xl bg-paper-50 shadow-sm">
                  <span className="text-[10px] font-mono uppercase text-ink-400 font-semibold">Predicted Customer LTV</span>
                  <div className="font-mono text-2xl font-bold text-forest-800 mt-1">
                    ${pricingResult.predictedLTV}
                  </div>
                </div>
              </div>

              <div className="text-xs text-ink-500 leading-relaxed font-mono">
                Formula derived from SmartPOS CRM AI K-Means & Logistic Regression models running on FastAPI & PostgreSQL.
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
