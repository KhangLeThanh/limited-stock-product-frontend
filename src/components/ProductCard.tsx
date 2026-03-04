import React, { useState } from "react";
import type { Product, Reservation } from "../utils/types";
import { useReserveProduct } from "../hooks/useProduct";

interface Props {
  product: Product;
  onReserveSuccess: (reservation: Reservation) => void;
  disabled?: boolean;
}

export const ProductCard: React.FC<Props> = ({
  product,
  onReserveSuccess,
  disabled,
}) => {
  const [loading, setLoading] = useState(false);
  const reserve = useReserveProduct();

  const handleReserve = async () => {
    setLoading(true);
    try {
      const reservation = await reserve.mutateAsync({
        productId: product.id,
        quantity: 1,
      });
      onReserveSuccess(reservation);
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3>{product.name}</h3>
      <p>Stock: {product.stock}</p>
      <button
        onClick={handleReserve}
        disabled={disabled || loading || product.stock <= 0}
      >
        {loading ? "Reserving..." : "Reserve"}
      </button>
    </div>
  );
};
