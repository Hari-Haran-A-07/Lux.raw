import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ProductDetailView } from "@/components/product/ProductDetailView";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { images: true, category: true },
  });

  if (!product) {
    return {
      title: "Creation Not Found — luxury.Raw",
    };
  }

  return {
    title: `${product.name} — luxury.Raw`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.name} — luxury.Raw`,
      description: product.shortDescription || product.description.slice(0, 160),
      images: [
        {
          url: product.images[0]?.url || "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop",
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: {
      category: true,
      collection: true,
      variants: true,
      images: { orderBy: { order: "asc" } },
    },
  });

  if (!product) {
    notFound();
  }

  // Fetch related items
  const relatedProducts = await prisma.product.findMany({
    where: {
      status: "ACTIVE",
      id: { not: product.id },
      OR: [
        { categoryId: product.categoryId },
        product.collectionId ? { collectionId: product.collectionId } : {},
      ],
    },
    include: {
      category: true,
      collection: true,
      variants: true,
      images: { orderBy: { order: "asc" } },
    },
    take: 6,
  });

  return (
    <ProductDetailView
      product={product as any}
      relatedProducts={relatedProducts as any}
    />
  );
}
