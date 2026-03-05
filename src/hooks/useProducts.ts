import { useEffect, useState } from "react";
import { fetchProducts } from "../api/product";
import type { Product } from "../utils/types";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();

    const interval = setInterval(() => {
      loadProducts();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return {
    products,
    loading,
    refresh: loadProducts,
  };
};
