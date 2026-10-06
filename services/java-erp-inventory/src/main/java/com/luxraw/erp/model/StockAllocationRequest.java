package com.luxraw.erp.model;

import java.io.Serializable;
import java.util.List;

public class StockAllocationRequest implements Serializable {
    private String orderReference;
    private String clientTier; // VIP, HAUTE_COUTURE, STANDARD
    private String destinationRegion; // EU, US, APAC, UK
    private List<AllocationItem> items;

    public static class AllocationItem {
        private String sku;
        private int quantity;

        public AllocationItem() {}
        public AllocationItem(String sku, int quantity) {
            this.sku = sku;
            this.quantity = quantity;
        }

        public String getSku() { return sku; }
        public void setSku(String sku) { this.sku = sku; }

        public int getQuantity() { return quantity; }
        public void setQuantity(int quantity) { this.quantity = quantity; }
    }

    public String getOrderReference() { return orderReference; }
    public void setOrderReference(String orderReference) { this.orderReference = orderReference; }

    public String getClientTier() { return clientTier; }
    public void setClientTier(String clientTier) { this.clientTier = clientTier; }

    public String getDestinationRegion() { return destinationRegion; }
    public void setDestinationRegion(String destinationRegion) { this.destinationRegion = destinationRegion; }

    public List<AllocationItem> getItems() { return items; }
    public void setItems(List<AllocationItem> items) { this.items = items; }
}
