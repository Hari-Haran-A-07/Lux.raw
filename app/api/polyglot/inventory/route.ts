import { NextRequest, NextResponse } from "next/server";
import { polyglotOrchestrator } from "@/lib/polyglot/orchestrator";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderReference = "ORD-MAISON-901", items = [{ sku: "LUX-COAT-001", quantity: 1 }], region = "EU" } = body;
    const result = await polyglotOrchestrator.executeJavaStockAllocation(orderReference, items, region);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
