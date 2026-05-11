export interface SupportMessage {
  id: string;
  ticketId: string;
  senderRole: "MANAGER" | "ADMIN" | "SUPPORT";
  senderName: string;
  senderEmail: string;
  message: string;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  tenantId: string;
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  response: string | null;
  createdAt: string;
  updatedAt: string;
  tenant: {
    id: string;
    name: string;
  };
  messages: SupportMessage[];
  issueType: string;
  description: string;
}

export interface CreateSupportTicketRequest {
  issueType: string;
  description: string;
}

export interface AddMessageRequest {
  message: string;
}

export interface UpdateSupportTicketRequest {
  status?: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  response?: string;
}

export interface SupportTicketsResponse {
  data: SupportTicket[];
  meta: {
    page: number;
    limit: number;
    total: number;
    count: number;
    totalPages: number;
  };
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
