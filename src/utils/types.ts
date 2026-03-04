export interface Product {
  id: string;
  name: string;
  stock: number;
  createdAt: string;
}

export interface Reservation {
  id: string;
  productId: string;
  quantity: number;
  expiresAt: string;
}

export interface Order {
  id: string;
  productId: string;
  quantity: number;
  status: string;
}

export interface NotificationType {
  id: string;
  message: string;
  type: "success" | "error";
}
