export interface ProductInfo {
  name: string;
  price: number;
  stock: number;
  sku: string;
}

export interface ScannedData {
  barcode: string;
  timestamp: string;
  product: ProductInfo;
  image?: string;
}

export interface VideoDevice {
  deviceId: string;
  label: string;
  kind: string;
}
