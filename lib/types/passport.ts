export interface AuthenticityPassport {
  serialNumber: string;
  artisanSignature: string;
  materialsCertified: string[];
  manufactureDate: string;
  atelierLocation: string;
  merkleRootHash: string;
  digitalCertificateUri?: string;
  tamperSealStatus: "SECURE" | "VERIFIED" | "FLAGGED";
}
