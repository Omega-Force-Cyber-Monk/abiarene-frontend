// // types/settingType.ts

// export interface User {
//   id: string;
//   name: string;
//   image: string;
//   email: string;
//   pin: string;
//   roleId: string;
//   tenantId: string;
//   status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
//   createdAt: string;
//   updatedAt: string;
//   role: Role;
// }

// export interface Role {
//   id: string;
//   name: string;
//   tenantId: string;
//   isActive: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface UpdateUserPayload {
//   name?: string;
//   image?: string;
//   email?: string;
//   pin?: string;
// }

// export interface Tenant {
//   id: string;
//   name: string;
//   subscriptionFee: number;
//   status: string;
//   subscriptionStatus: "ACTIVE" | "INACTIVE" | "EXPIRED" | "CANCELLED";
//   subscriptionStartAt: string;
//   subscriptionEndAt: string;
// }

// export interface Subscription {
//   fee: number;
//   status: string;
//   startAt: string;
//   endAt: string;
//   requiresPayment: boolean;
// }

// export interface PaymentOption {
//   provider: string;
//   label: string;
//   configured: boolean;
// }

// export interface SubscriptionResponse {
//   tenant: Tenant;
//   subscription: Subscription;
//   paymentOptions: PaymentOption[];
//   meta: {
//     paymentOptionCount: number;
//   };
// }

// export interface ApiError {
//   status: number | string;
//   error: string;
//   message?: string;
// }
