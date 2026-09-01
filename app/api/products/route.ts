import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const collection = searchParams.get("collection");
    const gender = searchParams.get("gender");
    const sort = searchParams.get("sort") || "featured";
    const search = searchParams.get("search");
    const featured = searchParams.get("featured");
    const newArrival = searchParams.get("newArrival");
    const bestseller = searchParams.get("bestseller");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const inStock = searchParams.get("inStock");
    const limit = parseInt(searchParams.get("limit") || "40", 10);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const skip = (page - 1) * limit;

    const where: any = {
      status: "ACTIVE",
    };

    if (category) {
      where.category = { slug: category };
    }

    if (collection) {
      where.collection = { slug: collection };
    }

    if (gender && gender !== "ALL") {
      where.OR = [
        { gender: gender.toUpperCase() },
        { gender: "UNISEX" },
      ];
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
        { material: { contains: search } },
        { color: { contains: search } },
      ];
    }

    if (featured === "true") {
      where.featured = true;
    }

    if (newArrival === "true") {
      where.newArrival = true;
    }

    if (bestseller === "true") {
      where.bestseller = true;
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    let orderBy: any = { createdAt: "desc" };
    if (sort === "price_asc") {
      orderBy = { price: "asc" };
    } else if (sort === "price_desc") {
      orderBy = { price: "desc" };
    } else if (sort === "newest") {
      orderBy = { createdAt: "desc" };
    } else if (sort === "featured") {
      orderBy = [{ featured: "desc" }, { createdAt: "desc" }];
    }

    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          collection: true,
          variants: true,
          images: {
            orderBy: { order: "asc" },
          },
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({
      products,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error("Products API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
