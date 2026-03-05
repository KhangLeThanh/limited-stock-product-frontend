// src/components/ReservationCard.tsx
import React, { useState } from "react";
import type { Reservation, NotificationType } from "../utils/types";
import { useCheckout } from "../hooks/useCheckout";
import { CountdownTimer } from "./CountdownTimer";
import { Card, Typography, Button, Box, CircularProgress } from "@mui/material";

interface Props {
  reservation: Reservation;
  onExpire?: () => void;
  onComplete?: () => void;
  setNotification: (notification: NotificationType) => void; // Pass notification function from page
}

export const ReservationCard: React.FC<Props> = ({
  reservation,
  onExpire,
  onComplete,
  setNotification,
}) => {
  const checkout = useCheckout();
  const [expired, setExpired] = useState(false);

  const handleCheckout = async () => {
    if (expired) {
      setNotification({
        type: "error",
        message: "Reservation expired! Cannot checkout.",
      });
      return;
    }

    try {
      await checkout.mutateAsync(reservation.id);
      setNotification({ type: "success", message: "Checkout successful!" });
      onComplete?.();
    } catch (err) {
      setNotification({
        type: "error",
        message: (err as Error).message || "Checkout failed",
      });
    }
  };

  const handleExpire = () => {
    setExpired(true);
    onExpire?.();
    setNotification({ type: "error", message: "Reservation expired!" });
  };

  return (
    <Card sx={{ width: 300, p: 2, textAlign: "center", boxShadow: 3 }}>
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
          startIcon={
            checkout.isLoading ? (
              <CircularProgress size={20} sx={{ color: "white" }} />
            ) : null
          }
        >
          {!checkout.isLoading && "Checkout"}
        </Button>

        <Button
          variant="outlined"
          color="error"
          onClick={handleExpire}
          disabled={checkout.isLoading}
        >
          Cancel
        </Button>
      </Box>
    </Card>
  );
};
