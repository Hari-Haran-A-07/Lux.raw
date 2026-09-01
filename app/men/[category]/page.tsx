import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductCatalogView } from "@/components/product/ProductCatalogView";

export const revalidate = 60;

export default async function MenCategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const currentCategory = await prisma.category.findUnique({
    where: { slug: params.category },
  });

  if (!currentCategory) {
    notFound();
  }

  const [products, categories] = await Promise.all([
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
