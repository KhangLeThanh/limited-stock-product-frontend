import baseApi from "./baseApi";

export const checkoutReservation = async (reservationId: string) => {
  const res = await baseApi.post("/checkout", { reservationId });
  return res.data;
};
