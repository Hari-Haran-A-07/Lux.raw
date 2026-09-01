export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  size: string;
  color: string;
  colorHex?: string | null;
  price?: number | null;
  compareAtPrice?: number | null;
  stock: number;
  image?: string | null;
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  alt?: string | null;
  isPrimary: boolean;
  order: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  gender: string; // WOMEN, MEN, UNISEX
  order: number;
  featured: boolean;
  _count?: {
    products: number;
  };
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  subtitle?: string | null;
  description?: string | null;
  bannerImage?: string | null;
  campaignVideo?: string | null;
  season?: string | null;
  featured: boolean;
  products?: Product[];
  _count?: {
    products: number;
  };
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  subtitle?: string | null;
  description: string;
  shortDescription?: string | null;
  price: number;
  compareAtPrice?: number | null;
  sku: string;
  categoryId: string;
  category?: Category;
  collectionId?: string | null;
  collection?: Collection | null;
  gender: string; // WOMEN, MEN, UNISEX
  material: string;
  careInstructions?: string | null;
  origin: string;
  color: string;
  featured: boolean;
  newArrival: boolean;
  bestseller: boolean;
  status: string; // ACTIVE, DRAFT, ARCHIVED
  variants: ProductVariant[];
  images: ProductImage[];
  inventory?: { quantity: number; lowStockThreshold: number }[];
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  variantId?: string | null;
  variant?: ProductVariant | null;
  quantity: number;
  size?: string | null;
  color?: string | null;
}

export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  tax: number;
  total: number;
  couponCode?: string | null;
}

export interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string | null;
  addresses?: Address[];
}

export interface Address {
  id?: string;
  userId?: string;
  fullName: string;
  street: string;
  suite?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefault?: boolean;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productSlug: string;
  productImage: string;
  size?: string | null;
  color?: string | null;
  price: number;
  quantity: number;
  total: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerEmail: string;
  customerName: string;
  customerPhone?: string | null;
  items: OrderItem[];
  status: "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "REFUNDED";
  paymentStatus: "PENDING" | "AUTHORIZED" | "PAID" | "FAILED" | "REFUNDED";
  shipmentStatus: "PENDING" | "PACKED" | "SHIPPED" | "IN_TRANSIT" | "DELIVERED";
  subtotal: number;
  discount: number;
  shippingFee: number;
  tax: number;
  total: number;
  currency: string;
  shippingAddressRaw?: string | null;
  billingAddressRaw?: string | null;
  trackingNumber?: string | null;
  createdAt: string | Date;
}

export interface Editorial {
  id: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  excerpt: string;
  content: string;
  heroImage: string;
  coverImage: string;
  author: string;
  readTime: string;
  publishedAt: string | Date;
  category: string;
  featured: boolean;
  tags: string;
}

export interface Store {
  id: string;
  name: string;
  city: string;
  country: string;
  address: string;
  postalCode?: string | null;
  phone: string;
  email: string;
  hours: string;
  services: string;
  latitude?: number | null;
  longitude?: number | null;
  image: string;
  isFlagship: boolean;
}

export interface HomepageConfig {
  id: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroCtaText: string;
  heroCtaLink: string;
  campaignTitle: string;
  campaignSubtitle: string;
  campaignImage: string;
  campaignCtaText: string;
  campaignCtaLink: string;
  activeAnnouncement: string;
}
