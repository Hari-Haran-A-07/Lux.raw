import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  seedCategories,
  seedCollections,
  seedProducts,
  seedStores,
  seedEditorials,
  seedCoupons,
} from "../lib/seed-data";

const prisma = new PrismaClient();

async function main() {
  console.log("Beginning luxury.Raw database seeding...");

  // 1. Clear existing records to ensure fresh idempotent seed
  await prisma.cartItem.deleteMany({});
  await prisma.cart.deleteMany({});
  await prisma.wishlistItem.deleteMany({});
  await prisma.wishlist.deleteMany({});
  await prisma.payment.deleteMany({});
  await prisma.shipment.deleteMany({});
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.review.deleteMany({});
  await prisma.inventory.deleteMany({});
  await prisma.productImage.deleteMany({});
  await prisma.productVideo.deleteMany({});
  await prisma.productVariant.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.collection.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.store.deleteMany({});
  await prisma.editorial.deleteMany({});
  await prisma.coupon.deleteMany({});
  await prisma.campaign.deleteMany({});
  await prisma.homepageConfig.deleteMany({});
  await prisma.address.deleteMany({});
  await prisma.adminUser.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("Cleared existing records.");

  // 2. Seed Admin & Demo Client
  const hashedPassword = bcrypt.hashSync("LuxuryRaw@2026", 10);

  const adminUser = await prisma.adminUser.create({
    data: {
      name: "Maison Director",
      email: "admin@luxuryraw.com",
      password: hashedPassword,
      role: "SUPER_ADMIN",
    },
  });

  const clientUser = await prisma.user.create({
    data: {
      name: "Madame Vivienne Laurent",
      email: "client@luxuryraw.com",
      password: hashedPassword,
      role: "VIP",
      phone: "+1 (212) 555-0188",
    },
  });

  // Client Address
  const clientAddress = await prisma.address.create({
    data: {
      userId: clientUser.id,
      fullName: "Vivienne Laurent",
      street: "750 Park Avenue",
      suite: "Apt 14B",
      city: "New York",
      state: "NY",
      postalCode: "10021",
      country: "United States",
      phone: "+1 (212) 555-0188",
      isDefault: true,
    },
  });

  console.log("Seeded Admin and Demo Client with default address.");

  // 3. Seed Categories
  const categoryMap = new Map<string, string>();
  for (const cat of seedCategories) {
    const created = await prisma.category.create({
      data: {
        name: cat.name,
        slug: cat.slug,
        gender: cat.gender,
        description: cat.description,
        image: cat.image,
        featured: cat.featured,
        order: cat.order,
      },
    });
    categoryMap.set(cat.slug, created.id);
  }
  console.log(`Seeded ${categoryMap.size} categories.`);

  // 4. Seed Collections
  const collectionMap = new Map<string, string>();
  for (const col of seedCollections) {
    const created = await prisma.collection.create({
      data: {
        name: col.name,
        slug: col.slug,
        subtitle: col.subtitle,
        season: col.season,
        description: col.description,
        bannerImage: col.bannerImage,
        featured: col.featured,
      },
    });
    collectionMap.set(col.slug, created.id);
  }
  console.log(`Seeded ${collectionMap.size} collections.`);

  // 5. Seed Products with Variants, Images, and Inventory
  let productCount = 0;
  for (const p of seedProducts) {
    const categoryId = categoryMap.get(p.categorySlug) || Array.from(categoryMap.values())[0];
    const collectionId = p.collectionSlug ? collectionMap.get(p.collectionSlug) : null;

    const createdProduct = await prisma.product.create({
      data: {
        name: p.name,
        slug: p.slug,
        subtitle: p.subtitle,
        description: p.description,
        shortDescription: p.shortDescription,
        price: p.price,
        compareAtPrice: p.compareAtPrice,
        sku: p.sku,
        categoryId: categoryId,
        collectionId: collectionId,
        gender: p.gender,
        material: p.material,
        careInstructions: p.careInstructions,
        origin: p.origin,
        color: p.color,
        featured: p.featured,
        newArrival: p.newArrival,
        bestseller: p.bestseller,
        status: "ACTIVE",
      },
    });

    // Create Variants & Inventory
    for (const v of p.variants) {
      const createdVariant = await prisma.productVariant.create({
        data: {
          productId: createdProduct.id,
          sku: v.sku,
          size: v.size,
          color: v.color,
          colorHex: v.colorHex,
          price: p.price,
          stock: v.stock,
        },
      });

      await prisma.inventory.create({
        data: {
          productId: createdProduct.id,
          variantId: createdVariant.id,
          quantity: v.stock,
          lowStockThreshold: 3,
          location: "Central Milan Atelier",
        },
      });
    }

    // Create Images
    for (const img of p.images) {
      await prisma.productImage.create({
        data: {
          productId: createdProduct.id,
          url: img.url,
          alt: img.alt,
          isPrimary: img.isPrimary,
          order: img.order,
        },
      });
    }

    productCount++;
  }
  console.log(`Seeded ${productCount} luxury products with variants and image galleries.`);

  // 6. Seed Stores
  for (const store of seedStores) {
    await prisma.store.create({
      data: store,
    });
  }
  console.log(`Seeded ${seedStores.length} global flagship boutiques.`);

  // 7. Seed Editorials / Journal Articles
  for (const ed of seedEditorials) {
    await prisma.editorial.create({
      data: ed,
    });
  }
  console.log(`Seeded ${seedEditorials.length} editorial journal stories.`);

  // 8. Seed Coupons
  for (const c of seedCoupons) {
    await prisma.coupon.create({
      data: c,
    });
  }
  console.log(`Seeded ${seedCoupons.length} promotional privilege codes.`);

  // 9. Seed Homepage Configuration
  await prisma.homepageConfig.create({
    data: {
      id: "default",
      heroTitle: "AUTUMN / WINTER 2026",
      heroSubtitle: "THE RAW ARCHITECTURE OF FORM",
      heroImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
      heroCtaText: "DISCOVER COLLECTION",
      heroCtaLink: "/collections/autumn-winter-2026",
      campaignTitle: "ATELIER RAW MONOLITH",
      campaignSubtitle: "Pure geometry meeting untamed Italian craftsmanship.",
      campaignImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1976&auto=format&fit=crop",
      campaignCtaText: "EXPLORE EDITORIAL",
      campaignCtaLink: "/journal/the-art-of-raw-craftsmanship",
      activeAnnouncement: "COMPLIMENTARY WHITE-GLOVE WORLDWIDE DELIVERY ON ALL ORDERS",
    },
  });
  console.log("Seeded default Homepage CMS configuration.");

  // 10. Seed Demo Orders for VIP Client
  const sampleProduct = await prisma.product.findFirst({
    where: { slug: "the-monolith-trapeze-bag" },
    include: { images: true, variants: true },
  });

  if (sampleProduct && sampleProduct.variants.length > 0) {
    const demoOrder1 = await prisma.order.create({
      data: {
        orderNumber: "RAW-2026-981240",
        userId: clientUser.id,
        customerEmail: clientUser.email,
        customerName: clientUser.name,
        customerPhone: clientUser.phone,
        status: "PROCESSING",
        paymentStatus: "PAID",
        shipmentStatus: "PACKED",
        subtotal: sampleProduct.price,
        discount: 0,
        shippingFee: 0,
        tax: 0,
        total: sampleProduct.price,
        currency: "USD",
        shippingAddressId: clientAddress.id,
        shippingAddressRaw: JSON.stringify(clientAddress),
        trackingNumber: "LR-FEDEX-948271048",
        notes: "Maison white-glove signature gift wrapping requested.",
        items: {
          create: [
            {
              productId: sampleProduct.id,
              variantId: sampleProduct.variants[0].id,
              productName: sampleProduct.name,
              productSlug: sampleProduct.slug,
              productImage: sampleProduct.images[0]?.url || "",
              size: sampleProduct.variants[0].size,
              color: sampleProduct.variants[0].color,
              price: sampleProduct.price,
              quantity: 1,
              total: sampleProduct.price,
            },
          ],
        },
        payments: {
          create: [
            {
              amount: sampleProduct.price,
              currency: "USD",
              provider: "MAISON_PAY",
              status: "PAID",
              transactionId: "TX_MAISON_981240_AUTH",
              paymentMethod: "Apple Pay (Mastercard •••• 9012)",
            },
          ],
        },
        shipments: {
          create: [
            {
              carrier: "Maison White Glove Courier",
              trackingNumber: "LR-FEDEX-948271048",
              status: "PACKED",
              estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            },
          ],
        },
      },
    });

    console.log(`Seeded demo order: ${demoOrder1.orderNumber}`);
  }

  console.log("luxury.Raw database seeding completed flawlessly.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
