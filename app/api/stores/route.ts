import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city");

    const where: any = {};
    if (city && city !== "ALL") {
      where.city = city;
    }

    const stores = await prisma.store.findMany({
      where,
      orderBy: { isFlagship: "desc" },
    });

    return NextResponse.json({ stores });
  } catch (error) {
    console.error("Stores API Error:", error);
    return NextResponse.json({ error: "Failed to fetch stores" }, { status: 500 });
  }
}
