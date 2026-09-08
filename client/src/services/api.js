const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const apiRequest = async (endpoint) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "Something went wrong");
  }

  return result.data;
};

export const getProducts = () => {
  return apiRequest("/products");
};

export const getProductBySlug = (slug) => {
  return apiRequest(`/products/slug/${slug}`);
};