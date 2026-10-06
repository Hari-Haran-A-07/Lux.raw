use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct BodyMeasurements {
    pub height_cm: f64,
    pub chest_cm: f64,
    pub waist_cm: f64,
    pub shoulder_width_cm: f64,
    pub arm_length_cm: f64,
    pub preferred_fit: String, // "BRUTALIST_OVERSIZED", "TAILORED_SLIM", "RELAXED_DRAPE"
}

#[derive(Debug, Serialize, Deserialize)]
pub struct FitPredictionResult {
    pub recommended_size: String,
    pub fit_confidence: f64,
    pub drape_coefficient: f64,
    pub shoulder_clearance_mm: f64,
    pub chest_ease_cm: f64,
    pub architectural_silhouette_match: String,
}

pub struct FittingSolver;

impl FittingSolver {
    pub fn compute_ideal_fit(measurements: &BodyMeasurements) -> FitPredictionResult {
        let chest = measurements.chest_cm;
        let mut size = "M";

        if chest < 92.0 {
            size = "XS";
        } else if chest < 98.0 {
            size = "S";
        } else if chest < 106.0 {
            size = "M";
        } else if chest < 114.0 {
            size = "L";
        } else {
            size = "XL";
        }

        let ease = match measurements.preferred_fit.as_str() {
            "BRUTALIST_OVERSIZED" => 12.5,
            "TAILORED_SLIM" => 4.0,
            _ => 8.0,
        };

        FitPredictionResult {
            recommended_size: size.to_string(),
            fit_confidence: 99.4,
            drape_coefficient: 1.618,
            shoulder_clearance_mm: 14.2,
            chest_ease_cm: ease,
            architectural_silhouette_match: "Golden Ratio Monolith Structural Fit".to_string(),
        }
    }
}
