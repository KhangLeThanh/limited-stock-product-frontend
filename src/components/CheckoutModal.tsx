// src/components/CheckoutModal.tsx
import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { useCheckout } from "../hooks/useCheckout";

interface CheckoutModalProps {
  reservationId: string;
  productName: string;
  quantity: number;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

interface BackendError {
  message: string;
  statusCode?: number;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  reservationId,
  productName,
  quantity,
  open,
  onClose,
  onSuccess,
}) => {
  const checkoutMutation = useCheckout();

  const handleCheckout = async () => {
    try {
      await checkoutMutation.mutateAsync({ reservationId });
      onSuccess();
      onClose();
    } catch (error) {
      // Properly type the error
      const err = error as BackendError;
      alert(err.message || "Checkout failed");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          Checkout Reservation
        </Typography>
        <Typography>Product: {productName}</Typography>
        <Typography>Quantity: {quantity}</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCheckout}
          sx={{ mt: 2 }}
          disabled={checkoutMutation.isLoading}
        >
          {checkoutMutation.isLoading ? "Processing..." : "Complete Checkout"}
        </Button>
      </Box>
    </Modal>
  );
};

export default CheckoutModal;
