"use client";

import React from "react";

interface LuxuryGlassModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function LuxuryGlassModal({ isOpen, onClose, title, children }: LuxuryGlassModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg p-6 bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-800">
          <h3 className="text-lg font-serif tracking-widest text-neutral-100 uppercase">{title}</h3>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition-colors text-sm font-mono"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        <div className="text-neutral-300 text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
