import { NextResponse } from "next/server";

export async function GET() {
  const dispatches = [
    {
      id: "DISP-001",
      title: "Maison Lux Unveils Centennial Polyglot Haute Mesh",
      releasedAt: "2026-10-25",
      embargoLifted: true,
      format: "Bilingual Press Release (EN/FR)"
    }
  ];

  return NextResponse.json({ dispatches, count: dispatches.length });
}
