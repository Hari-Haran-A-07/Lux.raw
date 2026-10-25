export interface TelemetryEvent {
  id: string;
  timestamp: number;
  engineId: string;
  eventType: "METRIC_PULSE" | "AUCTION_BID" | "CRYPTO_VERIFY" | "CONCIERGE_BOOKING";
  payload: Record<string, unknown>;
  latencyMs: number;
  status: "SUCCESS" | "WARNING" | "CRITICAL";
}

export interface StreamFrame {
  sequence: number;
  signature: string;
  events: TelemetryEvent[];
}
