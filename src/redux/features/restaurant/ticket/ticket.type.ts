export interface MenuItem {
  id: string;
  tenantId: string;
  image: string;
  name: string;
  category: string;
  description: string;
  options: string[];
  price: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  menuItemId: string;
  quantity: number;
  notes: string;
  selectedOptions: string[];
  createdAt: string;
  menuItem: MenuItem;
}

export interface TicketItem {
  id: string;
  ticketId?: string;
  orderItemId?: string;
  quantity: number;
  notes: string;
  selectedOptions: string[];
  // API returns .item (not .orderItem)
  item: Pick<MenuItem, "id" | "name" | "category" | "image">;
  // legacy fallback
  orderItem?: OrderItem;
}

export interface Table {
  id: string;
  tenantId: string;
  tableNumber: number;
  seatCount: number;
  status: string;
  served: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  tenantId?: string;
  tableId?: string;
  status: "PREPARING" | "READY" | "COMPLETED" | "CANCELLED" | string;
  createdBy?: string;
  createdAt: string;
  updatedAt?: string;
  table?: Table;
}

export interface Ticket {
  id: string;
  ticketCode: string;
  orderId: string;
  tenantId: string;
  // API returns "PREPARING" | "READY" | "ARCHIVED" (not "ACTIVE")
  status: "PREPARING" | "READY" | "ARCHIVED" | string;
  createdAt: string;
  updatedAt: string;
  order: Order;
  // table is at root level (NOT inside order)
  table: Table;
  items: TicketItem[];
  meta?: {
    itemCount: number;
    totalQuantity: number;
  };
}
