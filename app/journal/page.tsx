import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

import { seedEditorials } from "@/lib/seed-data";

export const revalidate = 60;

export default async function JournalPage() {
  let stories: any[] = [];

  try {
    stories = await prisma.editorial.findMany({
      orderBy: { publishedAt: "desc" },
    });
  } catch (error) {
    console.warn("Notice: Prisma journal prerender used seed fallback:", error);
  }

  if (!stories || stories.length === 0) {
    stories = seedEditorials.map((s, idx) => ({
      ...s,
      id: `seed-story-${idx}`,
      publishedAt: new Date().toISOString(),
    }));
  }

  const featuredStory = stories.find((s) => s.featured) || stories[0];
  const remainingStories = stories.filter((s) => s.id !== featuredStory?.id);

  return (
    <div className="bg-[#09090b] text-[#f4f3ef] pt-32 sm:pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16 sm:mb-20">
          <span className="text-[10px] font-editorial-caps text-[#b59a6d] tracking-[0.3em]">
            THE MAISON GAZETTE
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#f4f3ef] font-light">
            Journal & Chronicles
          </h1>
          <p className="text-xs sm:text-sm text-[#a1a1aa] font-light max-w-xl mx-auto leading-relaxed">
            Essays on architectural brutalism, natural vegetable tanning in Tuscany, and the quiet alchemy of Italian craftsmanship.
          </p>
        </div>

        {/* Large Featured Story */}
        {featuredStory && (
          <div className="mb-20 border-b border-[#27272a] pb-16">
            <Link
              href={`/journal/${featuredStory.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-8">
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#18181b]">
                  <Image
                    src={featuredStory.heroImage}
                    alt={featuredStory.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 70vw"
                    className="object-cover luxury-image-zoom brightness-90 group-hover:brightness-100"
                  />
                </div>
              </div>

              <div className="lg:col-span-4 space-y-4">
                <div className="flex items-center gap-3 text-[10px] font-editorial-caps text-[#b59a6d]">
                  <span>{featuredStory.category}</span>
                  <span>•</span>
                  <span>{featuredStory.readTime}</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#f4f3ef] font-light group-hover:text-[#b59a6d] transition-colors leading-tight">
                  {featuredStory.title}
                </h2>
                {featuredStory.subtitle && (
                  <p className="font-serif text-sm italic text-[#d4d4d8] font-light">
                    {featuredStory.subtitle}
                  </p>
                )}
                <p className="text-xs text-[#a1a1aa] font-light leading-relaxed">
                  {featuredStory.excerpt}
                </p>
                <div className="pt-2 inline-flex items-center gap-2 text-xs font-editorial-caps text-[#b59a6d]">
                  <span>READ CHRONICLE</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {remainingStories.map((story) => (
            <Link
              key={story.id}
              href={`/journal/${story.slug}`}
              className="group flex flex-col justify-between space-y-4 bg-[#111114] border border-[#27272a] p-5 hover:border-[#b59a6d]/60 transition-colors"
            >
              <div className="space-y-4">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#18181b]">
                  <Image
                    src={story.coverImage || story.heroImage}
                    alt={story.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[9px] font-editorial-caps text-[#b59a6d]">
                    <span>{story.category}</span>
                    <span className="text-[#71717a]">{story.readTime}</span>
                  </div>
                  <h3 className="font-serif text-lg text-[#f4f3ef] font-light group-hover:text-[#b59a6d] transition-colors leading-snug">
                    {story.title}
                  </h3>
                  <p className="text-xs text-[#a1a1aa] font-light line-clamp-3 leading-relaxed">
                    {story.excerpt}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#27272a]/70 flex items-center justify-between text-[10px] font-editorial-caps text-[#71717a]">
                <span>{formatDate(story.publishedAt)}</span>
                <span className="text-[#b59a6d] group-hover:translate-x-1 transition-transform">
                  READ →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
