# luxury.Raw — High-End Luxury Fashion Maison Platform

> A production-ready, digital luxury fashion house experience blending high-fashion editorial storytelling, architectural brutalism, and a modern full-stack e-commerce architecture.

---

## 1. Project Overview

**luxury.Raw** is a digital luxury fashion maison inspired by contemporary architectural principles: full-screen editorial photography, refined serif/sans typography hierarchies, generous whitespace, smooth cinematic micro-interactions, horizontal product sliders, multi-step luxury checkout, and a complete protected Admin CMS Dashboard.

---

## 2. Key Features

- **Editorial Homepage (`/`)**: 100vh full-viewport cinematic hero with background zoom animation, brand philosophy statements, dual Women/Men universe showcases, featured collection monographs (*"Atelier Raw Monolith"*), and horizontal snap-scrolling product carousels.
- **Global Sticky Navigation**: Minimalist header transitioning smoothly from transparent glass to solid dark obsidian on scroll, equipped with high-resolution editorial mega-menus for *Women*, *Men*, *Collections*, and *Journal*.
- **Curated Showrooms (`/women`, `/men`, `/collections`)**: Dynamic multi-criteria filtering (Metier/Category, Price Brackets, In-Stock, Sorting) and instant 2-column vs 4-column layout switcher.
- **Immersive Product Detail Pages (`/products/[slug]`)**: Multi-angle zoomable galleries, color swatches with hand-dyed pigment labels, size selector with **Interactive Size Guide Modal**, stock indicators, and expandable craftsmanship accordions.
- **Interactive Shopping Bag Drawer (`/cart`)**: Slide-out bag drawer with real-time totals, quantity controllers, complimentary white-glove shipping indicator, and live promo code redemption engine (`MAISON10`, `RAWVIP20`, `WELCOME100`).
- **Personal Saved Wishlist (`/wishlist`)**: Persistent saved creations with instant "Move to Bag" capability.
- **Multi-Step Luxury Checkout (`/checkout`)**: 3-step checkout with address validation, courier method selection (White-Glove Courier vs In-Boutique Private Salon Handover), encrypted card/Apple Pay simulation, and transactional order confirmation.
- **Maison Journal & Gazette (`/journal`, `/journal/[slug]`)**: Digital magazine articles with rich typography, author dossiers, and reading time estimates.
- **Flagship Boutique Locator (`/stores`)**: Directory of global flagship boutiques in Paris (*Place Vendôme*), Milan (*Via Montenapoleone*), New York (*Madison Avenue*), Tokyo (*Ginza*), and London (*New Bond Street*) with private viewing appointment booking modals.
- **Client Account Portal (`/account`)**: Authentication (bcrypt hashing & JWT session cookies), real-time order history tracking with courier milestones, and saved address book.
- **Complete Protected Admin Dashboard & CMS (`/admin`)**:
  - **Executive Analytics Overview**: Gross Revenue, Total Orders, Average Order Value, Registered Clients, and Real-Time Low-Stock Warnings.
  - **Product Catalog Management**: Full CRUD for products, image gallery manager, and variant matrix (sizes, colors, SKUs, inventory, price).
  - **Order & Courier Fulfillment Workflow**: Status state machine (`PENDING` → `CONFIRMED` → `PROCESSING` → `SHIPPED` → `DELIVERED` → `REFUNDED`), tracking number assigner, and line-item inspector.
  - **Stock & SKU Allocation Controller**: Live inventory adjustments and low-stock threshold triggers.
  - **Visual Homepage CMS Configurator**: Edit Hero headlines, background images, and Campaign features with instant live persistence.
  - **Privilege Promotion Engine**: Create percentage/fixed discount codes with expiration dates and minimum order thresholds.

---

## 3. Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router with SSR & ISR) |
| **Language** | TypeScript (Strict mode) |
| **Frontend & UI** | React 18, Tailwind CSS, Framer Motion, Lucide Icons |
| **Database & ORM** | Prisma ORM with SQLite (Local) / PostgreSQL (Production) |
| **Authentication** | JWT (jsonwebtoken) & bcryptjs password hashing |
| **State Management** | React Context & Zustand pattern with LocalStorage persistence |
| **Typography** | Playfair Display (Serif Display) + Plus Jakarta Sans (Clean UI Sans) |

---

## 4. Project Directory Structure

