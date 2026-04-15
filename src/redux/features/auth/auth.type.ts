// src/redux/features/auth/auth.type.ts
export type Role =
  | "ADMIN"
  | "MANAGER"
  | "SERVER"
  | "KITCHEN"
  | "CASHIER"
  | string;

export type User = {
  id: string;
  email: string;
  name: string;
  role: Role;
  status?: string;
  createdAt?: string;
};

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  status: string;
  createdAt: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: any;
  accessToken: string;
  admin: AdminUser;
};

export type SignupRequest = {
  email: string;
  password: string;
  name: string;
};

export type SignupResponse = {
  accessToken: string;
  admin: AdminUser;
};

export type AuthError = {
  data?: {
    message?: string;
    error?: string;
  };
  error?: string;
  status?: number;
};

// export type Role =
//   | "ADMIN"
//   | "USER"
//   | "DOCTOR"
//   | "NURSE"
//   | "LAB_TECHNICIAN"
//   | "RECEPTIONIST"
//   | "MODERATOR"
//   | "PATIENT"
//   | string;

// export type User = {
//   id: string;
//   email?: string;
//   name?: string;
//   role?: Role;
//   phone?: string;
// };

// export type LoginRequest = {
//   email: string;
//   password: string;
// };

// // Backend response includes firstName & lastName
// export type LoginResponse = {
//   accessToken: string;
//   user: {
//     id: string;
//     email: string;
//     firstName: string;
//     lastName: string;
//     role: Role;
//   };
// };

// export type RegisterRequest = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone?: string;
//   password: string;
//   confirmPassword: string;
// };

// export type RegisterResponse = {
//   id: string;
//   staffID?: string | null;
//   specialty?: string | null;
//   licenseNumber?: string | null;
//   userId?: string | null;
//   createdAt?: string;
//   updatedAt?: string;
// };
