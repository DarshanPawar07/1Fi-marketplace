import { formatCurrency } from "../utils/formatCurrency";

function ProceedButton({ plan, disabled, onClick }) {
  return (
    <div className="border-t border-[#E8E5DF] pt-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-[#9A9791]">
            Your selection
          </p>

          {plan ? (
            <p className="mt-1 text-[13px] font-semibold text-[#4E4B46]">
              {plan.tenureMonths}-month EMI
            </p>
          ) : (
            <p className="mt-1 text-[13px] text-[#85817A]">
              Select an EMI plan
            </p>
          )}
        </div>

        {plan && (
          <p className="font-display text-lg font-extrabold tracking-[-0.03em] text-[#111318]">
            {formatCurrency(plan.monthlyPayment)}
            <span className="ml-1 text-[10px] font-medium text-[#85817A]">
              /mo
            </span>
          </p>
        )}
      </div>

      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        className={`flex min-h-[54px] w-full items-center justify-center gap-3 rounded-[16px] text-[14px] font-bold transition-all ${
          disabled
            ? "cursor-not-allowed bg-[#E5E2DC] text-[#9A9791]"
            : "bg-[#24243A] text-white shadow-[0_10px_25px_rgba(36,36,58,0.16)] hover:-translate-y-0.5 hover:bg-[#18182A] hover:shadow-[0_15px_30px_rgba(36,36,58,0.22)]"
        }`}
      >
        Continue with this plan

        {!disabled && (
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
        )}
      </button>
    </div>
  );
}

export default ProceedButton;