import React from "react";
import { prisma } from "@/lib/prisma";
import { ProductCatalogView } from "@/components/product/ProductCatalogView";

export const revalidate = 60;

export default async function WomenPage() {
  const [products, categories] = await Promise.all([
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
