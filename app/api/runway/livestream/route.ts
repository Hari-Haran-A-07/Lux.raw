import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const now = new Date();
  const scheduledShowTime = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();

  return NextResponse.json({
    success: true,
    season: "Autumn / Winter 2026",
    collectionTitle: "Monolith & Void: Architecture of Form",
    venue: "Grand Palais Éphémère, Paris",
    livestream: {
      status: "UPCOMING",
      startsAt: scheduledShowTime,
      countdownSeconds: 48 * 3600,
      hlsPlaybackUrl: "https://stream.luxurymark.internal/hls/parisfw26/index.m3u8",
      resolution: "4K UHD 60fps Dolby Vision",
      audioMix: "Binaural 3D Spatial Audio",
    },
    frontRowVIPAccess: {
      requiresToken: true,
      vipPassType: "SOVEREIGN_PATRON",
      perks: [
        "Instant private runway reserve order capability",
        "Direct live stylist voice memo stream",
        "Access to unreleased backstage lookbook monographs",
      ],
    },
    chapters: [
      { id: "ch1", timecode: "00:00", title: "Act I: Raw Concrete Silhouettes" },
      { id: "ch2", timecode: "08:30", title: "Act II: Architectural Draped Silks" },
      { id: "ch3", timecode: "16:45", title: "Act III: Cryptographic Outerwear" },
      { id: "ch4", timecode: "24:10", title: "Finale & Creative Director Bow" },
    ],
  });
}
