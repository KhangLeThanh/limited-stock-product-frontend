import React, { useState } from "react";
import type { Reservation } from "../utils/types";
import { useCheckout } from "../hooks/useCheckout";
import { CountdownTimer } from "./CountdownTimer";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";

interface Props {
  reservation: Reservation;
  onClose: () => void;
}

export const CheckoutModal: React.FC<Props> = ({ reservation, onClose }) => {
  const checkout = useCheckout();
  const [expired, setExpired] = useState(false);
  const handleCheckout = async () => {
    if (expired) return;

    try {
      await checkout.mutateAsync(reservation.id);
      alert("Order completed!");
      onClose();
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const handleExpire = () => {
    setExpired(true);
    alert("Reservation expired!");
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Checkout Reservation</DialogTitle>
      <DialogContent>
        <Typography>Product Name: {reservation.product.name}</Typography>
        <Typography>Quantity: {reservation.quantity}</Typography>
        <Typography>
          Expires in:{" "}
          <CountdownTimer
            expiresAt={reservation.expiresAt}
            onExpire={handleExpire}
          />
        </Typography>
        {expired && (
          <Typography color="error" mt={2}>
            Reservation expired. You cannot checkout.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleCheckout}
          disabled={checkout.isLoading || expired}
          variant="contained"
          startIcon={checkout.isLoading ? <CircularProgress size={20} /> : null}
        >
          Checkout
        </Button>
      </DialogActions>
    </Dialog>
  );
};
