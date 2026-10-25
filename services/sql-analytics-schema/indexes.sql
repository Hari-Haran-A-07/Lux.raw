-- Indexes for High-Frequency Luxury Analytics & Polyglot Queries
CREATE INDEX IF NOT EXISTS idx_orders_created_at_status ON "Order" (created_at DESC, status);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON "OrderItem" (product_id);
CREATE INDEX IF NOT EXISTS idx_products_category_is_active ON "Product" (category, is_active);
CREATE INDEX IF NOT EXISTS idx_users_role_email ON "User" (role, email);
