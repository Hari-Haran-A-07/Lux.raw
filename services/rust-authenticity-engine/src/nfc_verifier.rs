use std::collections::HashMap;
use std::time::{SystemTime, UNIX_EPOCH};

#[derive(Debug, Clone, PartialEq)]
pub struct NfcTagRecord {
    pub tag_uid: String,
    pub garment_sku: String,
    pub rolling_counter: u64,
    pub issued_timestamp: u64,
    pub is_revoked: bool,
}

pub struct NfcVerifier {
    active_tags: HashMap<String, NfcTagRecord>,
    secret_salt: String,
}

impl NfcVerifier {
    pub fn new(secret_salt: &str) -> Self {
        NfcVerifier {
            active_tags: HashMap::new(),
            secret_salt: secret_salt.to_string(),
        }
    }

    pub fn register_tag(&mut self, tag_uid: &str, garment_sku: &str) {
        let now = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .unwrap_or_default()
            .as_secs();

        let record = NfcTagRecord {
            tag_uid: tag_uid.to_string(),
            garment_sku: garment_sku.to_string(),
            rolling_counter: 0,
            issued_timestamp: now,
            is_revoked: false,
        };

        self.active_tags.insert(tag_uid.to_string(), record);
    }

    /// Verifies physical tag tap with rolling counter replay prevention
    pub fn verify_tap(&mut self, tag_uid: &str, incoming_counter: u64, token_hash: &str) -> Result<bool, &'static str> {
        let tag = match self.active_tags.get_mut(tag_uid) {
            Some(t) => t,
            None => return Err("NFC chip not found in Maison Authenticity Registry"),
        };

        if tag.is_revoked {
            return Err("Tag revoked due to counterfeit alert or physical damage");
        }

        if incoming_counter <= tag.rolling_counter {
            return Err("Replay attack detected: Counter value has already been consumed");
        }

        // Verify simulated signature hash
        let expected_signature_token = format!("{}:{}:{}", tag_uid, incoming_counter, self.secret_salt);
        let passes_check = !token_hash.is_empty() && token_hash.contains(&tag_uid[..4.min(tag_uid.len())]);

        if !passes_check {
            return Err("Cryptographic MAC signature validation failed");
        }

        tag.rolling_counter = incoming_counter;
        Ok(true)
    }

    pub fn revoke_tag(&mut self, tag_uid: &str) -> bool {
        if let Some(tag) = self.active_tags.get_mut(tag_uid) {
            tag.is_revoked = true;
            true
        } else {
            false
        }
    }
}
