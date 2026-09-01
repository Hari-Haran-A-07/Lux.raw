import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getSession();
    if (!session || (session.role !== "SUPER_ADMIN" && session.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const products = await prisma.product.findMany({
      include: {
        category: true,
        collection: true,
        variants: true,
        images: { orderBy: { order: "asc" } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Admin Products GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session || (session.role !== "SUPER_ADMIN" && session.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const body = await req.json();
    const {
      name,
      subtitle,
      description,
      shortDescription,
      price,
      sku,
      categoryId,
      collectionId,
      gender,
      material,
      color,
      featured,
      newArrival,
      bestseller,
      status,
      variants,
      images,
    } = body;

    const baseSlug = slugify(name);
    let finalSlug = baseSlug;
    const existing = await prisma.product.findUnique({ where: { slug: finalSlug } });
    if (existing) {
      finalSlug = `${baseSlug}-${Date.now()}`;
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug: finalSlug,
        subtitle: subtitle || null,
        description: description || "",
        shortDescription: shortDescription || null,
        price: parseFloat(price),
        sku: sku || `LR-PRD-${Date.now()}`,
        categoryId,
        collectionId: collectionId || null,
        gender: gender || "WOMEN",
        material: material || "100% Fine Calfskin",
        color: color || "Noir",
        featured: Boolean(featured),
        newArrival: Boolean(newArrival),
        bestseller: Boolean(bestseller),
        status: status || "ACTIVE",
        variants: {
          create: (variants || []).map((v: any) => ({
            sku: v.sku || `${sku}-${v.size}-${Date.now()}`,
            size: v.size || "Standard",
            color: v.color || color || "Noir",
            colorHex: v.colorHex || "#000000",
            price: v.price ? parseFloat(v.price) : parseFloat(price),
            stock: parseInt(v.stock || "10", 10),
          })),
        },
        images: {
          create: (images || []).map((img: any, idx: number) => ({
            url: img.url,
            alt: img.alt || name,
            isPrimary: idx === 0,
            order: idx + 1,
          })),
        },
      },
      include: {
        category: true,
        collection: true,
        variants: true,
        images: true,
      },
    });

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("Admin Product POST Error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getSession();
    if (!session || (session.role !== "SUPER_ADMIN" && session.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const body = await req.json();
    const { id, name, subtitle, description, price, status, featured, newArrival, bestseller, material, color } = body;

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const updated = await prisma.product.update({
      where: { id },
      data: {
        name,
        subtitle,
        description,
        price: parseFloat(price),
        status,
        featured: Boolean(featured),
        newArrival: Boolean(newArrival),
        bestseller: Boolean(bestseller),
        material,
        color,
      },
      include: {
        category: true,
        collection: true,
        variants: true,
        images: true,
      },
    });

    return NextResponse.json({ success: true, product: updated });
  } catch (error) {
    console.error("Admin Product PUT Error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getSession();
    if (!session || (session.role !== "SUPER_ADMIN" && session.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin Product DELETE Error:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
