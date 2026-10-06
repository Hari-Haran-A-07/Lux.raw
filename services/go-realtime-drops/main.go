package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/luxraw/go-realtime-drops/auction"
	"github.com/luxraw/go-realtime-drops/telemetry"
)

var (
	auctionEngine = auction.NewAuctionEngine()
	telemetryHub  = telemetry.NewTelemetryHub()
)

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	res := map[string]interface{}{
		"service":   "luxury.Raw Go Real-time Drops & Telemetry Engine",
		"language":  "Go (Golang 1.22)",
		"status":    "ACTIVE",
		"concurrency": "Goroutines & Go Channels",
		"activeDropCount": len(auctionEngine.GetAllLots()),
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)
}

func lotsHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	if r.Method == "OPTIONS" {
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(auctionEngine.GetAllLots())
}

func bidHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	if r.Method == "OPTIONS" {
		return
	}
	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req struct {
		DropID   string  `json:"dropId"`
		UserID   string  `json:"userId"`
		UserName string  `json:"userName"`
		Amount   float64 `json:"amount"`
		VipTier  string  `json:"vipTier"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	bid := auction.Bid{
		BidID:    fmt.Sprintf("BID-%d", req.Amount),
		DropID:   req.DropID,
		UserID:   req.UserID,
		UserName: req.UserName,
		Amount:   req.Amount,
		VipTier:  req.VipTier,
	}

	updatedLot, err := auctionEngine.PlaceBid(req.DropID, bid)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(updatedLot)
}

func telemetryHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(telemetryHub.GetCurrentSnapshot())
}

func main() {
	http.HandleFunc("/api/v1/drops/health", healthHandler)
	http.HandleFunc("/api/v1/drops/lots", lotsHandler)
	http.HandleFunc("/api/v1/drops/bid", bidHandler)
	http.HandleFunc("/api/v1/drops/telemetry", telemetryHandler)

	fmt.Println("🐹 [Go Drops Engine] luxury.Raw Real-Time Runway Auction Gateway active on port 8082")
	log.Fatal(http.ListenAndServe(":8082", nil))
}
