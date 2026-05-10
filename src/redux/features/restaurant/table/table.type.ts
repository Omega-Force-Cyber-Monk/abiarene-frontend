export type TableStatus = "OCCUPIED" | "AVAILABLE" | "SERVED";
export type PaymentMethod = "CASH" | "CARD";

export interface Table {
  id: string;
  tenantId: string;
  tableNumber: number;
  seatCount: number;
  status: TableStatus;
  served: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MetaData {
  page: number;
  limit: number;
  total: number;
  count: number;
  totalPages: number;
}

export interface TablesResponse {
  success: boolean;
  message: string;
  data: {
    data: Table[];
    meta: MetaData;
  };
}

export interface CreateTableRequest {
  tableNumber: number;
  seatCount: number;
  status: TableStatus;
}

export interface UpdateTableRequest {
  tableNumber?: number;
  seatCount?: number;
  status?: TableStatus;
}

// Cashier Summary Types
export interface CashierOrder {
  id: string;
  status: string;
  createdAt: string;
  itemCount: number;
  totalQuantity: number;
  totalAmount: number;
}

export interface CashierItem {
  itemId: string;
  name: string;
  category: string;
  image: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface CashierSummaryMeta {
  orderCount: number;
  itemCount: number;
  totalQuantity: number;
  totalAmount: number;
}

export interface CashierSummaryResponse {
  table: Table;
  orders: CashierOrder[];
  items: CashierItem[];
  meta: CashierSummaryMeta;
}

// Cashier Checkout Types
export interface CashierCheckoutRequest {
  method: PaymentMethod;
}

export interface CashierCheckoutMeta {
  orderCount: number;
  totalAmount: number;
}

export interface CashierCheckoutResponse {
  table: Table;
  paymentMethod: PaymentMethod;
  meta: CashierCheckoutMeta;
}
