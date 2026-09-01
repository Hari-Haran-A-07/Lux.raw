import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim() || "";

    if (!q || q.length < 2) {
      return NextResponse.json({
        products: [],
        categories: [],
        collections: [],
        stories: [],
      });
    }

    const [products, categories, collections, stories] = await Promise.all([
      prisma.product.findMany({
        where: {
          status: "ACTIVE",
          OR: [
            { name: { contains: q } },
            { description: { contains: q } },
            { material: { contains: q } },
            { color: { contains: q } },
          ],
        },
        include: {
          images: { take: 2, orderBy: { order: "asc" } },
          category: true,
        },
        take: 8,
      }),
      prisma.category.findMany({
        where: {
          OR: [
            { name: { contains: q } },
            { description: { contains: q } },
          ],
        },
        take: 4,
      }),
      prisma.collection.findMany({
        where: {
          OR: [
            { name: { contains: q } },
            { subtitle: { contains: q } },
          ],
        },
        take: 4,
      }),
      prisma.editorial.findMany({
        where: {
          OR: [
            { title: { contains: q } },
            { subtitle: { contains: q } },
            { tags: { contains: q } },
          ],
        },
        take: 3,
      }),
    ]);

    return NextResponse.json({
      products,
      categories,
      collections,
      stories,
    });
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
