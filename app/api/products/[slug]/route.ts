import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        collection: true,
        variants: true,
        images: {
          orderBy: { order: "asc" },
        },
        reviews: {
          include: {
            user: {
              select: { name: true },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Fetch related recommendations in the same category or collection
    const related = await prisma.product.findMany({
      where: {
        status: "ACTIVE",
        id: { not: product.id },
        OR: [
          { categoryId: product.categoryId },
          product.collectionId ? { collectionId: product.collectionId } : {},
        ],
      },
      include: {
        category: true,
        variants: true,
        images: {
          orderBy: { order: "asc" },
        },
      },
      take: 4,
    });

    return NextResponse.json({
      product,
      related,
    });
  } catch (error) {
    console.error("Product Detail API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch product details" },
      { status: 500 }
    );
  }
}
