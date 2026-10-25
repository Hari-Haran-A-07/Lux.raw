import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { occasion = "Gala Premiere", aesthetic = "Avant-Garde Architectural" } = body || {};

    const recommendation = {
      curatedLook: `Bespoke Silhouette: ${aesthetic}`,
      occasion,
      pairing: {
        outerwear: "Structured Vicuna Overcoat in Midnight Charcoal",
        tailoring: "Silk-Lapel Double-Breasted Dinner Tuxedo",
        footwear: "Hand-Burnished Goodyear Welted Derby"
      },
      stylistConfidenceScore: 0.992,
      generatedAt: new Date().toISOString()
    };

    return NextResponse.json(recommendation, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Invalid stylist payload" }, { status: 400 });
  }
}
