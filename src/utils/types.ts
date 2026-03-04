export interface Product {
  id: string;
  name: string;
  stock: number;
}

export interface ReservationResponse {
  reservationId: string;
  expiresAt: string;
}
