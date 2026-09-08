import { formatCurrency } from "../utils/formatCurrency";

function EmiPlanCard({
  plan,
  selected,
  onSelect,
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(plan)}
      className={`group relative w-full rounded-[18px] border p-5 text-left transition-all duration-200 ${
        selected
          ? "border-[#6557E8] bg-[#EFEDFF]/60 shadow-[0_0_0_3px_rgba(101,87,232,0.08)]"
          : "border-[#E5E2DC] bg-white hover:border-[#CFCBC4] hover:shadow-sm"
      }`}
    >
      {/* Selected indicator */}
      <div
        className={`absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full border transition ${
          selected
            ? "border-[#6557E8] bg-[#6557E8] text-white"
            : "border-[#D8D5CF] bg-white text-transparent"
        }`}
      >
        ✓
      </div>

      {/* Tenure */}
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8A8883]">
        {plan.tenureMonths} months
      </p>

      {/* Monthly payment */}
      <div className="mt-2">
        <span className="font-display text-[22px] font-extrabold tracking-[-0.04em] text-[#111318]">
          {formatCurrency(plan.monthlyPayment)}
        </span>

        <span className="ml-1 text-[11px] font-medium text-[#85817A]">
          / month
        </span>
      </div>

      {/* Details */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-[#F5F3EF] px-2.5 py-1 text-[10px] font-semibold text-[#77746F]">
          {plan.interestRate}% interest
        </span>

        {plan.cashback > 0 && (
          <span className="rounded-full bg-[#E8F7F0] px-2.5 py-1 text-[10px] font-bold text-[#16845B]">
            {formatCurrency(plan.cashback)} cashback
          </span>
        )}

        {plan.interestRate === 0 && (
          <span className="rounded-full bg-[#EFEDFF] px-2.5 py-1 text-[10px] font-bold text-[#5144C9]">
            No-cost EMI
          </span>
        )}
      </div>
    </button>
  );
}

export default EmiPlanCard;