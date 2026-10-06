package telemetry

import (
	"math/rand"
	"sync"
	"time"
)

type StoreMetrics struct {
	ActiveClients     int            `json:"activeClients"`
	LiveBagAdditions  int            `json:"liveBagAdditions"`
	RequestsPerSec    int            `json:"requestsPerSec"`
	BoutiqueFootfall  map[string]int `json:"boutiqueFootfall"`
	LastUpdated       time.Time      `json:"lastUpdated"`
	ServerEngineUptime string        `json:"serverEngineUptime"`
}

type TelemetryHub struct {
	metrics   StoreMetrics
	startTime time.Time
	sync.RWMutex
}

func NewTelemetryHub() *TelemetryHub {
	hub := &TelemetryHub{
		startTime: time.Now(),
		metrics: StoreMetrics{
			ActiveClients:    1420,
			LiveBagAdditions: 38,
			RequestsPerSec:   340,
			BoutiqueFootfall: map[string]int{
				"Paris_Vendome":     84,
				"Milan_Montenapo":   112,
				"NYC_Madison":       145,
				"Tokyo_Ginza":       96,
				"London_BondStreet": 73,
			},
			LastUpdated: time.Now(),
		},
	}
	go hub.startFluctuation()
	return hub
}

func (th *TelemetryHub) startFluctuation() {
	ticker := time.NewTicker(2 * time.Second)
	for range ticker.C {
		th.Lock()
		delta := rand.Intn(15) - 7
		th.metrics.ActiveClients = max(1000, th.metrics.ActiveClients+delta)
		th.metrics.LiveBagAdditions = max(10, th.metrics.LiveBagAdditions+rand.Intn(5)-2)
		th.metrics.RequestsPerSec = max(200, 300+rand.Intn(100))
		th.metrics.LastUpdated = time.Now()
		th.metrics.ServerEngineUptime = time.Since(th.startTime).String()
		th.Unlock()
	}
}

func (th *TelemetryHub) GetCurrentSnapshot() StoreMetrics {
	th.RLock()
	defer th.RUnlock()
	return th.metrics
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}
