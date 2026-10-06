"use client";

import React, { useEffect, useRef } from "react";
import { BrutalistCanvasVisualizer } from "@/services/javascript-audio-visual/brutalistShaderCanvas";

export const ParticleCanvas: React.FC<{ className?: string }> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const visualizer = new BrutalistCanvasVisualizer(canvasRef.current);
    return () => {
      visualizer.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full pointer-events-auto opacity-70 ${className}`}
    />
  );
};
