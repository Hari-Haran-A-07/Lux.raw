"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Ruler,
  Share2,
  Mail,
  Copy,
  Check,
  X,
  Send,
} from "lucide-react";
import { Product } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/lib/store/cartStore";
import { useWishlist } from "@/lib/store/wishlistStore";
import { useUI } from "@/lib/store/uiStore";
import { ProductCarousel } from "./ProductCarousel";

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  relatedProducts,
}) => {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast, openSizeGuide } = useUI();

  const isLiked = isInWishlist(product.id);

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareRecipientEmail, setShareRecipientEmail] = useState("");
  const [shareCustomMessage, setShareCustomMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const companyRecoveryEmail = "suryaharan786@gmail.com";

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [
          {
            id: "default",
            productId: product.id,
            url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop",
            alt: product.name,
            isPrimary: true,
            order: 1,
          },
        ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants && product.variants[0] ? product.variants[0] : null
  );
  const [selectedSize, setSelectedSize] = useState(
    product.variants && product.variants[0] ? product.variants[0].size : ""
  );

  // Accordions state
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    details: true,
    materials: false,
    care: false,
    shipping: false,
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAddToBag = () => {
    addItem(
      product,
      selectedSize || null,
      selectedVariant?.color || product.color || null,
      selectedVariant?.id || null,
      1
    );
    showToast(`Added ${product.name} to your bag`);
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      showToast("Creation link copied to clipboard");
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleOpenShare = () => {
    setIsShareModalOpen(true);
  };

  const handleDirectEmailShare = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window === "undefined") return;

    const pageUrl = window.location.href;
    const subject = encodeURIComponent(`luxury.Raw Maison Creation — ${product.name}`);
    const bodyContent = `${shareCustomMessage ? `${shareCustomMessage}\n\n` : ""}I would like to share this piece from luxury.Raw Maison with you:\n\n${product.name}\n${product.subtitle ? `${product.subtitle}\n` : ""}Price: ${formatCurrency(product.price)}\nMaterial: ${product.material}\nOrigin: ${product.origin}\n\nView piece: ${pageUrl}\n\nFor questions or bespoke appointments, contact Maison Concierge & Recovery at ${companyRecoveryEmail}.`;

    const mailtoUrl = `mailto:${encodeURIComponent(shareRecipientEmail)}?subject=${subject}&body=${encodeURIComponent(bodyContent)}`;
    window.open(mailtoUrl, "_blank");
    showToast("Mail client initialized");
    setIsShareModalOpen(false);
  };

  const handleInquireConcierge = () => {
    if (typeof window === "undefined") return;
    const pageUrl = window.location.href;
    const subject = encodeURIComponent(`Maison Concierge & Recovery Inquiry: ${product.name} (SKU: ${product.sku})`);
    const bodyContent = `Maison Concierge Advisor,\n\nI am requesting information regarding the ${product.name} (${formatCurrency(product.price)}).\n\nSelected Shade: ${selectedVariant?.color || product.color}\nSelected Proportion: ${selectedSize || "Standard"}\nLink: ${pageUrl}\n\nPlease contact me regarding bespoke order, sizing, or recovery inquiries.`;

    const mailtoUrl = `mailto:${companyRecoveryEmail}?subject=${subject}&body=${encodeURIComponent(bodyContent)}`;
    window.open(mailtoUrl, "_blank");
    showToast("Opening email to Maison Recovery Concierge");
  };

  return (
    <div className="bg-[#09090b] text-[#f4f3ef] pt-28 sm:pt-36 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-[11px] font-editorial-caps text-[#71717a] flex items-center gap-2 mb-8">
          <Link href="/" className="hover:text-white transition-colors">
            MAISON
          </Link>
          <span>/</span>
          <Link
            href={product.gender === "MEN" ? "/men" : "/women"}
            className="hover:text-white transition-colors"
          >
            {product.gender}
          </Link>
          <span>/</span>
          <Link
            href={`/${product.gender === "MEN" ? "men" : "women"}/${product.category?.slug}`}
            className="hover:text-white transition-colors"
          >
            {product.category?.name}
          </Link>
          <span>/</span>
          <span className="text-[#d4d4d8] truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Featured Image */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#141416] group">
              <Image
                src={images[activeImageIndex]?.url || images[0].url}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <button
                onClick={handleOpenShare}
                aria-label="Share product"
                className="absolute top-4 right-4 p-2.5 rounded-full bg-black/40 backdrop-blur-md text-white hover:text-[#b59a6d] transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* Thumbnail Row */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4 pt-2">
                {images.map((img, idx) => (
                  <button
                    key={img.id || idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-[3/4] overflow-hidden bg-[#141416] border transition-colors ${
                      activeImageIndex === idx ? "border-[#b59a6d]" : "border-[#27272a]/70 hover:border-[#52525b]"
                    }`}
                  >
                    <Image
                      src={img.url}
                      alt={`${product.name} view ${idx + 1}`}
                      fill
                      sizes="20vw"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Dossier & Purchase Controls */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Header Info */}
              <div className="space-y-2 border-b border-[#27272a] pb-6">
                <div className="flex items-center justify-between text-[10px] font-editorial-caps text-[#b59a6d]">
                  <span>{product.category?.name}</span>
                  <span>{product.origin}</span>
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl text-[#f4f3ef] font-light leading-tight">
                  {product.name}
                </h1>
                {product.subtitle && (
                  <p className="font-serif text-sm italic text-[#a1a1aa] font-light">
                    {product.subtitle}
                  </p>
                )}
                <div className="pt-2 flex items-baseline gap-3">
                  <span className="font-serif text-2xl text-[#f4f3ef]">
                    {formatCurrency(product.price)}
                  </span>
                  {product.compareAtPrice && product.compareAtPrice > product.price && (
                    <span className="text-sm font-serif text-[#71717a] line-through">
                      {formatCurrency(product.compareAtPrice)}
                    </span>
                  )}
                </div>
                <p className="text-[10px] font-editorial-caps text-[#71717a] pt-1">
                  SKU: {selectedVariant?.sku || product.sku}
                </p>
              </div>

              {/* Color Swatch */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-editorial-caps">
                  <span className="text-[#a1a1aa]">SHADE / HUE:</span>
                  <span className="text-[#f4f3ef] font-medium">
                    {selectedVariant?.color || product.color}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full border-2 border-[#b59a6d] p-0.5"
                    style={{
                      backgroundColor: selectedVariant?.colorHex || "#1a1a1a",
                    }}
                  />
                  <span className="text-xs text-[#a1a1aa] font-light">
                    Hand-Dyed Natural Aniline Pigments
                  </span>
                </div>
              </div>

              {/* Size Selector */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between text-xs font-editorial-caps">
                    <span className="text-[#a1a1aa]">PROPORTION / SIZING:</span>
                    <button
                      onClick={openSizeGuide}
                      className="flex items-center gap-1 text-[#b59a6d] underline hover:text-white transition-colors"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>SIZE GUIDE</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => {
                          setSelectedVariant(v);
                          setSelectedSize(v.size);
                        }}
                        className={`p-3 text-xs border text-left transition-colors flex flex-col justify-between ${
                          selectedSize === v.size
                            ? "border-[#b59a6d] bg-[#b59a6d]/10 text-white"
                            : "border-[#27272a] text-[#a1a1aa] hover:border-[#52525b]"
                        }`}
                      >
                        <span className="font-medium text-[#f4f3ef]">{v.size}</span>
                        <span className="text-[10px] text-[#71717a] mt-1">
                          {v.stock > 3 ? "In Stock" : v.stock > 0 ? `Only ${v.stock} left` : "Made to Order"}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <div className="flex gap-4">
                  <button
                    onClick={handleAddToBag}
                    className="flex-1 bg-[#f4f3ef] text-[#09090b] py-4 px-8 text-xs font-editorial-caps tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-[#b59a6d] transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO SHOPPING BAG</span>
                  </button>

                  <button
                    onClick={() => {
                      toggleWishlist(product);
                      showToast(isLiked ? "Removed from wishlist" : "Saved to wishlist");
                    }}
                    aria-label="Toggle wishlist"
                    className="p-4 border border-[#27272a] text-white hover:text-[#b59a6d] hover:border-[#b59a6d] transition-colors"
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? "fill-[#b59a6d] text-[#b59a6d]" : ""}`} />
                  </button>

                  <button
                    onClick={handleOpenShare}
                    aria-label="Share via Email or Link"
                    className="p-4 border border-[#27272a] text-white hover:text-[#b59a6d] hover:border-[#b59a6d] transition-colors flex items-center justify-center"
                    title="Mail Share & Direct Concierge"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#a1a1aa] px-1">
                  <button
                    onClick={handleOpenShare}
                    className="hover:text-[#b59a6d] flex items-center gap-1.5 transition-colors font-editorial-caps text-[10px]"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#b59a6d]" />
                    <span>MAIL SHARE THIS CREATION</span>
                  </button>

                  <button
                    onClick={handleInquireConcierge}
                    className="hover:text-[#b59a6d] flex items-center gap-1.5 transition-colors font-editorial-caps text-[10px]"
                  >
                    <span>CONCIERGE RECOVERY ADVICE</span>
                  </button>
                </div>

                <div className="p-3 bg-[#121214] border border-[#27272a]/60 text-xs text-[#a1a1aa] flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-[#b59a6d] flex-shrink-0" />
                  <span>Complimentary signature gift wrapping in custom raw-linen boxes included.</span>
                </div>
              </div>

              {/* Accordions */}
              <div className="border-t border-[#27272a] pt-4 space-y-4 text-xs font-light">
                {/* Description */}
                <div className="border-b border-[#27272a] pb-4">
                  <button
                    onClick={() => toggleAccordion("details")}
                    className="w-full flex items-center justify-between font-editorial-caps text-xs text-[#f4f3ef] py-2 text-left"
                  >
                    <span>ARCHITECTURAL DOSSIER & FORM</span>
                    {openAccordions.details ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordions.details && (
                    <div className="pt-2 text-[#a1a1aa] leading-relaxed space-y-2 animate-fade-in">
                      <p>{product.description}</p>
                    </div>
                  )}
                </div>

                {/* Materials */}
                <div className="border-b border-[#27272a] pb-4">
                  <button
                    onClick={() => toggleAccordion("materials")}
                    className="w-full flex items-center justify-between font-editorial-caps text-xs text-[#f4f3ef] py-2 text-left"
                  >
                    <span>COMPOSITION & ARTISANAL ORIGIN</span>
                    {openAccordions.materials ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordions.materials && (
                    <div className="pt-2 text-[#a1a1aa] leading-relaxed space-y-2 animate-fade-in">
                      <p><strong className="text-[#f4f3ef]">Material:</strong> {product.material}</p>
                      <p><strong className="text-[#f4f3ef]">Provenance:</strong> {product.origin}</p>
                      <p><strong className="text-[#f4f3ef]">Atelier Protocol:</strong> Unhurried slow vegetable tanning using chestnut and mimosa barks along the Arno river.</p>
                    </div>
                  )}
                </div>

                {/* Care */}
                <div className="border-b border-[#27272a] pb-4">
                  <button
                    onClick={() => toggleAccordion("care")}
                    className="w-full flex items-center justify-between font-editorial-caps text-xs text-[#f4f3ef] py-2 text-left"
                  >
                    <span>LIFETIME CARE & MAINTENANCE</span>
                    {openAccordions.care ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordions.care && (
                    <div className="pt-2 text-[#a1a1aa] leading-relaxed space-y-2 animate-fade-in">
                      <p>{product.careInstructions || "Avoid contact with water and abrasive chemicals. Store in provided cotton dust bag with cedar inserts."}</p>
                      <p>Complimentary bi-annual conditioning is available at all global flagships.</p>
                    </div>
                  )}
                </div>

                {/* Delivery */}
                <div className="border-b border-[#27272a] pb-4">
                  <button
                    onClick={() => toggleAccordion("shipping")}
                    className="w-full flex items-center justify-between font-editorial-caps text-xs text-[#f4f3ef] py-2 text-left"
                  >
                    <span>WHITE-GLOVE DELIVERY & EXCHANGES</span>
                    {openAccordions.shipping ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordions.shipping && (
                    <div className="pt-2 text-[#a1a1aa] leading-relaxed space-y-2 animate-fade-in">
                      <p className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-[#b59a6d]" />
                        <span>Complimentary worldwide express courier delivery (2–4 business days).</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <RotateCcw className="w-4 h-4 text-[#b59a6d]" />
                        <span>Complimentary returns and size exchanges within 30 days of receipt.</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#b59a6d]" />
                        <span>Fully insured shipment with required adult signature upon handover.</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Product Carousel */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-12 border-t border-[#27272a]/60">
            <ProductCarousel
              title="You May Also Admire"
              subtitle="CURATED COMPANION PIECES"
              products={relatedProducts}
            />
          </div>
        )}

        {/* Mail Share & Concierge Modal */}
        {isShareModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-[#111114] border border-[#27272a] max-w-lg w-full p-6 sm:p-8 space-y-6 text-xs text-[#f4f3ef] relative">
              
              {/* Close Button */}
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-[#71717a] hover:text-white transition-colors"
                aria-label="Close share modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="space-y-1">
                <span className="text-[10px] font-editorial-caps text-[#b59a6d] tracking-[0.25em]">
                  MAISON MAIL SHARE & CONCIERGE
                </span>
                <h3 className="font-serif text-2xl font-light text-[#f4f3ef]">
                  Share {product.name}
                </h3>
                <p className="text-[11px] text-[#a1a1aa] font-light">
                  Transmit this sculptural piece via private digital mail, link dispatch, or consult directly with Maison Recovery & Concierge.
                </p>
              </div>

              {/* Quick Actions Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 1. Direct Email App */}
                <button
                  onClick={handleDirectEmailShare}
                  className="p-4 bg-[#18181b] border border-[#27272a] hover:border-[#b59a6d] text-left transition-colors group flex flex-col justify-between space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <Mail className="w-4 h-4 text-[#b59a6d]" />
                    <span className="text-[10px] font-editorial-caps text-[#71717a] group-hover:text-white">OPEN MAIL</span>
                  </div>
                  <div>
                    <strong className="block text-white">Default Mail Client</strong>
                    <span className="text-[10px] text-[#a1a1aa]">Launch Outlook, Apple Mail, Gmail</span>
                  </div>
                </button>

                {/* 2. Inquire with Recovery Concierge */}
                <button
                  onClick={handleInquireConcierge}
                  className="p-4 bg-[#18181b] border border-[#b59a6d]/40 hover:border-[#b59a6d] text-left transition-colors group flex flex-col justify-between space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <Send className="w-4 h-4 text-[#b59a6d]" />
                    <span className="text-[10px] font-editorial-caps text-[#b59a6d]">CONCIERGE</span>
                  </div>
                  <div>
                    <strong className="block text-white">Maison Recovery Advisor</strong>
                    <span className="text-[10px] text-[#b59a6d] font-mono">{companyRecoveryEmail}</span>
                  </div>
                </button>
              </div>

              {/* Custom Recipient Mail Form */}
              <form onSubmit={handleDirectEmailShare} className="space-y-3 pt-2 border-t border-[#27272a]">
                <div className="space-y-1">
                  <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">
                    RECIPIENT EMAIL ADDRESS (OPTIONAL)
                  </label>
                  <input
                    type="email"
                    value={shareRecipientEmail}
                    onChange={(e) => setShareRecipientEmail(e.target.value)}
                    placeholder="patron@domain.com"
                    className="w-full bg-[#18181b] border border-[#27272a] p-3 text-[#f4f3ef] placeholder-[#52525b] focus:border-[#b59a6d] focus:outline-none text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">
                    PERSONAL NOTE (OPTIONAL)
                  </label>
                  <textarea
                    rows={2}
                    value={shareCustomMessage}
                    onChange={(e) => setShareCustomMessage(e.target.value)}
                    placeholder="Admire this exceptional creation from luxury.Raw Maison..."
                    className="w-full bg-[#18181b] border border-[#27272a] p-3 text-[#f4f3ef] placeholder-[#52525b] focus:border-[#b59a6d] focus:outline-none text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#f4f3ef] text-[#09090b] py-3 text-xs font-editorial-caps flex items-center justify-center gap-2 hover:bg-[#b59a6d] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>TRANSMIT MAIL SHARE</span>
                </button>
              </form>

              {/* Copy URL Row */}
              <div className="pt-2 border-t border-[#27272a] flex items-center justify-between gap-2">
                <div className="bg-[#18181b] border border-[#27272a] px-3 py-2 text-[11px] text-[#71717a] truncate font-mono flex-1">
                  {typeof window !== "undefined" ? window.location.href : "https://luxuryraw.com/..."}
                </div>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="px-4 py-2 bg-[#27272a] hover:bg-[#3f3f46] text-white text-xs font-editorial-caps flex items-center gap-1.5 transition-colors flex-shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#b59a6d]" />
                      <span>COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY LINK</span>
                    </>
                  )}
                </button>
              </div>

              {/* Footer Company Recovery Note */}
              <div className="pt-2 text-center text-[10px] text-[#71717a] font-light">
                <span>Direct inquiries & recovery assistance: </span>
                <a href={`mailto:${companyRecoveryEmail}`} className="text-[#b59a6d] hover:underline font-mono">
                  {companyRecoveryEmail}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
