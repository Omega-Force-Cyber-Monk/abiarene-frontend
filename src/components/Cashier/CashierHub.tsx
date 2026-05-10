import { useState } from "react";
import { IoCardOutline } from "react-icons/io5";
import { PiCreditCardThin } from "react-icons/pi";

import success from "@/assets/primepos/logo/success.svg";
import { useGetTablesQuery, useGetTableCashierSummaryQuery, useCompleteCashierCheckoutMutation } from "@/redux/features/restaurant/table/tableApi";
import { Table, CashierItem, PaymentMethod } from "@/redux/features/restaurant/table/table.type";

export default function CashierHub() {
  const [activeTab, setActiveTab] = useState("Table");
  const [selectedCard, setSelectedCard] = useState<Table | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Fetch real tables
  const { data: tablesData } = useGetTablesQuery({ page: 1, limit: 100 });
  const tables = tablesData?.data || [];

  const [completeCheckout] = useCompleteCashierCheckoutMutation();

  const closeModal = () => {
    setSelectedCard(null);
    setPaymentMethod(null);
  };

  const handlePayment = async () => {
    if (!paymentMethod || !selectedCard) return;

    try {
      await completeCheckout({
        id: selectedCard.id,
        method: paymentMethod,
      }).unwrap();

      closeModal();
      setPaymentSuccess(true);
    } catch {
      // keep modal open on error
    }
  };

  const closeSuccessModal = () => {
    setPaymentSuccess(false);
  };

  const handlePrint = () => {
    window.print(); // simple print trigger
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Cashier Hub</h1>
          <p className="text-gray-500">Main POS Station</p>
        </div>

        <div className="flex bg-gray-200 rounded-full p-1">
          {["Table", "Bar/Drinks"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full cursor-pointer text-sm font-medium ${activeTab === tab ? "bg-[#061E49] text-white" : "text-gray-600"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tables.map((table) => (
          <div
            key={table.id}
            onClick={() => table.served && setSelectedCard(table)}
            className={`cursor-pointer bg-[#E9EAEB] rounded-2xl shadow p-4 hover:shadow-lg transition border-2 ${selectedCard?.id === table.id
                ? "border-blue-600"
                : "border-transparent"
              } ${!table.served ? "opacity-60 cursor-default" : ""}`}
          >
            <div className="flex items-center">
              <h2 className="w-12 h-12 flex items-center justify-center text-lg font-semibold bg-gray-300 rounded-full">
                {table.tableNumber}
              </h2>
              <h3 className="ml-2 text-lg font-semibold">Table</h3>
            </div>

            <p className="mt-2 text-xl font-bold text-[#061E49] text-center">
              {table.served ? "Served" : "Empty"}
            </p>

            <div className="flex justify-center mt-2">
              <span className="px-3 py-1 text-xs font-medium text-blue-700 bg-white rounded-full border border-blue-200">
                {table.seatCount} Seat
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* CHECKOUT MODAL */}
      {selectedCard && (
        <CheckoutModal
          table={selectedCard}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          onClose={closeModal}
          onPay={handlePayment}
        />
      )}

      {/* SUCCESS MODAL */}
      {paymentSuccess && (
        <div
          onClick={closeSuccessModal}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <div className="bg-white w-[380px] rounded-2xl shadow-xl p-6 text-center animate-scaleIn">
            {/* Success Image */}
            <div className="flex justify-center mb-4">
              <img
                src={success}
                alt="success"
                className="w-42 h-42 object-contain"
              />
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-[#17B26A] mb-2">
              Payment Successful 🎉
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-6">
              Transaction recorded and inventory updated.
            </p>

            {/* Button */}
            <button
              onClick={handlePrint}
              className="w-full py-3 cursor-pointer rounded-full bg-[#042452] text-white font-semibold hover:bg-[#031c3f] transition duration-200"
            >
              Print Thermal Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Inline sub-component to fetch summary and render modal
function CheckoutModal({
  table,
  paymentMethod,
  setPaymentMethod,
  onClose,
  onPay,
}: {
  table: Table;
  paymentMethod: PaymentMethod | null;
  setPaymentMethod: (m: PaymentMethod) => void;
  onClose: () => void;
  onPay: () => void;
}) {
  const { data: summary, isLoading } = useGetTableCashierSummaryQuery(table.id);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[520px] rounded-2xl shadow-xl p-6">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold">Checkout</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* ITEMS */}
        <div className="space-y-3 text-gray-700 mb-6 p-4 rounded-2xl bg-gray-100">
          {isLoading ? (
            <div className="text-center text-gray-400">Loading...</div>
          ) : (summary?.items?.length ?? 0) > 0 ? (
            summary!.items.map((item: CashierItem) => (
              <div key={item.itemId} className="flex justify-between">
                <span>{item.quantity}x {item.name}</span>
                <span>${item.lineTotal}</span>
              </div>
            ))
          ) : (
            <div className="flex justify-between">
              <span>No items</span>
              <span>$0</span>
            </div>
          )}
        </div>

        {/* TOTAL */}
        <div className="flex justify-between text-lg font-bold mb-6">
          <span>Total</span>
          <span>${isLoading ? "..." : (summary?.meta?.totalAmount ?? 0)}</span>
        </div>

        {/* PAYMENT */}
        <p className="text-sm text-gray-500 mb-3">Select Payment Method</p>

        <div className="flex gap-4 mb-6">
          <div
            onClick={() => setPaymentMethod("CASH")}
            className={`w-full p-5 rounded-xl border flex flex-col items-center gap-2 cursor-pointer transition ${paymentMethod === "CASH"
                ? "bg-green-100 border-green-500"
                : "bg-gray-100"
              }`}
          >
            <IoCardOutline className="text-2xl text-gray-700" />
            <span className="text-sm font-medium">Cash</span>
          </div>

          <div
            onClick={() => setPaymentMethod("CARD")}
            className={`w-full p-5 rounded-xl border flex flex-col items-center gap-2 cursor-pointer transition ${paymentMethod === "CARD"
                ? "bg-blue-100 border-blue-500"
                : "bg-gray-100"
              }`}
          >
            <PiCreditCardThin className="text-2xl text-gray-700" />
            <span className="text-sm font-medium">Card</span>
          </div>
        </div>

        {/* PAY BUTTON */}
        <button
          onClick={onPay}
          disabled={!paymentMethod}
          className={`w-full py-3 rounded-full cursor-pointer font-semibold transition ${paymentMethod
              ? "bg-[#042452] text-white hover:bg-[#031f46]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          {paymentMethod
            ? `Pay with ${paymentMethod}`
            : "Select Payment Method"}
        </button>
      </div>
    </div>
  );
}
