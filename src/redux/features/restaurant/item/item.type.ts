export interface Item {
  id: string;
  tenantId: string;
  image: string;
  name: string;
  category: string;
  description: string;
  price: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateItemRequest {
  image: string;
  name: string;
  category: string;
  description: string;
  price: number;
  isActive?: boolean;
}

export interface UpdateItemRequest {
  image?: string;
  name?: string;
  category?: string;
  description?: string;
  price?: number;
  isActive?: boolean;
}
