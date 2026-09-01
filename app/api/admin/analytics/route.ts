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

    const [
      orders,
      totalUsers,
      totalProducts,
      lowStockVariants,
      recentOrders,
    ] = await Promise.all([
      prisma.order.findMany({ select: { total: true, status: true, paymentStatus: true } }),
      prisma.user.count(),
      prisma.product.count(),
      prisma.productVariant.findMany({
        where: { stock: { lte: 5 } },
        include: { product: { select: { name: true, sku: true } } },
      }),
      prisma.order.findMany({
        take: 8,
        orderBy: { createdAt: "desc" },
        include: { items: true },
      }),
    ]);

    const grossRevenue = orders
      .filter((o) => o.paymentStatus === "PAID")
      .reduce((sum, o) => sum + o.total, 0);

    const paidOrderCount = orders.filter((o) => o.paymentStatus === "PAID").length;
    const aov = paidOrderCount > 0 ? grossRevenue / paidOrderCount : 0;

    return NextResponse.json({
      metrics: {
        grossRevenue,
        totalOrders: orders.length,
        averageOrderValue: aov,
        totalClients: totalUsers,
        totalProducts,
        lowStockCount: lowStockVariants.length,
      },
      lowStockItems: lowStockVariants,
      recentOrders,
    });
  } catch (error) {
    console.error("Admin Analytics Error:", error);
    return NextResponse.json({ error: "Failed to load admin analytics" }, { status: 500 });
  }
}
