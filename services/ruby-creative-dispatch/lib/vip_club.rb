# frozen_string_literal: true

module LuxuryRaw
  class VipClub
    TIERS = {
      "OBSIDIAN" => {
        name: "Obsidian Salon Member",
        annual_spend_min: 15_000,
        privileges: ["Private Salon Keycard", "48-Hour Runway Advance Order", "Chauffeur Service"]
      },
      "TITANIUM" => {
        name: "Titanium Haute Member",
        annual_spend_min: 50_000,
        privileges: ["Custom 1-of-1 Bespoke Tailoring", "Milan Fashion Week Front-Row Passes", "Dedicated Master Artisan"]
      },
      "SOVEREIGN" => {
        name: "Sovereign Maison Patron",
        annual_spend_min: 150_000,
        privileges: ["Annual Private Flight to Florence Atelier", "Archival Monolith Vault Access", "Lifetime Private Concierge"]
      }
    }.freeze

    def self.get_tier_details(tier_name)
      TIERS[tier_name.to_s.upcase] || TIERS["OBSIDIAN"]
    end

    def self.all_tiers
      TIERS
    end
  end
end
