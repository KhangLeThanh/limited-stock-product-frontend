import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchProducts, reserveProduct } from "../api/product";
import type { Product, ReservationResponse } from "../utils/types";

export const useProducts = () => {
  return useQuery<Product[]>("products", fetchProducts, {
    refetchInterval: 5000, // real-time stock
    retry: 2,
  });
};

export const useReserveProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ReservationResponse,
    Error,
    { productId: string; quantity: number }
  >(({ productId, quantity }) => reserveProduct(productId, quantity), {
    onSuccess: () => queryClient.invalidateQueries("products"), // refresh stock
  });
};
