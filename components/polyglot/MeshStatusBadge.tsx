"use client";

import React from "react";

interface MeshStatusBadgeProps {
  engineName: string;
  latencyMs: number;
  status: "ONLINE" | "HEALTHY" | "BENCHMARKING";
}

export function MeshStatusBadge({ engineName, latencyMs, status }: MeshStatusBadgeProps) {
  return (
    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/80 backdrop-blur-sm text-xs font-mono">
      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      <span className="text-neutral-300">{engineName}</span>
      <span className="text-neutral-500">|</span>
      <span className="text-amber-400">{latencyMs}ms</span>
      <span className="text-[10px] text-emerald-400 font-semibold tracking-wider uppercase">{status}</span>
    </div>
  );
}
