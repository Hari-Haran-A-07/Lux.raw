import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "A valid email address is required" }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();

    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email: cleanEmail },
    });

    if (existing) {
      return NextResponse.json({
        success: true,
        message: "You are already subscribed to the luxury.Raw gazette.",
      });
    }

    await prisma.newsletterSubscriber.create({
      data: { email: cleanEmail },
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for subscribing to luxury.Raw private communications.",
    });
  } catch (error) {
    console.error("Newsletter Subscribe Error:", error);
    return NextResponse.json({ error: "Failed to process subscription" }, { status: 500 });
  }
}
