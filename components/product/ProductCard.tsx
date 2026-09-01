"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Eye, ShoppingBag } from "lucide-react";
import { Product } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { useWishlist } from "@/lib/store/wishlistStore";
import { useCart } from "@/lib/store/cartStore";
import { useUI } from "@/lib/store/uiStore";

interface ProductCardProps {
  product: Product;
  aspectRatio?: "3/4" | "4/5" | "1/1";
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  aspectRatio = "3/4",
  priority = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addItem } = useCart();
  const { openQuickView, showToast } = useUI();

  const isLiked = isInWishlist(product.id);

  const primaryImage =
    (product.images && product.images[0]?.url) ||
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop";

  const secondaryImage =
    product.images && product.images.length > 1
      ? product.images[1].url
      : primaryImage;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    showToast(
      isLiked
        ? `Removed ${product.name} from your wishlist`
        : `Saved ${product.name} to your wishlist`
    );
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultVariant = product.variants && product.variants[0];
    addItem(
      product,
      defaultVariant?.size || null,
      defaultVariant?.color || product.color || null,
      defaultVariant?.id || null,
      1
    );
    showToast(`Added ${product.name} to your bag`);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  return (
    <div
      className="group relative flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#141416]">
        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label="Save to wishlist"
          className="absolute top-3 right-3 z-20 p-2.5 rounded-full bg-black/40 backdrop-blur-md text-white hover:text-[#b59a6d] hover:bg-black/70 transition-all duration-300"
        >
          <Heart
            className={`w-4 h-4 transition-transform active:scale-125 ${
              isLiked ? "fill-[#b59a6d] text-[#b59a6d]" : "text-white"
            }`}
          />
        </button>

        {/* Badges */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1">
          {product.newArrival && (
            <span className="bg-[#09090b]/80 backdrop-blur-md text-[#b59a6d] border border-[#b59a6d]/40 text-[9px] font-editorial-caps px-2 py-0.5 tracking-widest">
              NEW ARRIVAL
            </span>
          )}
          {product.bestseller && (
            <span className="bg-[#09090b]/80 backdrop-blur-md text-[#f4f3ef] border border-[#27272a] text-[9px] font-editorial-caps px-2 py-0.5 tracking-widest">
              ICON
            </span>
          )}
        </div>

        {/* Primary Image */}
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            priority={priority}
            className={`object-cover transition-all duration-700 ease-out ${
              isHovered && secondaryImage !== primaryImage
                ? "opacity-0 scale-105"
                : "opacity-100 scale-100"
            }`}
          />

          {/* Secondary Alternate Image on Hover */}
          {secondaryImage !== primaryImage && (
            <Image
              src={secondaryImage}
              alt={`${product.name} alternate angle`}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className={`object-cover transition-all duration-700 ease-out ${
                isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
              }`}
            />
          )}
        </Link>

        {/* Floating Quick Action Overlay on Hover */}
        <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-between gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <button
            onClick={handleQuickAdd}
            className="flex-1 bg-[#f4f3ef] text-[#09090b] py-2 text-[10px] font-editorial-caps flex items-center justify-center gap-1.5 hover:bg-[#b59a6d] transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>ADD TO BAG</span>
          </button>
          <button
            onClick={handleQuickView}
            aria-label="Quick view"
            className="bg-black/60 backdrop-blur-md text-white p-2 hover:text-[#b59a6d] hover:bg-black/90 transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="pt-4 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center justify-between text-[10px] font-editorial-caps text-[#71717a] mb-1">
            <span>{product.category?.name || "Maison Collection"}</span>
            {product.origin && <span>{product.origin}</span>}
          </div>

          <Link
            href={`/products/${product.slug}`}
            className="font-serif text-sm sm:text-base text-[#f4f3ef] hover:text-[#b59a6d] transition-colors font-light leading-snug line-clamp-1 block"
          >
            {product.name}
          </Link>

          {product.shortDescription && (
            <p className="text-xs text-[#a1a1aa] font-light line-clamp-1 mt-0.5">
              {product.shortDescription}
            </p>
          )}
        </div>

        {/* Price & Colors count */}
        <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-[#27272a]/50">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-sm text-[#f4f3ef] font-medium">
              {formatCurrency(product.price)}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-xs text-[#71717a] line-through font-serif">
                {formatCurrency(product.compareAtPrice)}
              </span>
            )}
          </div>

          {product.variants && product.variants.length > 1 && (
            <span className="text-[10px] font-editorial-caps text-[#71717a]">
              {product.variants.length} SHADES / SIZES
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
