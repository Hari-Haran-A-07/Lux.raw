import { NextResponse } from "next/server";
import { aggregateMeshHealth } from "@/lib/polyglot/health-checker";

export async function GET() {
  try {
    const report = await aggregateMeshHealth();
    return NextResponse.json(report, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to collect mesh health metrics", details: String(error) },
      { status: 500 }
    );
  }
}
