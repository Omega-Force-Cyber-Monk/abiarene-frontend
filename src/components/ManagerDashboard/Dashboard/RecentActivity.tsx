import { useGetNotificationsQuery } from "@/redux/features/manager/notification/notificationApi";
import { formatDistanceToNow } from "date-fns";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Skeleton } from "@/components/ui/skeleton";

// ICON + BG COLOR SETS
const styles = [
  {
    iconColor: "#EE46BC",
    bg: "#FCE7F6",
  },
  {
    iconColor: "#4E5BA6",
    bg: "#EAECF5",
  },
  {
    iconColor: "#F04438",
    bg: "#FEE4E2",
  },
  {
    iconColor: "#3A5CFF",
    bg: "#E0E7FF",
  },
];

const RecentActivity = () => {
  const { data: notifications, isLoading } = useGetNotificationsQuery();

  const formatTime = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return "Unknown time";
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-md w-full mx-auto">
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-700">Recent Activity</h2>
        </div>
        <div className="p-4 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-2xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Take the last 4 notifications
  const recentItems = notifications?.data?.slice(0, 4) || [];

  return (
    <div className="bg-white rounded-2xl shadow-md w-full mx-auto">
      {/* Header */}
      <div className="p-5 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-700">Recent Activity</h2>
      </div>

      {/* LIST */}
      <div className="p-4 space-y-3">
        {recentItems.length === 0 ? (
          <div className="text-center py-8 text-gray-400 italic">
            No recent activity found.
          </div>
        ) : (
          recentItems.map((item, index) => {
            const style = styles[index % styles.length];

            return (
              <div
                key={item.id}
                className="flex items-center p-3 rounded-xl hover:bg-gray-50 transition border border-transparent hover:border-gray-100"
              >
                {/* ICON */}
                <div
                  className="mr-3 p-3 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: style.bg }}
                >
                  <IoMdNotificationsOutline size={22} style={{ color: style.iconColor }} />
                </div>

                {/* TEXT */}
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-gray-700 truncate">
                      {item.title}
                    </p>
                    <span className="text-[10px] text-gray-400 whitespace-nowrap">
                      {formatTime(item.createdAt)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate leading-relaxed mt-0.5">
                    {item.message}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
