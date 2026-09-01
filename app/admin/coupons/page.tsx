"use client";

import React, { useState, useEffect } from "react";
import { Plus, Tag, Check, X, Shield } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New coupon state
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [discountType, setDiscountType] = useState<"PERCENTAGE" | "FIXED">("PERCENTAGE");
  const [discountValue, setDiscountValue] = useState("");
  const [minOrderValue, setMinOrderValue] = useState("");
  const [maxDiscount, setMaxDiscount] = useState("");

  async function loadCoupons() {
    try {
      const res = await fetch("/api/admin/coupons");
      if (res.ok) {
        const data = await res.json();
        setCoupons(data.coupons || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCoupons();
  }, []);

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          description,
          discountType,
          discountValue,
          minOrderValue,
          maxDiscount: maxDiscount || null,
        }),
      });
      if (res.ok) {
        setIsModalOpen(false);
        setCode("");
        setDescription("");
        setDiscountValue("");
        setMinOrderValue("");
        setMaxDiscount("");
        loadCoupons();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#27272a] pb-6">
        <div>
          <span className="text-[10px] font-editorial-caps text-[#b59a6d] tracking-widest block mb-1">
            PRIVILEGE ENGINE
          </span>
          <h1 className="font-serif text-3xl font-light text-[#f4f3ef]">
            Client Privilege & Promotional Codes
          </h1>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#f4f3ef] text-[#09090b] px-6 py-3 text-xs font-editorial-caps flex items-center gap-2 hover:bg-[#b59a6d] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>CREATE PRIVILEGE CODE</span>
        </button>
      </div>

      {/* Coupons Table */}
      <div className="bg-[#111114] border border-[#27272a] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-[#27272a] text-[#71717a] font-editorial-caps bg-[#0d0d0f]">
                <th className="py-3 px-4">PRIVILEGE CODE</th>
                <th className="py-3 px-4">DESCRIPTION</th>
                <th className="py-3 px-4">DISCOUNT</th>
                <th className="py-3 px-4">MINIMUM ORDER</th>
                <th className="py-3 px-4">TIMES REDEEMED</th>
                <th className="py-3 px-4">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27272a]/50 text-[#d4d4d8] font-light">
              {coupons.map((c) => (
                <tr key={c.id} className="hover:bg-[#18181b] transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-[#b59a6d]">{c.code}</td>
                  <td className="py-3 px-4">{c.description || "—"}</td>
                  <td className="py-3 px-4 font-medium text-white">
                    {c.discountType === "PERCENTAGE"
                      ? `${c.discountValue}% OFF`
                      : `${formatCurrency(c.discountValue)} OFF`}
                  </td>
                  <td className="py-3 px-4">{formatCurrency(c.minOrderValue)}</td>
                  <td className="py-3 px-4 font-mono">{c.usedCount} times</td>
                  <td className="py-3 px-4">
                    <span className="bg-emerald-950/60 border border-emerald-800 text-emerald-300 px-2 py-0.5 text-[10px] font-editorial-caps">
                      ACTIVE
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0d0d0f] border border-[#27272a] max-w-lg w-full p-8 text-[#f4f3ef] relative animate-fade-in space-y-6">
            <div className="flex items-center justify-between border-b border-[#27272a] pb-4">
              <h3 className="font-serif text-2xl font-light">Create Privilege Code</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-[#71717a] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">CODE (E.G. MAISON15) *</label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="MAISON15"
                  className="w-full bg-[#18181b] border border-[#27272a] p-3 text-[#f4f3ef] font-mono focus:border-[#b59a6d] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">DESCRIPTION</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Exclusive 15% Private Salon Privilege"
                  className="w-full bg-[#18181b] border border-[#27272a] p-3 text-[#f4f3ef] focus:border-[#b59a6d] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">DISCOUNT TYPE</label>
                  <select
                    value={discountType}
                    onChange={(e: any) => setDiscountType(e.target.value)}
                    className="w-full bg-[#18181b] border border-[#27272a] p-3 text-[#f4f3ef] focus:border-[#b59a6d] focus:outline-none"
                  >
                    <option value="PERCENTAGE">PERCENTAGE (%)</option>
                    <option value="FIXED">FIXED AMOUNT ($)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">DISCOUNT VALUE *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    placeholder={discountType === "PERCENTAGE" ? "15" : "150"}
                    className="w-full bg-[#18181b] border border-[#27272a] p-3 text-[#f4f3ef] font-mono focus:border-[#b59a6d] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">MINIMUM ORDER VALUE ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={minOrderValue}
                    onChange={(e) => setMinOrderValue(e.target.value)}
                    placeholder="1000"
                    className="w-full bg-[#18181b] border border-[#27272a] p-3 text-[#f4f3ef] font-mono focus:border-[#b59a6d] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">MAX DISCOUNT CAP ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={maxDiscount}
                    onChange={(e) => setMaxDiscount(e.target.value)}
                    placeholder="500"
                    className="w-full bg-[#18181b] border border-[#27272a] p-3 text-[#f4f3ef] font-mono focus:border-[#b59a6d] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-[#27272a]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/3 border border-[#27272a] text-xs font-editorial-caps py-3 hover:border-white"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="w-2/3 bg-[#f4f3ef] text-[#09090b] text-xs font-editorial-caps py-3 hover:bg-[#b59a6d] transition-colors"
                >
                  SAVE PRIVILEGE CODE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
