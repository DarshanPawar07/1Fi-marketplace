import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

/*
|--------------------------------------------------------------------------
| EMI calculation
|--------------------------------------------------------------------------
| Standard reducing-balance EMI formula:
|
| EMI = P × r × (1+r)^n / ((1+r)^n - 1)
|
| P = principal amount
| r = monthly interest rate
| n = tenure in months
|
| For 0% interest, EMI is simply P / n.
|--------------------------------------------------------------------------
*/

function calculateEmi(principal, annualInterestRate, tenureMonths) {
  if (annualInterestRate === 0) {
    return Math.round(principal / tenureMonths);
  }

  const monthlyRate = annualInterestRate / 12 / 100;

  const emi =
    (principal *
      monthlyRate *
      Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1);

  return Math.round(emi);
}

/*
|--------------------------------------------------------------------------
| EMI plans
|--------------------------------------------------------------------------
*/

function createEmiPlans(price) {
  const plans = [
    {
      tenureMonths: 3,
      interestRate: 0,
      cashback: 0,
    },
    {
      tenureMonths: 6,
      interestRate: 0,
      cashback: 1000,
    },
    {
      tenureMonths: 12,
      interestRate: 10.5,
      cashback: 1500,
    },
    {
      tenureMonths: 24,
      interestRate: 10.5,
      cashback: 2500,
    },
  ];

  return plans.map((plan) => ({
    tenureMonths: plan.tenureMonths,
    interestRate: plan.interestRate,
    cashback: plan.cashback,
    monthlyPayment: calculateEmi(
      price,
      plan.interestRate,
      plan.tenureMonths
    ),
  }));
}

/*
|--------------------------------------------------------------------------
| Helper
|--------------------------------------------------------------------------
*/

function createVariant({
  storage,
  color,
  finish,
  price,
  mrp,
  imageUrls,
}) {
  return {
    storage,
    color,
    finish,
    price,
    mrp,
    imageUrl: imageUrls[0],
    imageUrls,
    available: true,

    emiPlans: {
      create: createEmiPlans(price),
    },
  };
}

/*
|--------------------------------------------------------------------------
| Seed data
|--------------------------------------------------------------------------
*/

