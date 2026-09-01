"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "@/lib/store/cartStore";
import { useAuth } from "@/lib/store/authStore";
import { formatCurrency } from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getDiscountAmount, getTotal, couponCode, clearCart } = useCart();
  const { user } = useAuth();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Step 1: Customer & Address Information
  const [customerEmail, setCustomerEmail] = useState(user?.email || "");
  const [customerName, setCustomerName] = useState(user?.name || "");
  const [customerPhone, setCustomerPhone] = useState(user?.phone || "");
  const [street, setStreet] = useState("");
  const [suite, setSuite] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("United States");
  const [giftWrapping, setGiftWrapping] = useState(true);
  const [orderNotes, setOrderNotes] = useState("");

  // Step 2: Shipping Option
  const [shippingMethod, setShippingMethod] = useState("express");

  // Step 3: Payment
  const [paymentProvider, setPaymentProvider] = useState<"card" | "apple" | "wire">("card");
  const [cardNumber, setCardNumber] = useState("•••• •••• •••• 4242");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvc, setCardCvc] = useState("888");

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="bg-[#09090b] text-[#f4f3ef] pt-40 pb-24 text-center min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <ShoppingBag className="w-12 h-12 text-[#71717a] stroke-1" />
        <h2 className="font-serif text-2xl font-light">Your shopping bag is empty</h2>
        <p className="text-xs text-[#a1a1aa] max-w-sm">
          Please add items to your shopping bag before proceeding to checkout.
        </p>
        <Link
          href="/collections"
          className="bg-[#f4f3ef] text-[#09090b] px-8 py-3 text-xs font-editorial-caps hover:bg-[#b59a6d] transition-colors"
        >
          EXPLORE CREATIONS
        </Link>
      </div>
    );
  }

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerEmail || !customerName || !street || !city || !postalCode) {
      setErrorMessage("Please complete all required shipping fields.");
      return;
    }
    setErrorMessage("");
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage("");

    try {
      const payload = {
        customerEmail,
        customerName,
        customerPhone,
        shippingAddress: {
          fullName: customerName,
          street,
          suite,
          city,
          state,
          postalCode,
          country,
          phone: customerPhone,
        },
        items: items.map((i) => ({
          productId: i.productId,
          variantId: i.variantId,
          size: i.size,
          color: i.color,
          quantity: i.quantity,
        })),
        paymentMethod:
          paymentProvider === "card"
            ? "Maison Secure Credit Card"
            : paymentProvider === "apple"
            ? "Apple Pay"
            : "Direct Luxury Wire Transfer",
        couponCode,
        notes: giftWrapping
          ? `[Signature Maison Gift Packaging] ${orderNotes}`
          : orderNotes,
      };

      const res = await fetch("/api/checkout/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        clearCart();
        router.push(
          `/checkout/confirmation?orderNumber=${data.order.orderNumber}&email=${encodeURIComponent(
            customerEmail
          )}`
        );
      } else {
        setErrorMessage(data.error || "Failed to process order. Please try again.");
      }
    } catch {
      setErrorMessage("An unexpected network error occurred while processing order.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#09090b] text-[#f4f3ef] pt-32 sm:pt-36 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Steps Indicator */}
        <div className="border-b border-[#27272a] pb-8 mb-12">
          <div className="flex items-center justify-between">
            <span className="font-serif text-xl sm:text-2xl tracking-[0.25em] font-light">
              luxury.<span className="italic text-[#b59a6d]">Raw</span>
            </span>
            <div className="flex items-center gap-2 text-xs font-editorial-caps text-[#71717a]">
              <Lock className="w-3.5 h-3.5 text-[#b59a6d]" />
              <span>ENCRYPTED MAISON CHECKOUT</span>
            </div>
          </div>

          {/* Stepper */}
          <div className="flex items-center justify-center gap-4 sm:gap-12 mt-8 text-xs font-editorial-caps">
            <div
              className={`flex items-center gap-2 ${
                step >= 1 ? "text-[#f4f3ef]" : "text-[#52525b]"
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${
                  step >= 1 ? "bg-[#b59a6d] text-black font-bold" : "border border-[#52525b]"
                }`}
              >
                1
              </span>
              <span>INFORMATION</span>
            </div>

            <div className="w-8 sm:w-16 h-px bg-[#27272a]" />

            <div
              className={`flex items-center gap-2 ${
                step >= 2 ? "text-[#f4f3ef]" : "text-[#52525b]"
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${
                  step >= 2 ? "bg-[#b59a6d] text-black font-bold" : "border border-[#52525b]"
                }`}
              >
                2
              </span>
              <span>DELIVERY</span>
            </div>

            <div className="w-8 sm:w-16 h-px bg-[#27272a]" />

            <div
              className={`flex items-center gap-2 ${
                step >= 3 ? "text-[#f4f3ef]" : "text-[#52525b]"
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${
                  step >= 3 ? "bg-[#b59a6d] text-black font-bold" : "border border-[#52525b]"
                }`}
              >
                3
              </span>
              <span>PAYMENT</span>
            </div>
          </div>
        </div>

        {/* Checkout Main Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Form Column */}
          <div className="lg:col-span-7">
            {errorMessage && (
              <div className="mb-6 p-4 bg-rose-950/40 border border-rose-800 text-rose-300 text-xs">
                {errorMessage}
              </div>
            )}

            {/* STEP 1: Client & Shipping Info */}
            {step === 1 && (
              <form onSubmit={handleStep1Submit} className="space-y-8 animate-fade-in">
                {/* Contact */}
                <div className="space-y-4">
                  <h3 className="font-editorial-caps text-xs tracking-widest text-[#b59a6d] border-b border-[#27272a] pb-2">
                    1. CLIENT CONTACT INFORMATION
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-[#a1a1aa]">Email Address for Order Confirmation *</label>
                      <input
                        type="email"
                        required
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="client@luxuryraw.com"
                        className="w-full bg-[#121214] border border-[#27272a] p-3 text-[#f4f3ef] placeholder-[#52525b] focus:border-[#b59a6d] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[#a1a1aa]">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Madame Vivienne Laurent"
                        className="w-full bg-[#121214] border border-[#27272a] p-3 text-[#f4f3ef] placeholder-[#52525b] focus:border-[#b59a6d] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[#a1a1aa]">Telephone (For Courier Updates)</label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="+1 (212) 555-0188"
                        className="w-full bg-[#121214] border border-[#27272a] p-3 text-[#f4f3ef] placeholder-[#52525b] focus:border-[#b59a6d] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="space-y-4">
                  <h3 className="font-editorial-caps text-xs tracking-widest text-[#b59a6d] border-b border-[#27272a] pb-2">
                    2. SHIPPING DESTINATION
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-[#a1a1aa]">Street Address *</label>
                      <input
                        type="text"
                        required
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder="750 Park Avenue"
                        className="w-full bg-[#121214] border border-[#27272a] p-3 text-[#f4f3ef] placeholder-[#52525b] focus:border-[#b59a6d] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[#a1a1aa]">Apartment, Suite, Unit</label>
                      <input
                        type="text"
                        value={suite}
                        onChange={(e) => setSuite(e.target.value)}
                        placeholder="Apt 14B"
                        className="w-full bg-[#121214] border border-[#27272a] p-3 text-[#f4f3ef] placeholder-[#52525b] focus:border-[#b59a6d] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[#a1a1aa]">City *</label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="New York"
                        className="w-full bg-[#121214] border border-[#27272a] p-3 text-[#f4f3ef] placeholder-[#52525b] focus:border-[#b59a6d] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[#a1a1aa]">State / Region *</label>
                      <input
                        type="text"
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="NY"
                        className="w-full bg-[#121214] border border-[#27272a] p-3 text-[#f4f3ef] placeholder-[#52525b] focus:border-[#b59a6d] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[#a1a1aa]">Postal / ZIP Code *</label>
                      <input
                        type="text"
                        required
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="10021"
                        className="w-full bg-[#121214] border border-[#27272a] p-3 text-[#f4f3ef] placeholder-[#52525b] focus:border-[#b59a6d] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-[#a1a1aa]">Country *</label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full bg-[#121214] border border-[#27272a] p-3 text-[#f4f3ef] focus:border-[#b59a6d] focus:outline-none"
                      >
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="France">France</option>
                        <option value="Italy">Italy</option>
                        <option value="Germany">Germany</option>
                        <option value="Japan">Japan</option>
                        <option value="Switzerland">Switzerland</option>
                        <option value="United Arab Emirates">United Arab Emirates</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Gift Option */}
                <div className="p-4 bg-[#111114] border border-[#27272a] space-y-2 text-xs">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={giftWrapping}
                      onChange={(e) => setGiftWrapping(e.target.checked)}
                      className="accent-[#b59a6d] w-4 h-4"
                    />
                    <span className="font-editorial-caps text-[#f4f3ef]">
                      Include Complimentary Signature Maison Raw-Linen Gift Packaging
                    </span>
                  </label>
                  <p className="text-[#71717a] text-[11px] pl-7">
                    Includes handwritten calligraphy card and embossed protective dust box.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#f4f3ef] text-[#09090b] py-4 text-xs font-editorial-caps flex items-center justify-center gap-2 hover:bg-[#b59a6d] transition-colors"
                >
                  <span>CONTINUE TO DELIVERY OPTIONS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* STEP 2: Delivery Option */}
            {step === 2 && (
              <form onSubmit={handleStep2Submit} className="space-y-8 animate-fade-in">
                <div className="space-y-4">
                  <h3 className="font-editorial-caps text-xs tracking-widest text-[#b59a6d] border-b border-[#27272a] pb-2">
                    SELECT DELIVERY SERVICE
                  </h3>

                  <div className="space-y-3">
                    <label
                      onClick={() => setShippingMethod("express")}
                      className={`block p-5 border transition-colors cursor-pointer ${
                        shippingMethod === "express"
                          ? "border-[#b59a6d] bg-[#b59a6d]/10"
                          : "border-[#27272a] bg-[#121214]"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-editorial-caps text-xs text-[#f4f3ef]">
                              MAISON WHITE-GLOVE AIR EXPRESS
                            </span>
                            <span className="bg-[#b59a6d] text-black text-[9px] font-bold px-2 py-0.5 rounded-full">
                              RECOMMENDED
                            </span>
                          </div>
                          <p className="text-xs text-[#a1a1aa]">
                            Tracked delivery with carbon-neutral transit. Estimated arrival: 2–3 business days.
                          </p>
                        </div>
                        <span className="font-editorial-caps text-xs text-[#b59a6d]">COMPLIMENTARY</span>
                      </div>
                    </label>

                    <label
                      onClick={() => setShippingMethod("boutique")}
                      className={`block p-5 border transition-colors cursor-pointer ${
                        shippingMethod === "boutique"
                          ? "border-[#b59a6d] bg-[#b59a6d]/10"
                          : "border-[#27272a] bg-[#121214]"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <span className="font-editorial-caps text-xs text-[#f4f3ef]">
                            IN-BOUTIQUE PRIVATE SALON HANDOVER
                          </span>
                          <p className="text-xs text-[#a1a1aa]">
                            Collect with your personal concierge at any global flagship (Paris, Milan, New York).
                          </p>
                        </div>
                        <span className="font-editorial-caps text-xs text-[#b59a6d]">COMPLIMENTARY</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 border border-[#27272a] text-xs font-editorial-caps py-4 hover:border-white transition-colors"
                  >
                    BACK
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 bg-[#f4f3ef] text-[#09090b] py-4 text-xs font-editorial-caps flex items-center justify-center gap-2 hover:bg-[#b59a6d] transition-colors"
                  >
                    <span>PROCEED TO PAYMENT</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: Payment */}
            {step === 3 && (
              <form onSubmit={handlePlaceOrder} className="space-y-8 animate-fade-in">
                <div className="space-y-4">
                  <h3 className="font-editorial-caps text-xs tracking-widest text-[#b59a6d] border-b border-[#27272a] pb-2">
                    SELECT PAYMENT METHOD
                  </h3>

                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentProvider("card")}
                      className={`p-4 border text-center transition-colors ${
                        paymentProvider === "card"
                          ? "border-[#b59a6d] bg-[#b59a6d]/10 text-white"
                          : "border-[#27272a] text-[#71717a] hover:text-white"
                      }`}
                    >
                      <CreditCard className="w-5 h-5 mx-auto mb-1 text-[#b59a6d]" />
                      <span className="text-[10px] font-editorial-caps">CREDIT CARD</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentProvider("apple")}
                      className={`p-4 border text-center transition-colors ${
                        paymentProvider === "apple"
                          ? "border-[#b59a6d] bg-[#b59a6d]/10 text-white"
                          : "border-[#27272a] text-[#71717a] hover:text-white"
                      }`}
                    >
                      <Sparkles className="w-5 h-5 mx-auto mb-1 text-[#b59a6d]" />
                      <span className="text-[10px] font-editorial-caps">APPLE PAY</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentProvider("wire")}
                      className={`p-4 border text-center transition-colors ${
                        paymentProvider === "wire"
                          ? "border-[#b59a6d] bg-[#b59a6d]/10 text-white"
                          : "border-[#27272a] text-[#71717a] hover:text-white"
                      }`}
                    >
                      <ShieldCheck className="w-5 h-5 mx-auto mb-1 text-[#b59a6d]" />
                      <span className="text-[10px] font-editorial-caps">MAISON WIRE</span>
                    </button>
                  </div>

                  {paymentProvider === "card" && (
                    <div className="p-5 bg-[#121214] border border-[#27272a] space-y-4 text-xs animate-fade-in">
                      <div className="space-y-1.5">
                        <label className="text-[#a1a1aa]">Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-[#18181b] border border-[#27272a] p-3 text-[#f4f3ef] focus:border-[#b59a6d] focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[#a1a1aa]">Expiration</label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full bg-[#18181b] border border-[#27272a] p-3 text-[#f4f3ef] focus:border-[#b59a6d] focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[#a1a1aa]">Security CVC</label>
                          <input
                            type="text"
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            className="w-full bg-[#18181b] border border-[#27272a] p-3 text-[#f4f3ef] focus:border-[#b59a6d] focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentProvider === "apple" && (
                    <div className="p-6 bg-[#121214] border border-[#27272a] text-center space-y-2 text-xs">
                      <p className="text-[#d4d4d8]">Apple Pay is authorized on this device.</p>
                      <p className="text-[#71717a]">Biometric verification will prompt upon placing order.</p>
                    </div>
                  )}

                  {paymentProvider === "wire" && (
                    <div className="p-6 bg-[#121214] border border-[#27272a] text-xs space-y-2 text-[#a1a1aa]">
                      <p className="text-[#d4d4d8] font-medium">Maison Private Bank Settlement:</p>
                      <p>Orders over $3,000 may be cleared via direct IBAN wire transfer with immediate reserved atelier allocation.</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-1/3 border border-[#27272a] text-xs font-editorial-caps py-4 hover:border-white transition-colors"
                  >
                    BACK
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-2/3 bg-[#f4f3ef] text-[#09090b] py-4 text-xs font-editorial-caps flex items-center justify-center gap-2 hover:bg-[#b59a6d] transition-colors"
                  >
                    <span>{submitting ? "AUTHORIZING ACQUISITION..." : `CONFIRM ACQUISITION (${formatCurrency(total)})`}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Summary Column */}
          <div className="lg:col-span-5">
            <div className="bg-[#111114] border border-[#27272a] p-6 sm:p-8 space-y-6 sticky top-28">
              <h3 className="font-editorial-caps text-xs tracking-widest text-[#b59a6d] border-b border-[#27272a] pb-3">
                ORDER REVIEW ({items.reduce((s, i) => s + i.quantity, 0)})
              </h3>

              {/* Items preview list */}
              <div className="space-y-4 max-h-72 overflow-y-auto no-scrollbar pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 text-xs">
                    <div className="relative aspect-[3/4] w-14 bg-[#18181b] overflow-hidden flex-shrink-0">
                      <Image
                        src={item.product.images[0]?.url || "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop"}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h5 className="font-serif text-sm text-[#f4f3ef] line-clamp-1">{item.product.name}</h5>
                        <p className="text-[11px] text-[#71717a]">
                          Qty: {item.quantity} {item.size && `• Size: ${item.size}`}
                        </p>
                      </div>
                      <span className="font-serif text-xs text-[#d4d4d8]">
                        {formatCurrency(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2.5 text-xs font-light text-[#a1a1aa] border-t border-[#27272a] pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-serif text-[#f4f3ef]">{formatCurrency(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#b59a6d]">
                    <span>Privilege Code ({couponCode})</span>
                    <span>-{formatCurrency(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>White-Glove Express Shipping</span>
                  <span className="text-[#b59a6d] font-editorial-caps text-[10px]">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between text-base font-medium text-[#f4f3ef] border-t border-[#27272a] pt-4">
                  <span className="font-editorial-caps text-xs">TOTAL</span>
                  <span className="font-serif text-xl">{formatCurrency(total)}</span>
                </div>
              </div>

              <div className="p-3 bg-[#18181b] border border-[#27272a]/60 text-[11px] text-[#71717a] space-y-1">
                <p className="flex items-center gap-1.5 text-[#d4d4d8]">
                  <Truck className="w-3.5 h-3.5 text-[#b59a6d]" />
                  <span>Complimentary White-Glove Dispatch</span>
                </p>
                <p>Includes certificate of authenticity signed by the master artisan.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
