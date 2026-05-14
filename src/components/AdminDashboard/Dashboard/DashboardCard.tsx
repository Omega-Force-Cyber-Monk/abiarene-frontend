import { TrendingUp, Eye, TriangleAlert, TicketCheck } from "lucide-react";
import { LuUserCheck } from "react-icons/lu";
import { useGetAdminDashboardQuery } from "@/redux/features/admin/adminTenant/adminTenantApi";

function StatCard({
  icon,
  iconBgColor,
  bgColor,
  borderColor,
  label,
  value,
  valueColor,
  change,
}: any) {
  return (
    <div
      className={`rounded-3xl p-5 shadow-sm border-l-4 ${bgColor} ${borderColor}`}
    >
      <div className="flex items-center gap-4 mb-6">
        <div
          className={`w-11 h-11 flex items-center justify-center rounded-lg ${iconBgColor}`}
        >
          {icon}
        </div>
        <span className="text-sm font-medium">{label}</span>
      </div>

      <div className="text-3xl font-semibold mb-6">{value}</div>

      <div className={`px-3 py-1.5 w-fit rounded-md ${iconBgColor}`}>
        <span className={`text-sm font-medium ${valueColor}`}>{change}</span>
      </div>
    </div>
  );
}

export default function DashboardCard() {
  const { data, isLoading } = useGetAdminDashboardQuery();

  if (isLoading) {
    return <div className="p-6 text-gray-500">Loading dashboard...</div>;
  }

  if (!data) {
    return <div className="p-6 text-red-500">Failed to load dashboard</div>;
  }

  const stats = [
    {
      icon: <TrendingUp className="w-7 h-7 text-emerald-500" />,
      iconBgColor: "bg-[#D3F8DF]",
      bgColor: "bg-[#D3F8DF]",
      borderColor: "border-l-[#22C55E]",
      label: "Total Tenants",
      value: data.tenants.total,
      valueColor: "text-emerald-600",
      change: `${data.tenants.changePercentage}%`,
    },
    {
      icon: <LuUserCheck className="w-7 h-7 text-blue-500" />,
      iconBgColor: "bg-[#E0F2FE]",
      bgColor: "bg-[#E0F2FE]",
      borderColor: "border-l-[#3B82F6]",
      label: "Active Tickets",
      value: data.support.activeTickets,
      valueColor: "text-blue-600",
      change: `${data.support.closedIssues} closed`,
    },
    {
      icon: <Eye className="w-7 h-7 text-violet-500" />,
      iconBgColor: "bg-[#EBE9FE]",
      bgColor: "bg-[#EBE9FE]",
      borderColor: "border-l-[#8B5CF6]",
      label: "Monthly Revenue",
      value: `$${data.revenue.monthly}`,
      valueColor: "text-violet-600",
      change: `${data.revenue.changePercentage}%`,
    },
    {
      icon: <TriangleAlert className="w-7 h-7 text-red-500" />,
      iconBgColor: "bg-[#FEE4E2]",
      bgColor: "bg-[#FEE4E2]",
      borderColor: "border-l-[#EF4444]",
      label: "System Insight",
      value: data.support.closedIssues,
      valueColor: "text-red-600",
      change: `${data.revenue.previousMonth} prev`,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}

// import { TrendingUp, Eye, TriangleAlert } from "lucide-react";
// import { LuUserCheck } from "react-icons/lu";

// interface StatCardProps {
//   icon: React.ReactNode;
//   iconBgColor: string;
//   bgColor: string;
//   borderColor: string;
//   label: string;
//   value: string;
//   valueColor: string;
//   change: string;
// }

// const stats = [
//   {
//     icon: <TrendingUp className="w-7 h-7 text-emerald-500" />,
//     iconBgColor: "bg-[#D3F8DF]",
//     bgColor: "bg-[#D3F8DF]",
//     borderColor: "border-l-[#22C55E]",
//     label: "Total Tenants",
//     value: "6",
//     valueColor: "text-emerald-600",
//     change: "+12",
//   },
//   {
//     icon: <LuUserCheck className="w-7 h-7 text-[#429AFE]" />,
//     iconBgColor: "bg-[#E0F2FE]",
//     bgColor: "bg-[#E0F2FE]",
//     borderColor: "border-l-[#3B82F6]",
//     label: "Active Tickets",
//     value: "4",
//     valueColor: "text-[#429AFE]",
//     change: "Stable",
//   },
//   {
//     icon: <Eye className="w-7 h-7 text-violet-500" />,
//     iconBgColor: "bg-[#EBE9FE]",
//     bgColor: "bg-[#EBE9FE]",
//     borderColor: "border-l-[#8B5CF6]",
//     label: "Monthly Revenue",
//     value: "$50",
//     valueColor: "text-violet-600",
//     change: "Stable",
//   },
//   {
//     icon: <TriangleAlert className="w-7 h-7 text-red-500" />,
//     iconBgColor: "bg-[#FEE4E2]",
//     bgColor: "bg-[#FEE4E2]",
//     borderColor: "border-l-[#EF4444]",
//     label: "Sync Issues",
//     value: "5",
//     valueColor: "text-red-600",
//     change: "Stable",
//   },
// ];

// function StatCard({
//   icon,
//   iconBgColor,
//   bgColor,
//   borderColor,
//   label,
//   value,
//   valueColor,
//   change,
// }: StatCardProps) {
//   return (
//     <div
//       className={`
//         rounded-3xl p-5 shadow-sm border-l-4
//         transition-all duration-300 ease-out
//         hover:shadow-md hover:-translate-y-0.5
//         text-center sm:text-left
//         ${bgColor}
//         ${borderColor}
//       `}
//     >
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
//         <div
//           className={`
//             w-11 h-11 rounded-lg flex items-center justify-center
//             transition-transform duration-300
//             ${iconBgColor}
//           `}
//         >
//           {icon}
//         </div>

//         <span className="text-[#1D2028] text-sm font-medium">{label}</span>
//       </div>

//       {/* Value */}
//       <div className="text-3xl font-semibold mb-6">{value}</div>

//       {/* Change badge */}
//       <div
//         className={`
//           flex items-center gap-1 px-3 py-1.5 w-fit
//           rounded-md mx-auto sm:mx-0
//           ${iconBgColor}
//         `}
//       >
//         <span className={`text-sm font-medium ${valueColor}`}>{change}</span>
//       </div>
//     </div>
//   );
// }

// export default function DashboardCard() {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//       {stats.map((stat) => (
//         <StatCard key={stat.label} {...stat} />
//       ))}
//     </div>
//   );
// }
