# 1Fi Marketplace

A full-stack marketplace application built for the **1Fi SDE1
Assignment**.

The application allows users to browse smartphones, select product
variants, compare/select EMI plans backed by mutual funds, and proceed
through a simple confirmation flow.

## Live Demo

**Frontend:** https://1-fi-marketplace-gamma.vercel.app/

**Backend API:** https://onefi-marketplace-akzg.onrender.com/

> **Backend wake-up note:** The backend is hosted on Render's free
> service and may sleep after a period of inactivity. If products do not
> load immediately when opening the live application, please wait around
> **30 seconds and refresh the page**. The first request after the
> service wakes up can take a little longer.

## Assignment Requirements Covered

-   Responsive marketplace/product UI
-   Dynamic product data fetched from a backend API
-   PostgreSQL database
-   Prisma ORM
-   Multiple products and variants
-   Unique product URLs using slugs
-   Variant selection
-   Multiple EMI plans per variant
-   EMI plan selection
-   Proceed/confirmation flow
-   REST API endpoints
-   Deployed frontend and backend
-   Seeded database
-   Environment-based configuration
-   Loading and error states

## Tech Stack

### Frontend

-   React
-   Vite
-   Tailwind CSS
-   React Router
-   JavaScript (JSX)

### Backend

-   Node.js
-   Express.js
-   JavaScript (ES Modules)
-   CORS

### Database & ORM

-   PostgreSQL
-   Neon PostgreSQL
-   Prisma ORM

### Deployment

-   Vercel --- frontend
-   Render --- backend
-   Neon --- PostgreSQL database

## Project Structure

``` text
1fi-marketplace/
│
├── client/
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── assets/
│   │   │   └── images/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── ProductImage.jsx
│   │   │   ├── ProductInfo.jsx
│   │   │   ├── VariantSelector.jsx
│   │   │   ├── EmiPlanCard.jsx
│   │   │   ├── EmiPlanList.jsx
│   │   │   ├── ProceedButton.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── ProductPage.jsx
│   │   │   └── ConfirmationPage.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── hooks/
│   │   │   └── useProduct.js
│   │   ├── utils/
│   │   │   └── formatCurrency.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── productController.js
│   │   ├── routes/
│   │   │   ├── index.js
│   │   │   └── productRoutes.js
│   │   ├── middleware/
│   │   │   ├── errorHandler.js
│   │   │   └── notFound.js
│   │   ├── services/
│   │   │   └── productService.js
│   │   ├── lib/
│   │   │   └── prisma.js
│   │   ├── app.js
│   │   └── server.js
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   ├── prisma.config.ts
│   ├── .env.example
│   └── package.json
│
├── docs/
│   ├── api.md
│   ├── database-schema.md
│   └── screenshots/
│
├── .gitignore
├── package.json
└── README.md
```

## Application Flow

``` text
Home Page
   │
   ├── Fetch products from API
   │
   └── Select a product
           │
           ▼
Product Page
   │
   ├── View product images
   ├── Select storage/color variant
   ├── View MRP and selling price
   ├── View EMI plans
   └── Select EMI plan
           │
           ▼
      Proceed
           │
           ▼
Confirmation Page
   │
   ├── Product summary
   ├── Selected variant
   ├── Selected EMI plan
   └── Checkout placeholder
```

## Product Data

The seeded database currently contains:

-   **3 products**
-   **3 variants per product**
-   **4 EMI plans per variant**
-   **9 total variants**
-   **36 total EMI plans**

All product, variant, pricing, image, and EMI-plan information is stored
in the database and retrieved through the backend API.

The frontend does **not** hardcode the product catalog.

## Database Schema

The database contains three main models:

``` text
Product
   │
   └── has many
          │
          ▼
       Variant
          │
          └── has many
                 │
                 ▼
              EmiPlan
```

### Product

Stores: - `id` - `slug` - `name` - `brand` - `description` -
`createdAt` - `updatedAt`

### Variant

Stores: - `id` - `productId` - `storage` - `color` - `finish` -
`price` - `mrp` - `imageUrl` - `imageUrls` - `available` - `createdAt` -
`updatedAt`

### EmiPlan

Stores: - `id` - `variantId` - `tenureMonths` - `monthlyPayment` -
`interestRate` - `cashback` - `createdAt` - `updatedAt`

The complete Prisma schema is available at:

``` text
server/prisma/schema.prisma
```

## API

Base API URL:

``` text
https://onefi-marketplace-akzg.onrender.com/api
```

### Health Check

``` http
GET /api/health
```

### Get All Products

``` http
GET /api/products
```

Returns all products with their variants and EMI plans.

### Get Product by Slug

``` http
GET /api/products/slug/:slug
```

