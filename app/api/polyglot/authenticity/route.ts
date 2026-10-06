import { NextRequest, NextResponse } from "next/server";
import { polyglotOrchestrator } from "@/lib/polyglot/orchestrator";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { serialNumber = "LUX-FLORENCE-2026-9092", atelierCode = "ATELIER-FLORENCE-04" } = body;
    const result = await polyglotOrchestrator.executeRustPassportVerification(serialNumber, atelierCode);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
