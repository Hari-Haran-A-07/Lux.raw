"use client";

import React, { useState, useEffect } from "react";

export type LuxuryCurrency = "EUR" | "USD" | "GBP" | "JPY" | "CHF" | "AED";

export interface CurrencyConfig {
  code: LuxuryCurrency;
  symbol: string;
  label: string;
  rateToEur: number; // base rate EUR = 1.00
  locale: string;
}

export const LUXURY_CURRENCIES: Record<LuxuryCurrency, CurrencyConfig> = {
  EUR: { code: "EUR", symbol: "€", label: "EUR (€) — Euro", rateToEur: 1.0, locale: "fr-FR" },
  USD: { code: "USD", symbol: "$", label: "USD ($) — US Dollar", rateToEur: 1.08, locale: "en-US" },
  GBP: { code: "GBP", symbol: "£", label: "GBP (£) — British Pound", rateToEur: 0.86, locale: "en-GB" },
  JPY: { code: "JPY", symbol: "¥", label: "JPY (¥) — Japanese Yen", rateToEur: 165.2, locale: "ja-JP" },
  CHF: { code: "CHF", symbol: "CHF", label: "CHF (Fr.) — Swiss Franc", rateToEur: 0.98, locale: "de-CH" },
  AED: { code: "AED", symbol: "AED", label: "AED (د.إ) — UAE Dirham", rateToEur: 3.97, locale: "ar-AE" },
};

export function formatLuxuryPrice(amountInEur: number, currency: LuxuryCurrency = "EUR"): string {
  const conf = LUXURY_CURRENCIES[currency] || LUXURY_CURRENCIES.EUR;
  const converted = amountInEur * conf.rateToEur;
  if (currency === "JPY") {
    return `${conf.symbol}${Math.round(converted).toLocaleString()}`;
  }
  return `${conf.symbol}${converted.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

interface CurrencySelectorProps {
  onCurrencyChange?: (currency: LuxuryCurrency) => void;
  className?: string;
}

export function CurrencySelector({ onCurrencyChange, className = "" }: CurrencySelectorProps) {
  const [selected, setSelected] = useState<LuxuryCurrency>("EUR");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("lux_currency") as LuxuryCurrency | null;
    if (saved && LUXURY_CURRENCIES[saved]) {
      setSelected(saved);
    }
  }, []);

  const handleSelect = (code: LuxuryCurrency) => {
    setSelected(code);
    localStorage.setItem("lux_currency", code);
    setIsOpen(false);
    if (onCurrencyChange) {
      onCurrencyChange(code);
    }
  };

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 rounded border border-neutral-800 bg-neutral-900/60 px-2.5 py-1 text-xs font-mono tracking-wider text-neutral-300 transition-colors hover:border-neutral-700 hover:text-white"
        aria-expanded={isOpen}
      >
        <span>{selected}</span>
        <span className="text-neutral-500 font-sans text-[10px]">
          ({LUXURY_CURRENCIES[selected].symbol})
        </span>
        <span className="text-[10px] text-neutral-500">▾</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 z-50 w-48 rounded-lg border border-neutral-800 bg-neutral-950 p-1 shadow-2xl backdrop-blur-xl">
            <div className="px-2 py-1.5 border-b border-neutral-900 mb-1">
              <p className="text-[9px] font-mono uppercase tracking-widest text-amber-400">
                Maison Global Currencies
              </p>
            </div>
            {(Object.keys(LUXURY_CURRENCIES) as LuxuryCurrency[]).map((code) => {
              const item = LUXURY_CURRENCIES[code];
              const isCurrent = code === selected;
              return (
                <button
                  key={code}
                  onClick={() => handleSelect(code)}
                  className={`w-full flex items-center justify-between rounded px-2.5 py-1.5 text-xs text-left transition-colors ${
                    isCurrent
                      ? "bg-neutral-900 text-amber-300 font-semibold"
                      : "text-neutral-400 hover:bg-neutral-900/50 hover:text-neutral-200"
                  }`}
                >
                  <span className="font-mono">{code} ({item.symbol})</span>
                  <span className="text-[10px] text-neutral-500 truncate ml-2">
                    {item.label.split("—")[1]?.trim()}
                  </span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
