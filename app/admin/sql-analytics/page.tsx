"use client";

import React, { useState, useEffect } from "react";
import { Database, Play, CheckCircle2, RefreshCw, Layers, Table, Code2 } from "lucide-react";

export default function SqlAnalyticsPage() {
  const [queryType, setQueryType] = useState<"CATEGORY_TREE" | "RFM_SEGMENTATION" | "LTV_WINDOW">("CATEGORY_TREE");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const runQuery = async (type?: "CATEGORY_TREE" | "RFM_SEGMENTATION" | "LTV_WINDOW") => {
    const targetType = type || queryType;
    setLoading(true);
    try {
      const res = await fetch("/api/polyglot/sql-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ queryType: targetType })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runQuery();
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f3ef] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Monograph */}
        <div className="border-b border-[#27272a] pb-8 space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#b59a6d]/15 text-[#b59a6d] border border-[#b59a6d]/30 text-[10px] font-editorial-caps tracking-widest flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-[#b59a6d]" />
              <span>SQL ANALYTICAL ENGINE • ANSI SQL / POSTGRESQL 16 &amp; SQLITE</span>
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-[0.2em] uppercase text-[#f4f3ef]">
            Executive SQL <span className="text-[#b59a6d] italic font-normal">Intelligence</span>
          </h1>

          <p className="text-xs sm:text-sm font-light text-[#a1a1aa] max-w-2xl leading-relaxed">
            Execute high-performance recursive Common Table Expressions (CTEs), window functions, and multi-tier RFM customer lifetime analytics directly on Maison databases.
          </p>
        </div>

        {/* Query Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { id: "CATEGORY_TREE", label: "Recursive CTE Category Tree", desc: "Hierarchical Breadcrumb Builder" },
            { id: "RFM_SEGMENTATION", label: "RFM VIP Quintile Matrix", desc: "Recency, Frequency, Monetary Scores" },
            { id: "LTV_WINDOW", label: "Cumulative LTV Window Function", desc: "DENSE_RANK() & Running GMV Total" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                const qType = item.id as any;
                setQueryType(qType);
                runQuery(qType);
              }}
              className={`p-4 text-left border rounded-sm transition-all ${
                queryType === item.id
                  ? "bg-[#18181b] border-[#b59a6d] shadow-lg shadow-[#b59a6d]/10"
                  : "bg-[#121214] border-[#27272a] hover:border-[#3f3f46]"
              }`}
            >
              <span className="text-[10px] font-mono text-[#b59a6d] block mb-1">SQL QUERY TEMPLATE</span>
              <h3 className="font-serif text-sm text-[#f4f3ef]">{item.label}</h3>
              <p className="text-[11px] text-[#71717a] font-light mt-1">{item.desc}</p>
            </button>
          ))}
        </div>

        {/* Query Output View */}
        <div className="bg-[#121214] border border-[#27272a] rounded-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#27272a]">
            <div>
              <span className="text-[10px] font-mono text-[#b59a6d]">{result?.dialect || "ANSI SQL"}</span>
              <h3 className="font-serif text-lg text-[#f4f3ef] mt-0.5">Query Results &amp; Materialized Output</h3>
            </div>

            <button
              onClick={() => runQuery()}
              disabled={loading}
              className="px-5 py-2.5 bg-[#b59a6d] hover:bg-[#a3885d] text-[#09090b] text-xs font-editorial-caps tracking-widest flex items-center gap-2 transition-colors disabled:opacity-50 self-start sm:self-auto"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
              <span>{loading ? "EXECUTING..." : "RE-RUN QUERY"}</span>
            </button>
          </div>

          {result && (
            <div className="space-y-4">
              {/* Query text */}
              <div className="bg-[#09090b] border border-[#27272a] p-3 rounded-sm font-mono text-xs text-[#a1a1aa] flex items-center justify-between">
                <code>{result.queryText}</code>
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {result.executionLatencyMs}ms
                </span>
              </div>

              {/* Table of Rows */}
              <div className="overflow-x-auto border border-[#27272a] rounded-sm">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#18181b] text-[#b59a6d] border-b border-[#27272a]">
                    <tr>
                      {result.rows && result.rows.length > 0 && Object.keys(result.rows[0]).map((key) => (
                        <th key={key} className="p-3 uppercase tracking-wider text-[10px]">{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#27272a] bg-[#0c0c0e]">
                    {result.rows?.map((row: any, rIdx: number) => (
                      <tr key={rIdx} className="hover:bg-[#18181b]/50 transition-colors">
                        {Object.values(row).map((val: any, vIdx: number) => (
                          <td key={vIdx} className="p-3 text-[#d4d4d8]">
                            {typeof val === "number" && val > 100 ? val.toLocaleString() : String(val)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
