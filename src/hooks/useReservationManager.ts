import { useState, useEffect } from "react";
import type { Reservation } from "../utils/types";

export const useReservationManager = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setReservations((prev) =>
        prev.filter((r) => new Date(r.expiresAt) > new Date())
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const addReservation = (reservation: Reservation) => {
    setReservations((prev) => [...prev, reservation]);
  };

  return { reservations, addReservation };
};
