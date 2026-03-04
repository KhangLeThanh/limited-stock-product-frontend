export interface Product {
  id: string;
  name: string;
  stock: number;
}

export interface ReservationResponse {
  reservationId: string;
  expiresAt: string;
}

// Optional: for sorting
export enum SortField {
  CREATED_AT = "createdAt",
  TOTAL_PRICE = "totalPrice",
  QUANTITY = "quantity",
}

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}
