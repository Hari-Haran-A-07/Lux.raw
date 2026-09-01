"use client";

import React from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="bg-[#09090b] text-[#f4f3ef] min-h-[85vh] flex items-center justify-center pt-32 pb-24 text-center px-6">
      <div className="max-w-md space-y-6 animate-fade-up">
        <div className="w-16 h-16 rounded-full border border-rose-900/60 bg-rose-950/20 mx-auto flex items-center justify-center text-rose-400">
          <AlertTriangle className="w-8 h-8 stroke-1" />
        </div>
        <span className="text-[10px] font-editorial-caps text-[#b59a6d] tracking-[0.3em] block">
          MAISON SYSTEM NOTICE
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#f4f3ef]">
          An Unexpected Exception Occurred
        </h1>
        <p className="text-xs text-[#a1a1aa] font-light leading-relaxed">
          Our atelier engineering team has been notified. Please refresh the connection or return to the main showroom.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto bg-[#f4f3ef] text-[#09090b] px-8 py-3.5 text-xs font-editorial-caps flex items-center justify-center gap-2 hover:bg-[#b59a6d] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RETRY CONNECTION</span>
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto border border-[#27272a] text-white px-8 py-3.5 text-xs font-editorial-caps hover:border-white transition-colors"
          >
            RETURN HOME
          </Link>
        </div>
      </div>
    </div>
  );
}
