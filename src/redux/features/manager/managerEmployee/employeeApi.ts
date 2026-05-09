// src/redux/features/employee/employeeApi.ts

import { baseApi } from "@/redux/hooks/baseApi";
import {
  Employee,
  CreateEmployeeRequest,
  UpdateEmployeeRequest,
  Role,
} from "./employee";
// import { Employee, CreateEmployeeRequest, UpdateEmployeeRequest, Role } from "@/";

export const employeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all employees
    getEmployees: builder.query<Employee[], void>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // Get single employee by ID
    getEmployeeById: builder.query<Employee, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "User", id }],
    }),

    // Create new employee
    createEmployee: builder.mutation<Employee, CreateEmployeeRequest>({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // Update employee
    updateEmployee: builder.mutation<
      Employee,
      { id: string; data: UpdateEmployeeRequest }
    >({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "User", id },
        "User",
      ],
    }),

    // Delete employee
    deleteEmployee: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    // Get all roles
    getRoles: builder.query<Role[], void>({
      query: () => ({
        url: "/roles",
        method: "GET",
      }),
      providesTags: ["Role"],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeByIdQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
  useGetRolesQuery,
} = employeeApi;
