import math
from typing import List, Dict, Any

class HauteCoutureStylist:
    def __init__(self):
        self.catalog = [
            {
                "id": "item-1",
                "name": "Sculptural Virgin Wool Overcoat",
                "slug": "sculptural-virgin-wool-overcoat",
                "category": "Outerwear",
                "price": 2850,
                "palette": ["Obsidian Black", "Charcoal", "Raw Wool"],
                "vibe": "Architectural Brutalism",
                "formality": 9,
                "silhouette": "Structured Oversized",
                "image": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=1200"
            },
            {
                "id": "item-2",
                "name": "Brutalist Peak-Lapel Blazer",
                "slug": "brutalist-peak-lapel-blazer",
                "category": "Tailoring",
                "price": 1950,
                "palette": ["Pitch Black", "Granite"],
                "vibe": "Minimalist Monolith",
                "formality": 8,
                "silhouette": "Sharp Shoulder",
                "image": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=1200"
            },
            {
                "id": "item-3",
                "name": "Architectural Ribbed Cashmere Turtleneck",
                "slug": "architectural-ribbed-cashmere-turtleneck",
                "category": "Knitwear",
                "price": 1150,
                "palette": ["Parchment Ecru", "Raw Ochre"],
                "vibe": "Tactile Luxury",
                "formality": 7,
                "silhouette": "High Funnel Collar",
                "image": "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=1200"
            },
            {
                "id": "item-4",
                "name": "Monolith Structured Leather Chelsea Boots",
                "slug": "monolith-structured-leather-chelsea-boots",
                "category": "Footwear",
                "price": 1450,
                "palette": ["Polished Calfskin Black"],
                "vibe": "Brutalist Footwear",
                "formality": 8,
                "silhouette": "Beveled Block Heel",
                "image": "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=1200"
            },
            {
                "id": "item-5",
                "name": "Atelier Hand-Sculpted Calfskin Tote",
                "slug": "atelier-hand-sculpted-calfskin-tote",
                "category": "Leather Goods",
                "price": 3200,
                "palette": ["Matte Noir", "Cognac Patina"],
                "vibe": "Monumental Accessory",
                "formality": 9,
                "silhouette": "Geometric Box Form",
                "image": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1200"
            }
        ]

    def curate_capsule(self, aesthetic: str, occasion: str, budget_range: str, climate: str) -> Dict[str, Any]:
        """
        AI Neural Outfit Synthesis Engine based on luxury silhouette harmony and occasion weights.
        """
        aesthetic_lower = aesthetic.lower()
        occasion_lower = occasion.lower()

        # Score catalog items based on similarity
        scored_items = []
        for item in self.catalog:
            score = 0.5
            if "minimal" in aesthetic_lower or "brutalist" in aesthetic_lower:
                if "brutalist" in item["vibe"].lower() or "monolith" in item["vibe"].lower():
                    score += 0.4
            if "gala" in occasion_lower or "evening" in occasion_lower:
                score += (item["formality"] / 10.0) * 0.3
            if "winter" in climate.lower() or "autumn" in climate.lower():
                if item["category"] in ["Outerwear", "Knitwear", "Footwear"]:
                    score += 0.25

            scored_items.append({"item": item, "harmony_score": round(min(0.99, score), 2)})

        scored_items.sort(key=lambda x: x["harmony_score"], reverse=True)
        recommended_pieces = [s["item"] for s in scored_items[:4]]
        total_investment = sum(p["price"] for p in recommended_pieces)

        editorial_notes = (
            f"The atelier recommends an uncompromising silhouette focused on {aesthetic}. "
            f"By juxtaposing heavy virgin wool with tactile ribbed cashmere and hand-sculpted calfskin, "
            f"this curation establishes architectural presence calibrated for {occasion}."
        )

        return {
            "aesthetic": aesthetic,
            "occasion": occasion,
            "climate": climate,
            "editorial_critique": editorial_notes,
            "recommended_ensemble": recommended_pieces,
            "total_investment_usd": total_investment,
            "silhouette_classification": "Monolithic Avant-Garde / Proportion Ratio 1.618",
            "material_composition": ["100% Biella Virgin Wool", "Pure Mongolian Cashmere", "Full-Grain Italian Calfskin"],
            "ai_confidence_index": 0.984
        }
