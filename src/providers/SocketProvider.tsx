/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/redux-hook";
import { notificationApi } from "@/redux/features/manager/notification/notificationApi";
import { Notification } from "@/redux/features/manager/notification/notification";
import { toast } from "react-hot-toast";

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType>({ socket: null });

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const socketRef = useRef<Socket | null>(null);
  const dispatch = useAppDispatch();
  const { token, user } = useAppSelector((state) => state.auth);
  
  // According to backend: Namespace is /notifications
  const SOCKET_URL = import.meta.env.VITE_API_ENDPOINT?.replace("/api", "") || "http://localhost:5000";
  const NOTIFICATION_NAMESPACE = `${SOCKET_URL}/notifications`;

  useEffect(() => {
    if (token && user) {
      // Connect to the specific namespace with auth token
      const socket = io(NOTIFICATION_NAMESPACE, {
        transports: ["websocket"],
        auth: {
          token: token, // Backend strips "Bearer " automatically
        },
      });

      socketRef.current = socket;

      socket.on("connect", () => {
        console.log("✅ Notifications socket connected:", socket.id);
      });

      // 1. Listen for new notifications
      socket.on("notification:new", (data: Notification) => {
        console.log("🔔 New notification received:", data);
        
        // Update getNotifications list
        dispatch(
          notificationApi.util.updateQueryData("getNotifications", undefined, (draft) => {
            if (draft && draft.data) {
              // Prepend to list
              draft.data.unshift(data);
              // Update meta
              if (draft.meta) {
                draft.meta.total += 1;
                draft.meta.unreadCount += 1;
              }
            }
          })
        );

        // Update unread count
        dispatch(
          notificationApi.util.updateQueryData("getUnreadCount", undefined, (draft) => {
            if (draft) {
              draft.unreadCount += 1;
            }
          })
        );

        toast.success(data.message || "New notification", {
          icon: "🔔",
          duration: 5000,
        });
      });

      // 2. Listen for single read update
      socket.on("notification:read", (payload: { id: string }) => {
        console.log("📖 Notification marked as read:", payload.id);
        
        dispatch(
          notificationApi.util.updateQueryData("getNotifications", undefined, (draft) => {
            if (draft && draft.data) {
              const item = draft.data.find(n => n.id === payload.id);
              if (item && !item.isRead) {
                item.isRead = true;
                if (draft.meta && draft.meta.unreadCount > 0) {
                  draft.meta.unreadCount -= 1;
                }
              }
            }
          })
        );

        dispatch(
          notificationApi.util.updateQueryData("getUnreadCount", undefined, (draft) => {
            if (draft && draft.unreadCount > 0) {
              draft.unreadCount -= 1;
            }
          })
        );
      });

      // 3. Listen for read-all update
      socket.on("notification:read-all", () => {
        console.log("📖 All notifications marked as read via socket");
        
        dispatch(
          notificationApi.util.updateQueryData("getNotifications", undefined, (draft) => {
            if (draft && draft.data) {
              draft.data.forEach(n => n.isRead = true);
              if (draft.meta) {
                draft.meta.unreadCount = 0;
              }
            }
          })
        );

        dispatch(
          notificationApi.util.updateQueryData("getUnreadCount", undefined, (draft) => {
            if (draft) {
              draft.unreadCount = 0;
            }
          })
        );
      });

      socket.on("connect_error", (err) => {
        console.error("❌ Notifications socket connection error:", err.message);
      });

      socket.on("disconnect", (reason) => {
        console.log("❌ Notifications socket disconnected:", reason);
      });

      return () => {
        socket.disconnect();
        socketRef.current = null;
      };
    }
  }, [token, user, dispatch, NOTIFICATION_NAMESPACE]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current }}>
      {children}
    </SocketContext.Provider>
  );
};
