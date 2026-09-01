"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, X } from "lucide-react";
import { CartItemType, useCart } from "@/lib/store/cartStore";
import { formatCurrency } from "@/lib/utils";

export const CartItemRow: React.FC<{ item: CartItemType; onCloseDrawer?: () => void }> = ({
  item,
  onCloseDrawer,
}) => {
  const { updateQuantity, removeItem } = useCart();

  const imageUrl =
    (item.product.images && item.product.images[0]?.url) ||
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop";

  return (
    <div className="flex gap-4 py-5 border-b border-[#27272a]/70 group">
      {/* Product Image */}
      <Link
        href={`/products/${item.product.slug}`}
        onClick={onCloseDrawer}
        className="relative aspect-[3/4] w-20 sm:w-24 bg-[#18181b] overflow-hidden flex-shrink-0"
      >
        <Image
          src={imageUrl}
          alt={item.product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <Link
              href={`/products/${item.product.slug}`}
              onClick={onCloseDrawer}
              className="font-serif text-sm text-[#f4f3ef] hover:text-[#b59a6d] transition-colors leading-snug"
            >
              {item.product.name}
            </Link>
            <button
              onClick={() => removeItem(item.id)}
              aria-label="Remove item"
              className="text-[#71717a] hover:text-white transition-colors p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Variants info */}
          <div className="mt-1 space-y-0.5 text-[11px] font-light text-[#a1a1aa]">
            {item.size && <p>Size: <span className="text-[#d4d4d8]">{item.size}</span></p>}
            {item.color && <p>Color: <span className="text-[#d4d4d8]">{item.color}</span></p>}
          </div>
        </div>

        {/* Quantity and Price */}
        <div className="flex items-center justify-between mt-3 pt-2">
          {/* Quantity Controls */}
          <div className="flex items-center border border-[#3f3f46]">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              aria-label="Decrease quantity"
              className="p-1.5 text-[#a1a1aa] hover:text-white transition-colors"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="px-2.5 text-xs font-medium text-white">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              aria-label="Increase quantity"
              className="p-1.5 text-[#a1a1aa] hover:text-white transition-colors"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <span className="font-serif text-sm text-[#f4f3ef]">
            {formatCurrency(item.product.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
};
