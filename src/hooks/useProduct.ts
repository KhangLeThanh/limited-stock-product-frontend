import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchProducts, reserveProduct } from "../api/product";
import type { Product, Reservation } from "../utils/types";

export const useProducts = () => {
  return useQuery<Product[]>("products", fetchProducts, {
    refetchInterval: 5000,
    retry: 2,
  });
};

export const useReserveProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Reservation,
    Error,
    { productId: string; quantity: number }
  >(({ productId, quantity }) => reserveProduct(productId, quantity), {
    onSuccess: () => {
      queryClient.invalidateQueries("products");
      queryClient.invalidateQueries("reservations");
    },
  });
};
