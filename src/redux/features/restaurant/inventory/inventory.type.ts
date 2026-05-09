export interface InventoryItem {
  id: string;
  tenantId: string;
  name: string;
  sku: string;
  barcode: string;
  price: number;
  stock: number;
  lowStockThreshold: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInventoryRequest {
  name: string;
  price: number;
  sku: string;
  barcode: string;
  stock: number;
  lowStockThreshold: number;
}

export interface UpdateInventoryRequest {
  name?: string;
  price?: number;
  sku?: string;
  barcode?: string;
  stock?: number;
  lowStockThreshold?: number;
}
