import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductCatalogView } from "@/components/product/ProductCatalogView";

import { seedCollections, seedProducts, seedCategories } from "@/lib/seed-data";

export const revalidate = 60;

export default async function CollectionDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  let collection: any = null;
  let products: any[] = [];
  let categories: any[] = [];

  try {
    collection = await prisma.collection.findUnique({
      where: { slug: params.slug },
    });

    if (collection) {
      const res = await Promise.all([
        prisma.product.findMany({
          where: {
            status: "ACTIVE",
            collectionId: collection.id,
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
          orderBy: { order: "asc" },
        }),
      ]);
      products = res[0];
      categories = res[1];
    }
  } catch (error) {
    console.warn("Prisma collection detail fallback:", error);
  }

  if (!collection) {
    const seed = seedCollections.find((c) => c.slug === params.slug);
    if (seed) {
      collection = { ...seed, id: `seed-col-${seed.slug}` };
      products = seedProducts
        .filter((p) => p.collectionSlug === seed.slug)
        .map((p, idx) => ({
          ...p,
          id: `seed-cp-${idx}`,
          images: p.images.map((img, i) => ({ id: `img-c-${idx}-${i}`, url: img, isPrimary: i === 0 })),
          variants: [],
          category: seedCategories.find((c) => c.slug === p.categorySlug) || null,
          collection: null,
        }));
      categories = seedCategories;
    }
  }

  if (!collection) {
    notFound();
  }

  return (
    <ProductCatalogView
      initialProducts={products as any}
      categories={categories}
      heroTitle={collection.name}
      heroSubtitle={collection.season || "MAISON COLLECTION"}
      heroDescription={collection.description || collection.subtitle || ""}
      heroImage={collection.bannerImage || "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2000&auto=format&fit=crop"}
    />
  );
}
