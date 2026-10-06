import { NextRequest, NextResponse } from "next/server";
import { polyglotOrchestrator } from "@/lib/polyglot/orchestrator";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId = "ORD-7749", amount = 2850.0, currency = "USD", email = "vip.patron@luxraw.com", country = "IT" } = body;
    const result = await polyglotOrchestrator.executeCsharpPayment(orderId, amount, currency, email, country);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
