export interface Notification {
  id: string;
  title: string;
  name: string;
  message: string;
  tenantId: string;
  isRead?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNotificationRequest {
  name: string;
  message: string;
}

export interface UpdateNotificationRequest {
  name?: string;
  message?: string;
}

export interface NotificationResponse {
  id: string;
  name: string;
  message: string;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}
