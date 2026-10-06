-- ==============================================================================
-- luxury.Raw Maison — High-End Luxury Enterprise SQL Analytical Schema
-- Language: ANSI SQL / PostgreSQL 16 & SQLite Compatible Schema
-- ==============================================================================

-- 1. EXTENSIONS & DOMAINS
CREATE TABLE IF NOT EXISTS maison_audit_ledger (
    audit_id VARCHAR(64) PRIMARY KEY,
    entity_name VARCHAR(64) NOT NULL,
    entity_id VARCHAR(64) NOT NULL,
    action_type VARCHAR(16) NOT NULL CHECK (action_type IN ('INSERT', 'UPDATE', 'DELETE', 'RECONCILE')),
    previous_state JSON,
    new_state JSON,
    performed_by VARCHAR(64) NOT NULL,
    ip_signature VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. ENTERPRISE CLIENT SEGMENTATION & RFM METRICS
CREATE TABLE IF NOT EXISTS vip_client_profiles (
    client_id VARCHAR(64) PRIMARY KEY,
    full_name VARCHAR(128) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    client_tier VARCHAR(32) DEFAULT 'CLIENT' CHECK (client_tier IN ('CLIENT', 'VIP', 'OBSIDIAN', 'TITANIUM', 'SOVEREIGN')),
    lifetime_spend_usd NUMERIC(12, 2) DEFAULT 0.00,
    order_count INT DEFAULT 0,
    preferred_boutique VARCHAR(64),
    assigned_concierge VARCHAR(128),
    rfm_score VARCHAR(8),
    last_purchase_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. HAUTE COUTURE PRODUCT TAXONOMY & HIERARCHY
CREATE TABLE IF NOT EXISTS luxury_catalog_tree (
    category_id VARCHAR(64) PRIMARY KEY,
    parent_category_id VARCHAR(64) REFERENCES luxury_catalog_tree(category_id),
    name VARCHAR(128) NOT NULL,
    slug VARCHAR(128) UNIQUE NOT NULL,
    metier_type VARCHAR(64) NOT NULL, -- 'HAUTE_COUTURE', 'LEATHER_GOODS', 'FINE_JEWELRY', 'FOOTWEAR'
    display_depth INT DEFAULT 1
);

-- 4. ATELIER PRODUCTION & PROVENANCE BATCHES
CREATE TABLE IF NOT EXISTS atelier_production_batches (
    batch_id VARCHAR(64) PRIMARY KEY,
    sku VARCHAR(64) NOT NULL,
    atelier_location VARCHAR(64) NOT NULL, -- 'Florence', 'Milan', 'Biella'
    artisan_lead VARCHAR(128) NOT NULL,
    pieces_crafted INT NOT NULL CHECK (pieces_crafted > 0),
    virgin_wool_grade VARCHAR(32),
    titanium_grade VARCHAR(32),
    certified_provenance_hash VARCHAR(128) NOT NULL,
    manufacture_date DATE NOT NULL
);

-- 5. REAL-TIME MULTI-CURRENCY FINANCIAL LEDGER
CREATE TABLE IF NOT EXISTS maison_transaction_ledger (
    transaction_id VARCHAR(64) PRIMARY KEY,
    order_reference VARCHAR(64) NOT NULL,
    client_id VARCHAR(64) REFERENCES vip_client_profiles(client_id),
    gross_amount NUMERIC(12, 2) NOT NULL,
    net_amount NUMERIC(12, 2) NOT NULL,
    currency VARCHAR(3) NOT NULL CHECK (currency IN ('USD', 'EUR', 'GBP', 'JPY', 'CHF')),
    exchange_rate_to_usd NUMERIC(8, 4) DEFAULT 1.0000,
    payment_status VARCHAR(32) DEFAULT 'SETTLED',
    authorized_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
