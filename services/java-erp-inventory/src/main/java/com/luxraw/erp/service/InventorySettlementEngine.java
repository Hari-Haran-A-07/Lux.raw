package com.luxraw.erp.service;

import com.luxraw.erp.model.StockAllocationRequest;
import com.luxraw.erp.model.WarehouseStock;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class InventorySettlementEngine {
    private final WarehouseLocker locker;
    private final Map<String, WarehouseStock> catalogInventory = new ConcurrentHashMap<>();

    public InventorySettlementEngine(WarehouseLocker locker) {
        this.locker = locker;
        seedMaisonInventory();
    }

    private void seedMaisonInventory() {
        catalogInventory.put("LUX-COAT-001", new WarehouseStock("LUX-COAT-001", "Sculptural Virgin Wool Overcoat", 12, 2));
        catalogInventory.put("LUX-BLZ-002", new WarehouseStock("LUX-BLZ-002", "Brutalist Peak-Lapel Blazer", 8, 1));
        catalogInventory.put("LUX-CSH-003", new WarehouseStock("LUX-CSH-003", "Architectural Ribbed Cashmere Turtleneck", 25, 4));
        catalogInventory.put("LUX-BOT-004", new WarehouseStock("LUX-BOT-004", "Monolith Structured Leather Chelsea Boots", 15, 3));
        catalogInventory.put("LUX-BAG-005", new WarehouseStock("LUX-BAG-005", "Atelier Hand-Sculpted Calfskin Tote", 5, 1));
    }

    public Map<String, Object> processAllocation(StockAllocationRequest request) {
        Map<String, Object> response = new LinkedHashMap<>();
        List<String> lockedSkus = new ArrayList<>();
        boolean allAvailable = true;
        String failureReason = null;

        try {
            // Sort SKUs to prevent deadlocks
            List<StockAllocationRequest.AllocationItem> sortedItems = new ArrayList<>(request.getItems());
            sortedItems.sort(Comparator.comparing(StockAllocationRequest.AllocationItem::getSku));

            // Acquire locks
            for (StockAllocationRequest.AllocationItem item : sortedItems) {
                boolean acquired = locker.tryLockSku(item.getSku(), 500);
                if (!acquired) {
                    allAvailable = false;
                    failureReason = "SKU lock acquisition timeout for " + item.getSku();
                    break;
                }
                lockedSkus.add(item.getSku());

                WarehouseStock stock = catalogInventory.get(item.getSku());
                if (stock == null || (stock.getTotalAvailable() - stock.getTotalReserved()) < item.getQuantity()) {
                    allAvailable = false;
                    failureReason = "Insufficient stock for SKU " + item.getSku() + " (Requested: " + item.getQuantity() + ")";
                    break;
                }
            }

            if (allAvailable) {
                for (StockAllocationRequest.AllocationItem item : sortedItems) {
                    WarehouseStock stock = catalogInventory.get(item.getSku());
                    stock.setTotalReserved(stock.getTotalReserved() + item.getQuantity());
                    stock.setTotalAvailable(stock.getTotalAvailable() - item.getQuantity());
                    stock.setLastAudited(Instant.now());
                }

                response.put("status", "SUCCESS");
                response.put("allocationId", "ALLOC-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
                response.put("orderReference", request.getOrderReference());
                response.put("allocatedAt", Instant.now().toString());
                response.put("settlementLedger", "DOUBLE_ENTRY_ERP_VERIFIED");
                response.put("dispatchHub", resolveDispatchHub(request.getDestinationRegion()));
            } else {
                response.put("status", "REJECTED");
                response.put("reason", failureReason);
            }
        } finally {
            for (String sku : lockedSkus) {
                locker.releaseSkuLock(sku);
            }
        }

        return response;
    }

    public Collection<WarehouseStock> getAllInventory() {
        return catalogInventory.values();
    }

    private String resolveDispatchHub(String region) {
        if ("EU".equalsIgnoreCase(region)) return "Milan Centrale Maison Hub";
        if ("US".equalsIgnoreCase(region)) return "New York Madison Atelier";
        if ("APAC".equalsIgnoreCase(region)) return "Tokyo Ginza Vault";
        if ("UK".equalsIgnoreCase(region)) return "London Bond St Atelier";
        return "Florence Headquarters Master Warehouse";
    }
}
