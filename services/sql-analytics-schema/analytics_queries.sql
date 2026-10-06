-- ==============================================================================
-- luxury.Raw Maison — High-Performance SQL Analytics & Executive Intelligence
-- ==============================================================================

-- QUERY 1: RECURSIVE CTE — Hierarchical Maison Category & Metier Breadcrumb Explorer
WITH RECURSIVE CategoryHierarchy AS (
    -- Anchor member
    SELECT 
        category_id,
        parent_category_id,
        name,
        slug,
        metier_type,
        1 AS level,
        CAST(name AS VARCHAR(1000)) AS breadcrumb_path
    FROM luxury_catalog_tree
    WHERE parent_category_id IS NULL

    UNION ALL

    -- Recursive member
    SELECT 
        c.category_id,
        c.parent_category_id,
        c.name,
        c.slug,
        c.metier_type,
        ch.level + 1,
        CAST(ch.breadcrumb_path || ' > ' || c.name AS VARCHAR(1000))
    FROM luxury_catalog_tree c
    INNER JOIN CategoryHierarchy ch ON c.parent_category_id = ch.category_id
)
SELECT 
    category_id,
    breadcrumb_path,
    metier_type,
    level
FROM CategoryHierarchy
ORDER BY breadcrumb_path;


-- QUERY 2: ADVANCED WINDOW FUNCTION — VIP Client Tier Progression & Cumulative GMV
SELECT 
    client_id,
    full_name,
    client_tier,
    lifetime_spend_usd,
    order_count,
    -- Rank clients within their tier by spend
    DENSE_RANK() OVER (
        PARTITION BY client_tier 
        ORDER BY lifetime_spend_usd DESC
    ) AS rank_in_tier,
    -- Running cumulative total of maison revenue across entire client base
    SUM(lifetime_spend_usd) OVER (
        ORDER BY lifetime_spend_usd DESC 
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS cumulative_maison_gmv_usd,
    -- Percentage contribution to total maison volume
    ROUND(
        (lifetime_spend_usd / SUM(lifetime_spend_usd) OVER ()) * 100, 
        2
    ) AS pct_of_total_volume
FROM vip_client_profiles
ORDER BY lifetime_spend_usd DESC;


-- QUERY 3: RFM (Recency, Frequency, Monetary) VIP Client Segmentation Matrix
WITH ClientRFMRaw AS (
    SELECT 
        c.client_id,
        c.full_name,
        c.email,
        COUNT(t.transaction_id) AS frequency,
        SUM(t.gross_amount * t.exchange_rate_to_usd) AS monetary_usd,
        MAX(t.authorized_at) AS last_order_ts,
        ROUND((JULIANDAY('now') - JULIANDAY(MAX(t.authorized_at)))) AS days_since_last_order
    FROM vip_client_profiles c
    LEFT JOIN maison_transaction_ledger t ON c.client_id = t.client_id
    GROUP BY c.client_id, c.full_name, c.email
),
RFMScores AS (
    SELECT 
        client_id,
        full_name,
        email,
        frequency,
        monetary_usd,
        days_since_last_order,
        NTILE(5) OVER (ORDER BY days_since_last_order ASC) AS recency_quintile,
        NTILE(5) OVER (ORDER BY frequency DESC) AS frequency_quintile,
        NTILE(5) OVER (ORDER BY monetary_usd DESC) AS monetary_quintile
    FROM ClientRFMRaw
)
SELECT 
    client_id,
    full_name,
    monetary_usd,
    days_since_last_order,
    (recency_quintile || frequency_quintile || monetary_quintile) AS rfm_vector,
    CASE 
        WHEN recency_quintile >= 4 AND frequency_quintile >= 4 AND monetary_quintile >= 4 THEN 'CHAMPION_MAISON_PATRON'
        WHEN monetary_quintile >= 4 THEN 'HIGH_NET_WORTH_COLLECTOR'
        WHEN recency_quintile <= 2 AND frequency_quintile >= 3 THEN 'AT_RISK_VIP'
        ELSE 'STANDARD_PROSPECT'
    END AS segment_strategy
FROM RFMScores
ORDER BY monetary_usd DESC;
