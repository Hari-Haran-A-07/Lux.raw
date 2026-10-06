package auction

import (
	"errors"
	"sync"
	"time"
)

type Bid struct {
	BidID     string    `json:"bidId"`
	DropID    string    `json:"dropId"`
	UserID    string    `json:"userId"`
	UserName  string    `json:"userName"`
	Amount    float64   `json:"amount"`
	Timestamp time.Time `json:"timestamp"`
	VipTier   string    `json:"vipTier"`
}

type DropLot struct {
	DropID        string    `json:"dropId"`
	Title         string    `json:"title"`
	Edition       string    `json:"edition"`
	StartingPrice float64   `json:"startingPrice"`
	CurrentBid    float64   `json:"currentBid"`
	TopBidder     string    `json:"topBidder"`
	Status        string    `json:"status"` // ACTIVE, CLOSED, UPCOMING
	EndsAt        time.Time `json:"endsAt"`
	BidHistory    []Bid     `json:"bidHistory"`
	sync.RWMutex
}

type AuctionEngine struct {
	Lots map[string]*DropLot
	sync.RWMutex
}

func NewAuctionEngine() *AuctionEngine {
	engine := &AuctionEngine{
		Lots: make(map[string]*DropLot),
	}
	engine.seedLots()
	return engine
}

func (ae *AuctionEngine) seedLots() {
	ae.Lots["DROP-001"] = &DropLot{
		DropID:        "DROP-001",
		Title:         "Atelier Raw Monolith Prototype Coat 01/01",
		Edition:       "Unique 1-of-1 Piece",
		StartingPrice: 4200.00,
		CurrentBid:    5800.00,
		TopBidder:     "MaisonCollector_NYC",
		Status:        "ACTIVE",
		EndsAt:        time.Now().Add(24 * time.Hour),
		BidHistory: []Bid{
			{BidID: "BID-1", DropID: "DROP-001", UserID: "USR-99", UserName: "AtelierVip_Paris", Amount: 4500.00, Timestamp: time.Now().Add(-2 * time.Hour), VipTier: "HAUTE_VIP"},
			{BidID: "BID-2", DropID: "DROP-001", UserID: "USR-102", UserName: "MaisonCollector_NYC", Amount: 5800.00, Timestamp: time.Now().Add(-30 * time.Minute), VipTier: "BLACK_CARD"},
		},
	}

	ae.Lots["DROP-002"] = &DropLot{
		DropID:        "DROP-002",
		Title:         "Titanium Hardware Calfskin Sculptural Trunk",
		Edition:       "Limited Edition 03/05",
		StartingPrice: 6500.00,
		CurrentBid:    7200.00,
		TopBidder:     "TokyoAtelier_77",
		Status:        "ACTIVE",
		EndsAt:        time.Now().Add(12 * time.Hour),
		BidHistory: []Bid{
			{BidID: "BID-3", DropID: "DROP-002", UserID: "USR-401", UserName: "TokyoAtelier_77", Amount: 7200.00, Timestamp: time.Now().Add(-15 * time.Minute), VipTier: "HAUTE_VIP"},
		},
	}
}

func (ae *AuctionEngine) PlaceBid(dropID string, bid Bid) (*DropLot, error) {
	ae.Lock()
	defer ae.Unlock()

	lot, exists := ae.Lots[dropID]
	if !exists {
		return nil, errors.New("drop lot not found")
	}

	lot.Lock()
	defer lot.Unlock()

	if lot.Status != "ACTIVE" {
		return nil, errors.New("auction lot is not active")
	}

	if bid.Amount <= lot.CurrentBid {
		return nil, errors.New("bid amount must be higher than current bid")
	}

	bid.Timestamp = time.Now()
	lot.CurrentBid = bid.Amount
	lot.TopBidder = bid.UserName
	lot.BidHistory = append(lot.BidHistory, bid)

	return lot, nil
}

func (ae *AuctionEngine) GetAllLots() []*DropLot {
	ae.RLock()
	defer ae.RUnlock()

	lots := make([]*DropLot, 0, len(ae.Lots))
	for _, lot := range ae.Lots {
		lots = append(lots, lot)
	}
	return lots
}
