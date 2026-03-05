// src/pages/LimitedDropPage.tsx
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchProducts, reserveProduct } from "../api/product";
import ProductCard from "../components/ProductCard";
import { ReservationCard } from "../components/ReservationCard";
import { Notification } from "../components/Notification";
import type { Product, Reservation, NotificationType } from "../utils/types";
import { Grid, Typography, CircularProgress, Box } from "@mui/material";
import { useAuth } from "../context/AuthContext";

export const LimitedDropPage: React.FC = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );

  const { data: products = [], isLoading } = useQuery<Product[]>(
    "products",
    fetchProducts
  );

  const reserveMutation = useMutation(
    ({ productId }: { productId: string }) => reserveProduct(productId, 1),
    {
      onMutate: ({ productId }) => setLoadingProductId(productId),
      onSuccess: (reservation) => {
        setReservations((prev) => [...prev, reservation]);
        setNotification({ type: "success", message: "Reserved successfully!" });
        queryClient.invalidateQueries("products");
      },
      onError: () => {
        setNotification({
          type: "error",
          message: "Failed to reserve product.",
        });
      },
      onSettled: () => setLoadingProductId(null),
    }
  );

  const handleReserve = (productId: string) => {
    if (!user) {
      setNotification({ type: "error", message: "Please login first" });
      return;
    }
    reserveMutation.mutate({ productId });
  };

  const handleCompleteReservation = (reservationId: string) => {
    setReservations((prev) => prev.filter((r) => r.id !== reservationId));
    queryClient.invalidateQueries("products");
    setNotification({ type: "success", message: "Checkout successful!" });
  };

  const handleExpireReservation = (reservationId: string) => {
    setReservations((prev) => prev.filter((r) => r.id !== reservationId));
    queryClient.invalidateQueries("products");
    setNotification({ type: "error", message: "Reservation expired!" });
  };

  if (isLoading)
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress />
        <Typography>Loading products...</Typography>
      </Box>
    );

  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Limited Drop
      </Typography>

      {notification && (
        <Notification
          notification={notification}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Product List */}
      <Grid container spacing={2} justifyContent="center">
        {products.map((product) => (
          <Grid item key={product.id}>
            <ProductCard
              product={product}
              onReserve={handleReserve}
              loading={loadingProductId === product.id}
            />
          </Grid>
        ))}
      </Grid>

      {/* Reserved Items */}
      {reservations.length > 0 && (
        <Box sx={{ mt: 4, width: "100%", maxWidth: 400 }}>
          <Typography variant="h5" gutterBottom>
            Your Reservations
          </Typography>
          <Grid container spacing={2}>
            {reservations.map((reservation) => (
              <Grid item key={reservation.id} xs={12}>
                <ReservationCard
                  reservation={reservation}
                  onComplete={() => handleCompleteReservation(reservation.id)}
                  onExpire={() => handleExpireReservation(reservation.id)}
                  setNotification={setNotification}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};
