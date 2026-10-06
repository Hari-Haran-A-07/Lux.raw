<?php

namespace LuxRaw\Heritage;

class HeritageArchive {
    private array $milestones = [
        [
            "year" => "1924",
            "title" => "Founding of the Florentine Monolith Atelier",
            "location" => "Florence, Italy",
            "narrative" => "Maestro Giancarlo founded the raw tannery workshop near the Arno river, dedicating life to vegetable-tanned full-grain skins and brutalist geometries.",
            "era_code" => "ERA-FLORENCE-ORIGIN",
            "iconic_craft" => "Hand-Waxed Cuoio Leather Trunks"
        ],
        [
            "year" => "1976",
            "title" => "The Architectural Brutalism Manifesto",
            "location" => "Milan, Italy",
            "narrative" => "luxury.Raw published its defining design manifesto in Milan, rejecting ornamental excess in favor of pure monolithic silhouettes and unpolished raw titanium hardware.",
            "era_code" => "ERA-MILAN-BRUTALISM",
            "iconic_craft" => "Structural Virgin Wool Trench & Beveled Lapels"
        ],
        [
            "year" => "2026",
            "title" => "The Digital Polyglot Haute Monolith",
            "location" => "Paris & Tokyo",
            "narrative" => "The Maison merges centuries-old Italian savoir-faire with high-speed polyglot engineering, introducing cryptographic digital passports and zero-waste tailoring.",
            "era_code" => "ERA-RAW-MONOLITH-2026",
            "iconic_craft" => "The Atelier Monolith Overcoat & Titanium Bag"
        ]
    ];

    public function getAllMilestones(): array {
        return $this->milestones;
    }

    public function getMilestoneByYear(string $year): ?array {
        foreach ($this->milestones as $m) {
            if ($m['year'] === $year) return $m;
        }
        return null;
    }
}
