package com.luxraw.erp.model;

import java.io.Serializable;
import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class WarehouseStock implements Serializable {
    private String sku;
    private String productName;
    private int totalAvailable;
    private int totalReserved;
    private int safetyThreshold;
    private Map<String, Integer> regionalAllocation = new ConcurrentHashMap<>();
    private Instant lastAudited;

    public WarehouseStock() {
        this.lastAudited = Instant.now();
    }

    public WarehouseStock(String sku, String productName, int totalAvailable, int safetyThreshold) {
        this.sku = sku;
        this.productName = productName;
        this.totalAvailable = totalAvailable;
        this.totalReserved = 0;
        this.safetyThreshold = safetyThreshold;
        this.lastAudited = Instant.now();
    }

    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public int getTotalAvailable() { return totalAvailable; }
    public void setTotalAvailable(int totalAvailable) { this.totalAvailable = totalAvailable; }

    public int getTotalReserved() { return totalReserved; }
    public void setTotalReserved(int totalReserved) { this.totalReserved = totalReserved; }

    public int getSafetyThreshold() { return safetyThreshold; }
    public void setSafetyThreshold(int safetyThreshold) { this.safetyThreshold = safetyThreshold; }

    public Map<String, Integer> getRegionalAllocation() { return regionalAllocation; }
    public void setRegionalAllocation(Map<String, Integer> regionalAllocation) { this.regionalAllocation = regionalAllocation; }

    public Instant getLastAudited() { return lastAudited; }
    public void setLastAudited(Instant lastAudited) { this.lastAudited = lastAudited; }
}
