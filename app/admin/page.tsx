"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  DollarSign,
  ShoppingBag,
  Package,
  Users,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function AdminOverviewPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMetrics() {
      try {
        const res = await fetch("/api/admin/analytics");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadMetrics();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-xs font-editorial-caps text-[#b59a6d]">
        COMPILING MAISON FINANCIAL & INVENTORY METRICS...
      </div>
    );
  }

  const { metrics, lowStockItems, recentOrders } = data || {
    metrics: {},
    lowStockItems: [],
    recentOrders: [],
  };

  return (
    <div className="space-y-10">
      {/* Title */}
      <div>
        <span className="text-[10px] font-editorial-caps text-[#b59a6d] tracking-widest block mb-1">
          EXECUTIVE OVERVIEW
        </span>
        <h1 className="font-serif text-3xl font-light text-[#f4f3ef]">
          Maison Performance & Operations
        </h1>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Gross Revenue */}
        <div className="bg-[#111114] border border-[#27272a] p-6 space-y-2">
          <span className="text-[10px] font-editorial-caps text-[#71717a]">GROSS SETTLED REVENUE</span>
          <div className="font-serif text-3xl text-[#f4f3ef]">
            {formatCurrency(metrics.grossRevenue || 0)}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-light">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+14.8% vs prior quarter</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-[#111114] border border-[#27272a] p-6 space-y-2">
          <span className="text-[10px] font-editorial-caps text-[#71717a]">TOTAL ACQUISITIONS</span>
          <div className="font-serif text-3xl text-[#f4f3ef]">
            {metrics.totalOrders || 0}
          </div>
          <p className="text-[11px] text-[#71717a]">
            Average Order Value: {formatCurrency(metrics.averageOrderValue || 0)}
          </p>
        </div>

        {/* Registered Clients */}
        <div className="bg-[#111114] border border-[#27272a] p-6 space-y-2">
          <span className="text-[10px] font-editorial-caps text-[#71717a]">REGISTERED PATRONS</span>
          <div className="font-serif text-3xl text-[#f4f3ef]">
            {metrics.totalClients || 0}
          </div>
          <p className="text-[11px] text-[#71717a]">VIP Private Client Tier Active</p>
        </div>

        {/* Low Stock Warning */}
        <div className="bg-[#111114] border border-[#27272a] p-6 space-y-2">
          <span className="text-[10px] font-editorial-caps text-[#71717a]">LOW STOCK ALLOCATIONS</span>
          <div className="font-serif text-3xl text-[#b59a6d]">
            {metrics.lowStockCount || 0}
          </div>
          <p className="text-[11px] text-[#a1a1aa]">SKUs below threshold (&le; 5 units)</p>
        </div>
      </div>

      {/* 2 Column Operations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Orders Table */}
        <div className="lg:col-span-8 bg-[#111114] border border-[#27272a] p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[#27272a] pb-4">
            <h3 className="font-editorial-caps text-xs tracking-widest text-[#f4f3ef]">
              RECENT ACQUISITION STREAM
            </h3>
            <Link
              href="/admin/orders"
              className="text-xs font-editorial-caps text-[#b59a6d] hover:underline flex items-center gap-1"
            >
              <span>MANAGE ALL</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#27272a] text-[#71717a] font-editorial-caps">
                  <th className="py-2.5">ORDER #</th>
                  <th className="py-2.5">PATRON</th>
                  <th className="py-2.5">TOTAL</th>
                  <th className="py-2.5">STATUS</th>
                  <th className="py-2.5">DATE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#27272a]/40 text-[#d4d4d8] font-light">
                {recentOrders.map((o: any) => (
                  <tr key={o.id} className="hover:bg-[#18181b] transition-colors">
                    <td className="py-3 font-mono text-[#b59a6d]">{o.orderNumber}</td>
                    <td className="py-3 font-medium text-white">{o.customerName}</td>
                    <td className="py-3 font-serif">{formatCurrency(o.total)}</td>
                    <td className="py-3">
                      <span className="bg-[#18181b] border border-[#27272a] text-[10px] font-editorial-caps px-2 py-0.5">
                        {o.status}
                      </span>
                    </td>
                    <td className="py-3 text-[#71717a]">{formatDate(o.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="lg:col-span-4 bg-[#111114] border border-[#27272a] p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[#27272a] pb-4">
            <h3 className="font-editorial-caps text-xs tracking-widest text-[#f4f3ef] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#b59a6d]" />
              <span>ATELIER STOCK ALERTS</span>
            </h3>
            <Link
              href="/admin/inventory"
              className="text-xs font-editorial-caps text-[#b59a6d] hover:underline"
            >
              RESTOCK
            </Link>
          </div>

          <div className="space-y-3">
            {lowStockItems.length === 0 ? (
              <p className="text-xs text-[#71717a] py-8 text-center">
                All atelier inventory levels are healthy.
              </p>
            ) : (
              lowStockItems.slice(0, 6).map((item: any) => (
                <div
                  key={item.id}
                  className="p-3 bg-[#18181b] border border-[#27272a] flex items-center justify-between text-xs"
                >
                  <div>
                    <h5 className="font-serif text-white">{item.product.name}</h5>
                    <p className="text-[11px] text-[#71717a]">
                      Size: {item.size} • SKU: {item.sku}
                    </p>
                  </div>
                  <span className="bg-rose-950/60 border border-rose-800 text-rose-300 font-bold px-2 py-1 text-[10px]">
                    {item.stock} LEFT
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
