import { useState, useEffect } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdDoneAll, MdClose } from "react-icons/md";
import {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
  useDeleteNotificationMutation,
} from "@/redux/features/manager/notification/notificationApi";
import { formatDistanceToNow } from "date-fns";
// import { useAppSelector } from "@/redux/hooks/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function NotificationPanel() {
  const {
    data: notifications,
    isLoading,
    refetch,
  } = useGetNotificationsQuery();
  const [markAsRead] = useMarkAsReadMutation();
  const [markAllAsRead] = useMarkAllAsReadMutation();
  const [deleteNotification] = useDeleteNotificationMutation();

  const [localReadStatus, setLocalReadStatus] = useState<Set<string>>(
    new Set(),
  );

  // Auto-refetch every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 30000);

    return () => clearInterval(interval);
  }, [refetch]);

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id).unwrap();
      setLocalReadStatus((prev) => new Set(prev).add(id));
      toast.success("Notification marked as read");
    } catch (error) {
      console.error("Failed to mark as read:", error);
      toast.error("Failed to mark notification as read");
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllAsRead().unwrap();
      if (notifications?.data) {
        setLocalReadStatus(new Set(notifications.data.map((n) => n.id)));
      }

      toast.success("All notifications marked as read");
    } catch (error) {
      console.error("Failed to mark all as read:", error);
      toast.error("Failed to mark all notifications as read");
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await deleteNotification(id).unwrap();
      toast.success("Notification deleted");
      refetch();
    } catch (error) {
      console.error("Failed to delete notification:", error);
      toast.error("Failed to delete notification");
    }
  };

  const formatTime = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return "Unknown time";
    }
  };

  const isRead = (notificationId: string) => {
    if (localReadStatus.has(notificationId)) return true;
    const notification = notifications?.data?.find((n) => n.id === notificationId);
    return notification?.isRead || false;
  };


  if (isLoading) {
    return (
      <div className="w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#DBE0E5] bg-gray-50">
          <div className="flex items-center gap-2">
            <IoMdNotificationsOutline className="text-xl text-gray-700" />
            <h2 className="font-semibold text-gray-900">Notifications</h2>
          </div>
        </div>
        <div className="max-h-72 overflow-y-auto">
          {[1, 2, 3].map((i) => (
            <div key={i} className="px-5 py-4 border-b border-[#DBE0E5]">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-3 w-full mb-1" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const unreadCount = notifications?.meta?.unreadCount ?? notifications?.data?.filter((n) => !isRead(n.id)).length ?? 0;

  return (
    <div className="w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#DBE0E5] bg-gray-50">
        <div className="flex items-center gap-2">
          <IoMdNotificationsOutline className="text-xl text-gray-700" />
          <h2 className="font-semibold text-gray-900 tracking-wide">
            Notifications
          </h2>
          {unreadCount > 0 && (
            <span className="ml-1 bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">
              {unreadCount}
            </span>
          )}
        </div>

        <button
          onClick={handleMarkAllRead}
          disabled={unreadCount === 0}
          className={`flex cursor-pointer items-center gap-1 text-xs font-medium transition ${
            unreadCount > 0
              ? "text-blue-600 hover:text-blue-700"
              : "text-gray-400 cursor-not-allowed"
          }`}
        >
          <MdDoneAll className="text-sm" />
          Mark all read
        </button>
      </div>

      {/* Body */}
      <div className="max-h-72 overflow-y-auto">
        {!notifications?.data || notifications.data.length === 0 ? (
          <div className="text-center py-8">
            <IoMdNotificationsOutline className="text-4xl text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No notifications</p>
            <p className="text-xs text-gray-400 mt-1">You're all caught up!</p>
          </div>
        ) : (
          notifications.data.map((notification) => {
            const read = isRead(notification.id);
            return (
              <div
                key={notification.id}
                onClick={() => !read && handleMarkAsRead(notification.id)}
                className={`group px-5 py-4 flex gap-3 border-b border-[#DBE0E5] transition cursor-pointer ${
                  !read
                    ? "bg-blue-50/60 hover:bg-blue-50"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                {/* unread dot */}
                <div className="mt-1">
                  <span
                    className={`h-2.5 w-2.5 rounded-full block ${
                      !read ? "bg-blue-500" : "bg-transparent"
                    }`}
                  />
                </div>

                {/* content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4
                      className={`text-sm font-semibold ${!read ? "text-gray-900" : "text-gray-700"}`}
                    >
                      {notification.title}
                    </h4>

                    <span className="text-[11px] text-gray-400 whitespace-nowrap ml-2">
                      {formatTime(notification.createdAt)}
                    </span>
                  </div>

                  <p
                    className={`text-xs mt-1 leading-relaxed ${!read ? "text-gray-700" : "text-gray-500"}`}
                  >
                    {notification.message}
                  </p>
                </div>


                {/* Delete button */}
                <button
                  onClick={(e) => handleDelete(notification.id, e)}
                  className="opacity-0 cursor-pointer group-hover:opacity-100 transition text-gray-400 hover:text-red-500"
                  aria-label="Delete notification"
                >
                  <MdClose size={16} />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      {notifications && notifications.length > 0 && (
        <div className="px-5 py-3 border-t border-[#DBE0E5] bg-gray-50 text-center">
          <button
            onClick={() => refetch()}
            className="text-xs cursor-pointer font-medium text-gray-600 hover:text-gray-900 transition"
          >
            Refresh notifications
          </button>
        </div>
      )}
    </div>
  );
}

// import { useState } from "react";
// import { IoMdNotificationsOutline } from "react-icons/io";
// import { MdDoneAll, MdClose } from "react-icons/md";

// type Notification = {
//   id: number;
//   title: string;
//   message: string;
//   time: string;
//   read?: boolean;
// };

// const initialNotifications: Notification[] = [
//   {
//     id: 1,
//     title: "New Order",
//     message: "You have received a new order #1024",
//     time: "2 min ago",
//     read: false,
//   },
//   {
//     id: 2,
//     title: "Payment Success",
//     message: "Payment completed for order #1023",
//     time: "10 min ago",
//     read: true,
//   },
//   {
//     id: 3,
//     title: "Kitchen Update",
//     message: "Order #1022 is ready to serve",
//     time: "30 min ago",
//     read: false,
//   },
// ];

// export default function NotificationPanel() {
//   const [notifications, setNotifications] =
//     useState<Notification[]>(initialNotifications);

//   const markAllRead = () => {
//     setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
//   };

//   return (
//     <div className="w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
//       {/* Header */}
//       <div className="flex items-center justify-between px-5 py-4 border-b border-[#DBE0E5] bg-gray-50">
//         <div className="flex items-center gap-2">
//           <IoMdNotificationsOutline className="text-xl text-gray-700" />
//           <h2 className="font-semibold text-gray-900 tracking-wide">
//             Notifications
//           </h2>
//         </div>

//         <button
//           onClick={markAllRead}
//           className="flex cursor-pointer items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 transition"
//         >
//           <MdDoneAll className="text-sm" />
//           Mark all read
//         </button>
//       </div>

//       {/* Body */}
//       <div className="max-h-72 overflow-y-auto">
//         {notifications.length === 0 ? (
//           <p className="text-center text-sm text-gray-500 py-8">
//             No notifications
//           </p>
//         ) : (
//           notifications.map((n) => (
//             <div
//               key={n.id}
//               className={`group px-5 py-4 flex gap-3 border-b  border-[#DBE0E5]  transition hover:bg-gray-50 ${
//                 n.read ? "bg-white" : "bg-blue-50/60"
//               }`}
//             >
//               {/* unread dot */}
//               <div className="mt-1">
//                 <span
//                   className={`h-2.5 w-2.5 rounded-full block ${
//                     n.read ? "bg-transparent" : "bg-blue-500"
//                   }`}
//                 />
//               </div>

//               {/* content */}
//               <div className="flex-1 cursor-pointer">
//                 <div className="flex justify-between items-start">
//                   <h4 className="text-sm font-semibold text-gray-900">
//                     {n.title}
//                   </h4>

//                   <span className="text-[11px] text-gray-400 whitespace-nowrap">
//                     {n.time}
//                   </span>
//                 </div>

//                 <p className="text-xs text-gray-600 mt-1 leading-relaxed">
//                   {n.message}
//                 </p>
//               </div>

//               {/* hover action (optional UI feel) */}
//               <button className="opacity-0 cursor-pointer group-hover:opacity-100  transition text-gray-400 hover:text-gray-600">
//                 <MdClose size={16} />
//               </button>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Footer */}
//       <div className="px-5 py-3 border-t border-[#DBE0E5] bg-gray-50 text-center">
//         <button className="text-xs cursor-pointer font-medium text-gray-600 hover:text-gray-900 transition">
//           View all notifications
//         </button>
//       </div>
//     </div>
//   );
// }
