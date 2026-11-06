import crypto from "crypto";

export interface LuxuryCertificate {
  certificateId: string;
  sku: string;
  editionNumber: number;
  totalEditions: number;
  craftDate: string;
  artisanMasterId: string;
  atelierLocation: string;
  materialOrigin: string;
  cryptographicSignature: string;
  verificationHash: string;
}

const MAISON_CERTIFICATE_SECRET = process.env.MAISON_SECRET || "lux-raw-master-provenance-key-2026";

/**
 * Generates an immutable cryptographic Certificate of Authenticity for limited-edition creations.
 */
export function generateCertificate(params: {
  sku: string;
  editionNumber: number;
  totalEditions: number;
  artisanMasterId: string;
  atelierLocation: string;
  materialOrigin: string;
}): LuxuryCertificate {
  const craftDate = new Date().toISOString().split("T")[0];
  const payload = `${params.sku}:${params.editionNumber}/${params.totalEditions}:${craftDate}:${params.artisanMasterId}:${params.atelierLocation}:${params.materialOrigin}`;

  const cryptographicSignature = crypto
    .createHmac("sha256", MAISON_CERTIFICATE_SECRET)
    .update(payload)
    .digest("hex");

  const verificationHash = crypto
    .createHash("sha256")
    .update(`${cryptographicSignature}:${payload}`)
    .digest("hex")
    .slice(0, 16)
    .toUpperCase();

  const certificateId = `LUX-CERT-${verificationHash.slice(0, 8)}`;

  return {
    certificateId,
    sku: params.sku,
    editionNumber: params.editionNumber,
    totalEditions: params.totalEditions,
    craftDate,
    artisanMasterId: params.artisanMasterId,
    atelierLocation: params.atelierLocation,
    materialOrigin: params.materialOrigin,
    cryptographicSignature,
    verificationHash,
  };
}

/**
 * Verifies the validity of an issued luxury certificate against Maison cryptokeys.
 */
export function verifyCertificate(certificate: LuxuryCertificate): boolean {
  const payload = `${certificate.sku}:${certificate.editionNumber}/${certificate.totalEditions}:${certificate.craftDate}:${certificate.artisanMasterId}:${certificate.atelierLocation}:${certificate.materialOrigin}`;

  const expectedSignature = crypto
    .createHmac("sha256", MAISON_CERTIFICATE_SECRET)
    .update(payload)
    .digest("hex");

  if (expectedSignature !== certificate.cryptographicSignature) {
    return false;
  }

  const expectedHash = crypto
    .createHash("sha256")
    .update(`${expectedSignature}:${payload}`)
    .digest("hex")
    .slice(0, 16)
    .toUpperCase();

  return expectedHash === certificate.verificationHash;
}
