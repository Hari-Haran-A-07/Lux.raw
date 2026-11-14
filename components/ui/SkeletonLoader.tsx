import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

/** Base animated skeleton block */
const Skeleton: React.FC<SkeletonProps> = ({ className }) => (
  <div
    className={cn(
      'animate-pulse rounded-sm bg-neutral-200',
      className
    )}
    aria-hidden="true"
  />
);

// ---------------------------------------------------------------------------
// Product Card Skeleton
// ---------------------------------------------------------------------------

/**
 * SkeletonProductCard — mirrors the layout of a product card while loading.
 */
export const SkeletonProductCard: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('flex flex-col gap-3', className)}>
    {/* Product image */}
    <Skeleton className="aspect-[3/4] w-full" />
    {/* Brand */}
    <Skeleton className="h-3 w-1/3" />
    {/* Product name */}
    <Skeleton className="h-4 w-3/4" />
    {/* Price */}
    <Skeleton className="h-4 w-1/4" />
  </div>
);

// ---------------------------------------------------------------------------
// Product Detail Skeleton
// ---------------------------------------------------------------------------

/**
 * SkeletonProductDetail — mirrors the product detail page layout while loading.
 */
export const SkeletonProductDetail: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16', className)}>
    {/* Left: image gallery */}
    <div className="flex gap-3">
      {/* Thumbnails */}
      <div className="flex flex-col gap-2 w-16 shrink-0">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="aspect-square w-full" />
        ))}
      </div>
      {/* Main image */}
      <Skeleton className="aspect-[3/4] flex-1" />
    </div>

    {/* Right: product info */}
    <div className="flex flex-col gap-4 py-4">
      <Skeleton className="h-3 w-24" /> {/* Brand */}
      <Skeleton className="h-7 w-3/4" /> {/* Title */}
      <Skeleton className="h-6 w-1/4" /> {/* Price */}
      <div className="flex gap-2 mt-2">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-10 rounded-full" />
        ))}
      </div>
      <Skeleton className="h-12 w-full mt-4" /> {/* Add to cart */}
      <div className="flex flex-col gap-2 mt-4">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-4/6" />
      </div>
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Collection Grid Skeleton
// ---------------------------------------------------------------------------

export interface SkeletonCollectionGridProps {
  columns?: number;
  rows?: number;
  className?: string;
}

/**
 * SkeletonCollectionGrid — renders a grid of product card skeletons.
 */
export const SkeletonCollectionGrid: React.FC<SkeletonCollectionGridProps> = ({
  columns = 4,
  rows = 2,
  className,
}) => {
  const count = columns * rows;
  const gridClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  }[columns] ?? 'grid-cols-2 md:grid-cols-4';

  return (
    <div className={cn(`grid gap-4 md:gap-6 ${gridClass}`, className)}>
      {[...Array(count)].map((_, i) => (
        <SkeletonProductCard key={i} />
      ))}
    </div>
  );
};

export default SkeletonCollectionGrid;
