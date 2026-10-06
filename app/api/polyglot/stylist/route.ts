import { NextRequest, NextResponse } from "next/server";
import { polyglotOrchestrator } from "@/lib/polyglot/orchestrator";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { aesthetic = "Architectural Brutalism", occasion = "Milan Fashion Week Gala", budget = "$5,000 - $15,000" } = body;
    const result = await polyglotOrchestrator.executePythonStylist(aesthetic, occasion, budget);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
