import { NextResponse } from "next/server";

export async function GET() {
  const milestones = [
    { year: 1924, title: "Maison Founded in Milan", category: "Genesis" },
    { year: 1956, title: "The Sovereign Vicuna Capsule Debut", category: "Couture" },
    { year: 1988, title: "Global Flagship Unveiled on Place Vendôme", category: "Architecture" },
    { year: 2024, title: "Decentralized Polyglot Authenticity Engine", category: "Innovation" }
  ];

  return NextResponse.json({ milestones, count: milestones.length });
}
