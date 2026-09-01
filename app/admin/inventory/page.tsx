"use client";

import React, { useState, useEffect } from "react";
import { Search, Plus, Minus, Check, AlertTriangle, Boxes } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function AdminInventoryPage() {
  const [variants, setVariants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function loadInventory() {
    try {
      const res = await fetch("/api/admin/inventory");
      if (res.ok) {
        const data = await res.json();
        setVariants(data.variants || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadInventory();
  }, []);

  const handleUpdateStock = async (variantId: string, newStock: number) => {
    if (newStock < 0) return;
    setUpdatingId(variantId);
    try {
      const res = await fetch("/api/admin/inventory", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variantId, stock: newStock }),
      });
      if (res.ok) {
        setVariants((prev) =>
          prev.map((v) => (v.id === variantId ? { ...v, stock: newStock } : v))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = variants.filter(
    (v) =>
      v.product?.name?.toLowerCase().includes(search.toLowerCase()) ||
      v.sku.toLowerCase().includes(search.toLowerCase()) ||
      v.size.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-[#27272a] pb-6">
        <span className="text-[10px] font-editorial-caps text-[#b59a6d] tracking-widest block mb-1">
          CENTRAL ATELIER WAREHOUSE
        </span>
        <h1 className="font-serif text-3xl font-light text-[#f4f3ef]">
          Inventory & SKU Allocation Manager
        </h1>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 bg-[#111114] border border-[#27272a] px-4 py-2 max-w-md">
        <Search className="w-4 h-4 text-[#71717a]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by Creation, SKU, or Size..."
          className="bg-transparent text-xs text-[#f4f3ef] focus:outline-none flex-1 font-light"
        />
      </div>

      {/* Inventory Table */}
      <div className="bg-[#111114] border border-[#27272a] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-[#27272a] text-[#71717a] font-editorial-caps bg-[#0d0d0f]">
                <th className="py-3 px-4">CREATION NAME</th>
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4">SIZE / PROPORTION</th>
                <th className="py-3 px-4">COLOR / HUE</th>
                <th className="py-3 px-4">ALLOCATION STATUS</th>
                <th className="py-3 px-4">STOCK ON HAND</th>
                <th className="py-3 px-4 text-right">STOCK ADJUSTMENT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27272a]/50 text-[#d4d4d8] font-light">
              {filtered.map((v) => (
                <tr key={v.id} className="hover:bg-[#18181b] transition-colors">
                  <td className="py-3 px-4 font-serif text-sm text-white">
                    {v.product?.name}
                  </td>
                  <td className="py-3 px-4 font-mono text-[#b59a6d]">{v.sku}</td>
                  <td className="py-3 px-4">{v.size}</td>
                  <td className="py-3 px-4">{v.color}</td>
                  <td className="py-3 px-4">
                    {v.stock <= 3 ? (
                      <span className="bg-rose-950/60 border border-rose-800 text-rose-300 px-2 py-0.5 text-[10px] font-editorial-caps">
                        CRITICAL LOW ({v.stock})
                      </span>
                    ) : v.stock <= 5 ? (
                      <span className="bg-amber-950/60 border border-amber-800 text-amber-300 px-2 py-0.5 text-[10px] font-editorial-caps">
                        LOW STOCK ({v.stock})
                      </span>
                    ) : (
                      <span className="bg-emerald-950/60 border border-emerald-800 text-emerald-300 px-2 py-0.5 text-[10px] font-editorial-caps">
                        HEALTHY ({v.stock})
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 font-mono text-base font-semibold text-white">
                    {v.stock}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center border border-[#3f3f46]">
                      <button
                        onClick={() => handleUpdateStock(v.id, v.stock - 1)}
                        disabled={updatingId === v.id || v.stock <= 0}
                        className="p-1.5 text-[#a1a1aa] hover:text-white hover:bg-[#27272a] transition-colors disabled:opacity-30"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 font-mono text-xs text-white">{v.stock}</span>
                      <button
                        onClick={() => handleUpdateStock(v.id, v.stock + 1)}
                        disabled={updatingId === v.id}
                        className="p-1.5 text-[#a1a1aa] hover:text-white hover:bg-[#27272a] transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
