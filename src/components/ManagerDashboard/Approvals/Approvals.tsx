const RequestCard = () => {
  return (
    <div className="bg-[#F9FAFB] p-4 sm:p-5 rounded-2xl shadow-md space-y-4">
      {/* Item Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        {/* Left */}
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">
            Whole Milk
          </h2>
          <p className="text-xs text-gray-400 uppercase tracking-wide">
            Requested by John
          </p>
        </div>

        {/* Price Section */}
        <div className="text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
          <span className="text-gray-500">Original: $3.50</span>
          <span className="text-red-500">Discount: -$0.50</span>
          <span className="text-green-600 font-semibold">Final: $3.00</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Reject */}
        <button className="w-full cursor-pointer border border-[#0B2A5B] text-[#0B2A5B] py-2 rounded-full hover:bg-[#0B2A5B] hover:text-white transition duration-300">
          Reject
        </button>

        {/* Approve */}
        <button className="w-full cursor-pointer bg-gradient-to-r from-[#0B2A5B] to-[#123B7A] text-white py-2 rounded-full hover:opacity-90 transition duration-300">
          Approve
        </button>
      </div>
    </div>
  );
};

export default function Approvals() {
  return (
    <div className=" space-y-4 sm:space-y-6 w-full mx-auto">
      <RequestCard />
      <RequestCard />
    </div>
  );
}

// const RequestCard = () => {
//   return (
//     <div className="bg-[#F9FAFB] p-4 rounded-2xl shadow-md space-y-4">
//       {/* Item Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h2 className="text-lg font-semibold text-gray-800">Whole Milk</h2>
//           <p className="text-xs text-gray-400 uppercase tracking-wide">
//             Requested by John
//           </p>
//         </div>

//         {/* Price Section */}
//         <div className="text-sm space-x-3">
//           <span className="text-gray-500">Original: $3.50</span>
//           <span className="text-red-500">Discount: -$0.50</span>
//           <span className="text-green-600 font-semibold">Final: $3.00</span>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex gap-4">
//         {/* Reject */}
//         <button className="w-full cursor-pointer border border-[#0B2A5B] text-[#0B2A5B] py-2 rounded-full hover:bg-[#0B2A5B] hover:text-white transition duration-300">
//           Reject
//         </button>

//         {/* Approve */}
//         <button className="w-full cursor-pointer bg-gradient-to-r from-[#0B2A5B] to-[#123B7A] text-white py-2 rounded-full hover:opacity-90 transition duration-300">
//           Approve
//         </button>
//       </div>
//     </div>
//   );
// };

// export default function Approvals() {
//   return (
//     <div className=" space-y-6 ">
//       <RequestCard />
//       <RequestCard />
//     </div>
//   );
// }