```text
lux.raw/
├── app/
│   ├── layout.tsx                     # Global Root layout with fonts, providers, toast
│   ├── page.tsx                       # High-fashion Editorial Homepage
│   ├── women/                         # Women's Collection & Category listings
│   │   ├── page.tsx
│   │   └── [category]/page.tsx
│   ├── men/                           # Men's Collection & Category listings
│   │   ├── page.tsx
│   │   └── [category]/page.tsx
│   ├── collections/                   # Editorial Collections Showcase
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── products/
│   │   └── [slug]/page.tsx            # Immersive Product Detail Page
│   ├── search/page.tsx                # Dedicated Search Result Page
│   ├── cart/page.tsx                  # Dedicated Shopping Bag Page
│   ├── wishlist/page.tsx              # Saved Items / Personal Wishlist
│   ├── checkout/                      # Multi-Step Luxury Checkout
│   │   ├── page.tsx
│   │   └── confirmation/page.tsx
│   ├── account/                       # Client Maison Account Suite
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── orders/page.tsx
│   │   ├── addresses/page.tsx
│   │   └── page.tsx
│   ├── journal/                       # Digital Magazine / Gazette
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── about/page.tsx                 # The Maison: Craftsmanship & Heritage
│   ├── stores/page.tsx                # Flagship Boutique Locator & Private Salon Booking
│   ├── client-services/               # Client Care, FAQ, Shipping & Returns
│   │   ├── contact/page.tsx
│   │   ├── shipping/page.tsx
│   │   ├── returns/page.tsx
│   │   └── care/page.tsx
│   ├── admin/                         # Complete Protected Admin Dashboard & CMS
│   │   ├── layout.tsx
│   │   ├── page.tsx                   # Executive Analytics & KPIs
│   │   ├── products/page.tsx          # Product Management & Variant Editor
│   │   ├── orders/page.tsx            # Order & Fulfillment Workflow
│   │   ├── inventory/page.tsx         # Low-Stock & SKU Matrix
│   │   ├── homepage/page.tsx          # Visual CMS Homepage Configurator
│   │   └── coupons/page.tsx           # Discount Promotion Engine
│   └── api/                           # Full-Featured REST API Endpoints
├── components/
│   ├── layout/                        # Header, MegaMenu, MobileNav, Footer, AnnouncementBar
│   ├── hero/                          # EditorialHero with cinematic zoom
│   ├── product/                       # ProductCard, Carousel, Gallery, Filters, SizeGuideModal
│   ├── cart/                          # CartDrawer, CartItemRow
│   ├── search/                        # SearchModal with debounced instant search
│   ├── admin/                         # AdminSidebar, AdminHeader, Metrics
│   └── ui/                            # Toast, QuickViewModal, Badges
├── lib/
│   ├── prisma.ts                      # Prisma client singleton
│   ├── auth.ts                        # JWT session generation & verification
│   ├── store/                         # Cart, Wishlist, Auth, and UI state stores
│   ├── types.ts                       # Complete TypeScript schemas & interfaces
│   ├── utils.ts                       # Currency formatters, slugifiers, cn helper
│   └── seed-data.ts                   # Curated luxury catalog dataset (30+ creations)
├── prisma/
│   ├── schema.prisma                  # Relational database schema
│   └── seed.ts                        # Comprehensive seeding script
├── tailwind.config.ts                 # Luxury color palette and typography tokens
└── package.json
```

---

## 5. Getting Started

### Prerequisites

- **Node.js**: v18.17.0+ (Tested on Node.js v22.17.0)
- **npm** or **pnpm** or **yarn**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Hari-Haran-A-07/luxury-raw.git
   cd luxury-raw
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. **Initialize and Seed Database**:
   ```bash
   npx prisma db push
   npx tsx prisma/seed.ts
   ```

5. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 6. Demo Credentials

| Role | Email | Password | Privileges |
|---|---|---|---|
| **Maison Director (Admin)** | `admin@luxuryraw.com` | `LuxuryRaw@2026` | Full Access to `/admin` Console & CMS |
| **VIP Client Patron** | `client@luxuryraw.com` | `LuxuryRaw@2026` | Client Suite, Orders, Saved Wishlist |

> **Note**: 1-click quick login buttons are available on `/account/login` for instant testing.

---

## 7. Build & Production Deployment

### Production Build

```bash
npm run build
npm run start
```

### Deploying to Vercel

1. Push the repository to GitHub.
2. Import the repository into [Vercel](https://vercel.com).
3. Set your environment variables (`DATABASE_URL`, `JWT_SECRET`, `NEXT_PUBLIC_APP_URL`).
4. Set build command: `npx prisma generate && next build`.

---

## 8. License

This project is created for **luxury.Raw**. All rights reserved.
