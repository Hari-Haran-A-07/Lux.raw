package com.luxraw.erp.controller;

import com.luxraw.erp.model.StockAllocationRequest;
import com.luxraw.erp.model.WarehouseStock;
import com.luxraw.erp.service.InventorySettlementEngine;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/erp")
@CrossOrigin(origins = "*")
public class StockAllocationController {

    private final InventorySettlementEngine settlementEngine;

    public StockAllocationController(InventorySettlementEngine settlementEngine) {
        this.settlementEngine = settlementEngine;
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> status = new HashMap<>();
        status.put("service", "luxury.Raw Java ERP Inventory & Allocation Hub");
        status.put("language", "Java 21 / Spring Boot 3");
        status.put("status", "HEALTHY");
        status.put("concurrencyEngine", "ReentrantLock ConcurrentHashMap Distributed Ledger");
        status.put("timestamp", System.currentTimeMillis());
        return ResponseEntity.ok(status);
    }

    @GetMapping("/stocks")
    public ResponseEntity<Collection<WarehouseStock>> getStocks() {
        return ResponseEntity.ok(settlementEngine.getAllInventory());
    }

    @PostMapping("/allocate")
    public ResponseEntity<Map<String, Object>> allocateStock(@RequestBody StockAllocationRequest request) {
        Map<String, Object> result = settlementEngine.processAllocation(request);
        if ("SUCCESS".equals(result.get("status"))) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(409).body(result);
        }
    }
}
