// types/index.ts
export type TableStatus = "AVAILABLE" | "OCCUPIED" | "RESERVED" | "CLEANING";
export type TableSubStatus = "SERVED" | "ORDERING" | "BILLING" | null;

export interface TableCardProps {
  id: number | string;
  capacity: number;
  status: TableStatus;
  subStatus?: TableSubStatus;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  customizations: string[];
}
