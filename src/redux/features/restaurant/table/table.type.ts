export type TableStatus = "OCCUPIED" | "AVAILABLE" | "SERVED";

export interface Table {
  id: string;
  tenantId: string;
  tableNumber: number;
  seatCount: number;
  status: TableStatus;
  createdAt: string;
  updatedAt: string;
}

export interface MetaData {
  page: number;
  limit: number;
  total: number;
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
