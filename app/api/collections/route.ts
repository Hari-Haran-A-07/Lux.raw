import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const collections = await prisma.collection.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ collections });
  } catch (error) {
    console.error("Collections API Error:", error);
    return NextResponse.json({ error: "Failed to fetch collections" }, { status: 500 });
  }
}
