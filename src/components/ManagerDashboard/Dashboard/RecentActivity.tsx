import { useState } from "react";
import { IconType } from "react-icons";
import { BsBoxSeam } from "react-icons/bs";
import { LuSmartphone, LuUsers } from "react-icons/lu";

type Item = {
  id: number;
  title: string;
  description: string;
  time: string;
  icon: IconType;
};

const initialData: Item[] = [
  {
    id: 1,
    title: "New Employee Added",
    description: "Sarah (Cashier) was registered.",
    time: "4 Hours Ago",
    icon: LuUsers,
  },
  {
    id: 2,
    title: "Inventory Update",
    description: "20 units of 'Water Bottle' added.",
    time: "2 Hours Ago",
    icon: BsBoxSeam,
  },
  {
    id: 3,
    title: "Terminal Activated",
    description: "Device ID RENE-POS-8821 logged in.",
    time: "5 Hours Ago",
    icon: LuSmartphone,
  },
];

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
];

const RecentActivity = () => {
  const [data] = useState(initialData);

  return (
    <div className="bg-white rounded-2xl shadow-md w-full mx-auto">
      {/* Header */}
      <div className="p-5">
        <h2 className="text-lg font-semibold text-gray-700">Recent Activity</h2>
      </div>

      {/* LIST */}
      <div className="p-4 space-y-3">
        {data.map((item, index) => {
          const style = styles[index % styles.length];

          return (
            <div
              key={item.id}
              className="flex items-center p-4 rounded-xl hover:bg-gray-50 transition"
            >
              {/* ICON */}
              <div
                className="mr-3 p-4 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: style.bg }}
              >
                <item.icon size={22} style={{ color: style.iconColor }} />
              </div>

              {/* TEXT */}
              <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-semibold text-gray-700">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-400">{item.time}</p>
                </div>
                <p className="text-sm text-gray-400">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;
