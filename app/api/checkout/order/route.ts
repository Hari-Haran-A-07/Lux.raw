import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateOrderNumber } from "@/lib/utils";
import { getSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getSession();
    const body = await req.json();
    const {
      customerEmail,
      customerName,
      customerPhone,
      shippingAddress,
      items,
      paymentMethod,
      couponCode,
      notes,
    } = body;

    if (!customerEmail || !customerName || !shippingAddress || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Missing required checkout parameters" },
        { status: 400 }
      );
    }

    // 1. Calculate and verify subtotal server-side
    let calculatedSubtotal = 0;
    const verifiedItems: any[] = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
        include: { images: { take: 1, orderBy: { order: "asc" } } },
      });

      if (!product) {
        return NextResponse.json(
          { error: `Product with ID ${item.productId} was not found` },
          { status: 404 }
        );
      }

      const itemTotal = product.price * item.quantity;
      calculatedSubtotal += itemTotal;

      verifiedItems.push({
        productId: product.id,
        variantId: item.variantId || null,
        productName: product.name,
        productSlug: product.slug,
        productImage: product.images[0]?.url || "",
        size: item.size || null,
        color: item.color || product.color || null,
        price: product.price,
        quantity: item.quantity,
        total: itemTotal,
      });
    }

    // 2. Validate Coupon if provided
    let calculatedDiscount = 0;
    let couponRecord = null;
    if (couponCode) {
      couponRecord = await prisma.coupon.findUnique({
        where: { code: couponCode.toUpperCase().trim() },
      });
      if (couponRecord && couponRecord.isActive) {
        if (couponRecord.discountType === "PERCENTAGE") {
          calculatedDiscount = (calculatedSubtotal * couponRecord.discountValue) / 100;
          if (couponRecord.maxDiscount) {
            calculatedDiscount = Math.min(calculatedDiscount, couponRecord.maxDiscount);
          }
        } else {
          calculatedDiscount = Math.min(couponRecord.discountValue, calculatedSubtotal);
        }

        // Increment coupon use counter
        await prisma.coupon.update({
          where: { id: couponRecord.id },
          data: { usedCount: { increment: 1 } },
        });
      }
    }

    const shippingFee = 0; // Complimentary White-Glove worldwide delivery
    const tax = 0;
    const total = Math.max(0, calculatedSubtotal - calculatedDiscount + shippingFee + tax);
    const orderNumber = generateOrderNumber();

    // 3. Create Order, Items, Payment, Shipment in a single transaction
    const order = await prisma.$transaction(async (tx) => {
      // Save address if user is logged in
      let savedAddressId: string | null = null;
      if (session?.userId) {
        const addr = await tx.address.create({
          data: {
            userId: session.userId,
            fullName: shippingAddress.fullName || customerName,
            street: shippingAddress.street,
            suite: shippingAddress.suite || null,
            city: shippingAddress.city,
            state: shippingAddress.state,
            postalCode: shippingAddress.postalCode,
            country: shippingAddress.country,
            phone: shippingAddress.phone || customerPhone || null,
          },
        });
        savedAddressId = addr.id;
      }

      const createdOrder = await tx.order.create({
        data: {
          orderNumber,
          userId: session?.userId || null,
          customerEmail: customerEmail.toLowerCase().trim(),
          customerName,
          customerPhone: customerPhone || null,
          status: "PROCESSING",
          paymentStatus: "PAID",
          shipmentStatus: "PACKED",
          subtotal: calculatedSubtotal,
          discount: calculatedDiscount,
          shippingFee,
          tax,
          total,
          currency: "USD",
          shippingAddressId: savedAddressId,
          shippingAddressRaw: JSON.stringify(shippingAddress),
          couponId: couponRecord?.id || null,
          notes: notes || null,
          trackingNumber: `LR-EXP-${Math.floor(100000000 + Math.random() * 900000000)}`,
          items: {
            create: verifiedItems,
          },
          payments: {
            create: [
              {
                amount: total,
                currency: "USD",
                provider: "MAISON_PAY",
                status: "PAID",
                transactionId: `TX_${orderNumber}_${Date.now()}`,
                paymentMethod: paymentMethod || "Maison Secure Credit Card",
              },
            ],
          },
          shipments: {
            create: [
              {
                carrier: "Maison White Glove Courier",
                trackingNumber: `LR-EXP-${Math.floor(100000000 + Math.random() * 900000000)}`,
                status: "PACKED",
                estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
              },
            ],
          },
        },
        include: {
          items: true,
          payments: true,
          shipments: true,
        },
      });

      // 4. Adjust variant stock
      for (const item of verifiedItems) {
        if (item.variantId) {
          await tx.productVariant.update({
            where: { id: item.variantId },
            data: { stock: { decrement: item.quantity } },
          });
        }
      }

      return createdOrder;
    });

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        total: order.total,
        status: order.status,
        trackingNumber: order.trackingNumber,
        items: order.items,
      },
    });
  } catch (error) {
    console.error("Checkout Order Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while creating order" },
      { status: 500 }
    );
  }
}
