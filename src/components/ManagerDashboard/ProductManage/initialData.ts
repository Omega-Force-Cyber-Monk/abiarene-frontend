import { TableCardProps, MenuItem, OrderItem } from "./index";

export const initialTableData: TableCardProps[] = [
  { id: "1", tableNumber: 1, seatCount: 4, status: "OCCUPIED", createdAt: new Date().toISOString() },
  { id: "2", tableNumber: 2, seatCount: 4, status: "AVAILABLE", createdAt: new Date().toISOString() },
  { id: "3", tableNumber: 3, seatCount: 4, status: "OCCUPIED", createdAt: new Date().toISOString() },
  { id: "4", tableNumber: 4, seatCount: 4, status: "OCCUPIED", createdAt: new Date().toISOString() },
  { id: "5", tableNumber: 5, seatCount: 2, status: "OCCUPIED", createdAt: new Date().toISOString() },
  { id: "6", tableNumber: 6, seatCount: 2, status: "AVAILABLE", createdAt: new Date().toISOString() },
];

export const initialMenuItems: MenuItem[] = [
  {
    id: "m1",
    name: "Chicken Biryani",
    description: "Fragrant basmati rice with spiced chicken",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=500",
    category: "Main Course",
  },
  {
    id: "m2",
    name: "Paneer Tikka",
    description: "Grilled cottage cheese with spices",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=500",
    category: "Appetizer",
  },
];

export const initialCurrentOrder: OrderItem[] = [
  {
    id: "o1",
    name: "Chicken Biryani",
    price: 12.99,
    quantity: 1,
    customizations: ["Extra Spicy"],
  },
  {
    id: "o2",
    name: "Mango Lassi",
    price: 4.5,
    quantity: 1,
    customizations: ["Less salt"],
  },
];
