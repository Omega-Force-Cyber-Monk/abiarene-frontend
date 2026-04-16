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
  pin: string;
  roleId: string;
  tenantId: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
  role?: Role;
}

export interface CreateEmployeeRequest {
  name: string;
  pin: string;
  roleId: string;
}

export interface UpdateEmployeeRequest {
  name?: string;
  pin?: string;
  roleId?: string;
  status?: "ACTIVE" | "INACTIVE";
}

export interface EmployeeFormData {
  name: string;
  roleId: string;
  pin: string;
}
