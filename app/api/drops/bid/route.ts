import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { dropId, patronId, bidAmountEur } = await req.json();

    if (!dropId || !patronId || !bidAmountEur) {
      return NextResponse.json({ error: "Missing bid parameters" }, { status: 400 });
    }

    return NextResponse.json({
      status: "ACCEPTED",
      dropId,
      patronId,
      recordedAmount: bidAmountEur,
      txHash: "0x" + Math.random().toString(16).substring(2, 18),
      timestamp: Date.now()
    }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Bid processing error" }, { status: 500 });
  }
}
