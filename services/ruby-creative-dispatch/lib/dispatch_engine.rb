# frozen_string_literal: true

require 'securerandom'
require 'time'

module LuxuryRaw
  class DispatchEngine
    PRESS_OUTLETS = [
      { name: "Vogue International", tier: "TIER_A_GLOBAL", encrypted_wire: true },
      { name: "Business of Fashion", tier: "TIER_A_GLOBAL", encrypted_wire: true },
      { name: "Numéro Paris", tier: "TIER_A_EDITORIAL", encrypted_wire: true },
      { name: "AnOther Magazine", tier: "TIER_A_AVANTGARDE", encrypted_wire: true }
    ].freeze

    def self.dispatch_embargoed_monograph(title, collection_code, embargo_lift_time)
      dispatch_id = "DSP-#{SecureRandom.hex(6).upcase}"
      {
        dispatch_id: dispatch_id,
        title: title,
        collection_code: collection_code,
        embargo_lift_time: embargo_lift_time,
        recipients_count: PRESS_OUTLETS.size,
        press_outlets: PRESS_OUTLETS,
        status: "ENCRYPTED_AND_DISPATCHED",
        dispatched_at: Time.now.utc.iso8601,
        engine: "Ruby 3.3 EventMachine Dispatcher"
      }
    end
  end
end
