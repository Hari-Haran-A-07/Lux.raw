import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getSession();
    if (!session || (session.role !== "SUPER_ADMIN" && session.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const variants = await prisma.productVariant.findMany({
      include: {
        product: {
          select: { id: true, name: true, sku: true, price: true, status: true },
        },
      },
      orderBy: { stock: "asc" },
    });

    return NextResponse.json({ variants });
  } catch (error) {
    console.error("Admin Inventory GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch inventory" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getSession();
    if (!session || (session.role !== "SUPER_ADMIN" && session.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const body = await req.json();
    const { variantId, stock } = body;

    if (!variantId || stock === undefined) {
      return NextResponse.json({ error: "Variant ID and stock count are required" }, { status: 400 });
    }

    const updated = await prisma.productVariant.update({
      where: { id: variantId },
      data: { stock: parseInt(stock, 10) },
      include: {
        product: true,
      },
    });

    return NextResponse.json({ success: true, variant: updated });
  } catch (error) {
    console.error("Admin Inventory PUT Error:", error);
    return NextResponse.json({ error: "Failed to update inventory" }, { status: 500 });
  }
}
