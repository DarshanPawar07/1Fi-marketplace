import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";

function ProductCard({ product }) {
  const variant = product.variants.find((item) => item.available)
    || product.variants[0];

  if (!variant) {
    return null;
  }

  const discount = Math.round(
    ((variant.mrp - variant.price) / variant.mrp) * 100
  );

  const lowestEmi = [...variant.emiPlans].sort(
    (a, b) => a.monthlyPayment - b.monthlyPayment
  )[0];

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group block overflow-hidden rounded-3xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/60"
    >
      {/* Image */}
      <div className="relative flex h-72 items-center justify-center overflow-hidden bg-slate-50 p-8 sm:h-80">
        <div className="absolute left-5 top-5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm">
          {product.brand}
        </div>

        {discount > 0 && (
          <div className="absolute right-5 top-5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
            {discount}% OFF
          </div>
        )}

        <img
          src={variant.imageUrl}
          alt={`${product.name} ${variant.storage} ${variant.color}`}
          className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Information */}
      <div className="p-6">
        <div className="mb-1 text-xs font-medium uppercase tracking-wider text-slate-400">
          {variant.storage} · {variant.color}
        </div>

        <h2 className="text-xl font-bold tracking-tight text-slate-950">
          {product.name}
        </h2>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-slate-950">
            {formatCurrency(variant.price)}
          </span>

          <span className="text-sm text-slate-400 line-through">
            {formatCurrency(variant.mrp)}
          </span>
        </div>

        {lowestEmi && (
          <div className="mt-4 rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">
                From
              </span>

              <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">
                {lowestEmi.interestRate === 0
                  ? "0% EMI"
                  : `${lowestEmi.interestRate}%`}
              </span>
            </div>

            <div className="mt-1">
              <span className="text-lg font-bold text-slate-950">
                {formatCurrency(lowestEmi.monthlyPayment)}
              </span>

              <span className="ml-1 text-sm text-slate-500">
                / month
              </span>
            </div>
          </div>
        )}

        <div className="mt-5 flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-500">
            View product
          </span>

          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-white transition group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;