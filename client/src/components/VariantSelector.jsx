function VariantSelector({
  variants,
  selectedVariant,
  onVariantChange,
}) {
  if (!variants?.length) return null;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8A8883]">
            Choose variant
          </p>

          <p className="mt-1 text-sm font-semibold text-[#24243A]">
            {selectedVariant?.storage} · {selectedVariant?.color}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
        {variants.map((variant) => {
          const selected = variant.id === selectedVariant?.id;

          return (
            <button
              key={variant.id}
              type="button"
              onClick={() => onVariantChange(variant)}
              className={`relative rounded-[16px] border p-4 text-left transition-all duration-200 ${
                selected
                  ? "border-[#6557E8] bg-[#EFEDFF]/60 shadow-[0_0_0_3px_rgba(101,87,232,0.08)]"
                  : "border-[#E5E2DC] bg-white hover:border-[#CFCBC4] hover:bg-[#FCFBF9]"
              }`}
            >
              {selected && (
                <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#6557E8] text-[10px] font-bold text-white">
                  ✓
                </span>
              )}

              <p className="text-[13px] font-bold text-[#24243A]">
                {variant.storage}
              </p>

              <p className="mt-1 text-[11px] text-[#85817A]">
                {variant.color}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default VariantSelector;