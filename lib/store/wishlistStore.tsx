"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "../types";

export interface WishlistItemType {
  productId: string;
  product: Product;
  addedAt: string;
}

interface WishlistContextType {
  items: WishlistItemType[];
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
  getCount: () => number;
}

const WISHLIST_STORAGE_KEY = "luxury_raw_wishlist_v1";

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<WishlistItemType[]>([]);
  const [hydrated, setHydrated] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      try {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
      } catch {}
    }
  }, [items, hydrated]);

  const isInWishlist = (productId: string) => {
    return items.some((item) => item.productId === productId);
  };

  const toggleWishlist = (product: Product) => {
    setItems((prev) => {
      const exists = prev.some((item) => item.productId === product.id);
      if (exists) {
        return prev.filter((item) => item.productId !== product.id);
      } else {
        return [
          ...prev,
          {
            productId: product.id,
            product,
            addedAt: new Date().toISOString(),
          },
        ];
      }
    });
  };

  const removeFromWishlist = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const clearWishlist = () => {
    setItems([]);
  };

  const getCount = () => items.length;

  return (
    <WishlistContext.Provider
      value={{
        items,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
        getCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
