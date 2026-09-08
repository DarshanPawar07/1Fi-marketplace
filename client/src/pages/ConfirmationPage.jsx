import { Link, useSearchParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import { formatCurrency } from "../utils/formatCurrency";
import LoadingSpinner from "../components/LoadingSpinner";

function ConfirmationPage() {
  const [searchParams] = useSearchParams();

  const productSlug = searchParams.get("product");
  const variantId = searchParams.get("variant");
  const planId = searchParams.get("plan");

  const { product, loading, error } = useProduct(productSlug);

  if (loading) {
    return (
      <main className="mx-auto flex min-h-[calc(100vh-72px)] max-w-7xl items-center justify-center px-5">
        <LoadingSpinner />
      </main>
    );
  }

  if (
    error ||
    !product ||
    !productSlug ||
    !variantId ||
    !planId
  ) {
    return (
      <main className="mx-auto flex min-h-[calc(100vh-72px)] max-w-7xl items-center justify-center px-5">
        <div className="premium-card max-w-md px-7 py-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FEF0F0] font-bold text-[#C24141]">
            !
          </div>

          <h1 className="mt-5 font-display text-2xl font-bold text-[#111318]">
            Selection not found
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#77746F]">
            We couldn't load the product or EMI plan you selected.
          </p>

          <Link to="/" className="primary-button mt-6">
            Back to smartphones
          </Link>
        </div>
      </main>
    );
  }

  const variant = product.variants.find(
    (item) => item.id === variantId
  );

  const plan = variant?.emiPlans?.find(
    (item) => item.id === planId
  );

  if (!variant || !plan) {
    return (
      <main className="mx-auto flex min-h-[calc(100vh-72px)] max-w-7xl items-center justify-center px-5">
        <div className="premium-card max-w-md px-7 py-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FEF0F0] font-bold text-[#C24141]">
            !
          </div>

          <h1 className="mt-5 font-display text-2xl font-bold text-[#111318]">
            Invalid selection
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#77746F]">
            The selected variant or EMI plan is no longer available.
          </p>

          <Link
            to={`/products/${product.slug}`}
            className="primary-button mt-6"
          >
            Back to product
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-4xl px-5 pb-20 pt-10 sm:px-8 sm:pt-14">
        {/* Success header */}
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F7F0] text-2xl text-[#16845B]">
            ✓
          </div>

          <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8A8883]">
            Selection confirmed
          </p>

          <h1 className="mt-2 font-display text-[34px] font-extrabold tracking-[-0.05em] text-[#111318] sm:text-[42px]">
            You're all set.
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#77746F]">
            Here's a summary of the smartphone and EMI plan you've selected.
          </p>
        </div>

        {/* Summary card */}
        <div className="premium-card mt-10 overflow-hidden">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            {/* Product */}
            <div className="product-stage flex min-h-[330px] items-center justify-center p-8">
              <img
                src={variant.imageUrl}
                alt={`${product.name} ${variant.color}`}
                className="relative z-10 max-h-[270px] max-w-[75%] object-contain drop-shadow-[0_25px_25px_rgba(17,19,24,0.16)]"
              />
            </div>

            {/* Details */}
            <div className="p-7 sm:p-9">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8883]">
                  {product.brand}
                </span>

                <span className="h-1 w-1 rounded-full bg-[#C4C0B9]" />

                <span className="text-[10px] font-semibold text-[#9A9791]">
                  Selected device
                </span>
              </div>

              <h2 className="mt-3 font-display text-[28px] font-extrabold tracking-[-0.045em] text-[#111318]">
                {product.name}
              </h2>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-[#F5F3EF] px-3 py-1.5 text-[11px] font-semibold text-[#5F5C56]">
                  {variant.storage}
                </span>

                <span className="rounded-full bg-[#F5F3EF] px-3 py-1.5 text-[11px] font-semibold text-[#5F5C56]">
                  {variant.color}
                </span>

                {variant.finish && (
                  <span className="rounded-full bg-[#EFEDFF] px-3 py-1.5 text-[11px] font-semibold text-[#5144C9]">
                    {variant.finish}
                  </span>
                )}
              </div>

              <div className="my-7 h-px bg-[#E8E5DF]" />

              {/* Price */}
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9A9791]">
                    Device price
                  </p>

                  <p className="mt-1 font-display text-2xl font-extrabold tracking-[-0.04em] text-[#111318]">
                    {formatCurrency(variant.price)}
                  </p>
                </div>

                {variant.mrp > variant.price && (
                  <p className="text-sm text-[#A09D97] line-through">
                    {formatCurrency(variant.mrp)}
                  </p>
                )}
              </div>

              {/* EMI */}
              <div className="mt-6 rounded-[18px] border border-[#DED9FF] bg-[#EFEDFF]/60 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#6557E8]">
                      Selected EMI
                    </p>

                    <p className="mt-2 font-display text-[25px] font-extrabold tracking-[-0.04em] text-[#24243A]">
                      {formatCurrency(plan.monthlyPayment)}
                      <span className="ml-1 text-[11px] font-semibold text-[#77746F]">
                        / month
                      </span>
                    </p>
                  </div>

                  <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-[#5144C9] shadow-sm">
                    {plan.tenureMonths} months
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-[#77746F]">
                    {plan.interestRate}% interest
                  </span>

                  {plan.interestRate === 0 && (
                    <span className="rounded-full bg-[#E8F7F0] px-2.5 py-1 text-[10px] font-bold text-[#16845B]">
                      No-cost EMI
                    </span>
                  )}

                  {plan.cashback > 0 && (
                    <span className="rounded-full bg-[#E8F7F0] px-2.5 py-1 text-[10px] font-bold text-[#16845B]">
                      {formatCurrency(plan.cashback)} cashback
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom action */}
          <div className="border-t border-[#E8E5DF] bg-[#FCFBF9] p-6 sm:px-9 sm:py-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold text-[#77746F]">
                  Ready to proceed?
                </p>
                <p className="mt-1 text-[12px] text-[#9A9791]">
                  Your selected plan will be used for checkout.
                </p>
              </div>

              <button
                type="button"
                className="primary-button min-h-[50px] px-7"
                onClick={() => {
                  alert("Checkout flow would start here.");
                }}
              >
                Proceed to checkout
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
              </button>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-7 text-center">
          <Link
            to={`/products/${product.slug}`}
            className="text-[12px] font-semibold text-[#6557E8] transition hover:text-[#5144C9]"
          >
            ← Change variant or EMI plan
          </Link>
        </div>
      </section>
    </main>
  );
}

export default ConfirmationPage;