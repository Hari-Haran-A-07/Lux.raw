import { NextRequest, NextResponse } from "next/server";
import { polyglotOrchestrator } from "@/lib/polyglot/orchestrator";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { clientName = "Madame de Montespan", clientEmail = "montespan@parishautecouture.fr", city = "Paris", date = "2026-10-24", timeSlot = "16:00" } = body;
    const result = await polyglotOrchestrator.executeKotlinSalonBooking(clientName, clientEmail, city, date, timeSlot);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
