# 🎆 Sparkle Crackers Sivakasi - Full-Stack Catalogue & Offline-Order Management System

A modern, production-ready e-commerce-style product catalogue and offline-order management platform built with Next.js (App Router), Node.js, Express, TypeScript, and MongoDB.

Designed specifically for the fireworks and pyrotechnic industry where **online payment gateways are strictly prohibited** and statutory PESO regulations require manual order verification and offline payment settlement (Cash on Counter / Offline UPI / Direct Bank Transfer).

---

## 🌟 Key Features

### 🛍️ Customer Experience
- **Live Product Catalogue (`/products`)**:
  - Live search across products, brands, and categories.
  - Category filters matching all 14 catalogue divisions.
  - Price range slider/filter and sort options (Price Low-to-High, High-to-Low, Name A-Z).
  - Accurate pack quantities (e.g. `1 Box – 10 pcs`, `1 Packet – 100 pcs`) and direct prices.
  - Quantity selector (`[-] 1 [+]`) and instant Add-to-Cart with toast notifications.
- **Product Details (`/products/[slug]`)**:
  - High-resolution imagery, specifications, safety precautions, and related category products.
- **Dynamic Category Browsing (`/category/[slug]`)**:
  - Direct links to Sparkles, Flower Pots, Chakkars, Comets, Gift Boxes, etc.
- **Shopping Cart & Slide-Over Drawer (`/cart`)**:
  - Itemized rows, real-time quantity modifiers, line totals, and LocalStorage persistence.
- **Offline Checkout (`/checkout`)**:
  - Collects customer name, mobile, WhatsApp number, full address, city, state, and 6-digit pincode.
  - Fulfillment options: **Carrier Delivery** or **Store Counter Pickup**.
  - Preferred date and special instructions.
  - Explicit offline payment notices.
- **Order Success & Instant Confirmation (`/order-success/[orderNumber]`)**:
  - Displays generated order number (`ORD-2026-XXXXXX`), order snapshot, and offline status.
  - **Direct WhatsApp Action**: One-click button generating pre-formatted WhatsApp enquiry with order number, customer name, items, and total.
- **Statutory Safety & Legal Guidelines (`/safety`)**:
  - PESO compliance rules, transport regulations, and adult supervision requirements.

### 🛡️ Secure Backend & Price Integrity
- **Authoritative Server-Side Calculation**:
  - Frontend totals are **NEVER trusted**. The backend receives only `{ productId, quantity }`, fetches real database prices, and calculates line totals, subtotal, and total server-side.
- **Historical Order Snapshot**:
  - Stores `productName`, `unitPrice`, and `packQuantity` snapshot directly inside order records, ensuring historical orders are immutable even if product catalogue prices change later.
- **Atomic Sequential Order Numbers**:
  - Unique order IDs generated via atomic MongoDB counters (e.g. `ORD-2026-000001`).
- **Strict Offline Payment Lifecycle**:
  - Orders start with `orderStatus: 'PENDING'` and `paymentStatus: 'PENDING'`.
  - Admin manually verifies payment (Cash / Offline UPI / Bank Transfer) and enters transaction reference number.
  - Creates an audit record in `Payment` collection.
  - Unpaid orders are strictly excluded from financial revenue reporting.

### 📊 Admin Operations Portal (`/admin`)
- **JWT Authentication (`/admin/login`)**:
  - Pre-seeded account: `admin@crackers.com` / `Admin@12345`.
- **Operations Dashboard (`/admin/dashboard`)**:
  - Real-time counters: Total Orders, Pending, Confirmed, Packed, Ready for Pickup, Out for Delivery, Completed.
  - Confirmed sales revenue vs. pending pipeline amount.
  - Recent orders and customer tables.
- **Order Management (`/admin/orders` & `/admin/orders/[id]`)**:
  - Search by Order ID, customer name, or mobile.
  - Filter by order status, payment status, and date range.
  - Order detail workflow buttons: `[Confirm Order]`, `[Mark Packed]`, `[Ready for Pickup]`, `[Out for Delivery]`, `[Complete Order]`, `[Cancel Order]`.
  - `[Mark Payment Received]` dialog capturing payment mode, UTR reference, and admin notes.
- **Product Management (`/admin/products`)**:
  - Add/edit products with image upload, pack quantity, price, and category.
  - Soft-delete (active toggle) preserving previous order integrity.
- **Category Management (`/admin/categories`)**:
  - Create and edit categories, ordering priority, and category imagery.
- **Customer Directory (`/admin/customers`)**:
  - Automated customer profiling from orders with total orders and lifetime spend.
- **Payment Ledger (`/admin/payments`)**:
  - Searchable audit log of all confirmed offline payments with reference numbers.
- **Store Settings (`/admin/settings`)**:
  - Configurable minimum order amount, free delivery thresholds, delivery fee, restricted pincodes, and announcement banners.

---

## 🗄️ Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS, Lucide React Icons.
- **Backend**: Node.js, Express 5, TypeScript, Mongoose, JWT, bcryptjs, Zod, Multer, Helmet, CORS.
- **Database**: MongoDB (MongoDB Atlas or local MongoDB with automatic in-memory fallback for zero-setup dev/test).
- **Testing**: Jest, ts-jest, Supertest, mongodb-memory-server.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js v18+ (tested on Node v24)
- npm v9+

### 2. Backend Setup
```bash
cd backend
npm install

# Build TypeScript
npm run build

# Seed Catalogue (Imports all 27 pages of products, 14 categories, admin user, and settings)
npm run seed

# Run Test Suite (10 critical test requirements)
npm test

# Start Backend Server (runs on http://localhost:5000)
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install

# Start Next.js Development Server (runs on http://localhost:3000)
npm run dev
```

### 4. Admin Credentials
- **URL**: `http://localhost:3000/admin/login`
- **Email**: `admin@crackers.com`
- **Password**: `Admin@12345`

---

## 🧪 Automated Testing Verification

The backend includes a comprehensive automated test suite verifying all 10 core requirements:
1. **Category API**: Listing and active category detail lookups.
2. **Product API**: Searching, category filtering, price filtering, and product details.
3. **Backend Price Calculation & Anti-Tampering**: Sends malicious `unitPrice: 1` and verifies that backend strictly ignores it and computes true total from database.
4. **Invalid Product Handling**: Rejection of non-existent or out-of-stock products.
5. **Minimum Order Threshold**: Enforces store minimum order policy.
6. **Admin Authentication & Guards**: Rejects unauthorized access to admin endpoints.
7. **Order Status Transitions**: Full lifecycle workflow tracking.
8. **Offline Payment Confirmation**: Capturing reference numbers, transitioning status, and logging payment records.
9. **Sequential Atomic Order Numbers**: Generating `ORD-2026-000001`, `ORD-2026-000002` sequentially.
10. **Historical Snapshotting**: Order items preserve original price and pack quantity.

Run tests anytime with:
```bash
cd backend
npm test
```

---

## 📜 Statutory Notice
Fireworks are classified as pyrotechnic goods. This website provides cataloguing, order collection, and offline coordination. Deliveries are subject to local district regulations and authorized carrier licenses.
