// types/index.ts
export type TableStatus = "AVAILABLE" | "OCCUPIED" | "SERVED";
// export type TableSubStatus = "SERVED" | "ORDERING" | "BILLING" | null;

export interface TableCardProps {
  id: string;
  tableNumber: number;
  seatCount: number;
  status: TableStatus;
  createdAt: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  options?: string[];
  isActive?: boolean;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  customizations: string[];
}
