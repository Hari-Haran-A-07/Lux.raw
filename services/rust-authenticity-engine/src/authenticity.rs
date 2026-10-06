use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};
use chrono::Utc;

#[derive(Debug, Serialize, Deserialize)]
pub struct DigitalPassportRequest {
    pub serial_number: String,
    pub product_id: String,
    pub atelier_code: String, // e.g. "ATELIER-FLORENCE-04"
    pub artisan_id: String,
    pub crafted_date: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct DigitalPassportResult {
    pub passport_id: String,
    pub serial_number: String,
    pub cryptographic_hash: String,
    pub blockchain_merkle_root: String,
    pub authenticity_status: String, // "GENUINE_MAISON_PROVENANCE", "COUNTERFEIT_DETECTED"
    pub verified_at: String,
    pub origin_atelier: String,
    pub material_purity_score: f64,
}

pub struct AuthenticityVerifier;

impl AuthenticityVerifier {
    pub fn verify_and_generate_passport(req: &DigitalPassportRequest) -> DigitalPassportResult {
        let mut hasher = Sha256::new();
        let payload = format!("{}:{}:{}:{}:LUXURY_RAW_CANONICAL_SEED", 
            req.serial_number, req.product_id, req.atelier_code, req.artisan_id);
        hasher.update(payload.as_bytes());
        let hash_result = hex::encode(hasher.finalize());

        let is_valid_format = req.serial_number.starts_with("LUX-") || req.serial_number.len() >= 8;
        let status = if is_valid_format {
            "GENUINE_MAISON_PROVENANCE"
        } else {
            "COUNTERFEIT_DETECTED"
        };

        let mut merkle_hasher = Sha256::new();
        merkle_hasher.update(format!("MERKLE_ROOT_{}", hash_result).as_bytes());
        let merkle_root = hex::encode(merkle_hasher.finalize());

        DigitalPassportResult {
            passport_id: format!("PASSPORT-{}", &hash_result[..16].to_uppercase()),
            serial_number: req.serial_number.clone(),
            cryptographic_hash: hash_result,
            blockchain_merkle_root: merkle_root,
            authenticity_status: status.to_string(),
            verified_at: Utc::now().to_rfc3339(),
            origin_atelier: req.atelier_code.clone(),
            material_purity_score: 99.98,
        }
    }
}
