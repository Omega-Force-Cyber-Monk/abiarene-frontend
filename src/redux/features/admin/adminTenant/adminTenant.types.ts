export interface ApiResponse<T> {
  data: T;
  total?: number;
  page?: number;
  limit?: number;
}

// Add this new interface for the tenants list response
export interface TenantsListResponse {
  data: Tenant[];
  meta: {
    page: number;
    limit: number;
    total: number;
    count: number;
    totalPages: number;
  };
}

export interface Role {
  id: string;
  name: string;
  tenantId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
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

export interface UpdateRolesPayload {
  server: boolean;
  kitchen: boolean;
  cashier: boolean;
}

export interface DeleteUserResponse {
  count: number;
}

export interface GetTenantsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface GetRolesQueryParams {
  page?: number;
  limit?: number;
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

// User types based on actual API response
export interface TenantUser {
  id: string;
  name: string;
  email: string;
  pin: string;
  roleId: string;
  tenantId: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
  role?: Role;
}

// Create User Request - matches Swagger POST /api/users/tenant/{tenantId}
export interface CreateTenantUserRequest {
  name: string;
  email: string;
  pin: string;
  role: string; // role name as string, not roleId
}

// Update User Request - matches Swagger PATCH /api/users/tenant/{tenantId}/{id}
export interface UpdateTenantUserRequest {
  name?: string;
  email?: string;
  pin?: string;
  role?: string;
  status?: "ACTIVE" | "INACTIVE";
}

// Get Tenant Users Response (GET /api/users/tenant/{tenantId})
export interface TenantUsersResponse {
  data: TenantUser[];
  total: number;
  page: number;
  limit: number;
}

export interface DashboardResponse {
  tenants: {
    total: number;
    previousMonthTotal: number;
    changePercentage: number;
  };

  support: {
    activeTickets: number;
    closedIssues: number;
    previousMonthClosedIssues: number;
    closedIssuesChangePercentage: number;
  };

  revenue: {
    monthly: number;
    previousMonth: number;
    changePercentage: number;
  };

  meta: {
    comparedMonthStart: string;
    currentMonthStart: string;
    comparedAt: string;
  };
}

