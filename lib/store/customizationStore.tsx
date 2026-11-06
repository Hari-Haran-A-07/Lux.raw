"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface BespokeOption {
  productId: string;
  monogramText?: string;
  foilFinish?: "GOLD_LEAF" | "SILVER_PALLADIUM" | "BLIND_DEBOSS" | "ROSE_GOLD";
  fontStyle?: "SERIF_ROMAN" | "BAUHAUS_SANS" | "MODERN_SCRIPT";
  giftBoxNote?: string;
  whiteGlovePackaging: boolean;
  tailoringNotes?: string;
}

interface CustomizationContextType {
  customizations: Record<string, BespokeOption>;
  setProductCustomization: (productId: string, options: Partial<BespokeOption>) => void;
  clearCustomization: (productId: string) => void;
  getCustomization: (productId: string) => BespokeOption | undefined;
}

const CustomizationContext = createContext<CustomizationContextType | undefined>(undefined);

export function CustomizationProvider({ children }: { children: React.ReactNode }) {
  const [customizations, setCustomizations] = useState<Record<string, BespokeOption>>({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem("lux_customizations");
      if (stored) {
        setCustomizations(JSON.parse(stored));
      }
    } catch {
      // storage unavailable
    }
  }, []);

  const saveToStorage = (updated: Record<string, BespokeOption>) => {
    try {
      localStorage.setItem("lux_customizations", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const setProductCustomization = (productId: string, options: Partial<BespokeOption>) => {
    setCustomizations((prev) => {
      const current = prev[productId] || {
        productId,
        whiteGlovePackaging: true,
      };
      const updated = {
        ...prev,
        [productId]: { ...current, ...options },
      };
      saveToStorage(updated);
      return updated;
    });
  };

  const clearCustomization = (productId: string) => {
    setCustomizations((prev) => {
      const copy = { ...prev };
      delete copy[productId];
      saveToStorage(copy);
      return copy;
    });
  };

  const getCustomization = (productId: string): BespokeOption | undefined => {
    return customizations[productId];
  };

  return (
    <CustomizationContext.Provider
      value={{
        customizations,
        setProductCustomization,
        clearCustomization,
        getCustomization,
      }}
    >
      {children}
    </CustomizationContext.Provider>
  );
}

export function useCustomizationStore() {
  const context = useContext(CustomizationContext);
  if (!context) {
    throw new Error("useCustomizationStore must be used within a CustomizationProvider");
  }
  return context;
}
