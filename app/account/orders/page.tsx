"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Package, Truck, ArrowLeft, Clock, ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/store/authStore";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function AccountOrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      try {
        const res = await fetch("/api/orders");
        if (res.ok) {
          const data = await res.json();
          setOrders(data.orders || []);
        }
      } catch (err) {
        console.error("Failed to load orders", err);
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, []);

  return (
    <div className="bg-[#09090b] text-[#f4f3ef] pt-32 sm:pt-40 pb-24 min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Back Link */}
        <Link
          href="/account"
          className="inline-flex items-center gap-2 text-xs font-editorial-caps text-[#71717a] hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO CLIENT SUITE</span>
        </Link>

        <div className="border-b border-[#27272a] pb-6 mb-12">
          <span className="text-[10px] font-editorial-caps text-[#b59a6d] tracking-widest block mb-1">
            ACQUISITION HISTORY
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#f4f3ef] font-light">
            Your Orders & Handover Dossiers
          </h1>
        </div>

        {loading ? (
          <div className="py-20 text-center text-xs font-editorial-caps text-[#b59a6d]">
            LOADING YOUR DOSSIERS...
          </div>
        ) : orders.length === 0 ? (
          <div className="py-24 text-center space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full border border-[#27272a] flex items-center justify-center text-[#71717a] mx-auto">
              <Package className="w-8 h-8 stroke-1" />
            </div>
            <h3 className="font-serif text-2xl font-light">No Acquisitions Found</h3>
            <p className="text-xs text-[#a1a1aa] font-light">
              You have not placed any orders yet. Discover our latest seasonal creations.
            </p>
            <div className="pt-4">
              <Link
                href="/collections"
                className="inline-block bg-[#f4f3ef] text-[#09090b] px-8 py-3.5 text-xs font-editorial-caps hover:bg-[#b59a6d] transition-colors"
              >
                EXPLORE COLLECTIONS
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-[#111114] border border-[#27272a] p-6 sm:p-8 space-y-6"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#27272a] pb-4 text-xs font-light">
                  <div className="flex flex-wrap items-center gap-4">
                    <div>
                      <span className="text-[#71717a] font-editorial-caps text-[10px] block">
                        ORDER NUMBER
                      </span>
                      <span className="font-mono text-[#b59a6d] font-bold">
                        {order.orderNumber}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#71717a] font-editorial-caps text-[10px] block">
                        DATE PLACED
                      </span>
                      <span className="text-[#d4d4d8]">{formatDate(order.createdAt)}</span>
                    </div>
                    <div>
                      <span className="text-[#71717a] font-editorial-caps text-[10px] block">
                        TOTAL VALUE
                      </span>
                      <span className="font-serif text-sm text-[#f4f3ef]">
                        {formatCurrency(order.total)}
                      </span>
                    </div>
                  </div>

                  {/* Status Badges */}
                  <div className="flex items-center gap-2">
                    <span className="bg-[#18181b] border border-[#b59a6d]/40 text-[#b59a6d] px-2.5 py-1 text-[10px] font-editorial-caps">
                      STATUS: {order.status}
                    </span>
                    <span className="bg-emerald-950/40 border border-emerald-800 text-emerald-300 px-2.5 py-1 text-[10px] font-editorial-caps">
                      PAYMENT: {order.paymentStatus}
                    </span>
                  </div>
                </div>

                {/* Items in this order */}
                <div className="space-y-4">
                  {order.items.map((item: any) => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <div className="relative aspect-[3/4] w-16 bg-[#18181b] overflow-hidden flex-shrink-0">
                        {item.productImage ? (
                          <Image
                            src={item.productImage}
                            alt={item.productName}
                            fill
                            className="object-cover"
                          />
                        ) : null}
                      </div>
                      <div className="flex-1 text-xs">
                        <h4 className="font-serif text-sm text-[#f4f3ef]">{item.productName}</h4>
                        <p className="text-[#71717a] mt-0.5">
                          Quantity: {item.quantity} {item.size && `• Size: ${item.size}`}{" "}
                          {item.color && `• Color: ${item.color}`}
                        </p>
                      </div>
                      <span className="font-serif text-sm text-[#f4f3ef]">
                        {formatCurrency(item.total)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tracking & Shipment info */}
                {order.trackingNumber && (
                  <div className="pt-4 border-t border-[#27272a] flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#a1a1aa] gap-2">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#b59a6d]" />
                      <span>
                        Maison White-Glove Tracking:{" "}
                        <strong className="font-mono text-[#f4f3ef]">{order.trackingNumber}</strong>
                      </span>
                    </div>
                    <span className="text-[11px] text-[#71717a]">
                      Adult signature required upon courier delivery
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
