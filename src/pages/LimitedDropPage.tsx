import React, { useState } from "react";
import { useProducts } from "../hooks/useProduct";
import { useReservationManager } from "../hooks/useReservationManager";
import { ProductCard } from "../components/ProductCard";
import { CheckoutModal } from "../components/CheckoutModal";

export const LimitedDropPage: React.FC = () => {
  const { data: products, isLoading } = useProducts();
  const { reservations, addReservation } = useReservationManager();
  const [checkoutReservation, setCheckoutReservation] = useState<
    null | (typeof reservations)[0]
  >(null);

  if (isLoading) return <p>Loading products...</p>;

  return (
    <div>
      <h2>Limited Drop</h2>
      <div className="products">
        {products?.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onReserveSuccess={addReservation}
            disabled={reservations.some((r) => r.productId === p.id)}
          />
        ))}
      </div>

      {reservations.map((r) => (
        <div key={r.id} onClick={() => setCheckoutReservation(r)}>
          Reservation {r.id} expires at:{" "}
          {new Date(r.expiresAt).toLocaleTimeString()}
        </div>
      ))}

      {checkoutReservation && (
        <CheckoutModal
          reservation={checkoutReservation}
          onClose={() => setCheckoutReservation(null)}
        />
      )}
    </div>
  );
};
