export interface Product {
  id: string;
  name: string;
  stock: number;
}

export interface Reservation {
  reservationId: string;
  productId: string;
  userId: string;
  quantity: number;
  expiresAt: string;
  status: "PENDING" | "COMPLETED" | "EXPIRED";
}

export interface NotificationType {
  type: "success" | "error";
  message: string;
}
