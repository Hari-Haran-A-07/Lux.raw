import React from "react";

interface GoldFoilBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function GoldFoilBadge({ children, className = "" }: GoldFoilBadgeProps) {
  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-serif tracking-widest uppercase rounded-full bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 text-neutral-950 font-bold shadow-md shadow-amber-500/10 ${className}`}
    >
      {children}
    </span>
  );
}
