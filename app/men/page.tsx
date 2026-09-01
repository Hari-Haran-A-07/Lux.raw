import React from "react";
import { prisma } from "@/lib/prisma";
import { ProductCatalogView } from "@/components/product/ProductCatalogView";

export const revalidate = 60;

export default async function MenPage() {
  const [products, categories] = await Promise.all([
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
