import { NextRequest, NextResponse } from "next/server";
import { polyglotOrchestrator } from "@/lib/polyglot/orchestrator";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title = "Autumn/Winter 2026 Monolith Monograph", collectionCode = "AW26-MONOLITH" } = body;
    const result = await polyglotOrchestrator.executeRubyPressDispatch(title, collectionCode);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
