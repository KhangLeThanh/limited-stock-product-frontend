import baseApi from "./baseApi"; // <-- your renamed Axios
import type { Product, Reservation } from "../utils/types";

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await baseApi.get("/products");
  return res.data;
};

export const reserveProduct = async (
  productId: string,
  quantity: number,
  userId: string
): Promise<Reservation> => {
  const res = await baseApi.post("/reserve", { productId, quantity, userId });
  return res.data;
};
