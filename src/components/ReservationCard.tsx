import React, { useState } from "react";
import type { Reservation } from "../utils/types";
import { useCheckout } from "../hooks/useCheckout";
import { CountdownTimer } from "./CountdownTimer";
import {
  Card,
  Typography,
  Button,
  Box,
  Divider,
  CircularProgress,
} from "@mui/material";

interface Props {
  reservation: Reservation;
  onExpire?: () => void;
  onComplete?: () => void;
}

export const ReservationCard: React.FC<Props> = ({
  reservation,
  onExpire,
  onComplete,
}) => {
  const checkout = useCheckout();
  const [expired, setExpired] = useState(false);

  const handleCheckout = async () => {
    if (expired) return;

    try {
      await checkout.mutateAsync(reservation.id);
      alert("Checkout successful!");
      onComplete?.();
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const handleExpire = () => {
    setExpired(true);
    onExpire?.();
    alert("Reservation expired!");
  };

  return (
    <Card sx={{ width: 300, p: 2, textAlign: "center", boxShadow: 3 }}>
      <Typography variant="h6">Your Reservation</Typography>
      <Divider sx={{ my: 1 }} />

      <Typography>
        <strong>Product:</strong>{" "}
        {reservation.product?.name || reservation.productId}
      </Typography>
      <Typography>
        <strong>Quantity:</strong> {reservation.quantity}
      </Typography>
      <Typography>
        <strong>Expires in:</strong>{" "}
        <CountdownTimer
          expiresAt={reservation.expiresAt}
          onExpire={handleExpire}
        />
      </Typography>

      {expired && (
        <Typography color="error" mt={1}>
          Reservation expired. You cannot checkout.
        </Typography>
      )}

      <Box mt={2} display="flex" justifyContent="space-between">
        <Button
          variant="contained"
          onClick={handleCheckout}
          disabled={checkout.isLoading || expired}
          startIcon={checkout.isLoading ? <CircularProgress size={20} /> : null}
        >
          Checkout
        </Button>

        <Button
          variant="outlined"
          color="error"
          onClick={onExpire}
          disabled={checkout.isLoading}
        >
          Cancel
        </Button>
      </Box>
    </Card>
  );
};
