"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, ProductVariant } from "../types";

export interface CartItemType {
  id: string;
  productId: string;
  product: Product;
  variantId?: string | null;
  variant?: ProductVariant | null;
  quantity: number;
  size?: string | null;
  color?: string | null;
}

const CART_STORAGE_KEY = "luxury_raw_cart_v1";

// Helper to load initial state from localStorage
function getInitialCart(): CartItemType[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItemType[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

interface CartContextType {
  items: CartItemType[];
  couponCode: string | null;
  discountPercentage: number;
  discountFixed: number;
  isOpen: boolean;
  addItem: (product: Product, size?: string | null, color?: string | null, variantId?: string | null, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string, type: "PERCENTAGE" | "FIXED", value: number) => void;
  removeCoupon: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getShippingFee: () => number;
  getTotal: () => number;
  getTotalCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItemType[]>([]);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const [discountFixed, setDiscountFixed] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hydrated, setHydrated] = useState<boolean>(false);

  useEffect(() => {
    setItems(getInitialCart());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      saveCart(items);
    }
  }, [items, hydrated]);

  const addItem = (
    product: Product,
    size?: string | null,
    color?: string | null,
    variantId?: string | null,
    quantity: number = 1
  ) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) =>
          i.productId === product.id &&
          (size ? i.size === size : true) &&
          (color ? i.color === color : true)
      );

      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      }

      const newItem: CartItemType = {
        id: `${product.id}-${size || "default"}-${color || "default"}-${Date.now()}`,
        productId: product.id,
        product,
        variantId,
        quantity,
        size: size || (product.variants && product.variants[0]?.size) || null,
        color: color || product.color || null,
      };

      return [...prev, newItem];
    });

    setIsOpen(true);
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode(null);
    setDiscountPercentage(0);
    setDiscountFixed(0);
  };

  const applyCoupon = (code: string, type: "PERCENTAGE" | "FIXED", value: number) => {
    setCouponCode(code);
    if (type === "PERCENTAGE") {
      setDiscountPercentage(value);
      setDiscountFixed(0);
    } else {
      setDiscountFixed(value);
      setDiscountPercentage(0);
    }
  };

  const removeCoupon = () => {
    setCouponCode(null);
    setDiscountPercentage(0);
    setDiscountFixed(0);
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const getSubtotal = () => {
    return items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  };

  const getDiscountAmount = () => {
    const subtotal = getSubtotal();
    if (discountPercentage > 0) {
      return (subtotal * discountPercentage) / 100;
    }
    if (discountFixed > 0) {
      return Math.min(discountFixed, subtotal);
    }
    return 0;
  };

  const getShippingFee = () => {
    // Complimentary White-Glove worldwide delivery for all luxury.Raw orders
    return 0;
  };

  const getTotal = () => {
    const subtotal = getSubtotal();
    const discount = getDiscountAmount();
    const shipping = getShippingFee();
    return Math.max(0, subtotal - discount + shipping);
  };

  const getTotalCount = () => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        couponCode,
        discountPercentage,
        discountFixed,
        isOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        openCart,
        closeCart,
        toggleCart,
        getSubtotal,
        getDiscountAmount,
        getShippingFee,
        getTotal,
        getTotalCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
