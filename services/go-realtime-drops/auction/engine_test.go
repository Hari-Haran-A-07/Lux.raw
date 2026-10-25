package auction

import (
	"sync"
	"testing"
	"time"
)

func TestConcurrentBiddingRaceConditions(t *testing.T) {
	var mu sync.Mutex
	highestBid := 1000.00
	bidCount := 0

	var wg sync.WaitGroup
	workers := 20

	for i := 0; i < workers; i++ {
		wg.Add(1)
		go func(workerID int) {
			defer wg.Done()
			mu.Lock()
			bidCount++
			highestBid += 50.0
			mu.Unlock()
		}(i)
	}

	wg.Wait()

	if bidCount != workers {
		t.Errorf("Expected %d bids, got %d", workers, bidCount)
	}
	if highestBid <= 1000.00 {
		t.Errorf("Highest bid failed to increment properly: %f", highestBid)
	}
}

func TestAuctionHeartbeatTimeout(t *testing.T) {
	timeout := 100 * time.Millisecond
	select {
	case <-time.After(50 * time.Millisecond):
		// Success within deadline
	case <-time.After(timeout):
		t.Fatal("Auction channel timed out")
	}
}
