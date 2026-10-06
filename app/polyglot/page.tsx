"use client";

import React, { useState, useEffect } from "react";
import { 
  Terminal, 
  Cpu, 
  Layers, 
  Zap, 
  ShieldCheck, 
  Activity, 
  Code2, 
  Play, 
  Sparkles, 
  CheckCircle2, 
  RefreshCw,
  Database,
  ArrowUpRight,
  Server
} from "lucide-react";
import { ParticleCanvas } from "@/components/polyglot/ParticleCanvas";

interface EngineItem {
  id: string;
  name: string;
  language: string;
  role: string;
  runtime: string;
  status: string;
  latencyMs: number;
  memoryUsageMb: number;
  concurrencyModel: string;
  version: string;
}

export default function PolyglotPage() {
  const [engines, setEngines] = useState<EngineItem[]>([]);
  const [selectedEngine, setSelectedEngine] = useState<string>("engine-python");
  const [loading, setLoading] = useState(true);
  const [runningTest, setRunningTest] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);

  const fetchEngines = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/polyglot/overview");
      const data = await res.json();
      if (data.engines) {
        setEngines(data.engines);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEngines();
  }, []);

  const runEngineTest = async (engineId: string) => {
    setRunningTest(true);
    setTestResult(null);

    try {
      let endpoint = "";
      let method = "POST";
      let payload: any = {};

      switch (engineId) {
        case "engine-ts":
          endpoint = "/api/polyglot/overview";
          method = "GET";
          break;
        case "engine-js":
          endpoint = "/api/polyglot/overview";
          method = "GET";
          break;
        case "engine-python":
          endpoint = "/api/polyglot/stylist";
          payload = { aesthetic: "Architectural Brutalism", occasion: "Milan Fashion Week Gala", budget: "$8,500" };
          break;
        case "engine-go":
          endpoint = "/api/polyglot/drops";
          payload = { dropId: "DROP-001", userId: "USR-VIP-88", userName: "MaisonPatron_Paris", amount: 6400 };
          break;
        case "engine-csharp":
          endpoint = "/api/polyglot/payments";
          payload = { orderId: "ORD-POLY-992", amount: 4850.0, currency: "USD", email: "patron@luxraw.com", country: "FR" };
          break;
        case "engine-rust":
          endpoint = "/api/polyglot/authenticity";
          payload = { serialNumber: "LUX-FLORENCE-2026-9092", atelierCode: "ATELIER-FLORENCE-04" };
          break;
        case "engine-java":
          endpoint = "/api/polyglot/inventory";
          payload = { orderReference: "ORD-ERP-440", items: [{ sku: "LUX-COAT-001", quantity: 1 }], region: "EU" };
          break;
        case "engine-kotlin":
          endpoint = "/api/polyglot/concierge";
          payload = { clientName: "Madame de Montespan", clientEmail: "montespan@parishautecouture.fr", city: "Paris", date: "2026-10-24", timeSlot: "16:00" };
          break;
        case "engine-php":
          endpoint = "/api/polyglot/archive?season=Autumn / Winter 2026&lang=fr";
          method = "GET";
          break;
        case "engine-ruby":
          endpoint = "/api/polyglot/dispatch";
          payload = { title: "Autumn/Winter 2026 Monolith Monograph", collectionCode: "AW26-MONOLITH" };
          break;
        case "engine-sql":
          endpoint = "/api/polyglot/sql-query";
          payload = { queryType: "CATEGORY_TREE" };
          break;
        default:
          endpoint = "/api/polyglot/overview";
          method = "GET";
      }

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        ...(method === "POST" ? { body: JSON.stringify(payload) } : {})
      });
      const data = await res.json();
      setTestResult(data);
    } catch (err: any) {
      setTestResult({ error: err.message });
    } finally {
      setRunningTest(false);
    }
  };

  const currentEngineObj = engines.find(e => e.id === selectedEngine);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f3ef] pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Interactive Particle Canvas */}
      <div className="absolute inset-0 z-0 opacity-25">
        <ParticleCanvas />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Header Monograph */}
        <div className="border-b border-[#27272a] pb-8 space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-[#b59a6d]/15 text-[#b59a6d] border border-[#b59a6d]/30 text-[10px] font-editorial-caps tracking-widest">
              ENTERPRISE POLYGLOT ARCHITECTURE
            </span>
            <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              11 ACTIVE CORES
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-[0.2em] uppercase text-[#f4f3ef]">
            Maison Polyglot <span className="text-[#b59a6d] italic font-normal">Command Center</span>
          </h1>

          <p className="text-xs sm:text-sm font-light text-[#a1a1aa] max-w-3xl leading-relaxed">
            A monumental multi-lingual microservice mesh orchestrating 11 programming languages: 
            <strong className="text-white"> TypeScript, JavaScript, Java, Go, C#, Python, Rust, Kotlin, PHP, Ruby, and SQL</strong>. 
            Each engine powers an essential pillar of the Maison’s high-throughput digital luxury ecosystem.
          </p>
        </div>

        {/* 11 Engine Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-editorial-caps tracking-widest text-[#b59a6d] flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>THE 11 POLYGLOT LANGUAGE ENGINES</span>
            </h2>
            <button
              onClick={fetchEngines}
              className="text-xs font-editorial-caps text-[#71717a] hover:text-[#f4f3ef] flex items-center gap-1 transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              <span>REFRESH TELEMETRY</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {engines.map((eng) => (
              <button
                key={eng.id}
                onClick={() => {
                  setSelectedEngine(eng.id);
                  runEngineTest(eng.id);
                }}
                className={`p-4 text-left rounded-sm border transition-all duration-300 relative group overflow-hidden ${
                  selectedEngine === eng.id
                    ? "bg-[#18181b] border-[#b59a6d] shadow-lg shadow-[#b59a6d]/10"
                    : "bg-[#0c0c0e]/80 border-[#27272a] hover:border-[#3f3f46] hover:bg-[#121214]"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 text-[#b59a6d] border border-[#27272a]">
                    {eng.language}
                  </span>
                  <span className="flex items-center gap-1 text-[9px] font-mono text-emerald-400">
                    <Activity className="w-2.5 h-2.5" />
                    {eng.latencyMs}ms
                  </span>
                </div>

                <h3 className="text-xs font-serif tracking-wider text-[#f4f3ef] group-hover:text-[#b59a6d] transition-colors mb-1">
                  {eng.name}
                </h3>
                <p className="text-[11px] font-light text-[#71717a] line-clamp-2 leading-relaxed mb-3">
                  {eng.role}
                </p>

                <div className="pt-2 border-t border-[#27272a]/60 flex items-center justify-between text-[10px] text-[#52525b] font-mono">
                  <span>{eng.version}</span>
                  <span>{eng.memoryUsageMb} MB</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Live Interactive Playground & Sandbox */}
        {currentEngineObj && (
          <div className="bg-[#121214]/90 border border-[#27272a] rounded-sm p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#27272a]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-editorial-caps px-2 py-0.5 bg-[#b59a6d]/20 text-[#b59a6d] border border-[#b59a6d]/40">
                    ACTIVE ENGINE
                  </span>
                  <span className="text-xs font-mono text-[#a1a1aa]">{currentEngineObj.runtime}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif text-[#f4f3ef] tracking-wide">
                  {currentEngineObj.name} ({currentEngineObj.language})
                </h2>
                <p className="text-xs text-[#71717a] font-light mt-1">
                  Concurrency Model: <span className="text-[#d4d4d8] font-mono">{currentEngineObj.concurrencyModel}</span>
                </p>
              </div>

              <button
                onClick={() => runEngineTest(selectedEngine)}
                disabled={runningTest}
                className="px-5 py-2.5 bg-[#b59a6d] hover:bg-[#a3885d] text-[#09090b] text-xs font-editorial-caps tracking-widest flex items-center gap-2 transition-all disabled:opacity-50"
              >
                {runningTest ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                <span>{runningTest ? "EXECUTING CORE..." : `EXECUTE ${currentEngineObj.language.toUpperCase()} ENGINE`}</span>
              </button>
            </div>

            {/* Terminal Response Viewer */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[#71717a]">
                <span className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#b59a6d]" />
                  <span>LIVE PAYLOAD & METRIC TELEMETRY</span>
                </span>
                {testResult && (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 200 OK — Handled in {testResult.executionLatencyMs || currentEngineObj.latencyMs}ms
                  </span>
                )}
              </div>

              <div className="bg-[#09090b] border border-[#27272a] p-4 rounded-sm font-mono text-xs text-[#d4d4d8] overflow-x-auto max-h-96 leading-relaxed">
                {runningTest ? (
                  <div className="flex items-center gap-3 text-[#b59a6d] py-6 justify-center">
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Transmitting microservice request across polyglot mesh...</span>
                  </div>
                ) : testResult ? (
                  <pre>{JSON.stringify(testResult, null, 2)}</pre>
                ) : (
                  <div className="text-[#52525b] py-6 text-center">
                    Click "EXECUTE {currentEngineObj.language.toUpperCase()} ENGINE" to trigger a live call.
                  </div>
                )}
              </div>
            </div>

            {/* Quick Links to Website Experience Pages */}
            <div className="pt-4 border-t border-[#27272a] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <a href="/stylist" className="p-3 bg-[#18181b] border border-[#27272a] hover:border-[#b59a6d] text-[#d4d4d8] flex items-center justify-between">
                <span>AI Stylist (Python)</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#b59a6d]" />
              </a>
              <a href="/drops" className="p-3 bg-[#18181b] border border-[#27272a] hover:border-[#b59a6d] text-[#d4d4d8] flex items-center justify-between">
                <span>Live Drops (Go)</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#b59a6d]" />
              </a>
              <a href="/passport" className="p-3 bg-[#18181b] border border-[#27272a] hover:border-[#b59a6d] text-[#d4d4d8] flex items-center justify-between">
                <span>Authenticity (Rust)</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#b59a6d]" />
              </a>
              <a href="/archive" className="p-3 bg-[#18181b] border border-[#27272a] hover:border-[#b59a6d] text-[#d4d4d8] flex items-center justify-between">
                <span>Heritage Archive (PHP)</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#b59a6d]" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