Example:

``` text
/api/products/slug/iphone-17-pro
```

### Get Product by ID

``` http
GET /api/products/:id
```

The frontend primarily uses the slug-based endpoint for product pages.

More API details and example responses are available in:

``` text
docs/api.md
```

## Unique Product URLs

Each product has a unique slug. For example:

``` text
/products/iphone-17-pro
/products/samsung-galaxy-s24-ultra-5g
/products/google-pixel-11-pro-xl
```

## Local Development

### Prerequisites

-   Node.js 20+
-   npm
-   PostgreSQL database or Neon PostgreSQL account

### 1. Clone the repository

``` bash
git clone https://github.com/DarshanPawar07/1Fi-marketplace.git
cd 1Fi-marketplace
```

### 2. Install dependencies

``` bash
npm install
cd client && npm install
cd ../server && npm install
```

### 3. Configure the backend

Create `server/.env`:

``` env
PORT=5000
DATABASE_URL="your-postgresql-connection-string"
```

### 4. Configure the frontend

Create `client/.env`:

``` env
VITE_API_URL="http://localhost:5000/api"
```

### 5. Generate Prisma Client

From `server`:

``` bash
npx prisma generate
```

### 6. Seed the database

From `server`:

``` bash
npx prisma db seed
```

### 7. Run the application

From the project root:

``` bash
npm run dev
```

The development servers run at:

``` text
Frontend → http://localhost:5173
Backend  → http://localhost:5000
```

## Available Scripts

### Root

``` bash
npm run dev
```

Runs both frontend and backend.

``` bash
npm run build
```

Builds the frontend.

``` bash
npm start
```

Starts the backend.

### Server

``` bash
npm run dev
npm run build
npm start
```

### Client

``` bash
npm run dev
npm run build
npm run preview
```

## Environment Variables

### Backend

``` env
PORT=5000
DATABASE_URL="your-neon-postgresql-connection-string"
```

### Frontend

``` env
VITE_API_URL="http://localhost:5000/api"
```

For production, the frontend uses:

``` text
https://onefi-marketplace-akzg.onrender.com/api
```

Actual `.env` files are excluded from Git. Only `.env.example` files
should be committed.

## Deployment

### Frontend --- Vercel

Live frontend:

https://1-fi-marketplace-gamma.vercel.app/

The frontend uses `VITE_API_URL` to communicate with the deployed
backend.

### Backend --- Render

Live backend:

https://onefi-marketplace-akzg.onrender.com/

The production build generates Prisma Client before starting the Express
server.

### Database --- Neon

The application uses PostgreSQL hosted on Neon. The backend connects
through the `DATABASE_URL` environment variable.

## Backend Sleep / Cold Start

The backend uses Render's free hosting tier, which can put the service
to sleep after inactivity.

If the evaluator opens the Vercel application and the products do not
load immediately:

1.  Wait approximately **30 seconds**.
2.  Refresh the page.
3.  The backend should wake up and the application should load normally.

This is a hosting cold-start behavior rather than an application
requirement.

## Architecture

``` text
                 ┌─────────────────────┐
                 │       Vercel        │
                 │   React Frontend    │
                 └──────────┬──────────┘
                            │
                         REST API
                            │
                            ▼
                 ┌─────────────────────┐
                 │       Render        │
                 │  Express Backend    │
                 └──────────┬──────────┘
                            │
                         Prisma
                            │
                            ▼
                 ┌─────────────────────┐
                 │        Neon         │
                 │     PostgreSQL      │
                 └─────────────────────┘
```

## CORS

The backend allows requests from the local development frontend and the
deployed Vercel frontend:

``` text
http://localhost:5173
https://1-fi-marketplace-gamma.vercel.app
```

## Error & Loading Handling

The frontend includes:

-   Loading state while product data is fetched
-   API error handling
-   Product-not-found handling
-   Responsive UI states
-   Variant availability handling

The backend includes:

-   Health check endpoint
-   404 handling
-   Error handling
-   CORS configuration
-   Database-backed API responses

## Security & Configuration

-   Database credentials are stored in environment variables.
-   `.env` files are excluded from Git.
-   No database credentials are included in frontend code.
-   Product data is fetched from the backend API.
-   Frontend production configuration uses Vercel environment variables.

## Repository

GitHub:

https://github.com/DarshanPawar07/1Fi-marketplace

## Assignment Links

**Live Application:**\
https://1-fi-marketplace-gamma.vercel.app/

**Backend API:**\
https://onefi-marketplace-akzg.onrender.com/

**Source Code:**\
https://github.com/DarshanPawar07/1Fi-marketplace

------------------------------------------------------------------------

Built as part of the **1Fi SDE1 Assignment**.
