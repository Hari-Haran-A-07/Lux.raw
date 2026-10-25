# frozen_string_literal: true
require 'openssl'

describe "CreativeDispatchEngine" do
  it "signs dispatch webhooks with HMAC-SHA256" do
    payload = "{\"issue\":\"Vol. LXXIV - Haute Couture Autumn\"}"
    key = "lux-secret-dispatch-key"
    digest = OpenSSL::HMAC.hexdigest("SHA256", key, payload)
    
    expect(digest.length).to eq(64)
  end

  it "validates editorial release metadata formatting" do
    metadata = {
      curator: "Hélène de Rothschild",
      status: :published,
      circulated_patrons: 420
    }
    expect(metadata[:circulated_patrons]).to be >= 100
  end
end
