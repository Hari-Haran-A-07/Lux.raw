import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");

    const where: any = {};
    if (category && category !== "ALL") {
      where.category = category;
    }
    if (featured === "true") {
      where.featured = true;
    }

    const stories = await prisma.editorial.findMany({
      where,
      orderBy: { publishedAt: "desc" },
    });

    return NextResponse.json({ stories });
  } catch (error) {
    console.error("Journal API Error:", error);
    return NextResponse.json({ error: "Failed to fetch stories" }, { status: 500 });
  }
}
