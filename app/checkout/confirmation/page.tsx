"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Truck, ArrowRight, Sparkles } from "lucide-react";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber") || "RAW-2026-894120";
  const email = searchParams.get("email") || "your email";

  return (
    <div className="bg-[#09090b] text-[#f4f3ef] pt-36 pb-28 min-h-[80vh] flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 text-center space-y-8 animate-fade-up">
        {/* Badge */}
        <div className="w-20 h-20 rounded-full border border-[#b59a6d]/60 bg-[#b59a6d]/10 mx-auto flex items-center justify-center text-[#b59a6d]">
          <CheckCircle2 className="w-10 h-10 stroke-1" />
        </div>

        <div className="space-y-3">
          <span className="text-[10px] font-editorial-caps text-[#b59a6d] tracking-[0.3em]">
            MAISON ACQUISITION CONFIRMED
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#f4f3ef] font-light">
            Thank You for Your Patronage
          </h1>
          <p className="text-xs sm:text-sm text-[#a1a1aa] font-light leading-relaxed max-w-lg mx-auto">
            Your creation has been allocated and entered our Florentine atelier preparation queue. An official dossier and certificate of authenticity have been sent to{" "}
            <strong className="text-white font-medium">{email}</strong>.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="p-6 bg-[#111114] border border-[#27272a] text-left space-y-4 max-w-md mx-auto text-xs">
          <div className="flex justify-between border-b border-[#27272a] pb-3">
            <span className="text-[#71717a] font-editorial-caps">ORDER REFERENCE</span>
            <span className="font-mono text-[#b59a6d] font-bold">{orderNumber}</span>
          </div>
          <div className="flex justify-between border-b border-[#27272a] pb-3">
            <span className="text-[#71717a] font-editorial-caps">DISPATCH STATUS</span>
            <span className="text-[#f4f3ef]">Preparing for White-Glove Handover</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#71717a] font-editorial-caps">ESTIMATED ARRIVAL</span>
            <span className="text-[#f4f3ef]">2–4 Business Days (Insured)</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/account/orders"
            className="w-full sm:w-auto bg-[#f4f3ef] text-[#09090b] px-8 py-3.5 text-xs font-editorial-caps hover:bg-[#b59a6d] transition-colors"
          >
            VIEW IN YOUR CLIENT PORTAL
          </Link>
          <Link
            href="/collections"
            className="w-full sm:w-auto border border-[#27272a] text-white px-8 py-3.5 text-xs font-editorial-caps hover:border-white transition-colors"
          >
            CONTINUE EXPLORING
          </Link>
        </div>

        <div className="pt-6 flex items-center justify-center gap-6 text-[11px] text-[#71717a]">
          <span className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-[#b59a6d]" />
            Insured Transit
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#b59a6d]" />
            Maison Lifetime Care
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#09090b]" />}>
      <ConfirmationContent />
    </Suspense>
  );
}
