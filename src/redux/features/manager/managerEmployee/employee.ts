// src/types/employee.ts

export interface Role {
  id: string;
  name: string;
  tenantId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Employee {
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

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    count: number;
    totalPages: number;
  };
}

export interface CreateEmployeeRequest {
  name: string;
  email: string;
  pin: string;
  role: "SERVER" | "KITCHEN" | "CASHIER" | "MANAGER";
}

export interface UpdateEmployeeRequest {
  name?: string;
  email?: string;
  pin?: string;
  role?: "SERVER" | "KITCHEN" | "CASHIER" | "MANAGER";
  status?: "ACTIVE" | "INACTIVE";
}

export interface EmployeeFormData {
  name: string;
  email: string;
  role: string;
  pin: string;
}
