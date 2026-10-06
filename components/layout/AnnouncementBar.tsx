"use client";

import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export const AnnouncementBar: React.FC<{ announcement?: string }> = ({
  announcement = "COMPLIMENTARY WHITE-GLOVE WORLDWIDE DELIVERY • 11 POLYGLOT ENGINES ACTIVE",
}) => {
  return (
    <div className="w-full bg-[#0c0c0e] text-[#a1a1aa] py-2 px-4 text-center text-[10px] sm:text-[11px] font-editorial-caps tracking-widest border-b border-[#27272a]/70 flex items-center justify-center gap-2">
      <Sparkles className="w-3 h-3 text-[#b59a6d]" />
      <span>{announcement}</span>
      <span className="hidden md:inline text-[#71717a]">|</span>
      <Link
        href="/polyglot"
        className="hidden md:inline text-[#b59a6d] underline underline-offset-4 hover:text-[#f4f3ef] transition-colors"
      >
        EXPLORE 11-LANGUAGE MESH
      </Link>
    </div>
  );
};
