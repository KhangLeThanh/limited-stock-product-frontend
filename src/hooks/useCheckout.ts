import { useMutation, useQueryClient } from "react-query";
import { checkoutReservation } from "../api/checkout";

interface CheckoutPayload {
  reservationId: string;
}

interface CheckoutResponse {
  orderId: string;
  productId: string;
  quantity: number;
  totalPrice: number;
  status: string;
}

export const useCheckout = () => {
  const queryClient = useQueryClient();

  return useMutation<CheckoutResponse, Error, CheckoutPayload>(
    ({ reservationId }) => checkoutReservation(reservationId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["products"]);
      },
    }
  );
};
