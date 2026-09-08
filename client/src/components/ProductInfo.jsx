import { formatCurrency } from "../utils/formatCurrency";
import VariantSelector from "./VariantSelector";
import EmiPlanList from "./EmiPlanList";
import ProceedButton from "./ProceedButton";

function ProductInfo({
  product,
  selectedVariant,
  selectedPlan,
  onVariantChange,
  onPlanChange,
  onProceed,
}) {
  if (!product || !selectedVariant) return null;

  const discount = Math.round(
    ((selectedVariant.mrp - selectedVariant.price) /
      selectedVariant.mrp) *
      100
  );

  return (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8A8883]">
          {product.brand}
        </span>

        <span className="h-1 w-1 rounded-full bg-[#C4C0B9]" />

        <span className="text-[10px] font-semibold text-[#9A9791]">
          Premium device
        </span>
      </div>

      {/* Product name */}
      <h1 className="mt-3 font-display text-[36px] font-extrabold leading-[1.05] tracking-[-0.05em] text-[#111318] sm:text-[46px]">
        {product.name}
      </h1>

      {/* Description */}
      {product.description && (
        <p className="mt-4 max-w-xl text-[13px] leading-6 text-[#77746F]">
          {product.description}
        </p>
      )}

      {/* Price */}
      <div className="mt-7">
        <div className="flex flex-wrap items-end gap-3">
          <span className="font-display text-[30px] font-extrabold tracking-[-0.045em] text-[#111318]">
            {formatCurrency(selectedVariant.price)}
          </span>

          {selectedVariant.mrp > selectedVariant.price && (
            <>
              <span className="pb-1 text-[14px] font-medium text-[#A09D97] line-through">
                {formatCurrency(selectedVariant.mrp)}
              </span>

              <span className="mb-1 rounded-full bg-[#E8F7F0] px-2.5 py-1 text-[10px] font-bold text-[#16845B]">
                Save {discount}%
              </span>
            </>
          )}
        </div>

        <p className="mt-1.5 text-[11px] text-[#9A9791]">
          Inclusive of all applicable taxes
        </p>
      </div>

      {/* Divider */}
      <div className="my-7 h-px bg-[#E8E5DF]" />

      {/* Variant */}
      <VariantSelector
        variants={product.variants}
        selectedVariant={selectedVariant}
        onVariantChange={onVariantChange}
      />

      {/* EMI */}
      <div className="mt-8">
        <EmiPlanList
          plans={selectedVariant.emiPlans}
          selectedPlan={selectedPlan}
          onPlanChange={onPlanChange}
        />
      </div>

      {/* CTA */}
      <div className="mt-7">
        <ProceedButton
          plan={selectedPlan}
          disabled={!selectedPlan}
          onClick={onProceed}
        />
      </div>

      {/* Trust */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] font-semibold text-[#8A8883]">
        <span className="flex items-center gap-1.5">
          <span className="text-[#16845B]">✓</span>
          Secure checkout
        </span>

        <span className="flex items-center gap-1.5">
          <span className="text-[#16845B]">✓</span>
          Flexible tenure
        </span>

        <span className="flex items-center gap-1.5">
          <span className="text-[#16845B]">✓</span>
          Transparent pricing
        </span>
      </div>
    </div>
  );
}

export default ProductInfo;