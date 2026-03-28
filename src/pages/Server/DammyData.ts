import { TableCardProps } from "./components/TableCard";

export const tableData: TableCardProps[] = [
  { id: 1, capacity: 4, status: 'OCCUPIED', subStatus: 'SERVED' },
  { id: 2, capacity: 4, status: 'AVAILABLE' },
  { id: 3, capacity: 4, status: 'OCCUPIED', subStatus: 'SERVED' },
  { id: 4, capacity: 4, status: 'OCCUPIED', subStatus: 'SERVED' },
  { id: 5, capacity: 2, status: 'OCCUPIED', subStatus: 'SERVED' },
  { id: 6, capacity: 2, status: 'AVAILABLE' },
  { id: 7, capacity: 4, status: 'AVAILABLE' },
  { id: 8, capacity: 4, status: 'AVAILABLE' },
  { id: 9, capacity: 4, status: 'AVAILABLE' },
  { id: 10, capacity: 4, status: 'AVAILABLE' },
  { id: 11, capacity: 2, status: 'AVAILABLE' },
  { id: 12, capacity: 2, status: 'AVAILABLE' },
];

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "m1",
    name: "Chicken Biryani",
    description: "Fragrant basmati rice with spiced chicken",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?q=80&w=500",
    category: "Main Course"
  },
  {
    id: "m2",
    name: "Paneer Tikka",
    description: "Grilled cottage cheese with spices",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=500",
    category: "Appetizer"
  },
  {
    id: "m3",
    name: "Garlic Naan",
    description: "Soft leavened bread with garlic",
    price: 3.50,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=500",
    category: "Bread"
  },
  {
    id: "m4",
    name: "Mango Lassi",
    description: "Sweet yogurt drink with mango",
    price: 4.50,
    image: "https://images.unsplash.com/photo-1571006682882-0050811e582d?q=80&w=500",
    category: "Drinks"
  },
  {
    id: "m5",
    name: "Lamb Curry",
    description: "Tender lamb in rich gravy",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1545240103-114853b5a0d6?q=80&w=500",
    category: "Main Course"
  },
  {
    id: "m6",
    name: "Samosa",
    description: "Crispy pastry with potato filling",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1626330332854-e1b34845b688?q=80&w=500",
    category: "Appetizer"
  }
];

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  customizations: string[];
}

export const CURRENT_ORDER: OrderItem[] = [
  {
    id: "m1",
    name: "Chicken Biryani",
    price: 12.99,
    quantity: 1,
    customizations: ["Extra Spicy", "No Onion", "Less salt"]
  },
  {
    id: "m4",
    name: "Mango Lassi",
    price: 4.50,
    quantity: 1,
    customizations: ["Extra Spicy", "No Onion", "Less salt"]
  }
];