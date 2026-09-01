"use client";

import React from "react";
import { Sparkles, X } from "lucide-react";
import { useUI } from "@/lib/store/uiStore";

export const Toast: React.FC = () => {
  const { toastMessage, hideToast } = useUI();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 max-w-sm bg-[#121214] border border-[#b59a6d]/60 text-[#f4f3ef] px-4 py-3 shadow-2xl flex items-center justify-between gap-3 animate-fade-up">
      <div className="flex items-center gap-2.5">
        <Sparkles className="w-4 h-4 text-[#b59a6d] flex-shrink-0" />
        <p className="text-xs font-light tracking-wide">{toastMessage}</p>
      </div>
      <button
        onClick={hideToast}
        aria-label="Dismiss toast"
        className="text-[#71717a] hover:text-white p-1"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
