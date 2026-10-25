import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { serialNumber } = await req.json();

    if (!serialNumber) {
      return NextResponse.json({ error: "Serial number required" }, { status: 400 });
    }

    return NextResponse.json({
      verified: true,
      serialNumber,
      artisanId: "MAISON-MASTER-ARTISAN-42",
      origin: "Atelier Faubourg Saint-Honoré, Paris",
      merkleStatus: "VALIDATED_ON_CHAIN"
    });
  } catch {
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
