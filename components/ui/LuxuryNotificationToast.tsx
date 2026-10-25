"use client";

import React from "react";

interface LuxuryNotificationToastProps {
  message: string;
  editionTag?: string;
  onDismiss: () => void;
}

export function LuxuryNotificationToast({ message, editionTag = "MAISON DISPATCH", onDismiss }: LuxuryNotificationToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm p-4 bg-neutral-950/95 border border-amber-500/30 rounded-xl shadow-2xl backdrop-blur-lg flex items-start space-x-3">
      <div className="w-2 h-2 mt-2 rounded-full bg-amber-400" />
      <div className="flex-1">
        <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400">{editionTag}</span>
        <p className="text-xs text-neutral-200 mt-0.5 leading-relaxed">{message}</p>
      </div>
      <button onClick={onDismiss} className="text-neutral-500 hover:text-neutral-300 text-xs">✕</button>
    </div>
  );
}
