"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ShoppingBag, Heart, ArrowRight, Check } from "lucide-react";
import { useUI } from "@/lib/store/uiStore";
import { useCart } from "@/lib/store/cartStore";
import { useWishlist } from "@/lib/store/wishlistStore";
import { formatCurrency } from "@/lib/utils";

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, closeQuickView, showToast, openSizeGuide } = useUI();
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!quickViewProduct) return null;

  const isLiked = isInWishlist(quickViewProduct.id);

  const images = quickViewProduct.images && quickViewProduct.images.length > 0
    ? quickViewProduct.images
    : [{ url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop", id: "default", isPrimary: true, order: 1, productId: quickViewProduct.id }];

  const variants = quickViewProduct.variants || [];

  const handleAdd = () => {
    const sizeToUse = selectedSize || (variants[0] && variants[0].size) || null;
    const colorToUse = selectedColor || quickViewProduct.color || null;
    const variantId = variants.find((v) => v.size === sizeToUse)?.id || variants[0]?.id || null;

    addItem(quickViewProduct, sizeToUse, colorToUse, variantId, 1);
    showToast(`Added ${quickViewProduct.name} to your bag`);
    closeQuickView();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0d0d0f] border border-[#27272a] max-w-4xl w-full p-6 sm:p-8 text-[#f4f3ef] shadow-2xl relative animate-fade-in">
        {/* Close */}
        <button
          onClick={closeQuickView}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 text-[#a1a1aa] hover:text-white p-2"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left: Product Images */}
          <div className="md:col-span-6 space-y-3">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#18181b]">
              <Image
                src={images[activeImageIndex]?.url || images[0].url}
                alt={quickViewProduct.name}
                fill
                className="object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={img.id || idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 aspect-[3/4] border transition-colors flex-shrink-0 ${
                      activeImageIndex === idx ? "border-[#b59a6d]" : "border-[#27272a]"
                    }`}
                  >
                    <Image src={img.url} alt="thumbnail" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info & Actions */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between text-[10px] font-editorial-caps text-[#b59a6d]">
                <span>{quickViewProduct.category?.name || "MAISON CREATION"}</span>
                <span>{quickViewProduct.origin}</span>
              </div>
              <h3 className="font-serif text-2xl text-[#f4f3ef] font-light mt-1">
                {quickViewProduct.name}
              </h3>
              <p className="font-serif text-lg text-[#f4f3ef] mt-2">
                {formatCurrency(quickViewProduct.price)}
              </p>
              <p className="text-xs text-[#a1a1aa] font-light leading-relaxed mt-3">
                {quickViewProduct.description}
              </p>

              {/* Material */}
              <div className="mt-4 pt-3 border-t border-[#27272a] text-xs text-[#71717a]">
                <span className="font-editorial-caps text-[10px] text-[#d4d4d8] block mb-1">
                  MATERIAL & COMPOSITION
                </span>
                <p className="font-light">{quickViewProduct.material}</p>
              </div>

              {/* Size Selector */}
              {variants.length > 0 && (
                <div className="mt-4 pt-3 border-t border-[#27272a]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-editorial-caps text-[#d4d4d8]">
                      SELECT PROPORTION / SIZE
                    </span>
                    <button
                      onClick={openSizeGuide}
                      className="text-[10px] text-[#b59a6d] underline hover:text-white"
                    >
                      Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedSize(v.size)}
                        className={`px-3 py-2 text-xs border transition-colors ${
                          (selectedSize || variants[0].size) === v.size
                            ? "border-[#b59a6d] bg-[#b59a6d]/10 text-white"
                            : "border-[#27272a] text-[#a1a1aa] hover:border-[#52525b]"
                        }`}
                      >
                        {v.size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="space-y-3 pt-4 border-t border-[#27272a]">
              <div className="flex gap-3">
                <button
                  onClick={handleAdd}
                  className="flex-1 bg-[#f4f3ef] text-[#09090b] py-3.5 px-6 text-xs font-editorial-caps flex items-center justify-center gap-2 hover:bg-[#b59a6d] transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO BAG</span>
                </button>
                <button
                  onClick={() => {
                    toggleWishlist(quickViewProduct);
                    showToast(isLiked ? "Removed from wishlist" : "Saved to wishlist");
                  }}
                  className="p-3.5 border border-[#27272a] text-white hover:text-[#b59a6d] hover:border-[#b59a6d] transition-colors"
                >
                  <Heart className={`w-4 h-4 ${isLiked ? "fill-[#b59a6d] text-[#b59a6d]" : ""}`} />
                </button>
              </div>

              <Link
                href={`/products/${quickViewProduct.slug}`}
                onClick={closeQuickView}
                className="w-full block text-center py-2 text-xs font-editorial-caps text-[#a1a1aa] hover:text-white transition-colors"
              >
                VIEW COMPLETE MAISON DOSSIER →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
