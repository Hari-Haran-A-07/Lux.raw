import { NextResponse } from "next/server";

export const runtime = "nodejs";

const BANNED_TERMS = ["NAZI", "HATE", "KILL", "SCAM", "FAKE"];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { initials, foilType = "GOLD_LEAF", font = "SERIF_ROMAN", debossDepth = 1.5 } = body;

    if (!initials || typeof initials !== "string") {
      return NextResponse.json(
        { error: "Bespoke monogram initials must be provided (1 to 4 characters)" },
        { status: 400 }
      );
    }

    const cleanInitials = initials.trim().toUpperCase().replace(/[^A-Z]/g, "").slice(0, 4);

    if (cleanInitials.length === 0) {
      return NextResponse.json(
        { error: "Initials must contain at least one Latin alphabet character" },
        { status: 400 }
      );
    }

    if (BANNED_TERMS.some((term) => cleanInitials.includes(term))) {
      return NextResponse.json(
        { error: "The requested monogram violates Maison decorum standards." },
        { status: 422 }
      );
    }

    // Compute metallic gradient definitions
    const gradientColors: Record<string, [string, string, string]> = {
      GOLD_LEAF: ["#FDE68A", "#D97706", "#FEF3C7"],
      SILVER_PALLADIUM: ["#F1F5F9", "#94A3B8", "#E2E8F0"],
      ROSE_GOLD: ["#FECDD3", "#E11D48", "#FDE68A"],
      BLIND_DEBOSS: ["#262626", "#0A0A0A", "#404040"],
    };

    const palette = gradientColors[foilType] || gradientColors.GOLD_LEAF;

    const svgVector = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120" width="100%" height="100%">
        <defs>
          <linearGradient id="foilGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="${palette[0]}" />
            <stop offset="50%" stop-color="${palette[1]}" />
            <stop offset="100%" stop-color="${palette[2]}" />
          </linearGradient>
          <filter id="debossShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feOffset dx="0" dy="${debossDepth}" />
            <feGaussianBlur stdDeviation="1.2" result="offset-blur" />
            <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
            <feFlood flood-color="black" flood-opacity="0.8" result="color" />
            <feComposite operator="in" in="color" in2="inverse" result="shadow" />
            <feComposite operator="over" in="shadow" in2="SourceGraphic" />
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="transparent" />
        <text 
          x="50%" 
          y="62%" 
          text-anchor="middle" 
          dominant-baseline="middle" 
          font-family="${font === "SERIF_ROMAN" ? "Playfair Display, serif" : font === "BAUHAUS_SANS" ? "Inter, sans-serif" : "Baskerville, serif"}" 
          font-size="44" 
          font-weight="bold" 
          letter-spacing="0.25em" 
          fill="url(#foilGrad)" 
          filter="url(#debossShadow)">
          ${cleanInitials}
        </text>
      </svg>
    `.trim();

    return NextResponse.json({
      success: true,
      data: {
        initials: cleanInitials,
        foilType,
        font,
        debossDepthMm: debossDepth,
        dimensions: { width: 320, height: 120, unit: "px" },
        svg: svgVector,
        artisanLeadTimeDays: 1,
        atelierLocation: "Atelier Paris - Place Vendôme",
      },
    });
  } catch (error) {
    console.error("Monogram preview error:", error);
    return NextResponse.json(
      { error: "Internal Atelier rendering fault" },
      { status: 500 }
    );
  }
}
