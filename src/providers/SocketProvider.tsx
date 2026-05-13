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
  
  // Minimal setup: Use the base API URL without the /api prefix
  const SOCKET_URL = import.meta.env.VITE_API_ENDPOINT?.replace("/api", "") || "http://localhost:5000";

  useEffect(() => {
    if (token && user) {
      const socket = io(SOCKET_URL, {
        auth: { token },
        transports: ["websocket"],
      });

      socketRef.current = socket;

      socket.on("connect", () => {
        console.log("✅ Connected to socket server");
        if (user.tenantId) {
          socket.emit("join", `tenant_${user.tenantId}`);
        }
      });

      socket.on("notification", (data: any) => {
        console.log("🔔 New notification received:", data);
        
        // Push notification directly into RTK Query cache
        dispatch(
          notificationApi.util.updateQueryData("getNotifications", undefined, (draft) => {
            const newNotif: Notification = {
              id: data.id || Date.now().toString(),
              type: data.type || "INFO",
              title: data.title || "New Notification",
              message: data.message || "",
              payload: data.payload || {},
              tenantId: data.tenantId || user.tenantId || "",
              isRead: false,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            
            // Add to the beginning of the data array
            if (draft.data) {
              draft.data.unshift(newNotif);
              // Update meta count if needed
              draft.meta.total += 1;
              draft.meta.unreadCount += 1;
            }
          })
        );


        toast.success(data.message || "New notification", {
          icon: "🔔",
          duration: 5000,
        });
      });

      socket.on("disconnect", () => {
        console.log("❌ Disconnected from socket server");
      });

      return () => {
        socket.disconnect();
        socketRef.current = null;
      };
    }
  }, [token, user, dispatch, SOCKET_URL]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current }}>
      {children}
    </SocketContext.Provider>
  );
};

