package com.luxraw.erp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * luxury.Raw Maison — High-Volume Enterprise Inventory ERP & Settlement Microservice
 * Language: Java 21 / Spring Boot 3
 * Handles high-concurrency stock allocation, distributed pessimistic/optimistic locking,
 * multi-boutique warehouse routing (Paris, Milan, Tokyo, NYC, Florence), and FIFO ledger settlement.
 */
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
        System.out.println("🏛️ [Java ERP] luxury.Raw Inventory & Allocation Engine active on port 8081");
    }
}
