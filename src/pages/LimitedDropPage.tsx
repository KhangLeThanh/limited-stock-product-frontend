import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchProducts, reserveProduct } from "../api/product";
import ProductCard from "../components/ProductCard";
import { CheckoutModal } from "../components/CheckoutModal";
import { Notification } from "../components/Notification";
import type { Product, Reservation, NotificationType } from "../utils/types";
import { Grid, Typography, CircularProgress } from "@mui/material";
import { currentUser } from "../utils/user";

export const LimitedDropPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );

  // Fetch products
  const { data: products = [], isLoading } = useQuery<Product[]>(
    "products",
    fetchProducts
  );

  // Reserve product mutation
  const reserveMutation = useMutation(
    ({ productId }: { productId: string }) =>
      reserveProduct(productId, 1, currentUser.id),
    {
      onMutate: ({ productId }) => setLoadingProductId(productId),
      onSuccess: (reservation) => {
        setSelectedReservation(reservation);
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
    reserveMutation.mutate({ productId });
  };

  if (isLoading)
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <CircularProgress />
        <Typography>Loading products...</Typography>
      </div>
    );

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Limited Drop
      </Typography>

      {notification && (
        <Notification
          notification={notification}
          onClose={() => setNotification(null)}
        />
      )}

      <Grid container spacing={2}>
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

      {selectedReservation && (
        <CheckoutModal
          reservation={selectedReservation}
          onClose={() => setSelectedReservation(null)}
        />
      )}
    </div>
  );
};
