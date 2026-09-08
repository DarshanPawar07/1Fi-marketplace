function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#E5E2DC] border-t-[#6557E8]" />
      <p className="mt-4 text-[12px] font-semibold text-[#8A8883]">
        Loading product...
      </p>
    </div>
  );
}

export default LoadingSpinner;