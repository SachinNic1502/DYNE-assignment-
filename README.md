# Dyne Infotech Analytics Dashboard

A premium, state-of-the-art product analytics dashboard built with **Next.js 16**, **Prisma 7**, and **Material UI 6**. This platform provides deep insights into product performance, customer feedback, and pricing strategies through advanced data visualization and hierarchical data processing.

## 🚀 Key Features

### 💎 Premium Interface
- **Modern Dashboard Shell**: Sleek sidebar-based navigation with a professional brand identity and responsive drawer.
- **Dynamic Stat Cards**: Real-time KPIs for Total Products, Active Categories, Total Reviews, and Average Discount with trend indicators.
- **Micro-Animations**: Fluid `fadeIn` transitions and interactive hover states for a polished user experience.
- **Indigo & Emerald Theme**: A sophisticated custom MUI theme with premium shadows and refined border radii.

### 📊 Advanced Analytics
- **Interactive Visualizations**: High-fidelity charts powered by Recharts:
  - **Products per Category**: Distribution of product inventory.
  - **Top Reviewed Products**: Identification of highest engagement items.
  - **Discount Distribution**: Histogram-style binning of promotional depth.
  - **Category-wise Ratings**: Qualitative performance benchmarks across segments.
- **Hierarchical Category Parsing**: Intelligent processing of complex category strings (e.g., `Electronics|Mobile|Accessories`) into clean, root-level classifications.

### 🛠️ Robust Infrastructure
- **Prisma 7 modern architecture**: Utilizing the `PrismaPg` driver adapter for efficient, Rust-free PostgreSQL connectivity.
- **Bulk Data Processing**: Optimized Excel/CSV upload system with automatic deduplication and sanitization of currency/percentage symbols.
- **Server-Side Excellence**: Optimized Next.js Route Handlers with robust error handling and loading states.
- **Zero-Hydration Warnings**: Carefully engineered to eliminate hydration mismatches between server and client.

## 📋 Requirements

- **Node.js**: 18+ (20+ recommended)
- **Database**: PostgreSQL (v14+)
- **Package Manager**: npm

## 🛠️ Installation & Setup

### 1. Clone & Install
```bash
git clone <repository-url>
cd dyne-infotech-private-limited
npm install
```

### 2. Environment Configuration
Copy the example environment file and update the `DATABASE_URL` with your PostgreSQL credentials.
```bash
cp .env.example .env
# Edit .env
DATABASE_URL="postgresql://user:password@localhost:5432/dyne_analytics"
```

### 3. Database Initialization
```bash
# Generate the modern Prisma 7 client
npm run db:generate

# Push the schema to your database (with case-sensitivity mapping)
npm run db:push
```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) to view the dashboard.

### Production Build
```bash
npm run build
npm start
```

## 📈 Usage Guide

### 📂 Data Management
- Navigate to the **Products Data** tab.
- Use the **Upload Product Data** tool to import your `.xlsx` or `.csv` files.
- The system automatically handles cleaning currency symbols (₹, $) and parsing hierarchical categories.

### 📋 Expected File Format
The importer expects the following columns:
- `product_id`: Unique SKU/Identifier
- `product_name`: Title of the product
- `category`: String (supports `Root|Sub|Child` format)
- `discounted_price`: Numeric value (e.g., ₹399)
- `actual_price`: Numeric value (e.g., ₹999)
- `discount_percentage`: Percentage value (e.g., 60%)
- `rating`: 1-5 scale
- `rating_count`: Number of reviews
- `user_name`: Name of the reviewer (optional)
- `review_title`: Headline of the review (optional)
- `review_content`: Full text of the review (optional)

### 📊 Dashboard Insights
- **Overview Tab**: Real-time stats and all key performance charts at a glance.
- **Products Data Tab**: Full search, filtering by category, and rating-based discovery.
- **Analytics Tab**: Deep-dive reporting with high-density charts.

## 📁 Project Architecture

```
dyne-infotech-private-limited/
├── src/
│   ├── app/                    # Next.js 16 App Router
│   │   ├── api/                # Optimized Route Handlers
│   │   └── layout.tsx          # Global providers & SEO
│   ├── components/             # Reusable UI Components
│   │   ├── DashboardShell.tsx  # Layout & Sidebar
│   │   ├── AnalyticsCharts.tsx # Recharts Implementation
│   │   ├── ProductsTable.tsx   # Filterable Data Grid
│   │   └── StatCard.tsx        # KPI Visualization
│   ├── generated/prisma        # Generated Prisma Client
│   ├── store/                  # Redux Toolkit State Management
│   └── theme/                  # Premium MUI Theme Tokens
└── prisma/
    └── schema.prisma           # Case-sensitive PostgreSQL Schema
```

## 🔧 Maintenance Scripts

- `npm run db:push`: Synchronize schema changes.
- `npm run db:seed`: Populate categories and initial metadata.
- `npm run lint`: Ensure 100% code quality and type safety.

---
**Developed by Dyne Infotech Private Limited**
