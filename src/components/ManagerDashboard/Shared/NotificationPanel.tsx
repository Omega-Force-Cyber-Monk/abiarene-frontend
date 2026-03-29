import { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdDoneAll, MdClose } from "react-icons/md";

type Notification = {
  id: number;
  title: string;
  message: string;
  time: string;
  read?: boolean;
};

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "New Order",
    message: "You have received a new order #1024",
    time: "2 min ago",
    read: false,
  },
  {
    id: 2,
    title: "Payment Success",
    message: "Payment completed for order #1023",
    time: "10 min ago",
    read: true,
  },
  {
    id: 3,
    title: "Kitchen Update",
    message: "Order #1022 is ready to serve",
    time: "30 min ago",
    read: false,
  },
];

export default function NotificationPanel() {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#DBE0E5] bg-gray-50">
        <div className="flex items-center gap-2">
          <IoMdNotificationsOutline className="text-xl text-gray-700" />
          <h2 className="font-semibold text-gray-900 tracking-wide">
            Notifications
          </h2>
        </div>

        <button
          onClick={markAllRead}
          className="flex cursor-pointer items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 transition"
        >
          <MdDoneAll className="text-sm" />
          Mark all read
        </button>
      </div>

      {/* Body */}
      <div className="max-h-72 overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="text-center text-sm text-gray-500 py-8">
            No notifications
          </p>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`group px-5 py-4 flex gap-3 border-b  border-[#DBE0E5]  transition hover:bg-gray-50 ${
                n.read ? "bg-white" : "bg-blue-50/60"
              }`}
            >
              {/* unread dot */}
              <div className="mt-1">
                <span
                  className={`h-2.5 w-2.5 rounded-full block ${
                    n.read ? "bg-transparent" : "bg-blue-500"
                  }`}
                />
              </div>

              {/* content */}
              <div className="flex-1 cursor-pointer">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-semibold text-gray-900">
                    {n.title}
                  </h4>

                  <span className="text-[11px] text-gray-400 whitespace-nowrap">
                    {n.time}
                  </span>
                </div>

                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  {n.message}
                </p>
              </div>

              {/* hover action (optional UI feel) */}
              <button className="opacity-0 cursor-pointer group-hover:opacity-100  transition text-gray-400 hover:text-gray-600">
                <MdClose size={16} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-[#DBE0E5] bg-gray-50 text-center">
        <button className="text-xs cursor-pointer font-medium text-gray-600 hover:text-gray-900 transition">
          View all notifications
        </button>
      </div>
    </div>
  );
}
