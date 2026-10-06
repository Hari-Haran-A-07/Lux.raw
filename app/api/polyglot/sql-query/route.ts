import { NextRequest, NextResponse } from "next/server";
import { polyglotOrchestrator } from "@/lib/polyglot/orchestrator";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { queryType = "CATEGORY_TREE" } = body;
    const result = await polyglotOrchestrator.executeSqlAnalytics(queryType);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
