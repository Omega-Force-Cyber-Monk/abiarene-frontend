import { TrendingUp, Loader2 } from "lucide-react";
import { FiDollarSign } from "react-icons/fi";
import { LuUserCheck } from "react-icons/lu";
import { useGetManagerOverviewQuery } from "@/redux/features/manager/managerDashboardApi";

interface StatCardProps {
  icon: React.ReactNode;
  iconBgColor: string;
  bgColor: string;
  borderColor: string;
  label: string;
  value: string;
  valueColor: string;
  change: string;
}

function StatCard({
  icon,
  iconBgColor,
  bgColor,
  borderColor,
  label,
  value,
  valueColor,
  change,
}: StatCardProps) {
  return (
    <div
      className={`
        rounded-3xl p-5 shadow-sm border-l-4
        transition-all duration-300 ease-out
        hover:shadow-md hover:-translate-y-0.5
        text-center sm:text-left
        ${bgColor}
        ${borderColor}
      `}
    >
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <div
          className={`
            w-11 h-11 rounded-lg flex items-center justify-center
            transition-transform duration-300
            ${iconBgColor}
          `}
        >
          {icon}
        </div>

        <span className="text-[#1D2028] text-sm font-medium">{label}</span>
      </div>

      <div className="text-3xl font-semibold mb-6">{value}</div>

      <div
        className={`
          flex items-center gap-1 px-3 py-1.5 w-fit
          rounded-md mx-auto sm:mx-0
          ${iconBgColor}
        `}
      >
        <span className={`text-sm font-medium ${valueColor}`}>{change}</span>
      </div>
    </div>
  );
}

export default function DashboardCard() {
  const { data, isLoading } = useGetManagerOverviewQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loader2 className="animate-spin w-8 h-8 text-[#061E49]" />
      </div>
    );
  }

  const stats = [
    {
      icon: <TrendingUp className="w-7 h-7 text-emerald-500" />,
      iconBgColor: "bg-[#D3F8DF]",
      bgColor: "bg-[#D3F8DF]",
      borderColor: "border-l-[#22C55E]",
      label: "Daily Sales",
      value: `$${data?.sales?.today?.toFixed(2) || "0.00"}`,
      valueColor: "text-emerald-600",
      change: `${(data?.sales?.changePercentage ?? 0) >= 0 ? "+" : ""}${data?.sales?.changePercentage ?? 0}%`,
    },
    {
      icon: <LuUserCheck className="w-7 h-7 text-[#429AFE]" />,
      iconBgColor: "bg-[#E0F2FE]",
      bgColor: "bg-[#E0F2FE]",
      borderColor: "border-l-[#3B82F6]",
      label: "Total Transactions",
      value: `${data?.transactions?.today || 0}`,
      valueColor: "text-[#429AFE]",
      change: `${(data?.transactions?.changePercentage ?? 0) >= 0 ? "+" : ""}${data?.transactions?.changePercentage ?? 0}%`,
    },

    {
      icon: <FiDollarSign className="w-7 h-7 text-violet-500" />,
      iconBgColor: "bg-[#EBE9FE]",
      bgColor: "bg-[#EBE9FE]",
      borderColor: "border-l-[#8B5CF6]",
      label: "Voucher", // Changed from Active Terminals
      value: `${data?.discounts?.activeCount || 0}`,
      valueColor: "text-violet-600",
      change: "Active",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}
