import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    return NextResponse.json({
      confirmed: true,
      reservationId: "VIP-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
      details: body,
      conciergeNotice: "A private butler and sommelier have been assigned to your suite."
    });
  } catch {
    return NextResponse.json({ error: "Reservation payload invalid" }, { status: 400 });
  }
}
