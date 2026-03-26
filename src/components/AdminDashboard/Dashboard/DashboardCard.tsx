import { TrendingUp, Eye, TriangleAlert } from "lucide-react";
import { LuUserCheck } from "react-icons/lu";

interface StatCardProps {
  icon: React.ReactNode;
  iconBgColor: string;
  label: string;
  value: string;
  valueColor: string;
  change: string;
}

const stats = [
  {
    icon: <TrendingUp className="w-7 h-7 text-emerald-500" />,
    iconBgColor: "bg-emerald-50",
    label: "Total Users",
    value: "6",
    valueColor: "text-emerald-500",
    change: "+12",
  },
  {
    icon: <LuUserCheck className="w-7 h-7 text-[#429AFE]" />,
    iconBgColor: "bg-cyan-50",
    label: "Active Athletes",
    value: "4",
    valueColor: "text-[#429AFE]",
    change: "+5.2",
  },
  {
    icon: <Eye className="w-7 h-7 text-violet-500" />,
    iconBgColor: "bg-violet-50",
    label: "MRR",
    value: "$157",
    valueColor: "text-violet-500",
    change: "+2.4",
  },
  {
    icon: <TriangleAlert className="w-7 h-7 text-red-500" />,
    iconBgColor: "bg-red-50",
    label: "Video Uploads",
    value: "5",
    valueColor: "text-red-500",
    change: "-5.0",
  },
];

function StatCard({
  icon,
  iconBgColor,
  label,
  value,
  valueColor,
  change,
}: StatCardProps) {
  return (
    <div
      className="
    bg-white rounded-xl p-5 shadow-sm border border-gray-100
    transition-all duration-300 ease-out
    hover:shadow-md hover:-translate-y-0.5
    motion-safe:animate-fadeIn
    text-center sm:text-left
  "
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 mb-6">
        <div
          className={`
        w-11 h-11 rounded-lg flex items-center justify-center
        transition-transform duration-300
        group-hover:scale-105
        ${iconBgColor}
      `}
        >
          {icon}
        </div>

        <span className="text-[#1D2028] text-sm font-medium">{label}</span>
      </div>

      {/* Value */}
      <div
        className="
      text-3xl font-semibold mb-6
      transition-colors duration-300
    "
      >
        {value}
      </div>

      {/* Change badge */}
      <div
        className={`
      flex items-center justify-center sm:justify-start gap-1
      px-3 py-1.5 w-fit mx-auto sm:mx-0
      rounded-md
      transition-all duration-300
      hover:brightness-105
      ${iconBgColor}
    `}
      >
        <span className={`text-sm font-medium ${valueColor}`}>{change}%</span>
        <span className="text-gray-400 text-sm">vs last month</span>
      </div>
    </div>
  );
}

export default function DashboardCard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}

// import { FaArrowUp } from "react-icons/fa";

// import activestaff from "@/assets/Logo/activestaff.svg";
// import totalpatients from "@/assets/Logo/totalpatients.svg";
// import warningerror from "@/assets/Logo/warningerror.svg";
// import success from "@/assets/Logo/success.svg";

// const DashboardCard = () => {
//   const statusData = [
//     {
//       title: "Total Users",
//       amount: "23",
//       change: "30",
//       unit: "Total",
//       icon: activestaff,
//     },
//     {
//       title: "Active Sessions",
//       amount: "148",
//       change: "",
//       unit: "Sessions",
//       icon: totalpatients,
//     },
//     {
//       title: "",
//       amount: "7",
//       change: "",
//       unit: "Notes Pending Signature",
//       icon: warningerror,
//     },
//     {
//       title: "Last Audit",
//       amount: "Successful",
//       change: "2",
//       unit: "hours ago",
//       icon: success,
//     },
//   ];

//   const colors = ["#767676", "#767676", "#F3AA4B", "#4CAF50"];

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 w-full">
//       {statusData.map((single, index) => {
//         const isNegative = single.change.includes("-");
//         const changeColor = isNegative ? "#E35A5F" : "#12CC1E";

//         // Determine color for amount
//         let amountColor = "#000000";
//         if (single.amount === "Successful") amountColor = "#4CAF50";
//         if (single.amount === "7") amountColor = "#F3AA4B";

//         return (
//           <div
//             key={single.title}
//             className="w-full h-[198px] p-5 sm:p-6 bg-white rounded-[16px] flex flex-col justify-between shadow-sm space-y-4"
//           >
//             {/* Top Row */}
//             <div className="space-y-2">
//               <div className="bg-[#F9F8F6] border-[#F6F4F2] w-[48px] h-[48px] rounded-[12px] p-[12px] flex items-center justify-center">
//                 <img
//                   src={single.icon}
//                   alt={single.title}
//                   className="w-6 h-6 object-contain"
//                 />
//               </div>

//               <h1
//                 className="text-[18px] leading-[160%] font-sans font-medium"
//                 style={{ color: colors[index] }}
//               >
//                 {single.title}
//               </h1>
//             </div>

//             {/* Centered Amount */}
//             <div className="space-y-1">
//               <div className="flex items-center justify-start">
//                 <h2
//                   className="text-xl sm:text-2xl md:text-3xl font-semibold font-Robot tracking-[-0.68px]"
//                   style={{ color: amountColor }}
//                 >
//                   {single.amount}
//                 </h2>
//               </div>

//               {/* Bottom Row */}
//               <div className="flex items-center justify-start gap-1 text-sm font-Robot">
//                 {single.change && (
//                   <>
//                     <FaArrowUp
//                       style={{
//                         color: changeColor,
//                         transform: isNegative ? "rotate(180deg)" : "none",
//                       }}
//                     />
//                     <span style={{ color: changeColor }}>{single.change}</span>
//                   </>
//                 )}
//                 <span className="text-[#767676] ml-1">{single.unit}</span>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default DashboardCard;
