import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductCatalogView } from "@/components/product/ProductCatalogView";

export const revalidate = 60;

export default async function CollectionDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const collection = await prisma.collection.findUnique({
    where: { slug: params.slug },
  });

  if (!collection) {
    notFound();
  }

  const [products, categories] = await Promise.all([
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
