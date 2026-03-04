import { useMutation, useQueryClient } from "react-query";
import { checkoutReservation } from "../api/checkout";

export const useCheckout = () => {
  const queryClient = useQueryClient();

  return useMutation<{ orderId: string }, Error, string>(
    (reservationId) => checkoutReservation(reservationId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("products");
        queryClient.invalidateQueries("reservations");
      },
    }
  );
};
