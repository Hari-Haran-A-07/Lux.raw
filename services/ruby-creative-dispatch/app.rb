# frozen_string_literal: true

require 'sinatra'
require 'sinatra/json'
require 'rack/cors'
require_relative 'lib/dispatch_engine'
require_relative 'lib/vip_club'

set :port, 8087
set :bind, '0.0.0.0'

use Rack::Cors do
  allow do
    origins '*'
    resource '*', headers: :any, methods: [:get, :post, :options]
  end
end

get '/api/v1/dispatch/health' do
  json({
    service: "luxury.Raw Ruby Creative Dispatch & Press Club",
    language: "Ruby 3.3 / Sinatra",
    status: "HEALTHY",
    registeredPressOutlets: LuxuryRaw::DispatchEngine::PRESS_OUTLETS.size,
    vipTiersAvailable: LuxuryRaw::VipClub.all_tiers.keys
  })
end

get '/api/v1/dispatch/tiers' do
  json(LuxuryRaw::VipClub.all_tiers)
end

post '/api/v1/dispatch/monograph' do
  data = JSON.parse(request.body.read) rescue {}
  title = data['title'] || "Autumn/Winter 2026 Architectural Monolith Monograph"
  collection_code = data['collectionCode'] || "AW26-MONOLITH"
  embargo = data['embargoLiftTime'] || (Time.now + 86400).utc.iso8601

  result = LuxuryRaw::DispatchEngine.dispatch_embargoed_monograph(title, collection_code, embargo)
  json(result)
end

puts "💎 [Ruby Creative Dispatch] Active on port 8087"
