import { prisma } from "../lib/prisma.js";

/*
|--------------------------------------------------------------------------
| Response formatters
|--------------------------------------------------------------------------
| Prisma returns Decimal values for money fields.
| We convert them to JavaScript numbers before sending them
| to the frontend.
|--------------------------------------------------------------------------
*/

const formatEmiPlan = (plan) => ({
  id: plan.id,
  tenureMonths: plan.tenureMonths,
  monthlyPayment: Number(plan.monthlyPayment),
  interestRate: Number(plan.interestRate),
  cashback: Number(plan.cashback),
});

const formatVariant = (variant) => ({
  id: variant.id,
  storage: variant.storage,
  color: variant.color,
  finish: variant.finish,

  price: Number(variant.price),
  mrp: Number(variant.mrp),

  /*
   * imageUrl is kept as the primary/default image.
   */
  imageUrl: variant.imageUrl,

  /*
   * imageUrls contains the complete gallery.
   * The first image is always the default/main image.
   */
  imageUrls: Array.isArray(variant.imageUrls)
    ? variant.imageUrls
    : [variant.imageUrl],

  available: variant.available,

  emiPlans: variant.emiPlans.map(formatEmiPlan),
});

const formatProduct = (product) => ({
  id: product.id,
  slug: product.slug,
  name: product.name,
  brand: product.brand,
  description: product.description,

  variants: product.variants.map(formatVariant),
});

/*
|--------------------------------------------------------------------------
| Shared Prisma include
|--------------------------------------------------------------------------
| Every product API returns:
|
| Product
|   └── Variants
|        └── EMI Plans
|
| This keeps the frontend completely data-driven.
|--------------------------------------------------------------------------
*/

const productInclude = {
  variants: {
    include: {
      emiPlans: {
        orderBy: {
          tenureMonths: "asc",
        },
      },
    },

    orderBy: {
      price: "asc",
    },
  },
};

/*
|--------------------------------------------------------------------------
| Get all products
|--------------------------------------------------------------------------
*/

export const getAllProducts = async () => {
  const products = await prisma.product.findMany({
    include: productInclude,

    orderBy: {
      createdAt: "asc",
    },
  });

  return products.map(formatProduct);
};

/*
|--------------------------------------------------------------------------
| Get product by ID
|--------------------------------------------------------------------------
*/

export const getProductById = async (id) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },

    include: productInclude,
  });

  return product ? formatProduct(product) : null;
};

/*
|--------------------------------------------------------------------------
| Get product by slug
|--------------------------------------------------------------------------
| Used by routes such as:
|
| /api/products/slug/iphone-17-pro
| /api/products/slug/samsung-galaxy-s24-ultra
| /api/products/slug/google-pixel-11-pro-xl
|--------------------------------------------------------------------------
*/

export const getProductBySlug = async (slug) => {
  const product = await prisma.product.findUnique({
    where: {
      slug,
    },

    include: productInclude,
  });

  return product ? formatProduct(product) : null;
};