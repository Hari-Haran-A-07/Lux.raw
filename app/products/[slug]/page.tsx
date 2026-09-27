import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ProductDetailView } from "@/components/product/ProductDetailView";

import { seedProducts, seedCategories } from "@/lib/seed-data";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  let product: any = null;
  try {
    product = await prisma.product.findUnique({
      where: { slug: params.slug },
      include: { images: true, category: true },
    });
  } catch {
    product = seedProducts.find((p) => p.slug === params.slug);
  }

  if (!product) {
    product = seedProducts.find((p) => p.slug === params.slug);
  }

  if (!product) {
    return {
      title: "Creation Not Found — luxury.Raw",
    };
  }

  const imageUrl =
    product.images?.[0]?.url ||
    (Array.isArray(product.images) && typeof product.images[0] === "string" ? product.images[0] : "") ||
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop";

  return {
    title: `${product.name} — luxury.Raw`,
    description: (product.description || "").slice(0, 160),
    openGraph: {
      title: `${product.name} — luxury.Raw`,
      description: product.shortDescription || (product.description || "").slice(0, 160),
      images: [
        {
          url: imageUrl,
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
  let product: any = null;
  try {
    product = await prisma.product.findUnique({
      where: { slug: params.slug },
      include: {
        category: true,
        collection: true,
        variants: true,
        images: { orderBy: { order: "asc" } },
      },
    });
  } catch (error) {
    console.warn("Prisma product detail fallback:", error);
  }

  if (!product) {
    const seed = seedProducts.find((p) => p.slug === params.slug);
    if (seed) {
      product = {
        ...seed,
        id: `seed-${seed.slug}`,
        images: seed.images.map((img, i) => ({ id: `img-${i}`, url: img, isPrimary: i === 0 })),
        variants: [
          { id: "v1", size: "Standard", color: seed.color, stock: 10, price: seed.price },
        ],
        category: seedCategories.find((c) => c.slug === seed.categorySlug) || null,
        collection: null,
      };
    }
  }

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
