import totalConversation from "@/assets/webvixxen/icon/totalConversation.svg";
import Crefund from "@/assets/webvixxen/icon/Crefund.svg";
import ResolvedIcon from "@/assets/webvixxen/icon/resolved.svg";
import activeNow from "@/assets/webvixxen/icon/activeNow.svg";

interface StatCardProps {
  Icon: string;
  iconBgColor: string;
  label: string;
  value: string;
}

const stats: StatCardProps[] = [
  {
    Icon: totalConversation,
    iconBgColor: "bg-emerald-50",
    label: "Total Conversations",
    value: "6",
  },

  {
    Icon: ResolvedIcon,
    iconBgColor: "bg-violet-50",
    label: "Completed",
    value: "57",
  },
  {
    Icon: activeNow,
    iconBgColor: "bg-violet-50",
    label: "Active Now",
    value: "57",
  },
  {
    Icon: Crefund,
    iconBgColor: "bg-cyan-50",
    label: "Refunded",
    value: "4",
  },
];

function StatCard({ Icon, iconBgColor, label, value }: StatCardProps) {
  return (
    <div className="group bg-white rounded-xl p-5 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div
          className={`w-11 h-11 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${iconBgColor}`}
        >
          <img src={Icon} alt={label} />
        </div>

        <span className="text-[#1D2028] text-sm font-medium">{label}</span>
      </div>

      {/* Value */}
      <div className="text-3xl font-semibold text-gray-900">{value}</div>
    </div>
  );
}

export default function ConversationsCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}
