import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    let config = await prisma.homepageConfig.findUnique({
      where: { id: "default" },
    });

    if (!config) {
      config = await prisma.homepageConfig.create({
        data: { id: "default" },
      });
    }

    return NextResponse.json({ config });
  } catch (error) {
    console.error("Admin Homepage GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch homepage config" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getSession();
    if (!session || (session.role !== "SUPER_ADMIN" && session.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const body = await req.json();
    const {
      heroTitle,
      heroSubtitle,
      heroImage,
      heroCtaText,
      heroCtaLink,
      campaignTitle,
      campaignSubtitle,
      campaignImage,
      campaignCtaText,
      campaignCtaLink,
      activeAnnouncement,
    } = body;

    const updated = await prisma.homepageConfig.upsert({
      where: { id: "default" },
      create: {
        id: "default",
        heroTitle,
        heroSubtitle,
        heroImage,
        heroCtaText,
        heroCtaLink,
        campaignTitle,
        campaignSubtitle,
        campaignImage,
        campaignCtaText,
        campaignCtaLink,
        activeAnnouncement,
      },
      update: {
        heroTitle,
        heroSubtitle,
        heroImage,
        heroCtaText,
        heroCtaLink,
        campaignTitle,
        campaignSubtitle,
        campaignImage,
        campaignCtaText,
        campaignCtaLink,
        activeAnnouncement,
      },
    });

    return NextResponse.json({ success: true, config: updated });
  } catch (error) {
    console.error("Admin Homepage PUT Error:", error);
    return NextResponse.json({ error: "Failed to update homepage config" }, { status: 500 });
  }
}
