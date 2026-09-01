"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ShoppingBag, ShieldCheck, Tag, Trash2 } from "lucide-react";
import { useCart } from "@/lib/store/cartStore";
import { CartItemRow } from "@/components/cart/CartItemRow";
import { formatCurrency } from "@/lib/utils";

export default function CartPage() {
  const {
    items,
    getSubtotal,
    getDiscountAmount,
    getTotal,
    couponCode,
    applyCoupon,
    removeCoupon,
    discountPercentage,
    clearCart,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");

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
    <div className="bg-[#09090b] text-[#f4f3ef] pt-32 sm:pt-40 pb-24 min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#27272a] pb-6 mb-12 flex items-baseline justify-between">
          <div>
            <span className="text-[10px] font-editorial-caps text-[#b59a6d] tracking-widest block mb-1">
              MAISON SHOPPING BAG
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#f4f3ef] font-light">
              Your Selection ({items.reduce((s, i) => s + i.quantity, 0)})
            </h1>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs font-editorial-caps text-[#71717a] hover:text-white flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>EMPTY BAG</span>
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="py-24 text-center space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full border border-[#27272a] flex items-center justify-center text-[#71717a] mx-auto">
              <ShoppingBag className="w-8 h-8 stroke-1" />
            </div>
            <h2 className="font-serif text-2xl font-light text-[#f4f3ef]">Your Bag is Empty</h2>
            <p className="text-xs text-[#a1a1aa] font-light leading-relaxed">
              Explore the latest Autumn / Winter 2026 collection and iconic handcrafted Italian leather goods.
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Items List */}
            <div className="lg:col-span-8 space-y-2">
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4">
              <div className="bg-[#111114] border border-[#27272a] p-6 sm:p-8 space-y-6 sticky top-28">
                <h3 className="font-editorial-caps text-xs tracking-widest text-[#b59a6d] border-b border-[#27272a] pb-3">
                  ACQUISITION SUMMARY
                </h3>

                {/* Promo Code */}
                <div className="space-y-2">
                  {couponCode ? (
                    <div className="flex items-center justify-between bg-[#18181b] border border-[#b59a6d]/40 px-3 py-2 text-xs">
                      <span className="flex items-center gap-1.5 text-[#b59a6d] font-editorial-caps">
                        <Tag className="w-3.5 h-3.5" />
                        {couponCode} ({discountPercentage}% OFF)
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
                        placeholder="Privilege code..."
                        className="flex-1 bg-[#18181b] border border-[#27272a] px-3 py-2 text-xs text-[#f4f3ef] placeholder-[#71717a] focus:outline-none focus:border-[#b59a6d]"
                      />
                      <button
                        type="submit"
                        disabled={couponLoading}
                        className="bg-[#27272a] text-white px-4 py-2 text-xs font-editorial-caps hover:bg-[#3f3f46] transition-colors"
                      >
                        {couponLoading ? "..." : "APPLY"}
                      </button>
                    </form>
                  )}
                  {couponError && <p className="text-[10px] text-rose-400">{couponError}</p>}
                </div>

                {/* Subtotals */}
                <div className="space-y-3 text-xs font-light text-[#a1a1aa] border-t border-[#27272a] pt-4">
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
                    <span>White-Glove Express Shipping</span>
                    <span className="text-[#b59a6d] font-editorial-caps text-[10px]">
                      COMPLIMENTARY
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Import & Taxes</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-base font-medium text-[#f4f3ef] border-t border-[#27272a] pt-4">
                    <span className="font-editorial-caps text-xs">TOTAL ESTIMATE</span>
                    <span className="font-serif text-xl">{formatCurrency(total)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <div className="space-y-3 pt-2">
                  <Link
                    href="/checkout"
                    className="w-full bg-[#f4f3ef] text-[#09090b] py-4 px-6 font-editorial-caps text-xs flex items-center justify-center gap-2 hover:bg-[#b59a6d] transition-colors duration-300"
                  >
                    <span>PROCEED TO SECURE CHECKOUT</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="flex items-center justify-center gap-2 text-[10px] text-[#71717a] pt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#b59a6d]" />
                  <span>256-Bit Encrypted Luxury Transaction</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
