import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const gender = searchParams.get("gender");

    const where: any = {};
    if (gender && gender !== "ALL") {
      where.OR = [
        { gender: gender.toUpperCase() },
        { gender: "UNISEX" },
      ];
    }

    const categories = await prisma.category.findMany({
      where,
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { order: "asc" },
    });

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Categories API Error:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}
