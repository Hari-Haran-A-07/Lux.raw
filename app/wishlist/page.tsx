"use client";

import React from "react";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useWishlist } from "@/lib/store/wishlistStore";
import { useCart } from "@/lib/store/cartStore";
import { useUI } from "@/lib/store/uiStore";
import { ProductCard } from "@/components/product/ProductCard";

export default function WishlistPage() {
  const { items, clearWishlist } = useWishlist();
  const { addItem } = useCart();
  const { showToast } = useUI();

  const handleMoveAllToBag = () => {
    items.forEach((item) => {
      const defaultVariant = item.product.variants && item.product.variants[0];
      addItem(
        item.product,
        defaultVariant?.size || null,
        defaultVariant?.color || item.product.color || null,
        defaultVariant?.id || null,
        1
      );
    });
    showToast(`Moved ${items.length} items to your shopping bag`);
  };

  return (
    <div className="bg-[#09090b] text-[#f4f3ef] pt-32 sm:pt-40 pb-24 min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#27272a] pb-6 mb-12 flex items-baseline justify-between">
          <div>
            <span className="text-[10px] font-editorial-caps text-[#b59a6d] tracking-widest block mb-1">
              SAVED CREATIONS
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#f4f3ef] font-light">
              Your Personal Wishlist ({items.length})
            </h1>
          </div>

          {items.length > 0 && (
            <div className="flex items-center gap-4">
              <button
                onClick={handleMoveAllToBag}
                className="hidden sm:flex items-center gap-2 bg-[#f4f3ef] text-[#09090b] px-4 py-2 text-xs font-editorial-caps hover:bg-[#b59a6d] transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>MOVE ALL TO BAG</span>
              </button>
              <button
                onClick={clearWishlist}
                className="text-xs font-editorial-caps text-[#71717a] hover:text-white flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>CLEAR</span>
              </button>
            </div>
          )}
        </div>

        {items.length === 0 ? (
          <div className="py-24 text-center space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full border border-[#27272a] flex items-center justify-center text-[#71717a] mx-auto">
              <Heart className="w-8 h-8 stroke-1" />
            </div>
            <h2 className="font-serif text-2xl font-light text-[#f4f3ef]">No Saved Creations</h2>
            <p className="text-xs text-[#a1a1aa] font-light leading-relaxed">
              Save your favourite seasonal garments, iconic handbags, and sculptural jewelry while exploring the collections.
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <ProductCard key={item.productId} product={item.product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
