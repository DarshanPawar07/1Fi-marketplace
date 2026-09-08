import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import ProductImage from "../components/ProductImage";
import ProductInfo from "../components/ProductInfo";
import LoadingSpinner from "../components/LoadingSpinner";
import { useProduct } from "../hooks/useProduct";

function ProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { product, loading, error } = useProduct(slug);

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    if (!product?.variants?.length) return;

    const firstAvailable =
      product.variants.find((variant) => variant.available) ||
      product.variants[0];

    setSelectedVariant(firstAvailable);
  }, [product]);

  useEffect(() => {
    if (!selectedVariant?.emiPlans?.length) {
      setSelectedPlan(null);
      return;
    }

    setSelectedPlan(selectedVariant.emiPlans[0]);
  }, [selectedVariant]);

  const breadcrumbName = useMemo(() => {
    return product?.name || "Product";
  }, [product]);

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
  };

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
  };

  const handleProceed = () => {
    if (!product || !selectedVariant || !selectedPlan) return;

    const params = new URLSearchParams({
      product: product.slug,
      variant: selectedVariant.id,
      plan: selectedPlan.id,
    });

    navigate(`/confirmation?${params.toString()}`);
  };

  if (loading) {
    return (
      <main className="mx-auto flex min-h-[calc(100vh-72px)] max-w-7xl items-center justify-center px-5">
        <LoadingSpinner />
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="mx-auto flex min-h-[calc(100vh-72px)] max-w-7xl items-center justify-center px-5">
        <div className="premium-card max-w-md px-7 py-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FEF0F0] font-bold text-[#C24141]">
            !
          </div>

          <h1 className="mt-5 font-display text-2xl font-bold text-[#111318]">
            Product not found
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#77746F]">
            We couldn't find the smartphone you're looking for.
          </p>

          <Link
            to="/"
            className="primary-button mt-6"
          >
            Back to smartphones
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-5 pt-7 sm:px-8">
        <div className="flex items-center gap-2 text-[11px] font-medium text-[#9A9791]">
          <Link
            to="/"
            className="transition hover:text-[#24243A]"
          >
            Smartphones
          </Link>

          <span>/</span>

          <span className="text-[#5F5C56]">
            {breadcrumbName}
          </span>
        </div>
      </div>

      {/* Main product area */}
      <section className="mx-auto max-w-7xl px-5 pb-20 pt-7 sm:px-8 sm:pt-9 lg:pb-28">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.82fr)] lg:items-start">
          {/* Product visual */}
          <div className="lg:sticky lg:top-[100px]">
            <ProductImage
              variant={selectedVariant}
              productName={product.name}
            />
          </div>

          {/* Product details */}
          <div className="premium-card p-6 sm:p-8 lg:p-9">
            <ProductInfo
              product={product}
              selectedVariant={selectedVariant}
              selectedPlan={selectedPlan}
              onVariantChange={handleVariantChange}
              onPlanChange={handlePlanChange}
              onProceed={handleProceed}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductPage;