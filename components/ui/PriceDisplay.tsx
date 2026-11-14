import React from 'react';
import { cn } from '@/lib/utils';
import { formatCurrency, type SupportedCurrency, type SupportedLocale } from '@/lib/currency-formatter';

interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  currency?: SupportedCurrency;
  locale?: SupportedLocale;
  showDiscount?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeConfig = {
  sm: {
    current: 'text-sm font-medium',
    original: 'text-xs',
    badge: 'text-[10px] px-1.5 py-0.5',
  },
  md: {
    current: 'text-base font-semibold',
    original: 'text-sm',
    badge: 'text-xs px-2 py-0.5',
  },
  lg: {
    current: 'text-xl font-bold',
    original: 'text-base',
    badge: 'text-sm px-2 py-1',
  },
};

/**
 * PriceDisplay — renders current price, optional original price, and discount %.
 *
 * @example
 * <PriceDisplay price={850} originalPrice={1200} currency="USD" locale="en-US" showDiscount />
 */
export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  originalPrice,
  currency = 'USD',
  locale = 'en-US',
  showDiscount = true,
  size = 'md',
  className,
}) => {
  const isDiscounted = originalPrice !== undefined && originalPrice > price;

  const discountPercent = isDiscounted
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const styles = sizeConfig[size];

  return (
    <div className={cn('flex items-center gap-2 flex-wrap', className)}>
      {/* Current / sale price */}
      <span
        className={cn(
          styles.current,
          isDiscounted ? 'text-red-600' : 'text-neutral-900'
        )}
        aria-label={`Price: ${formatCurrency(price, currency, locale)}`}
      >
        {formatCurrency(price, currency, locale)}
      </span>

      {/* Original price (strikethrough) */}
      {isDiscounted && originalPrice !== undefined && (
        <span
          className={cn(
            styles.original,
            'line-through text-neutral-400'
          )}
          aria-label={`Original price: ${formatCurrency(originalPrice, currency, locale)}`}
        >
          {formatCurrency(originalPrice, currency, locale)}
        </span>
      )}

      {/* Discount badge */}
      {isDiscounted && showDiscount && discountPercent > 0 && (
        <span
          className={cn(
            styles.badge,
            'bg-red-100 text-red-700 font-semibold rounded-sm uppercase tracking-wider'
          )}
          aria-label={`${discountPercent}% off`}
        >
          -{discountPercent}%
        </span>
      )}
    </div>
  );
};

export default PriceDisplay;
