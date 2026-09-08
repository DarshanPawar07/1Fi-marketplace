import EmiPlanCard from "./EmiPlanCard";

function EmiPlanList({
  plans,
  selectedPlan,
  onPlanChange,
}) {
  if (!plans?.length) {
    return (
      <div className="rounded-[18px] border border-[#E8E5DF] bg-[#F8F7F4] p-5 text-sm text-[#77746F]">
        No EMI plans are currently available for this variant.
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8A8883]">
            Flexible payments
          </p>

          <h3 className="mt-1 font-display text-[18px] font-bold tracking-[-0.03em] text-[#111318]">
            Choose your EMI plan
          </h3>
        </div>

        <span className="hidden text-[11px] font-medium text-[#9A9791] sm:block">
          {plans.length} plans available
        </span>
      </div>

      <div className="mt-4 space-y-2.5">
        {plans.map((plan) => (
          <EmiPlanCard
            key={plan.id}
            plan={plan}
            selected={plan.id === selectedPlan?.id}
            onSelect={onPlanChange}
          />
        ))}
      </div>
    </div>
  );
}

export default EmiPlanList;