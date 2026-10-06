package com.luxraw.erp.service;

import org.springframework.stereotype.Component;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.ReentrantLock;

/**
 * Fine-grained per-SKU reentrant lock manager to prevent race conditions during high-volume luxury drop checkouts.
 */
@Component
public class WarehouseLocker {
    private final ConcurrentHashMap<String, ReentrantLock> skuLocks = new ConcurrentHashMap<>();

    public boolean tryLockSku(String sku, long timeoutMs) {
        ReentrantLock lock = skuLocks.computeIfAbsent(sku, k -> new ReentrantLock(true));
        try {
            return lock.tryLock(timeoutMs, TimeUnit.MILLISECONDS);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            return false;
        }
    }

    public void releaseSkuLock(String sku) {
        ReentrantLock lock = skuLocks.get(sku);
        if (lock != null && lock.isHeldByCurrentThread()) {
            lock.unlock();
        }
    }
}
