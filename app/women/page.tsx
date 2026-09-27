import React from "react";
import { prisma } from "@/lib/prisma";
import { ProductCatalogView } from "@/components/product/ProductCatalogView";

import { seedProducts, seedCategories } from "@/lib/seed-data";

export const revalidate = 60;

export default async function WomenPage() {
  let products: any[] = [];
  let categories: any[] = [];

  try {
    [products, categories] = await Promise.all([
      prisma.product.findMany({
        where: {
          status: "ACTIVE",
          OR: [{ gender: "WOMEN" }, { gender: "UNISEX" }],
        },
        include: {
          category: true,
          collection: true,
          variants: true,
          images: { orderBy: { order: "asc" } },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.category.findMany({
        where: {
          OR: [{ gender: "WOMEN" }, { gender: "UNISEX" }],
        },
        orderBy: { order: "asc" },
      }),
    ]);
  } catch (error) {
    console.warn("Notice: Prisma women prerender used seed fallback:", error);
  }

  if (!products || products.length === 0) {
    products = seedProducts
      .filter((p) => p.gender === "WOMEN" || p.gender === "UNISEX")
      .map((p, idx) => ({
        ...p,
        id: `seed-women-${idx}`,
        images: p.images.map((img, i) => ({ id: `img-w-${idx}-${i}`, url: img, isPrimary: i === 0 })),
        variants: [],
        category: seedCategories.find((c) => c.slug === p.categorySlug) || null,
        collection: null,
      }));
  }

  if (!categories || categories.length === 0) {
    categories = seedCategories.filter((c) => c.gender === "WOMEN" || c.gender === "UNISEX") as any;
  }

  return (
    <ProductCatalogView
      initialProducts={products as any}
      categories={categories}
      heroTitle="Women's Runway & Ready-to-Wear"
      heroSubtitle="MAISON COLLECTION"
      heroDescription="Architectural trapeze leather goods, floor-length double-faced cashmere coats, and sculpted jewelry cast in Tuscany."
      heroImage="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
    />
  );
}
