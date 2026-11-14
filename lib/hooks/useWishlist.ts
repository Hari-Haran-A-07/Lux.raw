'use client';

/**
 * useWishlist — React custom hook for wishlist state management.
 * Persists to localStorage and optionally syncs with the server
 * when the user is authenticated.
 */

import { useState, useEffect, useCallback } from 'react';

export interface WishlistItem {
  productId: string;
  name: string;
  slug: string;
  imageUrl: string;
  price: number;
  currency: string;
  brand: string;
  addedAt: string; // ISO timestamp
}

interface UseWishlistReturn {
  items: WishlistItem[];
  isInWishlist: (productId: string) => boolean;
  addToWishlist: (item: Omit<WishlistItem, 'addedAt'>) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
  count: number;
  isSyncing: boolean;
}

const STORAGE_KEY = 'lux_wishlist';
const SYNC_DEBOUNCE_MS = 1500;

function loadFromStorage(): WishlistItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as WishlistItem[]) : [];
  } catch {
    return [];
  }
}

function saveToStorage(items: WishlistItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // localStorage quota exceeded or unavailable
  }
}

/**
 * useWishlist hook — manages wishlist with localStorage persistence.
 *
 * @example
 * const { items, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
 */
export function useWishlist(): UseWishlistReturn {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncTimer, setSyncTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setItems(loadFromStorage());
  }, []);

  // Persist to localStorage whenever items change
  useEffect(() => {
    saveToStorage(items);
  }, [items]);

  const scheduleSyncToServer = useCallback((updatedItems: WishlistItem[]) => {
    if (syncTimer) clearTimeout(syncTimer);

    const timer = setTimeout(async () => {
      setIsSyncing(true);
      try {
        await fetch('/api/wishlist/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: updatedItems }),
        });
      } catch {
        // Server sync failures are non-blocking — localStorage is source of truth
      } finally {
        setIsSyncing(false);
      }
    }, SYNC_DEBOUNCE_MS);

    setSyncTimer(timer);
  }, [syncTimer]);

  const isInWishlist = useCallback(
    (productId: string): boolean => items.some((i) => i.productId === productId),
    [items]
  );

  const addToWishlist = useCallback(
    (item: Omit<WishlistItem, 'addedAt'>) => {
      setItems((prev) => {
        if (prev.some((i) => i.productId === item.productId)) return prev;
        const updated = [...prev, { ...item, addedAt: new Date().toISOString() }];
        scheduleSyncToServer(updated);
        return updated;
      });
    },
    [scheduleSyncToServer]
  );

  const removeFromWishlist = useCallback(
    (productId: string) => {
      setItems((prev) => {
        const updated = prev.filter((i) => i.productId !== productId);
        scheduleSyncToServer(updated);
        return updated;
      });
    },
    [scheduleSyncToServer]
  );

  const clearWishlist = useCallback(() => {
    setItems([]);
    scheduleSyncToServer([]);
  }, [scheduleSyncToServer]);

  return {
    items,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    count: items.length,
    isSyncing,
  };
}
