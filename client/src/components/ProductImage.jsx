import { useEffect, useState } from "react";

function ProductImage({ variant, productName }) {
  const [activeImage, setActiveImage] = useState("");

  /*
   * imageUrls is the new gallery field.
   *
   * imageUrl is kept as a fallback so the component
   * remains safe if an older database record is returned.
   */
  const images =
    variant?.imageUrls?.length > 0
      ? variant.imageUrls
      : variant?.imageUrl
        ? [variant.imageUrl]
        : [];

  /*
   * Whenever the selected variant changes,
   * automatically display its FIRST image.
   */
  useEffect(() => {
    setActiveImage(images[0] || "");
  }, [variant?.id]);

  if (!variant || images.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {/* =====================================================
          MAIN PRODUCT IMAGE
      ====================================================== */}

      <div className="product-stage relative flex min-h-[480px] items-center justify-center overflow-hidden rounded-[28px] border border-[#E8E5DF] bg-white sm:min-h-[600px]">
        {/* Storage badge */}
        <div className="absolute left-6 top-6 z-20">
          <span className="rounded-full border border-[#E5E2DC] bg-white/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#77746F] backdrop-blur">
            {variant.storage}
          </span>
        </div>

        {/* Image counter */}
        <div className="absolute right-6 top-6 z-20">
          <span className="rounded-full border border-[#E5E2DC] bg-white/80 px-3 py-1.5 text-[10px] font-semibold text-[#77746F] backdrop-blur">
            {images.findIndex((image) => image === activeImage) + 1} /{" "}
            {images.length}
          </span>
        </div>

        {/* Main image */}
        <img
          src={activeImage}
          alt={`${productName} ${variant.color}`}
          className="relative z-10 max-h-[390px] max-w-[75%] object-contain drop-shadow-[0_30px_30px_rgba(17,19,24,0.18)] transition-all duration-500 sm:max-h-[500px]"
        />

        {/* Bottom product information */}
        <div className="absolute bottom-5 left-5 right-5 z-20 flex items-end justify-between">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#9A9791]">
              Finish
            </p>

            <p className="mt-1 text-[12px] font-semibold text-[#4E4B46]">
              {variant.finish || variant.color}
            </p>
          </div>

          {/* Color indicator */}
          <div
            className="h-7 w-7 rounded-full border-2 border-white shadow-sm"
            style={{
              background: getColor(variant.color),
            }}
            title={variant.color}
          />
        </div>
      </div>

      {/* =====================================================
          IMAGE GALLERY
      ====================================================== */}

      <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-5">
        {images.map((image, index) => {
          const selected = image === activeImage;

          return (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveImage(image)}
              className={`group relative flex aspect-square items-center justify-center overflow-hidden rounded-[14px] border bg-white transition-all ${
                selected
                  ? "border-[#6557E8] shadow-[0_0_0_3px_rgba(101,87,232,0.08)]"
                  : "border-[#E5E2DC] hover:border-[#C9C5BD]"
              }`}
              aria-label={`View image ${index + 1} of ${images.length}`}
              aria-pressed={selected}
            >
              <img
                src={image}
                alt={`${productName} ${variant.color} view ${index + 1}`}
                loading={index === 0 ? "eager" : "lazy"}
                className="h-full w-full object-contain p-2 transition-transform duration-200 group-hover:scale-105"
              />

              {/* Selected indicator */}
              {selected && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#6557E8]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| Product colour indicator
|--------------------------------------------------------------------------
*/

function getColor(color = "") {
  const value = color.toLowerCase();

  if (value.includes("black")) {
    return "#1D1D1F";
  }

  if (value.includes("blue")) {
    return "#7D91A6";
  }

  if (value.includes("orange")) {
    return "#C97848";
  }

  if (value.includes("gray")) {
    return "#898A8D";
  }

  if (value.includes("violet")) {
    return "#8B789A";
  }

  if (value.includes("olive")) {
    return "#7E8062";
  }

  if (value.includes("fog")) {
    return "#C7C9C8";
  }

  if (value.includes("obsidian")) {
    return "#252526";
  }

  if (value.includes("porcelain")) {
    return "#E9E4DA";
  }

  if (value.includes("hazel")) {
    return "#8E786B";
  }

  if (value.includes("silver")) {
    return "#C9C7C2";
  }

  return "#C9C7C2";
}

export default ProductImage;