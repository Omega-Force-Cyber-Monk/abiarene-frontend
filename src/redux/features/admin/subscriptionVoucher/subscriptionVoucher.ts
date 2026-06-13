// src/types/subscriptionVoucher.ts

export interface Tenant {
  id: string;
  name: string;
}

export interface SubscriptionVoucher {
  id: string;
  tenantId: string;
  code: string;
  amountOff: number;
  isActive: boolean;
  expiresAt: string;
  usedAt: string | null;
  usedByUserId: string | null;
  usedInPaymentId: string | null;
  createdAt: string;
  updatedAt: string;
  tenant?: Tenant;
}

export interface CreateSubscriptionVoucherRequest {
  code: string;
  amountOff: number;
  expiresAt: string;
  isActive: boolean;
}

export interface UpdateSubscriptionVoucherRequest {
  code: string;
  amountOff: number;
  expiresAt: string;
  isActive: boolean;
}

export interface DeleteVoucherResponse {
  success: boolean;
  id: string;
}

export interface VoucherFormData {
  code: string;
  amountOff: number;
  expiresAt: string;
  isActive: boolean;
}
