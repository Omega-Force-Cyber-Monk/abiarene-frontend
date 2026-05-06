// adminTenant.types.ts
export interface ApiResponse<T> {
  data: T;
  total?: number;
  page?: number;
  limit?: number;
}

export interface CreateTenantUserFormData {
  name: string;
  pin: string;
  roleId: string;
  status: "ACTIVE" | "INACTIVE";
}

// Tenant types
export interface Role {
  id: string;
  name: string;
  tenantId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Manager {
  id: string;
  name: string;
  email: string;
  pin: string;
  roleId: string;
  tenantId: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
  role: Role;
}

export interface Tenant {
  id: string;
  name: string;
  industry: string;
  subscriptionFee: number;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  lastSync: string;
  createdAt: string;
  updatedAt: string;
  roles?: Role[];
  manager?: Manager;
}

export interface CreateTenantRequest {
  name: string;
  industry: string;
  subscriptionFee: number;
  managerEmail: string;
  managerPin: string;
  server: boolean;
  kitchen: boolean;
  cashier: boolean;
}

export interface UpdateTenantRequest {
  name?: string;
  industry?: string;
  subscriptionFee?: number;
  status?: "ACTIVE" | "INACTIVE" | "SUSPENDED";
}

export interface GetTenantsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

// Role types
export interface CreateRoleRequest {
  name: string;
  isActive: boolean;
}

// User types
export interface TenantUser {
  id: string;
  name: string;
  email?: string;
  pin: string;
  roleId: string;
  tenantId: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
  role?: Role;
}

export interface CreateTenantUserRequest {
  name: string;
  pin: string;
  roleId: string;
  status: "ACTIVE" | "INACTIVE";
}

export interface UpdateTenantUserRequest {
  name?: string;
  pin?: string;
  roleId?: string;
  status?: "ACTIVE" | "INACTIVE";
}

// Industry options
export type IndustryType =
  | "restaurant"
  | "supermarket"
  | "retail"
  | "merchant"
  | "ear";

export const INDUSTRY_OPTIONS = [
  { label: "Restaurant", value: "restaurant" },
  { label: "Supermarket", value: "supermarket" },
  { label: "Retail", value: "retail" },
  { label: "Merchant", value: "merchant" },
  { label: "Ear", value: "ear" },
];



// // Base response type
// export interface ApiResponse<T> {
//   data: T;
//   total?: number;
//   page?: number;
//   limit?: number;
// }

// /* create tenant user */
// export interface CreateTenantUserFormData {
//   name: string;
//   pin: string;
//   roleId: string;
//   status: "ACTIVE" | "INACTIVE";
// }

// // Tenant types
// export interface Tenant {
//   id: string;
//   name: string;
//   industry: string;
//   subscriptionFee: number;
//   status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
//   lastSync: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface CreateTenantRequest {
//   name: string;
//   industry: string;
//   subscriptionFee: number;
// }

// export interface UpdateTenantRequest {
//   name?: string;
//   industry?: string;
//   subscriptionFee?: number;
//   status?: "ACTIVE" | "INACTIVE" | "SUSPENDED";
// }

// export interface GetTenantsParams {
//   page?: number;
//   limit?: number;
//   search?: string;
//   status?: string;
// }

// // Role types
// export interface Role {
//   description: import("react/jsx-runtime").JSX.Element;
//   id: string;
//   name: string;
//   tenantId: string;
//   isActive: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface CreateRoleRequest {
//   name: string;
//   isActive: boolean;
// }

// // User types
// export interface TenantUser {
//   id: string;
//   name: string;
//   pin: string;
//   roleId: string;
//   tenantId: string;
//   status: "ACTIVE" | "INACTIVE";
//   createdAt: string;
//   updatedAt: string;
//   role?: Role;
// }

// export interface CreateTenantUserRequest {
//   name: string;
//   pin: string;
//   roleId: string;
//   status: "ACTIVE" | "INACTIVE";
// }

// export interface UpdateTenantUserRequest {
//   name?: string;
//   pin?: string;
//   roleId?: string;
//   status?: "ACTIVE" | "INACTIVE";
// }

// // Industry options
// export type IndustryType =
//   | "restaurant"
//   | "supermarket"
//   | "retail"
//   | "merchant"
//   | "ear";

// export const INDUSTRY_OPTIONS = [
//   { label: "Restaurant", value: "restaurant" },
//   { label: "Supermarket", value: "supermarket" },
//   { label: "Retail", value: "retail" },
//   { label: "Merchant", value: "merchant" },
//   { label: "Ear", value: "ear" },
// ];
