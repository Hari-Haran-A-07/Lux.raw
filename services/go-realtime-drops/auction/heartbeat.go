package auction

import (
	"sync"
	"time"
)

// ClientSession records real-time VIP bidder connection health
type ClientSession struct {
	ClientID       string    `json:"client_id"`
	VIPTier        string    `json:"vip_tier"`
	LastPing       time.Time `json:"last_ping"`
	LatencyMs      int64     `json:"latency_ms"`
	IsConnected    bool      `json:"is_connected"`
	BoutiqueOrigin string    `json:"boutique_origin"`
}

// HeartbeatMonitor manages concurrent sub-millisecond heartbeat telemetry
type HeartbeatMonitor struct {
	mu       sync.RWMutex
	sessions map[string]*ClientSession
	timeout  time.Duration
}

// NewHeartbeatMonitor initializes the telemetry tracker
func NewHeartbeatMonitor(timeout time.Duration) *HeartbeatMonitor {
	return &HeartbeatMonitor{
		sessions: make(map[string]*ClientSession),
		timeout:  timeout,
	}
}

// RegisterPing records an incoming pong/heartbeat from a VIP client
func (h *HeartbeatMonitor) RegisterPing(clientID, tier, boutique string, latencyMs int64) {
	h.mu.Lock()
	defer h.mu.Unlock()

	h.sessions[clientID] = &ClientSession{
		ClientID:       clientID,
		VIPTier:        tier,
		LastPing:       time.Now(),
		LatencyMs:      latencyMs,
		IsConnected:    true,
		BoutiqueOrigin: boutique,
	}
}

// PruneStaleClients disconnects clients failing heartbeat thresholds
func (h *HeartbeatMonitor) PruneStaleClients() []string {
	h.mu.Lock()
	defer h.mu.Unlock()

	var pruned []string
	now := time.Now()

	for id, session := range h.sessions {
		if now.Sub(session.LastPing) > h.timeout {
			session.IsConnected = false
			pruned = append(pruned, id)
			delete(h.sessions, id)
		}
	}

	return pruned
}

// ActiveClientCount returns currently healthy live bidders
func (h *HeartbeatMonitor) ActiveClientCount() int {
	h.mu.RLock()
	defer h.mu.RUnlock()
	return len(h.sessions)
}
