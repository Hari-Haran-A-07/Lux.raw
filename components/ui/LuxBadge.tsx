import React from 'react';
import { cn } from '@/lib/utils';

export type BadgeVariant = 'new' | 'exclusive' | 'limited' | 'sold-out';

interface LuxBadgeProps {
  variant: BadgeVariant;
  className?: string;
  size?: 'sm' | 'md';
}

const variantConfig: Record<
  BadgeVariant,
  { label: string; className: string }
> = {
  new: {
    label: 'NEW',
    className:
      'bg-black text-white border border-black hover:bg-neutral-800',
  },
  exclusive: {
    label: 'EXCLUSIVE',
    className:
      'bg-[#C9A86C] text-white border border-[#C9A86C] hover:bg-[#b8964e]',
  },
  limited: {
    label: 'LIMITED',
    className:
      'bg-white text-black border border-black hover:bg-neutral-100',
  },
  'sold-out': {
    label: 'SOLD OUT',
    className:
      'bg-neutral-200 text-neutral-500 border border-neutral-300 cursor-not-allowed',
  },
};

const sizeConfig = {
  sm: 'px-2 py-0.5 text-[10px] tracking-widest',
  md: 'px-3 py-1 text-xs tracking-widest',
};

/**
 * LuxBadge — A luxury status label badge for product cards and detail pages.
 *
 * @example
 * <LuxBadge variant="exclusive" />
 * <LuxBadge variant="new" size="sm" />
 * <LuxBadge variant="sold-out" />
 */
export const LuxBadge: React.FC<LuxBadgeProps> = ({
  variant,
  className,
  size = 'md',
}) => {
  const config = variantConfig[variant];

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center font-semibold uppercase transition-colors duration-200',
        sizeConfig[size],
        config.className,
        className
      )}
      aria-label={config.label}
    >
      {config.label}
    </span>
  );
};

export default LuxBadge;
