"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, Terminal as TerminalIcon, CornerDownLeft } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { PROFILE_INFO, EXPERIENCES } from "@/data/experience";
import { useSoundFX } from "@/hooks/use-sound-fx";

interface TerminalHUDProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LogLine {
  id: string;
  type: "command" | "output" | "error" | "ascii";
  text: string;
}

export function TerminalHUD({ isOpen, onClose }: TerminalHUDProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const { playClick, playChime, playTerminalKey } = useSoundFX();

  const [logs, setLogs] = useState<LogLine[]>([
    {
      id: "init-1",
      type: "output",
      text: "RaKa-OS v2.8.1 (Applied AI & Backend Microservices Kernel)",
    },
    {
      id: "init-2",
      type: "output",
      text: `Host: ${PROFILE_INFO.city.toLowerCase()}.${PROFILE_INFO.country.toLowerCase()} | Timezone: ${PROFILE_INFO.utcOffset}`,
    },
    {
      id: "init-3",
      type: "output",
      text: "Type 'help' for a list of available system commands.",
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, logs]);

  if (!isOpen) return null;

  const handleCommand = (cmdStr: string) => {
    playClick(750);
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const newLogs: LogLine[] = [...logs, { id: Math.random().toString(), type: "command", text: `$ ${trimmed}` }];

    const args = trimmed.split(" ");
    const command = args[0].toLowerCase();

    switch (command) {
      case "help":
        newLogs.push({
          id: Math.random().toString(),
          type: "output",
          text: `AVAILABLE COMMANDS:
  help                    - Display this manual
  projects                - List production repositories & engines
  predict [duty] [sleep]  - Run Random Forest fatigue model (e.g. 'predict 12 5')
  skills                  - Print technical arsenal & ML frameworks
  experience              - Display career history & certifications
  resume                  - Print education, CGPA, & contact summary
  qa-cat                  - Request code review from Rahul's Senior QA Cat
  contact                 - Display direct contact channels
  clear                   - Clear the terminal console
  exit                    - Close the terminal window`,
        });
        break;

      case "projects":
        newLogs.push({
          id: Math.random().toString(),
          type: "output",
          text: `FEATURED PRODUCTION SYSTEMS:
${PROJECTS.map(
  (p, i) => `  [${i + 1}] ${p.title.padEnd(16)} | ${p.category.padEnd(26)} | ${p.stack.slice(0, 3).join(", ")}`
).join("\n")}`,
        });
        break;

      case "predict":
        const duty = parseFloat(args[1]) || 12;
        const sleep = parseFloat(args[2]) || 5;
        const sleepDef = Math.max(0, 8 - sleep);
        const dutyPen = duty > 8 ? Math.pow(duty - 8, 1.35) * 4.2 : (duty / 8) * 12;
        const score = Math.min(100, Math.max(5, Math.round(15 + dutyPen + sleepDef * 8.5)));
        const status = score < 50 ? "LOW_RISK" : score < 75 ? "MODERATE_WARNING" : "CRITICAL_GROUND_CREW";

        newLogs.push({
          id: Math.random().toString(),
          type: "output",
          text: `SMARTCREW RANDOM FOREST INFERENCE:
  Input Continuous Duty : ${duty}h
  Input Prior Rest Sleep: ${sleep}h
  Predicted Fatigue Idx : ${score} / 100
  Inference Latency     : 8.7ms
  DGCA Safety Status    : ${status}
  Decision Matrix       : ${score > 75 ? "MANDATORY RELIEF PILOT REQUIRED" : "FLIGHT DISPATCH PERMITTED"}`,
        });
        break;

      case "skills":
        newLogs.push({
          id: Math.random().toString(),
          type: "output",
          text: `CORE WEAPONRY & STACK:
  AI / ML   : Scikit-Learn, Supervised Learning, Pandas, NumPy, spaCy, NLTK
  Languages : Python, TypeScript, JavaScript, SQL
  Backend   : FastAPI, Node.js, Express, WebSockets, REST APIs
  Databases : PostgreSQL, ClickHouse OLAP, Redis, Kafka, SQLAlchemy, Prisma
  Security  : HttpOnly tokens, sliding-window rate limiting, anti-XSS, RBAC`,
        });
        break;

      case "experience":
        newLogs.push({
          id: Math.random().toString(),
          type: "output",
          text: `TRACK RECORD:
${EXPERIENCES.map((e) => `  * ${e.role} @ ${e.organization} (${e.period})`).join("\n")}`,
        });
        break;

      case "resume":
        newLogs.push({
          id: Math.random().toString(),
          type: "output",
          text: `RESUME SUMMARY:
  Name        : ${PROFILE_INFO.name} (${PROFILE_INFO.handle})
  Title       : ${PROFILE_INFO.title}
  Education   : B.E. in Artificial Intelligence and Data Science (A.C. Patil College of Engg, CGPA: 7.5)
  Internship  : Shree Laser Systems (Junior Software Developer)
  Certificates: Stanford University & DeepLearning.AI Machine Learning Specialization
  Award       : 1st Place - Vectors '26 Tech Arena (Debugging & Tech Stacks)
  Email       : ${PROFILE_INFO.email}
  Location    : ${PROFILE_INFO.city}, ${PROFILE_INFO.country} (${PROFILE_INFO.utcOffset})
  GitHub      : ${PROFILE_INFO.github}
  LinkedIn    : ${PROFILE_INFO.linkedin}`,
        });
        break;

      case "qa-cat":
        newLogs.push({
          id: Math.random().toString(),
          type: "ascii",
          text: `
     /\\_/\\  
    ( o.o )   "If it compiles on the first try, don't trust it."
     > ^ <     -- Senior QA Cat (Rahul's Lead Code Reviewer)
    [ sleeping on keyboard: PR review pending coffee ]
          `,
        });
        break;

      case "contact":
        newLogs.push({
          id: Math.random().toString(),
          type: "output",
          text: `DIRECT CHANNELS:
  Email       : ${PROFILE_INFO.email}
  Location    : ${PROFILE_INFO.city}, ${PROFILE_INFO.country} (${PROFILE_INFO.utcOffset})
  Turnaround  : ${PROFILE_INFO.responseSLA}
  GitHub      : ${PROFILE_INFO.github}
  LinkedIn    : ${PROFILE_INFO.linkedin}
  Discord     : ${PROFILE_INFO.discord}`,
        });
        break;

      case "clear":
        setLogs([]);
        setInput("");
        return;

      case "exit":
        onClose();
        return;

      default:
        newLogs.push({
          id: Math.random().toString(),
          type: "error",
          text: `zsh: command not found: ${command}. Type 'help' for available commands.`,
        });
    }

    setLogs(newLogs);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex >= history.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(nextIndex);
          setInput(history[nextIndex]);
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 backdrop-blur-xl bg-black/85 animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-[#090d14] border border-amber-500/40 rounded-xl shadow-2xl shadow-amber-500/10 overflow-hidden flex flex-col h-[520px] max-h-[85vh] z-10">
        {/* Terminal Header */}
        <div className="px-4 py-2.5 bg-[#0e1420] border-b border-white/10 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 cursor-pointer" onClick={onClose} />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="ml-2 text-xs font-mono text-slate-300 font-semibold flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>rsharma@raka-core:~ (RaKa-OS v2.8.1)</span>
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Output */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-slate-300 space-y-2 select-text text-left">
          {logs.map((log) => (
            <div
              key={log.id}
              className={`whitespace-pre-wrap leading-relaxed ${
                log.type === "command"
                  ? "text-amber-300 font-semibold"
                  : log.type === "error"
                  ? "text-rose-400"
                  : log.type === "ascii"
                  ? "text-amber-300 font-bold"
                  : "text-slate-300"
              }`}
            >
              {log.text}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Command Line Input */}
        <div className="p-3 bg-[#0b101a] border-t border-white/10 flex items-center gap-2">
          <span className="font-mono text-xs font-bold flex items-center gap-1">
            <span className="text-emerald-400 font-extrabold tracking-wide">guest@raka8904</span>
            <span className="text-amber-400 font-bold">:~#</span>
          </span>

          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => {
              playTerminalKey();
              setInput(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or 'predict 12 5'..."
            className="flex-1 bg-transparent text-xs font-mono text-white focus:outline-none placeholder:text-slate-400"
            autoFocus
          />

          <button
            onClick={() => handleCommand(input)}
            className="p-1.5 text-amber-400 hover:text-amber-300 rounded bg-amber-950/40 border border-amber-500/30"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
