"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Search, Truck, Check, Edit2, Shield, Eye, X } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // Status update state
  const [statusToUpdate, setStatusToUpdate] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  async function loadOrders() {
    try {
      const res = await fetch("/api/admin/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  const openOrderModal = (order: any) => {
    setSelectedOrder(order);
    setStatusToUpdate(order.status);
    setTrackingNumber(order.trackingNumber || "");
    setPaymentStatus(order.paymentStatus);
  };

  const handleUpdateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    try {
      const res = await fetch("/api/admin/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedOrder.id,
          status: statusToUpdate,
          paymentStatus,
          trackingNumber,
        }),
      });
      if (res.ok) {
        setSelectedOrder(null);
        loadOrders();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = selectedStatus === "ALL" || o.status === selectedStatus;
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Top Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#27272a] pb-6">
        <div>
          <span className="text-[10px] font-editorial-caps text-[#b59a6d] tracking-widest block mb-1">
            FULFILLMENT OPERATIONS
          </span>
          <h1 className="font-serif text-3xl font-light text-[#f4f3ef]">
            Maison Orders & Courier Workflow
          </h1>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-2 text-xs font-editorial-caps">
          {["ALL", "PENDING", "PROCESSING", "SHIPPED", "DELIVERED"].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 border transition-colors ${
                selectedStatus === st
                  ? "bg-[#f4f3ef] text-[#09090b] border-white font-medium"
                  : "border-[#27272a] text-[#a1a1aa] hover:text-white"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 bg-[#111114] border border-[#27272a] px-4 py-2 max-w-md">
        <Search className="w-4 h-4 text-[#71717a]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by Order #, Patron Name, Email..."
          className="bg-transparent text-xs text-[#f4f3ef] focus:outline-none flex-1 font-light"
        />
      </div>

      {/* Orders Table */}
      <div className="bg-[#111114] border border-[#27272a] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-[#27272a] text-[#71717a] font-editorial-caps bg-[#0d0d0f]">
                <th className="py-3 px-4">ORDER #</th>
                <th className="py-3 px-4">PATRON & EMAIL</th>
                <th className="py-3 px-4">CREATIONS</th>
                <th className="py-3 px-4">TOTAL</th>
                <th className="py-3 px-4">ORDER STATUS</th>
                <th className="py-3 px-4">PAYMENT</th>
                <th className="py-3 px-4">DATE</th>
                <th className="py-3 px-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27272a]/50 text-[#d4d4d8] font-light">
              {filteredOrders.map((o) => (
                <tr key={o.id} className="hover:bg-[#18181b] transition-colors">
                  <td className="py-3 px-4 font-mono text-[#b59a6d] font-semibold">
                    {o.orderNumber}
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-medium text-white">{o.customerName}</p>
                    <p className="text-[#71717a] text-[11px]">{o.customerEmail}</p>
                  </td>
                  <td className="py-3 px-4">{o.items?.length || 1} items</td>
                  <td className="py-3 px-4 font-serif text-white">{formatCurrency(o.total)}</td>
                  <td className="py-3 px-4">
                    <span className="bg-[#18181b] border border-[#27272a] text-[10px] font-editorial-caps px-2 py-0.5">
                      {o.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-[10px] font-editorial-caps px-2 py-0.5 ${
                        o.paymentStatus === "PAID"
                          ? "bg-emerald-950/60 text-emerald-300 border border-emerald-800"
                          : "bg-amber-950/60 text-amber-300"
                      }`}
                    >
                      {o.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#71717a]">{formatDate(o.createdAt)}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => openOrderModal(o)}
                      className="text-xs font-editorial-caps text-[#b59a6d] hover:underline"
                    >
                      DETAILS / UPDATE →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail & Update Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0d0d0f] border border-[#27272a] max-w-2xl w-full p-8 text-[#f4f3ef] relative animate-fade-in space-y-6">
            <div className="flex items-center justify-between border-b border-[#27272a] pb-4">
              <div>
                <span className="text-[10px] font-editorial-caps text-[#b59a6d]">
                  ORDER DOSSIER
                </span>
                <h3 className="font-mono text-xl font-bold text-white">
                  {selectedOrder.orderNumber}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 text-[#71717a] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="space-y-3 max-h-48 overflow-y-auto border-b border-[#27272a] pb-4">
              {selectedOrder.items?.map((item: any) => (
                <div key={item.id} className="flex gap-3 text-xs">
                  <div className="relative aspect-[3/4] w-12 bg-[#18181b] overflow-hidden flex-shrink-0">
                    {item.productImage && (
                      <Image
                        src={item.productImage}
                        alt={item.productName}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h5 className="font-serif text-white">{item.productName}</h5>
                    <p className="text-[11px] text-[#71717a]">
                      Qty: {item.quantity} {item.size && `• Size: ${item.size}`}
                    </p>
                  </div>
                  <span className="font-serif text-white">{formatCurrency(item.total)}</span>
                </div>
              ))}
            </div>

            {/* Status Form */}
            <form onSubmit={handleUpdateOrder} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">
                    ORDER STATUS
                  </label>
                  <select
                    value={statusToUpdate}
                    onChange={(e) => setStatusToUpdate(e.target.value)}
                    className="w-full bg-[#18181b] border border-[#27272a] p-3 text-[#f4f3ef] focus:border-[#b59a6d] focus:outline-none"
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="PROCESSING">PROCESSING</option>
                    <option value="SHIPPED">SHIPPED</option>
                    <option value="DELIVERED">DELIVERED</option>
                    <option value="CANCELLED">CANCELLED</option>
                    <option value="REFUNDED">REFUNDED</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">
                    PAYMENT STATUS
                  </label>
                  <select
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value)}
                    className="w-full bg-[#18181b] border border-[#27272a] p-3 text-[#f4f3ef] focus:border-[#b59a6d] focus:outline-none"
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="AUTHORIZED">AUTHORIZED</option>
                    <option value="PAID">PAID</option>
                    <option value="FAILED">FAILED</option>
                    <option value="REFUNDED">REFUNDED</option>
                  </select>
                </div>

                <div className="space-y-1 col-span-2">
                  <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">
                    WHITE-GLOVE TRACKING NUMBER
                  </label>
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="LR-EXP-982173491"
                    className="w-full bg-[#18181b] border border-[#27272a] p-3 text-[#f4f3ef] font-mono focus:border-[#b59a6d] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-[#27272a]">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="w-1/3 border border-[#27272a] text-xs font-editorial-caps py-3 hover:border-white"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="w-2/3 bg-[#f4f3ef] text-[#09090b] text-xs font-editorial-caps py-3 hover:bg-[#b59a6d] transition-colors"
                >
                  SAVE STATUS & DISPATCH
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
