import { describe, it, expect } from "vitest";
import { formatLuxuryPrice, LUXURY_CURRENCIES } from "../components/ui/CurrencySelector";
import { generateCertificate, verifyCertificate } from "../provenance";

describe("Maison Luxury Pricing & Currencies", () => {
  it("formats base EUR prices correctly with two decimals", () => {
    const formatted = formatLuxuryPrice(1250, "EUR");
    expect(formatted).toBe("€1,250.00");
  });

  it("applies USD currency conversion multiplier", () => {
    const formatted = formatLuxuryPrice(1000, "USD");
    expect(formatted).toBe("$1,080.00");
  });

  it("handles Japanese Yen integer rounding without decimal cents", () => {
    const formatted = formatLuxuryPrice(100, "JPY");
    expect(formatted).toBe("¥16,520");
  });
});

describe("Cryptographic Provenance Certificate Engine", () => {
  it("issues a verifiable cryptographic certificate of authenticity", () => {
    const cert = generateCertificate({
      sku: "LUX-MONOLITH-001",
      editionNumber: 1,
      totalEditions: 50,
      artisanMasterId: "ARTISAN-PARIS-07",
      atelierLocation: "Place Vendôme",
      materialOrigin: "Tuscan Saddle Leather",
    });

    expect(cert.certificateId).toMatch(/^LUX-CERT-/);
    expect(cert.cryptographicSignature).toBeDefined();
    expect(verifyCertificate(cert)).toBe(true);
  });

  it("rejects certificates with tampered parameters", () => {
    const cert = generateCertificate({
      sku: "LUX-SILK-009",
      editionNumber: 5,
      totalEditions: 10,
      artisanMasterId: "ARTISAN-LYON-03",
      atelierLocation: "Lyon Atelier",
      materialOrigin: "Mulberry Silk",
    });

    // Tamper with edition number
    const tamperedCert = { ...cert, editionNumber: 2 };
    expect(verifyCertificate(tamperedCert)).toBe(false);
  });
});
