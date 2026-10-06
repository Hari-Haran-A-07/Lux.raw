import { NextResponse } from "next/server";
import { polyglotOrchestrator } from "@/lib/polyglot/orchestrator";

export async function GET() {
  try {
    const engines = await polyglotOrchestrator.getEngineRegistry();
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      architecture: "luxury.Raw Maison Polyglot Mesh (11 Multi-Language Engines)",
      totalEnginesActive: engines.length,
      engines
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
