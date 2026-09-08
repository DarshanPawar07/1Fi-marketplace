import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/api";
import { formatCurrency } from "../utils/formatCurrency";

function ProductCard({ product }) {
  const variant = product.variants?.[0];

  if (!variant) return null;

  const discount = Math.round(
    ((variant.mrp - variant.price) / variant.mrp) * 100
  );

  const lowestEmi = [...(variant.emiPlans || [])].sort(
    (a, b) => a.monthlyPayment - b.monthlyPayment
  )[0];

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group block"
    >
      <article className="premium-card premium-card-hover overflow-hidden">
        {/* Image */}
        <div className="product-stage relative flex h-[330px] items-center justify-center bg-white p-8 sm:h-[360px]">
          {/* Discount */}
          {discount > 0 && (
            <span className="absolute left-5 top-5 z-10 rounded-full bg-[#EFEDFF] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#5144C9]">
              {discount}% off
            </span>
          )}

          {/* Arrow */}
          <div className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[#E4E1DB] bg-white/80 text-[#77746F] opacity-0 shadow-sm backdrop-blur transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
            <svg
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.22 14.78a.75.75 0 0 1 0-1.06L12.94 6H7.5a.75.75 0 0 1 0-1.5h7.25a.75.75 0 0 1 .75.75V12.5a.75.75 0 0 1-1.5 0V7.06l-7.72 7.72a.75.75 0 0 1-1.06 0Z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Product */}
          <img
            src={variant.imageUrl}
            alt={`${product.name} ${variant.storage} ${variant.color}`}
            className="relative z-10 max-h-[260px] max-w-[72%] object-contain drop-shadow-[0_25px_25px_rgba(17,19,24,0.16)] transition duration-500 ease-out group-hover:scale-[1.045] group-hover:-translate-y-1"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9A9791]">
              {product.brand}
            </span>

            <span className="text-[11px] font-medium text-[#8A8883]">
              {product.variants.length} variants
            </span>
          </div>

          <h3 className="font-display text-[21px] font-bold tracking-[-0.04em] text-[#111318]">
            {product.name}
          </h3>

          <p className="mt-2 text-[13px] text-[#77746F]">
            {variant.storage} · {variant.color}
          </p>

          {/* Price */}
          <div className="mt-5 flex items-end gap-2">
            <span className="font-display text-[22px] font-extrabold tracking-[-0.04em] text-[#111318]">
              {formatCurrency(variant.price)}
            </span>

            {variant.mrp > variant.price && (
              <span className="pb-0.5 text-[12px] font-medium text-[#A09D97] line-through">
                {formatCurrency(variant.mrp)}
              </span>
            )}
          </div>

          {/* EMI */}
          {lowestEmi && (
            <div className="mt-5 flex items-center justify-between border-t border-[#EEECE7] pt-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#9A9791]">
                  From
                </p>

                <p className="mt-1 text-[14px] font-bold text-[#24243A]">
                  {formatCurrency(lowestEmi.monthlyPayment)}
                  <span className="ml-1 text-[11px] font-medium text-[#85817A]">
                    / month
                  </span>
                </p>
              </div>

              <span className="rounded-full bg-[#E8F7F0] px-3 py-1.5 text-[10px] font-bold text-[#16845B]">
                {lowestEmi.tenureMonths} months
              </span>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}

function ProductSkeleton() {
  return (
    <div className="premium-card overflow-hidden">
      <div className="skeleton h-[330px] bg-white sm:h-[360px]" />

      <div className="space-y-4 p-6">
        <div className="skeleton h-3 w-20 rounded-full" />
        <div className="skeleton h-6 w-48 rounded-lg" />
        <div className="skeleton h-4 w-32 rounded-full" />
        <div className="skeleton h-7 w-28 rounded-lg" />
        <div className="border-t border-[#EEECE7] pt-4">
          <div className="skeleton h-5 w-36 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message || "Unable to load products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <main>
      {/* =========================
          HERO
      ========================== */}
      <section className="relative overflow-hidden">
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 -top-40 h-[500px] w-[500px] rounded-full bg-[#6557E8]/[0.07] blur-3xl" />
          <div className="absolute -left-40 top-40 h-[350px] w-[350px] rounded-full bg-[#F4EEE5] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-24 lg:pb-28 lg:pt-28">
          <div className="max-w-4xl animate-fade-up">
            {/* Eyebrow */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#DDD9FF] bg-[#EFEDFF]/70 px-3.5 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6557E8]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#5144C9]">
                Smarter way to own your next phone
              </span>
            </div>

            {/* Heading */}
            <h1 className="max-w-4xl font-display text-[48px] font-extrabold leading-[1.03] tracking-[-0.055em] text-[#111318] sm:text-[64px] lg:text-[82px]">
              Premium phones.
              <br />

              <span className="text-[#6557E8]">
                Flexible EMIs.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-2xl text-[16px] leading-7 text-[#6F6C66] sm:text-[18px] sm:leading-8">
              Choose the smartphone you want, pick a plan that works for you,
              and spread the cost without compromising on the experience.
            </p>

            {/* Trust row */}
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-[12px] font-semibold text-[#77746F]">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E8F7F0] text-[#16845B]">
                  ✓
                </span>
                Multiple EMI plans
              </div>

              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EFEDFF] text-[#5144C9]">
                  ✓
                </span>
                Transparent pricing
              </div>

              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4EEE5] text-[#75644E]">
                  ✓
                </span>
                No hidden surprises
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          PRODUCTS
      ========================== */}
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 lg:pb-32">
        <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8A8883]">
              Explore the collection
            </p>

            <h2 className="font-display text-[30px] font-extrabold tracking-[-0.045em] text-[#111318] sm:text-[36px]">
              Find your next device.
            </h2>
          </div>

          {!loading && !error && (
            <span className="text-[12px] font-medium text-[#85817A]">
              {products.length} devices available
            </span>
          )}
        </div>

        {loading && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
          </div>
        )}

        {error && (
          <div className="premium-card flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FEF0F0] text-[#C24141]">
              !
            </div>

            <h3 className="mt-5 font-display text-xl font-bold text-[#111318]">
              Couldn't load the collection
            </h3>

            <p className="mt-2 max-w-md text-sm text-[#77746F]">
              Make sure the backend server is running and try refreshing the
              page.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="primary-button mt-6"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="premium-card py-20 text-center">
            <h3 className="font-display text-xl font-bold">
              No products available
            </h3>

            <p className="mt-2 text-sm text-[#77746F]">
              Check back soon for new devices.
            </p>
          </div>
        )}
      </section>

      {/* =========================
          HOW IT WORKS
      ========================== */}
      <section
        id="how-it-works"
        className="border-t border-[#E8E5DF] bg-white"
      >
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
          <div className="max-w-xl">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#6557E8]">
              Simple by design
            </p>

            <h2 className="font-display text-[34px] font-extrabold leading-tight tracking-[-0.045em] text-[#111318] sm:text-[42px]">
              Your phone.
              <br />
              Your pace.
            </h2>

            <p className="mt-5 text-[15px] leading-7 text-[#77746F]">
              We've kept the experience simple. Choose your device, select an
              EMI plan, and continue with a plan that fits your budget.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Choose a device",
                description:
                  "Explore premium smartphones and select the variant you want.",
              },
              {
                number: "02",
                title: "Pick your EMI",
                description:
                  "Compare available tenures and monthly payments before you decide.",
              },
              {
                number: "03",
                title: "Continue",
                description:
                  "Select your preferred plan and proceed with your purchase.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="rounded-[20px] border border-[#E8E5DF] bg-[#F8F7F4] p-7"
              >
                <span className="font-display text-[13px] font-extrabold text-[#6557E8]">
                  {step.number}
                </span>

                <h3 className="mt-8 font-display text-[20px] font-bold tracking-[-0.035em] text-[#111318]">
                  {step.title}
                </h3>

                <p className="mt-3 text-[13px] leading-6 text-[#77746F]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          FOOTER
      ========================== */}
      <footer className="border-t border-[#E8E5DF] bg-[#24243A]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-lg font-extrabold tracking-[-0.04em] text-white">
              1Fi
            </p>

            <p className="mt-1 text-[11px] text-white/50">
              Smarter way to own your next phone.
            </p>
          </div>

          <p className="text-[11px] text-white/40">
            © 2026 1Fi Marketplace
          </p>
        </div>
      </footer>
    </main>
  );
}

export default Home;