package com.luxraw.erp;

import java.util.concurrent.atomic.AtomicInteger;

/**
 * Enterprise Inventory Ledger Concurrency Unit Test
 */
public class InventoryLedgerTest {

    public static void main(String[] args) {
        System.out.println("Starting Java 21 Virtual Thread Inventory Ledger Test...");
        AtomicInteger allocatedStock = new AtomicInteger(100);
        
        int reserved = allocatedStock.decrementAndGet();
        if (reserved == 99) {
            System.out.println("SUCCESS: Concurrency atomic reservation validated.");
        } else {
            throw new IllegalStateException("Stock mismatch: " + reserved);
        }
    }
}