const products = [
  {
    slug: "iphone-17-pro",
    name: "Apple iPhone 17 Pro",
    brand: "Apple",
    description:
      "A premium iPhone with a powerful Pro camera system, advanced performance and a refined titanium design.",
    variants: {
      create: [
        createVariant({
          storage: "256 GB",
          color: "Cosmic Orange",
          finish: "Cosmic Orange",
          price: 132900,
          mrp: 134900,
          imageUrls: [
            "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/n/v/a/-original-imahft5nxmyqndhf.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/q/l/l/-original-imahft5nzymbfwfh.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/x/c/q/-original-imahft5njwbfyz5u.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/n/z/y/-original-imahft5n2dzw3rym.jpeg?q=90",
          ],
        }),

        createVariant({
          storage: "256 GB",
          color: "Silver",
          finish: "Silver",
          price: 132900,
          mrp: 134900,
          imageUrls: [
            "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/b/j/o/-original-imahft5nm9eewyzh.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/k/s/z/-original-imahft5npvyvjyzz.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/j/x/c/-original-imahft5npy3u7mjx.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/a/m/i/-original-imahft5n8nukhmav.jpeg?q=90",
          ],
        }),

        createVariant({
          storage: "512 GB",
          color: "Deep Blue",
          finish: "Deep Blue",
          price: 152900,
          mrp: 154900,
          imageUrls: [
            "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/5/i/n/-original-imahft5ndwfkx6ez.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/q/s/s/-original-imahft5nxa9wukz8.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/c/k/m/-original-imahft5nz2k5gfm3.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/f/e/i/-original-imahft5nerqtntdt.jpeg?q=90",
          ],
        }),
      ],
    },
  },

  {
    slug: "samsung-galaxy-s24-ultra",
    name: "Samsung Galaxy S24 Ultra 5G",
    brand: "Samsung",
    description:
      "A flagship Galaxy smartphone with a large Dynamic AMOLED display, S Pen and an advanced multi-camera system.",
    variants: {
      create: [
        createVariant({
          storage: "256 GB",
          color: "Titanium Black",
          finish: "Titanium Black",
          price: 99999,
          mrp: 134999,
          imageUrls: [
            "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/y/s/g/-original-imahgfmy2zgqvjmy.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/l/u/t/-original-imahggevfhnjjmvf.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/k/t/f/-original-imahggev5rzq98jq.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/w/3/p/-original-imahggevtfanzyua.jpeg?q=90",
          ],
        }),

        createVariant({
          storage: "256 GB",
          color: "Titanium Gray",
          finish: "Titanium Gray",
          price: 109905,
          mrp: 134999,
          imageUrls: [
            "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/j/m/z/-original-imahgfmxumntk7sy.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/l/u/t/-original-imahggevfhnjjmvf.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/k/t/f/-original-imahggev5rzq98jq.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/m/x/g/-original-imahggexedujwyqb.jpeg?q=90",
          ],
        }),

        createVariant({
          storage: "256 GB",
          color: "Titanium Violet",
          finish: "Titanium Violet",
          price: 119999,
          mrp: 134999,
          imageUrls: [
            "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/w/r/z/-original-imahgfmysgtszenh.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/l/u/t/-original-imahggevfhnjjmvf.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/k/t/f/-original-imahggev5rzq98jq.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/p/i/s/-original-imahggewh7ftwmqg.jpeg?q=90",
          ],
        }),
      ],
    },
  },

  {
    slug: "google-pixel-11-pro-xl",
    name: "Google Pixel 11 Pro XL",
    brand: "Google",
    description:
      "A premium Pixel flagship built around Google's AI-first experience, advanced cameras and a large high-resolution display.",
    variants: {
      create: [
        createVariant({
          storage: "256 GB",
          color: "Fog",
          finish: "Fog",
          price: 134999,
          mrp: 134999,
          imageUrls: [
            "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/x/q/q/-original-imahqszer8zubuwn.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/r/f/m/-original-imahqszee6fbzhyg.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/c/1/k/-original-imahqszea4cjnwez.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/n/v/e/-original-imahqszedzfgszdv.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/j/b/1/-original-imahqszetdyy8cn6.jpeg?q=90",
          ],
        }),

        createVariant({
          storage: "512 GB",
          color: "Obsidian",
          finish: "Obsidian",
          price: 149999,
          mrp: 149999,
          imageUrls: [
            "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/f/m/r/-original-imahqszetaaagqyg.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/6/w/8/-original-imahqsze6rdjjkxg.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/a/5/k/-original-imahqsze8zbzkfga.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/p/t/k/-original-imahqszeggprxspf.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/a/7/x/-original-imahqszek2n7mmxk.jpeg?q=90",
          ],
        }),

        createVariant({
          storage: "256 GB",
          color: "Olive",
          finish: "Olive",
          price: 134999,
          mrp: 134999,
          imageUrls: [
            "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/b/d/z/-original-imahqszexcuuphsk.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/b/9/m/-original-imahqszekbeh9yym.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/d/8/z/-original-imahqszeyyettcqs.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/b/g/v/-original-imahqszemgnffad3.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/v/o/w/-original-imahqszejhfprzp3.jpeg?q=90",
          ],
        }),
      ],
    },
  },
];

/*
|--------------------------------------------------------------------------
| Main seed
|--------------------------------------------------------------------------
*/

async function main() {
  console.log("🌱 Starting database seed...");

  /*
   * Clear existing data.
   *
   * EMI plans → variants → products are deleted in dependency order.
   */

  await prisma.emiPlan.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();

  console.log("🧹 Existing data cleared.");

  for (const product of products) {
    const createdProduct = await prisma.product.create({
      data: product,
      include: {
        variants: {
          include: {
            emiPlans: true,
          },
        },
      },
    });

    console.log(
      `✓ Created ${createdProduct.name} (${createdProduct.variants.length} variants)`
    );

    for (const variant of createdProduct.variants) {
      console.log(
        `  └─ ${variant.color} ${variant.storage}: ₹${Number(
          variant.price
        ).toLocaleString("en-IN")} | ${variant.imageUrls.length} images | ${variant.emiPlans.length} EMI plans`
      );
    }
  }

  const productCount = await prisma.product.count();
  const variantCount = await prisma.variant.count();
  const emiPlanCount = await prisma.emiPlan.count();

  console.log("");
  console.log("🎉 Database seeded successfully!");
  console.log(`Products:   ${productCount}`);
  console.log(`Variants:   ${variantCount}`);
  console.log(`EMI Plans:  ${emiPlanCount}`);
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });