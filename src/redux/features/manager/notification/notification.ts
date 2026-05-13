export interface Notification {
  id: string;
  tenantId: string;
  type: string;
  title: string;
  message: string;
  payload: any;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationListResponse {
  data: Notification[];
  meta: {
    page: number;
    limit: number;
    total: number;
    count: number;
    totalPages: number;
    unreadCount: number;
  };
}

export interface CreateNotificationRequest {
  title: string;
  message: string;
  type: string;
}

export interface UpdateNotificationRequest {
  isRead?: boolean;
}
