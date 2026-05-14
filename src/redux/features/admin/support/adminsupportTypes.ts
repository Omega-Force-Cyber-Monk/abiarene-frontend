// adminsupportTypes.ts
export interface Message {
  id: string;
  ticketId: string;
  senderRole: "MANAGER" | "ADMIN" | "USER";
  senderName: string;
  senderEmail: string;
  message: string;
  createdAt: string;
}

export interface Tenant {
  id: string;
  name: string;
}

export interface SupportTicket {
  id: string;
  tenantId: string;
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  response: string | null;
  createdAt: string;
  updatedAt: string;
  tenant?: Tenant; // Made optional since it might not always be present
  messages: Message[];
  issueType: string;
  description: string;
}

export interface CreateSupportTicketRequest {
  subject: string;
  message: string;
  issueType?: string;
}

export interface UpdateSupportTicketRequest {
  subject?: string;
  message?: string;
  response?: string;
  status?: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
}

export type SupportStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";

export const statusColors: Record<SupportStatus, string> = {
  OPEN: "text-green-600 bg-green-50",
  IN_PROGRESS: "text-yellow-600 bg-yellow-50",
  RESOLVED: "text-blue-600 bg-blue-50",
  CLOSED: "text-gray-500 bg-gray-100",
};

export const statusLabels: Record<SupportStatus, string> = {
  OPEN: "Open",
  IN_PROGRESS: "In Progress",
  RESOLVED: "Resolved",
  CLOSED: "Closed",
};

// export interface SupportTicket {
//   id: string;
//   tenantId: string;
//   subject: string;
//   message: string;
//   status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
//   response: string | null;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface CreateSupportTicketRequest {
//   subject: string;
//   message: string;
// }

// export interface UpdateSupportTicketRequest {
//   subject?: string;
//   message?: string;
//   response?: string;
//   status?: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
// }

// export type SupportStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";

// export const statusColors: Record<SupportStatus, string> = {
//   OPEN: "text-green-600 bg-green-50",
//   IN_PROGRESS: "text-yellow-600 bg-yellow-50",
//   RESOLVED: "text-blue-600 bg-blue-50",
//   CLOSED: "text-gray-500 bg-gray-100",
// };

// export const statusLabels: Record<SupportStatus, string> = {
//   OPEN: "Open",
//   IN_PROGRESS: "In Progress",
//   RESOLVED: "Resolved",
//   CLOSED: "Closed",
// };
