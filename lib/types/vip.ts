export type VipPatronTier = "CENTENNIAL" | "ARCHIVE_PRIVÉ" | "HAUTE_CLUB" | "PATRON";

export interface SommelierPairing {
  house: string;
  vintage: string;
  tastingNotes: string[];
  provenance: string;
}

export interface SalonBookingRequest {
  patronName: string;
  patronEmail: string;
  tier: VipPatronTier;
  suitePreference: "Faubourg" | "Montaigne" | "Vendôme";
  bookingDate: string;
  curatedSommelierSelection?: SommelierPairing;
}
