import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductCatalogView } from "@/components/product/ProductCatalogView";

import { seedCategories, seedProducts } from "@/lib/seed-data";

export const revalidate = 60;

export default async function MenCategoryPage({
  params,
}: {
  params: { category: string };
}) {
  let currentCategory: any = null;
  let products: any[] = [];
  let categories: any[] = [];

  try {
    currentCategory = await prisma.category.findUnique({
      where: { slug: params.category },
    });

    if (currentCategory) {
      const res = await Promise.all([
        prisma.product.findMany({
          where: {
            status: "ACTIVE",
            categoryId: currentCategory.id,
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
      products = res[0];
      categories = res[1];
    }
  } catch (error) {
    console.warn("Prisma men category fallback:", error);
  }

  if (!currentCategory) {
    const seed = seedCategories.find((c) => c.slug === params.category);
    if (seed) {
      currentCategory = { ...seed, id: `seed-cat-${seed.slug}` };
      products = seedProducts
        .filter((p) => p.categorySlug === seed.slug && (p.gender === "MEN" || p.gender === "UNISEX"))
        .map((p, idx) => ({
          ...p,
          id: `seed-mcp-${idx}`,
          images: p.images.map((img, i) => ({ id: `img-mc-${idx}-${i}`, url: img, isPrimary: i === 0 })),
          variants: [],
          category: seed,
          collection: null,
        }));
      categories = seedCategories.filter((c) => c.gender === "MEN" || c.gender === "UNISEX");
    }
  }

  if (!currentCategory) {
    notFound();
  }

  return (
    <ProductCatalogView
      initialProducts={products as any}
      categories={categories}
      initialCategory={currentCategory.slug}
      heroTitle={currentCategory.name}
      heroSubtitle="MEN'S METIER"
      heroDescription={currentCategory.description || "Handcrafted with supreme artisanal precision."}
      heroImage={currentCategory.image || "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2000&auto=format&fit=crop"}
    />
  );
}
