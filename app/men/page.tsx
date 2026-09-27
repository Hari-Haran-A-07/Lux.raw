import React from "react";
import { prisma } from "@/lib/prisma";
import { ProductCatalogView } from "@/components/product/ProductCatalogView";

import { seedProducts, seedCategories } from "@/lib/seed-data";

export const revalidate = 60;

export default async function MenPage() {
  let products: any[] = [];
  let categories: any[] = [];

  try {
    [products, categories] = await Promise.all([
      prisma.product.findMany({
        where: {
          status: "ACTIVE",
          OR: [{ gender: "MEN" }, { gender: "UNISEX" }],
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
          OR: [{ gender: "MEN" }, { gender: "UNISEX" }],
        },
        orderBy: { order: "asc" },
      }),
    ]);
  } catch (error) {
    console.warn("Notice: Prisma men prerender used seed fallback:", error);
  }

  if (!products || products.length === 0) {
    products = seedProducts
      .filter((p) => p.gender === "MEN" || p.gender === "UNISEX")
      .map((p, idx) => ({
        ...p,
        id: `seed-men-${idx}`,
        images: p.images.map((img, i) => ({ id: `img-m-${idx}-${i}`, url: img, isPrimary: i === 0 })),
        variants: [],
        category: seedCategories.find((c) => c.slug === p.categorySlug) || null,
        collection: null,
      }));
  }

  if (!categories || categories.length === 0) {
    categories = seedCategories.filter((c) => c.gender === "MEN" || c.gender === "UNISEX") as any;
  }

  return (
    <ProductCatalogView
      initialProducts={products as any}
      categories={categories}
      heroTitle="Men's Monolith & Tailoring"
      heroSubtitle="MAISON COLLECTION"
      heroDescription="Heavyweight Scottish melton greatcoats, 6-ply pure cashmere turtlenecks, and full-grain Tuscan saddlery duffles."
      heroImage="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2000&auto=format&fit=crop"
    />
  );
}
