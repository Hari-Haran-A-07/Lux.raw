import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Compass, Shield, Award } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { EditorialHero } from "@/components/hero/EditorialHero";
import { ProductCarousel } from "@/components/product/ProductCarousel";

export const revalidate = 60; // ISR 60s

export default async function HomePage() {
  // Fetch homepage config, new arrivals, bestsellers, categories, and latest editorial
  const [config, newArrivals, bestsellers, categories, latestStory] = await Promise.all([
    prisma.homepageConfig.findUnique({ where: { id: "default" } }),
    prisma.product.findMany({
      where: { status: "ACTIVE", newArrival: true },
      include: { images: true, category: true, variants: true },
      take: 8,
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.findMany({
      where: { status: "ACTIVE", bestseller: true },
      include: { images: true, category: true, variants: true },
      take: 8,
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({
      where: { featured: true },
      take: 4,
      orderBy: { order: "asc" },
    }),
    prisma.editorial.findFirst({
      where: { featured: true },
      orderBy: { publishedAt: "desc" },
    }),
  ]);

  return (
    <div className="bg-[#09090b] text-[#f4f3ef]">
      {/* 1. Cinematic 100vh Editorial Hero */}
      <EditorialHero
        title={config?.heroTitle || "THE RAW ARCHITECTURE OF FORM"}
        subtitle={config?.heroSubtitle || "AUTUMN / WINTER 2026"}
        image={config?.heroImage || "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"}
        ctaText={config?.heroCtaText || "DISCOVER COLLECTION"}
        ctaLink={config?.heroCtaLink || "/collections/autumn-winter-2026"}
      />

      {/* 2. Brand Architecture Statement */}
      <section className="py-20 sm:py-28 px-6 max-w-5xl mx-auto text-center border-b border-[#27272a]/60">
        <span className="text-[10px] font-editorial-caps text-[#b59a6d] tracking-[0.3em] block mb-4">
          MAISON PHILOSOPHY
        </span>
        <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#f4f3ef] font-light leading-relaxed">
          &ldquo;Luxury is not the accumulation of gold and logos. It is the uncompromising discipline of volume, raw material truth, and unhurried Italian craftsmanship.&rdquo;
        </blockquote>
        <div className="mt-8 flex items-center justify-center gap-6 text-xs font-editorial-caps text-[#71717a]">
          <span>FLORENCE</span>
          <span>•</span>
          <span>MILAN</span>
          <span>•</span>
          <span>BIELLA</span>
          <span>•</span>
          <span>AREZZO</span>
        </div>
      </section>

      {/* 3. Women / Men Dual Editorial Metiers Showcase */}
      <section className="py-20 sm:py-28 border-b border-[#27272a]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[10px] font-editorial-caps text-[#b59a6d] tracking-[0.25em]">
              THE MAISON METIERS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#f4f3ef] font-light mt-1">
              Explore By Universe
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Women's Universe */}
            <Link
              href="/women"
              className="group relative aspect-[4/5] overflow-hidden bg-[#141416] flex flex-col justify-end p-8 sm:p-12"
            >
              <Image
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop"
                alt="Women's Collection"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover brightness-80 group-hover:scale-105 group-hover:brightness-95 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="relative z-10 space-y-2">
                <span className="text-[10px] font-editorial-caps text-[#b59a6d]">UNIVERSE</span>
                <h3 className="font-serif text-3xl sm:text-4xl text-white font-light">
                  Women&apos;s Collection
                </h3>
                <p className="text-xs text-[#d4d4d8] font-light max-w-sm">
                  Sculptural trapeze handbags, double-faced cashmere Greatcoats, and fluid evening columns.
                </p>
                <div className="pt-3 inline-flex items-center gap-2 text-xs font-editorial-caps text-[#b59a6d] group-hover:text-white transition-colors">
                  <span>ENTER SHOWROOM</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Men's Universe */}
            <Link
              href="/men"
              className="group relative aspect-[4/5] overflow-hidden bg-[#141416] flex flex-col justify-end p-8 sm:p-12"
            >
              <Image
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop"
                alt="Men's Collection"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover brightness-80 group-hover:scale-105 group-hover:brightness-95 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="relative z-10 space-y-2">
                <span className="text-[10px] font-editorial-caps text-[#b59a6d]">UNIVERSE</span>
                <h3 className="font-serif text-3xl sm:text-4xl text-white font-light">
                  Men&apos;s Monolith
                </h3>
                <p className="text-xs text-[#d4d4d8] font-light max-w-sm">
                  Monumental Melton wool overcoats, full-grain Tuscan leather weekender duffles, and chiseled footwear.
                </p>
                <div className="pt-3 inline-flex items-center gap-2 text-xs font-editorial-caps text-[#b59a6d] group-hover:text-white transition-colors">
                  <span>ENTER SHOWROOM</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Horizontal Product Carousel: New Arrivals */}
      <ProductCarousel
        title="New Atelier Arrivals"
        subtitle="AUTUMN / WINTER 2026 DEBUT"
        products={newArrivals as any}
        viewAllLink="/women?newArrival=true"
      />

      {/* 5. Large Editorial Campaign Showcase */}
      <section className="py-24 sm:py-32 bg-[#0c0c0e] border-b border-[#27272a]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Image block */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-[#18181b]">
                <Image
                  src={config?.campaignImage || "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1976&auto=format&fit=crop"}
                  alt="Campaign"
                  fill
                  className="object-cover luxury-image-zoom brightness-90"
                />
              </div>
            </div>

            {/* Story block */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] font-editorial-caps text-[#b59a6d] tracking-widest">
                CAMPAIGN FOCUS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#f4f3ef] font-light leading-tight">
                {config?.campaignTitle || "ATELIER RAW MONOLITH"}
              </h2>
              <p className="text-xs sm:text-sm text-[#a1a1aa] font-light leading-relaxed">
                {config?.campaignSubtitle ||
                  "Every piece is an investigation into architectural purity. Cut from 950g virgin melton wools and cold-formed saddle calfskin in our Florentine ateliers."}
              </p>
              <div className="space-y-3 pt-2 text-xs text-[#d4d4d8] font-light">
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b59a6d]" />
                  Zero synthetic polymers or plastic edge-coatings
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b59a6d]" />
                  Grade-A Mongolian Cashmere spun with Alpine waters
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b59a6d]" />
                  Individual artisan serial registration on each creation
                </p>
              </div>

              <div className="pt-4">
                <Link
                  href={config?.campaignCtaLink || "/journal/the-art-of-raw-craftsmanship"}
                  className="inline-flex items-center gap-2 bg-[#f4f3ef] text-[#09090b] px-6 py-3.5 text-xs font-editorial-caps hover:bg-[#b59a6d] transition-colors"
                >
                  <span>{config?.campaignCtaText || "READ ATELIER CHRONICLE"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Horizontal Product Carousel: Maison Icons & Bestsellers */}
      <ProductCarousel
        title="Permanent Maison Icons"
        subtitle="THE SIGNATURE SILHOUETTES"
        products={bestsellers as any}
        viewAllLink="/women?bestseller=true"
      />

      {/* 7. Asymmetric Category Grid */}
      <section className="py-20 sm:py-28 border-b border-[#27272a]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-[10px] font-editorial-caps text-[#b59a6d] tracking-widest block mb-1">
                CURATED METIERS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#f4f3ef] font-light">
                Discover By Craft
              </h2>
            </div>
            <Link
              href="/collections"
              className="mt-4 md:mt-0 text-xs font-editorial-caps text-[#a1a1aa] hover:text-white transition-colors"
            >
              ALL COLLECTIONS & METIERS →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={cat.gender === "MEN" ? `/men/${cat.slug}` : `/women/${cat.slug}`}
                className="group relative aspect-[3/4] overflow-hidden bg-[#141416] flex flex-col justify-end p-6"
              >
                <Image
                  src={cat.image || "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop"}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover brightness-85 group-hover:scale-105 group-hover:brightness-95 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="relative z-10">
                  <span className="text-[9px] font-editorial-caps text-[#b59a6d]">METIER</span>
                  <h4 className="font-serif text-xl text-white group-hover:text-[#b59a6d] transition-colors mt-0.5">
                    {cat.name}
                  </h4>
                  <p className="text-[11px] text-[#a1a1aa] font-light line-clamp-1 mt-1">
                    {cat.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Digital Journal Feature Story */}
      {latestStory && (
        <section className="py-24 sm:py-32 bg-[#09090b] border-b border-[#27272a]/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-[#141416] flex items-center justify-center p-6 sm:p-12 text-center">
              <Image
                src={latestStory.heroImage}
                alt={latestStory.title}
                fill
                className="object-cover brightness-50"
              />
              <div className="relative z-10 max-w-3xl space-y-4">
                <span className="text-[10px] font-editorial-caps text-[#b59a6d] tracking-widest">
                  FROM THE MAISON JOURNAL
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-white font-light leading-tight">
                  {latestStory.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#d4d4d8] font-light max-w-xl mx-auto line-clamp-2">
                  {latestStory.excerpt}
                </p>
                <div className="pt-2">
                  <Link
                    href={`/journal/${latestStory.slug}`}
                    className="inline-block border border-white/40 text-white px-8 py-3 text-xs font-editorial-caps hover:bg-white hover:text-black transition-colors"
                  >
                    READ ARTICLE [{latestStory.readTime}]
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 9. Maison Courtesies (White Glove, Concierge, Heritage) */}
      <section className="py-20 sm:py-24 bg-[#0d0d0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-3 p-6 border border-[#27272a]/40 bg-[#111114]">
              <div className="w-12 h-12 rounded-full border border-[#b59a6d]/40 mx-auto flex items-center justify-center text-[#b59a6d]">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg text-[#f4f3ef] font-light">White-Glove Delivery</h4>
              <p className="text-xs text-[#a1a1aa] font-light leading-relaxed">
                Complimentary tracked express delivery and carbon-neutral packaging across all global destinations.
              </p>
            </div>

            <div className="space-y-3 p-6 border border-[#27272a]/40 bg-[#111114]">
              <div className="w-12 h-12 rounded-full border border-[#b59a6d]/40 mx-auto flex items-center justify-center text-[#b59a6d]">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg text-[#f4f3ef] font-light">Artisanal Lifetime Care</h4>
              <p className="text-xs text-[#a1a1aa] font-light leading-relaxed">
                Every creation comes with registered lifetime atelier maintenance, conditioning, and repair privileges.
              </p>
            </div>

            <div className="space-y-3 p-6 border border-[#27272a]/40 bg-[#111114]">
              <div className="w-12 h-12 rounded-full border border-[#b59a6d]/40 mx-auto flex items-center justify-center text-[#b59a6d]">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg text-[#f4f3ef] font-light">Private Salon Suites</h4>
              <p className="text-xs text-[#a1a1aa] font-light leading-relaxed">
                Reserve private concierge viewings and Made-to-Measure fittings at our flagships in Paris, Milan, and New York.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
