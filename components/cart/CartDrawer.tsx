"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, ArrowRight, ShoppingBag, ShieldCheck, Tag } from "lucide-react";
import { useCart } from "@/lib/store/cartStore";
import { CartItemRow } from "./CartItemRow";
import { formatCurrency } from "@/lib/utils";

export const CartDrawer: React.FC = () => {
  const {
    items,
    isOpen,
    closeCart,
    getSubtotal,
    getDiscountAmount,
    getTotal,
    couponCode,
    applyCoupon,
    removeCoupon,
    discountPercentage,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");

  if (!isOpen) return null;

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const total = getTotal();

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon) return;
    setCouponLoading(true);
    setCouponError("");

    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: inputCoupon, subtotal }),
      });
      const data = await res.json();
      if (res.ok && data.valid) {
        applyCoupon(data.coupon.code, data.coupon.discountType, data.coupon.discountValue);
        setInputCoupon("");
      } else {
        setCouponError(data.error || "Invalid code");
      }
    } catch {
      setCouponError("Failed to apply code");
    } finally {
      setCouponLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0d0d0f] border-l border-[#27272a] shadow-2xl flex flex-col justify-between text-[#f4f3ef] animate-fade-in">
          {/* Header */}
          <div className="p-6 border-b border-[#27272a] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#b59a6d]" />
              <h3 className="font-editorial-caps text-xs tracking-widest text-[#f4f3ef]">
                SHOPPING BAG ({items.reduce((sum, i) => sum + i.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={closeCart}
              aria-label="Close bag"
              className="p-1.5 text-[#a1a1aa] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-2">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full border border-[#27272a] flex items-center justify-center text-[#71717a]">
                  <ShoppingBag className="w-8 h-8 stroke-1" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-lg font-light text-[#f4f3ef]">Your Bag is Empty</h4>
                  <p className="text-xs text-[#71717a] font-light max-w-xs">
                    Discover the Autumn/Winter 2026 collection and timeless maison icons.
                  </p>
                </div>
                <Link
                  href="/collections"
                  onClick={closeCart}
                  className="mt-4 inline-block bg-[#f4f3ef] text-[#09090b] text-xs font-editorial-caps px-6 py-3 hover:bg-[#b59a6d] hover:text-[#09090b] transition-colors"
                >
                  EXPLORE COLLECTIONS
                </Link>
              </div>
            ) : (
              <div>
                {items.map((item) => (
                  <CartItemRow key={item.id} item={item} onCloseDrawer={closeCart} />
                ))}
              </div>
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#27272a] bg-[#111114] space-y-4">
              {/* Promo code */}
              <div className="space-y-1.5">
                {couponCode ? (
                  <div className="flex items-center justify-between bg-[#18181b] border border-[#b59a6d]/40 px-3 py-2 text-xs">
                    <span className="flex items-center gap-1.5 text-[#b59a6d] font-editorial-caps">
                      <Tag className="w-3.5 h-3.5" />
                      {couponCode} applied ({discountPercentage}% OFF)
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-[#71717a] hover:text-white underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      placeholder="Privilege or Promo Code..."
                      className="flex-1 bg-[#18181b] border border-[#27272a] px-3 py-2 text-xs text-[#f4f3ef] placeholder-[#71717a] focus:outline-none focus:border-[#b59a6d]"
                    />
                    <button
                      type="submit"
                      disabled={couponLoading}
                      className="bg-[#27272a] text-white px-3 py-2 text-xs font-editorial-caps hover:bg-[#3f3f46] transition-colors"
                    >
                      {couponLoading ? "..." : "APPLY"}
                    </button>
                  </form>
                )}
                {couponError && <p className="text-[10px] text-rose-400">{couponError}</p>}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs font-light text-[#a1a1aa] border-t border-[#27272a] pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-serif text-[#f4f3ef]">{formatCurrency(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#b59a6d]">
                    <span>Privilege Courtesy</span>
                    <span>-{formatCurrency(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Maison White-Glove Delivery</span>
                  <span className="text-[#b59a6d] font-editorial-caps text-[10px]">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-[#f4f3ef] border-t border-[#27272a] pt-2">
                  <span className="font-editorial-caps text-xs">ESTIMATED TOTAL</span>
                  <span className="font-serif text-base text-[#f4f3ef]">{formatCurrency(total)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full bg-[#f4f3ef] text-[#09090b] py-3.5 px-6 font-editorial-caps text-xs flex items-center justify-center gap-2 hover:bg-[#b59a6d] transition-colors duration-300"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="w-full block text-center py-2 text-[11px] font-editorial-caps text-[#a1a1aa] hover:text-white transition-colors"
                >
                  VIEW FULL BAG
                </Link>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#71717a]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#b59a6d]" />
                <span>Encrypted 256-bit Maison Payment Security</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
