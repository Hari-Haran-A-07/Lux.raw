"use client";

import React from "react";

interface AudioWaveformVisualizerProps {
  isPlaying?: boolean;
  bars?: number;
}

export function AudioWaveformVisualizer({ isPlaying = true, bars = 16 }: AudioWaveformVisualizerProps) {
  return (
    <div className="flex items-end space-x-1 h-6">
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className={`w-1 bg-amber-400/80 rounded-t transition-all duration-300 ${
            isPlaying ? "animate-pulse" : "h-1"
          }`}
          style={{
            height: isPlaying ? `${Math.max(20, (Math.sin(i * 0.8) * 0.5 + 0.5) * 100)}%` : "20%",
            animationDelay: `${i * 75}ms`
          }}
        />
      ))}
    </div>
  );
}
