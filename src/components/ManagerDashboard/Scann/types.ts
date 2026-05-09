import { InventoryItem } from "@/redux/features/restaurant/inventory/inventory.type";

export interface ScannedData {
  barcode: string;
  timestamp: string;
  product: InventoryItem;
  image?: string;
}

export interface VideoDevice {
  deviceId: string;
  label: string;
  kind: string;
}
