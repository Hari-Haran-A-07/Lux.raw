/**
 * Client-side analytics event tracker for Lux.raw.
 * Tracks product views, wishlist interactions, and cart events.
 * Designed to integrate with GA4, Segment, or a custom analytics pipeline.
 */

export type AnalyticsEventName =
  | 'product_viewed'
  | 'product_clicked'
  | 'wishlist_added'
  | 'wishlist_removed'
  | 'cart_item_added'
  | 'cart_item_removed'
  | 'cart_viewed'
  | 'checkout_started'
  | 'checkout_completed'
  | 'search_performed'
  | 'collection_viewed'
  | 'filter_applied';

export interface ProductEventPayload {
  productId: string;
  productName: string;
  sku: string;
  price: number;
  currency: string;
  brand?: string;
  category?: string;
  collection?: string;
  position?: number;
}

export interface CartEventPayload extends ProductEventPayload {
  quantity: number;
  cartTotal?: number;
  cartItemCount?: number;
}

export interface SearchEventPayload {
  query: string;
  resultCount: number;
  filters?: Record<string, string | string[]>;
}

type EventPayload =
  | ProductEventPayload
  | CartEventPayload
  | SearchEventPayload
  | Record<string, unknown>;

/** Internal event queue for batching */
let eventQueue: Array<{ name: AnalyticsEventName; payload: EventPayload; ts: number }> = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;

const FLUSH_INTERVAL_MS = 2000;
const QUEUE_MAX_SIZE = 50;

/**
 * Track an analytics event. Events are queued and flushed in batches.
 *
 * @param name - The event name
 * @param payload - Event-specific data
 */
export function trackEvent(name: AnalyticsEventName, payload: EventPayload): void {
  if (typeof window === 'undefined') return; // server-side guard

  eventQueue.push({ name, payload, ts: Date.now() });

  if (eventQueue.length >= QUEUE_MAX_SIZE) {
    flushEvents();
    return;
  }

  if (!flushTimer) {
    flushTimer = setTimeout(flushEvents, FLUSH_INTERVAL_MS);
  }
}

/** Flush the event queue to the analytics endpoint */
function flushEvents(): void {
  if (flushTimer) {
    clearTimeout(flushTimer);
    flushTimer = null;
  }

  if (eventQueue.length === 0) return;

  const batch = [...eventQueue];
  eventQueue = [];

  // Fire-and-forget to avoid blocking the UI thread
  void sendBatch(batch);
}

async function sendBatch(
  batch: Array<{ name: AnalyticsEventName; payload: EventPayload; ts: number }>
): Promise<void> {
  try {
    await fetch('/api/analytics/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ events: batch }),
      keepalive: true, // ensures delivery even on page unload
    });
  } catch {
    // Silently fail — analytics should never break the user experience
  }
}

// ---------------------------------------------------------------------------
// Convenience helpers
// ---------------------------------------------------------------------------

export const analytics = {
  productViewed: (payload: ProductEventPayload) =>
    trackEvent('product_viewed', payload),

  wishlistAdded: (payload: ProductEventPayload) =>
    trackEvent('wishlist_added', payload),

  wishlistRemoved: (payload: ProductEventPayload) =>
    trackEvent('wishlist_removed', payload),

  cartItemAdded: (payload: CartEventPayload) =>
    trackEvent('cart_item_added', payload),

  cartItemRemoved: (payload: CartEventPayload) =>
    trackEvent('cart_item_removed', payload),

  cartViewed: (payload: Omit<CartEventPayload, 'productId' | 'productName' | 'sku' | 'price'>) =>
    trackEvent('cart_viewed', payload),

  checkoutStarted: (payload: CartEventPayload) =>
    trackEvent('checkout_started', payload),

  searchPerformed: (payload: SearchEventPayload) =>
    trackEvent('search_performed', payload),
};

// Flush remaining events before page unload
if (typeof window !== 'undefined') {
  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flushEvents();
  });
}
