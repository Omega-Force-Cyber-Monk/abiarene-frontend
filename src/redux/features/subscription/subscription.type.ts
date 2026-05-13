export type TenantSubscription = {
  id: string;
  name: string;
  subscriptionFee: number;
  status: string;
  subscriptionStatus: "ACTIVE" | "PENDING" | string;
  subscriptionStartAt: string;
  subscriptionEndAt: string;
};

export type SubscriptionDetails = {
  fee: number;
  status: "ACTIVE" | "PENDING" | string;
  startAt: string;
  endAt: string;
  requiresPayment: boolean;
};

export type PaymentOption = {
  provider: "stripe" | "paystack" | "mtnMomo" | string;
  label: string;
  configured: boolean;
};

export type SubscriptionResponse = {
  tenant: TenantSubscription;
  subscription: SubscriptionDetails;
  paymentOptions: PaymentOption[];
  meta: {
    paymentOptionCount: number;
  };
};

export type InitiatePaymentRequest = {
  provider: string;
  payerPhoneNumber?: string;
};

export type InitiatePaymentResponse = {
  payment: {
    id: string;
    reference: string;
    status: string;
    amount: number;
    provider: string;
  };
  checkout: {
    url?: string; // Stripe
    authorizationUrl?: string; // Paystack
    accessCode?: string; // Paystack
    sessionId?: string; // Stripe
    requestToPayReferenceId?: string; // MTN MoMo
    payerPhoneNumber?: string; // MTN MoMo
  };
  nextStep: {
    provider: string;
    message: string;
  };
};

export type PaymentStatusResponse = {
  payment: {
    id: string;
    status: "COMPLETED" | "PENDING" | "FAILED" | string;
    reference: string;
    paymentStatus: string;
    amount: number;
    provider: string;
    completedAt?: string;
  };
};
