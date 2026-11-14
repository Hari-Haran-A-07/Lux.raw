/**
 * Zod validators for luxury product creation, updates, and pricing.
 * Used in API route handlers and form validation.
 */

import { z } from 'zod';

// ---------------------------------------------------------------------------
// Shared field schemas
// ---------------------------------------------------------------------------

const skuSchema = z
  .string()
  .min(4, 'SKU must be at least 4 characters')
  .max(32, 'SKU must be at most 32 characters')
  .regex(/^[A-Z0-9-]+$/, 'SKU must contain only uppercase letters, numbers, and hyphens');

const priceSchema = z
  .number()
  .positive('Price must be a positive number')
  .multipleOf(0.01, 'Price must have at most 2 decimal places')
  .max(999_999.99, 'Price cannot exceed 999,999.99');

const currencySchema = z.enum(['USD', 'EUR', 'GBP', 'JPY', 'AED', 'CHF', 'CNY', 'HKD', 'SGD']);

// ---------------------------------------------------------------------------
// Product Pricing Schema
// ---------------------------------------------------------------------------

export const productPricingSchema = z
  .object({
    basePrice: priceSchema,
    currency: currencySchema,
    salePrice: priceSchema.optional(),
    costPrice: priceSchema.optional(),
    taxRate: z.number().min(0).max(1).optional().default(0),
  })
  .refine(
    (data) => !data.salePrice || data.salePrice < data.basePrice,
    {
      message: 'Sale price must be less than base price',
      path: ['salePrice'],
    }
  );

export type ProductPricing = z.infer<typeof productPricingSchema>;

// ---------------------------------------------------------------------------
// Product Creation Schema
// ---------------------------------------------------------------------------

export const createProductSchema = z.object({
  name: z.string().min(2, 'Name too short').max(200, 'Name too long'),
  slug: z
    .string()
    .min(2)
    .max(200)
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase, alphanumeric with hyphens only'),
  description: z.string().min(10, 'Description is required').max(5000),
  shortDescription: z.string().max(500).optional(),
  sku: skuSchema,
  pricing: productPricingSchema,
  brandId: z.string().uuid('Invalid brand ID'),
  categoryIds: z.array(z.string().uuid()).min(1, 'At least one category is required'),
  collectionIds: z.array(z.string().uuid()).optional().default([]),
  tags: z.array(z.string().max(50)).max(20).optional().default([]),
  isPublished: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  isExclusive: z.boolean().default(false),
  stockQuantity: z.number().int().min(0).default(0),
  weight: z.number().positive().optional(),
  dimensions: z
    .object({
      length: z.number().positive(),
      width: z.number().positive(),
      height: z.number().positive(),
      unit: z.enum(['cm', 'in']),
    })
    .optional(),
  images: z.array(z.string().url()).min(1, 'At least one image is required').max(20),
  materials: z.array(z.string().max(100)).max(10).optional().default([]),
  careInstructions: z.string().max(1000).optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;

// ---------------------------------------------------------------------------
// Product Update Schema (all fields optional except ID)
// ---------------------------------------------------------------------------

export const updateProductSchema = createProductSchema
  .partial()
  .extend({
    id: z.string().uuid('Invalid product ID'),
  });

export type UpdateProductInput = z.infer<typeof updateProductSchema>;

// ---------------------------------------------------------------------------
// Product Filter/Query Schema
// ---------------------------------------------------------------------------

export const productQuerySchema = z.object({
  search: z.string().max(200).optional(),
  categoryId: z.string().uuid().optional(),
  brandId: z.string().uuid().optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  currency: currencySchema.optional().default('USD'),
  isPublished: z.coerce.boolean().optional(),
  isFeatured: z.coerce.boolean().optional(),
  isExclusive: z.coerce.boolean().optional(),
  sortBy: z.enum(['createdAt', 'price', 'name', 'updatedAt']).optional().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  cursor: z.string().optional(),
});

export type ProductQuery = z.infer<typeof productQuerySchema>;
