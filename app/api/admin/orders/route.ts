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

    const orders = await prisma.order.findMany({
      include: {
        items: true,
        payments: true,
        shipments: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Admin Orders GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getSession();
    if (!session || (session.role !== "SUPER_ADMIN" && session.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const body = await req.json();
    const { id, status, paymentStatus, shipmentStatus, trackingNumber } = body;

    if (!id) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    const updated = await prisma.order.update({
      where: { id },
      data: {
        status,
        paymentStatus,
        shipmentStatus,
        trackingNumber: trackingNumber || undefined,
      },
      include: {
        items: true,
        payments: true,
        shipments: true,
      },
    });

    return NextResponse.json({ success: true, order: updated });
  } catch (error) {
    console.error("Admin Orders PUT Error:", error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
