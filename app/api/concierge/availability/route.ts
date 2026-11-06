import { NextResponse } from "next/server";

export const runtime = "nodejs";

interface SalonSlot {
  slotId: string;
  time: string;
  masterStylist: string;
  salonSuite: string;
  sommelierServiceIncluded: boolean;
  status: "AVAILABLE" | "RESERVED";
}

const SALON_LOCATIONS: Record<string, { city: string; address: string; suites: string[] }> = {
  PARIS: {
    city: "Paris",
    address: "14 Place Vendôme, 75001 Paris",
    suites: ["Suite Vendôme Noir", "Salon Haute Joaillerie"],
  },
  MILAN: {
    city: "Milan",
    address: "Via Montenapoleone 8, 20121 Milano",
    suites: ["Sala Seta Nera", "Suite Duomo"],
  },
  TOKYO: {
    city: "Tokyo",
    address: "5-7-1 Ginza, Chuo-ku, Tokyo 104-0061",
    suites: ["Ginza Obsidian Chamber"],
  },
  NEWYORK: {
    city: "New York",
    address: "712 Madison Avenue, New York, NY 10065",
    suites: ["Penthouse Atelier Madison"],
  },
  LONDON: {
    city: "London",
    address: "160 New Bond Street, Mayfair, London W1S 2UE",
    suites: ["Mayfair Private Salon"],
  },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locationCode = (searchParams.get("location") || "PARIS").toUpperCase();
  const dateStr = searchParams.get("date") || new Date().toISOString().split("T")[0];

  const location = SALON_LOCATIONS[locationCode] || SALON_LOCATIONS.PARIS;

  const stylists = [
    "Jean-Luc Moreau (Master Couturier)",
    "Elena Rossi (Haute Joaillerie Specialist)",
    "Hélène de Saint-Germain (Chief Silhouette Director)",
  ];

  const slots: SalonSlot[] = [
    {
      slotId: `${locationCode}-1000`,
      time: "10:00 AM",
      masterStylist: stylists[0],
      salonSuite: location.suites[0],
      sommelierServiceIncluded: true,
      status: "AVAILABLE",
    },
    {
      slotId: `${locationCode}-1400`,
      time: "02:00 PM",
      masterStylist: stylists[1],
      salonSuite: location.suites[0],
      sommelierServiceIncluded: true,
      status: "RESERVED",
    },
    {
      slotId: `${locationCode}-1630`,
      time: "04:30 PM",
      masterStylist: stylists[2],
      salonSuite: location.suites[1] || location.suites[0],
      sommelierServiceIncluded: true,
      status: "AVAILABLE",
    },
    {
      slotId: `${locationCode}-1830`,
      time: "06:30 PM",
      masterStylist: stylists[0],
      salonSuite: location.suites[0],
      sommelierServiceIncluded: true,
      status: "AVAILABLE",
    },
  ];

  return NextResponse.json({
    success: true,
    location: {
      code: locationCode,
      city: location.city,
      address: location.address,
    },
    date: dateStr,
    champagneService: "Dom Pérignon Vintage 2013 Atelier Edition",
    availableSlotsCount: slots.filter((s) => s.status === "AVAILABLE").length,
    slots,
  });
}
