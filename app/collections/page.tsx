import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

import { seedCollections, seedProducts } from "@/lib/seed-data";

export const revalidate = 60;

export default async function CollectionsPage() {
  let collections: any[] = [];

  try {
    collections = await prisma.collection.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.warn("Notice: Prisma collections prerender used seed fallback:", error);
  }

  if (!collections || collections.length === 0) {
    collections = seedCollections.map((col, idx) => ({
      ...col,
      id: `seed-col-${idx}`,
      _count: {
        products: seedProducts.filter((p) => p.collectionSlug === col.slug).length || 6,
      },
    }));
  }

  return (
    <div className="bg-[#09090b] text-[#f4f3ef] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16 sm:mb-24">
          <span className="text-[10px] font-editorial-caps text-[#b59a6d] tracking-[0.3em]">
            MAISON MONOGRAPHS
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#f4f3ef] font-light">
            Collections & Lookbooks
          </h1>
          <p className="text-xs sm:text-sm text-[#a1a1aa] font-light max-w-xl mx-auto leading-relaxed">
            Permanent icons, seasonal runway declarations, and artisanal capsules exploring the architectural boundaries of fashion.
          </p>
        </div>

        {/* Collections Editorial List */}
        <div className="space-y-24">
          {collections.map((col, idx) => (
            <div
              key={col.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                idx % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className={`lg:col-span-7 ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                <Link
                  href={`/collections/${col.slug}`}
                  className="group block relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-[#18181b]"
                >
                  <Image
                    src={col.bannerImage || "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop"}
                    alt={col.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover brightness-85 group-hover:scale-105 group-hover:brightness-95 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 z-10">
                    <span className="text-[10px] font-editorial-caps text-[#b59a6d]">
                      {col.season || "PERMANENT"}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-white font-light mt-1">
                      {col.name}
                    </h3>
                  </div>
                </Link>
              </div>

              <div className={`lg:col-span-5 space-y-6 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                <span className="text-[10px] font-editorial-caps text-[#b59a6d] tracking-widest">
                  {col._count.products} ATELIER CREATIONS
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#f4f3ef] font-light">
                  {col.name}
                </h2>
                {col.subtitle && (
                  <p className="font-serif text-lg italic text-[#d4d4d8] font-light">
                    {col.subtitle}
                  </p>
                )}
                <p className="text-xs sm:text-sm text-[#a1a1aa] font-light leading-relaxed">
                  {col.description}
                </p>

                <div className="pt-2">
                  <Link
                    href={`/collections/${col.slug}`}
                    className="inline-flex items-center gap-2 bg-[#f4f3ef] text-[#09090b] px-6 py-3.5 text-xs font-editorial-caps hover:bg-[#b59a6d] transition-colors"
                  >
                    <span>EXPLORE LOOKBOOK</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
