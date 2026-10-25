# Maison Lux Cryptographic Authenticity Security Whitepaper

## 1. Threat Model & Safeguards
Counterfeiting in luxury fashion undermines archival provenance. Lux.raw implements a multi-layer defense:
- **Merkle Proofs**: Each physical garment embeds an NFC tag mapped to an immutable cryptographic root.
- **Asymmetric Signature**: Certified by the Maison master artisan with Ed25519 keypairs.
- **Client Fingerprinting**: Mitigates automated scraping and replay attacks.

## 2. Zero-Knowledge Payment Vault
Customer credit cards and sensitive billing details are strictly isolated in the C# .NET 8 enclave, ensuring PCI-DSS Level 1 compliance.
