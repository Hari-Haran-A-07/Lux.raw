import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

import { seedProducts, seedCollections, seedEditorials } from "@/lib/seed-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://luxuryraw.com";

  let products: { slug: string; updatedAt?: Date }[] = [];
  let collections: { slug: string; updatedAt?: Date }[] = [];
  let stories: { slug: string; updatedAt?: Date }[] = [];

  try {
    const res = await Promise.all([
      prisma.product.findMany({ where: { status: "ACTIVE" }, select: { slug: true, updatedAt: true } }),
      prisma.collection.findMany({ select: { slug: true, updatedAt: true } }),
      prisma.editorial.findMany({ select: { slug: true, updatedAt: true } }),
    ]);
    products = res[0];
    collections = res[1];
    stories = res[2];
  } catch (error) {
    console.warn("Notice: Prisma sitemap prerender used seed fallback:", error);
    products = seedProducts.map((p) => ({ slug: p.slug, updatedAt: new Date() }));
    collections = seedCollections.map((c) => ({ slug: c.slug, updatedAt: new Date() }));
    stories = seedEditorials.map((s) => ({ slug: s.slug, updatedAt: new Date() }));
  }

  const productUrls = products.map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const collectionUrls = collections.map((c) => ({
    url: `${baseUrl}/collections/${c.slug}`,
    lastModified: c.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const storyUrls = stories.map((s) => ({
    url: `${baseUrl}/journal/${s.slug}`,
    lastModified: s.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/women`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/men`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/collections`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/journal`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/stores`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    ...productUrls,
    ...collectionUrls,
    ...storyUrls,
  ];
}
