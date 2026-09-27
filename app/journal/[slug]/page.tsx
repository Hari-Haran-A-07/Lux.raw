import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, Clock, User, Share2, Tag } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

import { seedEditorials } from "@/lib/seed-data";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  let story: any = null;
  try {
    story = await prisma.editorial.findUnique({
      where: { slug: params.slug },
    });
  } catch {
    story = seedEditorials.find((s) => s.slug === params.slug);
  }

  if (!story) {
    story = seedEditorials.find((s) => s.slug === params.slug);
  }

  if (!story) return { title: "Story Not Found — luxury.Raw" };

  return {
    title: `${story.title} — luxury.Raw Journal`,
    description: story.excerpt,
    openGraph: {
      title: story.title,
      description: story.excerpt,
      images: [{ url: story.heroImage || story.coverImage, width: 1200, height: 630 }],
    },
  };
}

export default async function StoryDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  let story: any = null;
  let otherStories: any[] = [];

  try {
    story = await prisma.editorial.findUnique({
      where: { slug: params.slug },
    });

    if (story) {
      otherStories = await prisma.editorial.findMany({
        where: { id: { not: story.id } },
        take: 3,
        orderBy: { publishedAt: "desc" },
      });
    }
  } catch (error) {
    console.warn("Prisma journal detail fallback:", error);
  }

  if (!story) {
    const seed = seedEditorials.find((s) => s.slug === params.slug);
    if (seed) {
      story = { ...seed, id: `seed-story-${seed.slug}`, publishedAt: new Date().toISOString() };
      otherStories = seedEditorials
        .filter((s) => s.slug !== params.slug)
        .slice(0, 3)
        .map((s, idx) => ({ ...s, id: `seed-other-${idx}`, publishedAt: new Date().toISOString() }));
    }
  }

  if (!story) {
    notFound();
  }

  return (
    <article className="bg-[#09090b] text-[#f4f3ef] pt-32 sm:pt-40 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 text-xs font-editorial-caps text-[#71717a] hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO GAZETTE</span>
        </Link>

        {/* Header */}
        <header className="space-y-4 mb-10 text-center">
          <div className="flex items-center justify-center gap-3 text-[10px] font-editorial-caps text-[#b59a6d]">
            <span>{story.category}</span>
            <span>•</span>
            <span>{story.readTime}</span>
            <span>•</span>
            <span>{formatDate(story.publishedAt)}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#f4f3ef] font-light leading-tight">
            {story.title}
          </h1>

          {story.subtitle && (
            <p className="font-serif text-lg sm:text-xl italic text-[#d4d4d8] font-light max-w-2xl mx-auto">
              {story.subtitle}
            </p>
          )}

          <div className="pt-2 text-xs font-editorial-caps text-[#71717a]">
            CURATED BY {story.author.toUpperCase()}
          </div>
        </header>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#18181b] mb-12 border border-[#27272a]/60">
          <Image
            src={story.heroImage}
            alt={story.title}
            fill
            priority
            className="object-cover brightness-95"
          />
        </div>

        {/* Content Body with Typography formatting */}
        <div className="prose prose-invert prose-stone max-w-none text-[#d4d4d8] leading-relaxed text-sm sm:text-base space-y-6 font-light">
          {(story.content as string).split("\n\n").map((block: string, idx: number) => {
            if (block.startsWith("# ")) {
              return (
                <h2
                  key={idx}
                  className="font-serif text-2xl sm:text-3xl text-[#f4f3ef] font-normal pt-6 pb-2 border-b border-[#27272a]"
                >
                  {block.replace("# ", "")}
                </h2>
              );
            }
            if (block.startsWith("### ")) {
              return (
                <h3
                  key={idx}
                  className="font-serif text-xl sm:text-2xl text-[#b59a6d] font-light pt-4"
                >
                  {block.replace("### ", "")}
                </h3>
              );
            }
            if (block.startsWith("> ")) {
              return (
                <blockquote
                  key={idx}
                  className="border-l-2 border-[#b59a6d] pl-6 italic font-serif text-lg text-[#f4f3ef] my-6"
                >
                  {block.replace("> ", "")}
                </blockquote>
              );
            }
            return <p key={idx}>{block.replace(/\*\*/g, "")}</p>;
          })}
        </div>

        {/* Tags */}
        <div className="mt-12 pt-6 border-t border-[#27272a] flex flex-wrap items-center gap-2 text-xs text-[#71717a]">
          <Tag className="w-3.5 h-3.5 text-[#b59a6d]" />
          <span>INDEXED THEMES:</span>
          {((story.tags as string) || "").split(",").map((t: string) => (
            <span
              key={t}
              className="bg-[#141416] border border-[#27272a] px-3 py-1 text-[11px] text-[#a1a1aa]"
            >
              {t.trim()}
            </span>
          ))}
        </div>

        {/* Recommended Reads */}
        {otherStories.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#27272a]">
            <h3 className="font-serif text-2xl text-[#f4f3ef] font-light mb-8">
              More From the Gazette
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {otherStories.map((item) => (
                <Link
                  key={item.id}
                  href={`/journal/${item.slug}`}
                  className="group block space-y-3"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#18181b]">
                    <Image
                      src={item.coverImage || item.heroImage}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-[9px] font-editorial-caps text-[#b59a6d]">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-sm text-[#f4f3ef] group-hover:text-[#b59a6d] transition-colors leading-snug">
                    {item.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
