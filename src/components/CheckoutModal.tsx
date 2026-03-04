import React from "react";
import type { Reservation } from "../utils/types";
import { useCheckout } from "../hooks/useCheckout";

interface Props {
  reservation: Reservation;
  onClose: () => void;
}

export const CheckoutModal: React.FC<Props> = ({ reservation, onClose }) => {
  const checkout = useCheckout();

  const handleCheckout = async () => {
    try {
      await checkout.mutateAsync(reservation.id);
      alert("Order completed!");
      onClose();
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <div className="modal">
      <h3>Checkout {reservation.id}</h3>
      <p>Quantity: {reservation.quantity}</p>
      <p>Expires at: {new Date(reservation.expiresAt).toLocaleTimeString()}</p>
      <button onClick={handleCheckout} disabled={checkout.isLoading}>
        {checkout.isLoading ? "Processing..." : "Checkout"}
      </button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};
