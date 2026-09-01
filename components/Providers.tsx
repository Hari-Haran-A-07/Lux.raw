"use client";

import React from "react";
import { CartProvider } from "@/lib/store/cartStore";
import { WishlistProvider } from "@/lib/store/wishlistStore";
import { AuthProvider } from "@/lib/store/authStore";
import { UIProvider } from "@/lib/store/uiStore";

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <UIProvider>{children}</UIProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
};
