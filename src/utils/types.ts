export interface Product {
  id: string;
  name: string;
  stock: number;
}

export interface Reservation {
  id: string;
  productId: string;
  userId: string;
  quantity: number;
  expiresAt: string;
  status: "PENDING" | "COMPLETED" | "EXPIRED";
  product: Product;
}

export interface NotificationType {
  type: "success" | "error";
  message: string;
}
