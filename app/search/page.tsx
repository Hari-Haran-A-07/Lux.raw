import React, { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/product/ProductCard";
import Link from "next/link";
import { Search } from "lucide-react";

import { seedProducts, seedCategories } from "@/lib/seed-data";

export const revalidate = 0; // Dynamic search

async function SearchResults({ query }: { query: string }) {
  let products: any[] = [];
  if (query) {
    try {
      products = await prisma.product.findMany({
        where: {
          status: "ACTIVE",
          OR: [
            { name: { contains: query } },
            { description: { contains: query } },
            { material: { contains: query } },
            { color: { contains: query } },
          ],
        },
        include: {
          category: true,
          collection: true,
          variants: true,
          images: { orderBy: { order: "asc" } },
        },
      });
    } catch (error) {
      console.warn("Prisma search fallback:", error);
      products = seedProducts
        .filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase())
        )
        .map((p, idx) => ({
          ...p,
          id: `seed-search-${idx}`,
          images: p.images.map((img, i) => ({ id: `img-s-${idx}-${i}`, url: img, isPrimary: i === 0 })),
          variants: [],
          category: seedCategories.find((c) => c.slug === p.categorySlug) || null,
          collection: null,
        }));
    }
  }

  return (
    <div className="bg-[#09090b] text-[#f4f3ef] pt-32 sm:pt-40 pb-24 min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#27272a] pb-6 mb-12">
          <span className="text-[10px] font-editorial-caps text-[#b59a6d] tracking-widest block mb-1">
            CATALOG SEARCH RESULTS
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#f4f3ef] font-light">
            {query ? `Creations for “${query}”` : "Search the Maison Archives"}
          </h1>
          <p className="text-xs text-[#71717a] mt-1 font-light">
            {products.length} {products.length === 1 ? "creation" : "creations"} discovered
          </p>
        </div>

        {products.length === 0 ? (
          <div className="py-24 text-center space-y-4 max-w-md mx-auto">
            <Search className="w-12 h-12 text-[#71717a] mx-auto stroke-1" />
            <h3 className="font-serif text-2xl font-light">No Matching Creations</h3>
            <p className="text-xs text-[#a1a1aa] font-light leading-relaxed">
              We could not find items matching your query. Explore our seasonal monographs and permanent icons.
            </p>
            <div className="pt-4">
              <Link
                href="/collections"
                className="inline-block bg-[#f4f3ef] text-[#09090b] px-8 py-3.5 text-xs font-editorial-caps hover:bg-[#b59a6d] transition-colors"
              >
                EXPLORE COLLECTIONS
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product as any} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || "";

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#09090b]" />}>
      <SearchResults query={query} />
    </Suspense>
  );
}
