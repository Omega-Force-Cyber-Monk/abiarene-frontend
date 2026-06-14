export type PlanType = "FREE" | "MONTHLY" | "YEARLY";

export interface SubscriptionPrice {
  id: string;
  name: string;
  planType: PlanType;
  description: string;
  amount: number;
  currency: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  originalAmount?: number;
  originalCurrency?: string;
  exchangeRate?: number;
  conversionUnavailable?: boolean;
}

export interface CreateSubscriptionPriceRequest {
  planType: PlanType;
  description: string;
  amount: number;
  currency: string;
  isActive: boolean;
}

export interface UpdateSubscriptionPriceRequest {
  planType?: PlanType;
  description?: string;
  amount?: number;
  currency?: string;
  isActive?: boolean;
}

export interface DeleteSubscriptionResponse {
  success: boolean;
  id: string;
}

