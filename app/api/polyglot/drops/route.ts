import { NextRequest, NextResponse } from "next/server";
import { polyglotOrchestrator } from "@/lib/polyglot/orchestrator";

export async function GET() {
  return NextResponse.json({
    activeDrops: [
      {
        dropId: "DROP-001",
        title: "Atelier Raw Monolith Prototype Coat 01/01",
        edition: "Unique 1-of-1 Piece",
        startingPrice: 4200.0,
        currentBid: 5800.0,
        topBidder: "MaisonCollector_NYC",
        status: "ACTIVE",
        engine: "Go 1.22 Goroutine Real-Time Gateway"
      },
      {
        dropId: "DROP-002",
        title: "Titanium Hardware Calfskin Sculptural Trunk",
        edition: "Limited Edition 03/05",
        startingPrice: 6500.0,
        currentBid: 7200.0,
        topBidder: "TokyoAtelier_77",
        status: "ACTIVE",
        engine: "Go 1.22 Goroutine Real-Time Gateway"
      }
    ]
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { dropId = "DROP-001", userId = "USR-CURRENT", userName = "MaisonPatron_VIP", amount = 6000 } = body;
    const result = await polyglotOrchestrator.executeGoAuctionBid(dropId, userId, userName, amount);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
