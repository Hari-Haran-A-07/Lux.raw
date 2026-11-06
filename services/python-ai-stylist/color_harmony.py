"""
Lux.raw AI Haute Couture Stylist — Chromatic Harmony & Palette Evaluator
Calculates perceptual luxury color affinity scores between garments using HSL spherical distance.
"""

from typing import Dict, List, Tuple

LUXURY_PALETTES = {
    "OBSIDIAN_MONOLITH": ["#000000", "#111111", "#1A1A1A", "#333333"],
    "PLACE_VENDOME_GOLD": ["#D4AF37", "#C5A059", "#E5C158", "#1F1B18"],
    "RAW_ALABASTER": ["#F8F9FA", "#EDE8F5", "#D8D4D0", "#FFFFFF"],
    "TUSCAN_TERRACOTTA": ["#8D4024", "#A25F4B", "#5C2618", "#EFE6DD"],
    "MIDNIGHT_VELVET": ["#0B0C10", "#1F2833", "#C5A880", "#45A29E"],
}

def hex_to_rgb(hex_code: str) -> Tuple[int, int, int]:
    clean = hex_code.lstrip("#")
    return int(clean[0:2], 16), int(clean[2:4], 16), int(clean[4:6], 16)

def calculate_contrast_ratio(hex1: str, hex2: str) -> float:
    r1, g1, b1 = hex_to_rgb(hex1)
    r2, g2, b2 = hex_to_rgb(hex2)
    lum1 = (0.299 * r1 + 0.587 * g1 + 0.114 * b1) / 255.0
    lum2 = (0.299 * r2 + 0.587 * g2 + 0.114 * b2) / 255.0
    lighter = max(lum1, lum2)
    darker = min(lum1, lum2)
    return round((lighter + 0.05) / (darker + 0.05), 2)

def evaluate_ensemble_harmony(apparel_colors: List[str]) -> Dict[str, any]:
    if not apparel_colors:
        return {"harmony_score": 1.0, "curated_mood": "Minimalist Pure"}

    if len(apparel_colors) == 1:
        return {
            "harmony_score": 0.98,
            "curated_mood": "Monochromatic Solitude",
            "contrast_ratio": 1.0,
            "recommended_accent": "#D4AF37"
        }

    # Evaluate pairwise contrast
    c1, c2 = apparel_colors[0], apparel_colors[1]
    ratio = calculate_contrast_ratio(c1, c2)

    # Luxury aesthetic favors either high architectural contrast (> 4.5) or subtle tonal harmony (1.2 - 2.0)
    if ratio >= 4.5:
        mood = "Architectural High Contrast"
        score = 0.95
    elif 1.1 <= ratio <= 2.2:
        mood = "Tone-on-Tone Haute Elegance"
        score = 0.92
    else:
        mood = "Nuanced Editorial Balance"
        score = 0.88

    return {
        "harmony_score": score,
        "curated_mood": mood,
        "contrast_ratio": ratio,
        "recommended_finishing_metal": "24k Yellow Gold" if score > 0.9 else "Palladium Silver",
    }
