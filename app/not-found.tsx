import React from "react";
import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-[#09090b] text-[#f4f3ef] min-h-[85vh] flex items-center justify-center pt-32 pb-24 text-center px-6">
      <div className="max-w-md space-y-6 animate-fade-up">
        <div className="w-16 h-16 rounded-full border border-[#27272a] mx-auto flex items-center justify-center text-[#b59a6d]">
          <Compass className="w-8 h-8 stroke-1" />
        </div>
        <span className="text-[10px] font-editorial-caps text-[#b59a6d] tracking-[0.3em] block">
          404 — DOSSIER NOT FOUND
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#f4f3ef]">
          The Requested Creation Does Not Exist
        </h1>
        <p className="text-xs text-[#a1a1aa] font-light leading-relaxed">
          The archive or page you are seeking may have been retired or relocated. We invite you to explore our current runway collections.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto bg-[#f4f3ef] text-[#09090b] px-8 py-3.5 text-xs font-editorial-caps hover:bg-[#b59a6d] transition-colors"
          >
            RETURN TO MAISON
          </Link>
          <Link
            href="/collections"
            className="w-full sm:w-auto border border-[#27272a] text-white px-8 py-3.5 text-xs font-editorial-caps hover:border-white transition-colors"
          >
            DISCOVER COLLECTIONS
          </Link>
        </div>
      </div>
    </div>
  );
}
