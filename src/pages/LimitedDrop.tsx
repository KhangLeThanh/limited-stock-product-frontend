// src/pages/LimitedDrop.tsx
import React, { useState } from "react";
import { Formik, Form, type FormikHelpers, type FormikProps } from "formik";
import * as Yup from "yup";
import { useProducts, useReserveProduct } from "../hooks/useProduct";
import type { ReservationResponse } from "../utils/types";
import CountdownTimer from "../components/CountdownTimer";
import Notification from "../components/Notification";
import CheckoutModal from "../components/CheckoutModal";
import { TextField, Button, Box, Typography } from "@mui/material";

// Validation schema
const ReservationSchema = Yup.object().shape({
  productId: Yup.string().required("Product is required"),
  quantity: Yup.number().min(1).required("Quantity is required"),
});

// Form values type
interface ReservationFormValues {
  productId: string;
  quantity: number;
}

// Active reservation type
interface ActiveReservation {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  expiresAt: string;
}

const LimitedDrop: React.FC = () => {
  const { data: products, isLoading } = useProducts();
  const reserveMutation = useReserveProduct();

  const [activeReservations, setActiveReservations] = useState<
    ActiveReservation[]
  >([]);
  const [notif, setNotif] = useState({
    open: false,
    severity: "info" as "success" | "error" | "info",
    message: "",
  });
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] =
    useState<ActiveReservation | null>(null);

  if (isLoading) return <div>Loading...</div>;

  const hasActiveReservation = (productId: string) =>
    activeReservations.some((res) => res.productId === productId);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={2}>
        Limited Drop
      </Typography>

      {products?.map((product) => (
        <Box
          key={product.id}
          sx={{ mb: 4, border: "1px solid #ccc", p: 2, borderRadius: 2 }}
        >
          <Typography variant="h6">{product.name}</Typography>
          <Typography color={product.stock === 0 ? "error" : "textPrimary"}>
            Remaining stock: {product.stock}
          </Typography>

          <Formik
            initialValues={{ productId: product.id, quantity: 1 }}
            validationSchema={ReservationSchema}
            onSubmit={(
              values: ReservationFormValues,
              { setSubmitting }: FormikHelpers<ReservationFormValues>
            ) => {
              if (hasActiveReservation(values.productId)) {
                setNotif({
                  open: true,
                  severity: "error",
                  message:
                    "You already have an active reservation for this product!",
                });
                setSubmitting(false);
                return;
              }

              reserveMutation.mutate(
                { productId: values.productId, quantity: values.quantity },
                {
                  onSuccess: (data: ReservationResponse) => {
                    const newReservation: ActiveReservation = {
                      id: data.reservationId,
                      productId: values.productId,
                      productName: product.name,
                      quantity: values.quantity,
                      expiresAt: data.expiresAt,
                    };

                    setActiveReservations((prev) => [...prev, newReservation]);
                    setSelectedReservation(newReservation);
                    setNotif({
                      open: true,
                      severity: "success",
                      message: "Reservation successful!",
                    });
                    setCheckoutOpen(true);
                  },
                  onError: (error: Error) => {
                    setNotif({
                      open: true,
                      severity: "error",
                      message: error.message,
                    });
                  },
                }
              );
              setSubmitting(false);
            }}
          >
            {({
              handleChange,
              values,
              errors,
              touched,
              isSubmitting,
            }: FormikProps<ReservationFormValues>) => (
              <Form>
                <TextField
                  name="quantity"
                  type="number"
                  label="Quantity"
                  value={values.quantity}
                  onChange={handleChange}
                  error={touched.quantity && !!errors.quantity}
                  helperText={touched.quantity && errors.quantity}
                  disabled={
                    product.stock === 0 || hasActiveReservation(product.id)
                  }
                  sx={{ mr: 2, mt: 1 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={
                    product.stock === 0 ||
                    hasActiveReservation(product.id) ||
                    isSubmitting
                  }
                  sx={{ mt: 1 }}
                >
                  Reserve
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      ))}

      {selectedReservation && (
        <>
          <CountdownTimer
            expiresAt={selectedReservation.expiresAt}
            onExpire={() => {
              setActiveReservations((prev) =>
                prev.filter((res) => res.id !== selectedReservation.id)
              );
              setSelectedReservation(null);
            }}
          />

          <CheckoutModal
            open={checkoutOpen}
            reservationId={selectedReservation.id}
            productName={selectedReservation.productName}
            quantity={selectedReservation.quantity}
            onClose={() => setCheckoutOpen(false)}
            onSuccess={() => {
              setActiveReservations((prev) =>
                prev.filter((res) => res.id !== selectedReservation.id)
              );
              setSelectedReservation(null);
            }}
          />
        </>
      )}

      <Notification
        open={notif.open}
        severity={notif.severity}
        message={notif.message}
        onClose={() => setNotif({ ...notif, open: false })}
      />
    </Box>
  );
};

export default LimitedDrop;
