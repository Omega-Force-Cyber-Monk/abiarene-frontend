import { useState } from "react";
import { IoCardOutline } from "react-icons/io5";
import { PiCreditCardThin } from "react-icons/pi";

import success from "@/assets/primepos/logo/success.svg";

const mockCards = [
  { id: 1, title: "1", price: 14.49, server: "Server" },
  { id: 2, title: "2", price: 15.49, server: "Server" },
  { id: 3, title: "3", price: 17.49, server: "Server" },
  { id: 4, title: "4", price: 10.49, server: "Server" },
  { id: 5, title: "5", price: 17.49, server: "Server" },
  { id: 6, title: "6", price: 23.49, server: "Server" },
];

export default function CashierHub() {
  const [activeTab, setActiveTab] = useState("Table");
  const [selectedCard, setSelectedCard] = useState<
    (typeof mockCards)[0] | null
  >(null);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card" | null>(
    null,
  );
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const closeModal = () => {
    setSelectedCard(null);
    setPaymentMethod(null);
  };

  const handlePayment = () => {
    if (!paymentMethod) return;

    // simulate success
    setTimeout(() => {
      closeModal();
      setPaymentSuccess(true);
    }, 500);
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
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeTab === tab ? "bg-[#061E49] text-white" : "text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mockCards.map((card) => (
          <div
            key={card.id}
            onClick={() => setSelectedCard(card)}
            className={`cursor-pointer bg-[#E9EAEB] rounded-2xl shadow p-4 hover:shadow-lg transition border-2 ${
              selectedCard?.id === card.id
                ? "border-blue-600"
                : "border-transparent"
            }`}
          >
            <div className="flex items-center">
              <h2 className="w-12 h-12 flex items-center justify-center text-lg font-semibold bg-gray-300 rounded-full">
                {card.title}
              </h2>
              <h3 className="ml-2 text-lg font-semibold">Table</h3>
            </div>

            <p className="mt-2 text-xl font-bold text-[#061E49] text-center">
              ${card.price}
            </p>

            <div className="flex justify-center mt-2">
              <span className="px-3 py-1 text-xs font-medium text-blue-700 bg-white rounded-full border border-blue-200">
                {card.server}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* CHECKOUT MODAL */}
      {selectedCard && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[520px] rounded-2xl shadow-xl p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold">Checkout</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-black cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* ITEMS */}
            <div className="space-y-3 text-gray-700 mb-6 p-4 rounded-2xl bg-gray-100">
              <div className="flex justify-between">
                <span>4x Chicken Biryani</span>
                <span>$40</span>
              </div>
              <div className="flex justify-between">
                <span>4x Mango Lassi</span>
                <span>$20</span>
              </div>
              <div className="flex justify-between">
                <span>Extra Item</span>
                <span>$40</span>
              </div>
            </div>

            {/* TOTAL */}
            <div className="flex justify-between text-lg font-bold mb-6">
              <span>Total</span>
              <span>$100</span>
            </div>

            {/* PAYMENT */}
            <p className="text-sm text-gray-500 mb-3">Select Payment Method</p>

            <div className="flex gap-4 mb-6">
              <div
                onClick={() => setPaymentMethod("cash")}
                className={`w-full p-5 rounded-xl border flex flex-col items-center gap-2 cursor-pointer transition ${
                  paymentMethod === "cash"
                    ? "bg-green-100 border-green-500"
                    : "bg-gray-100"
                }`}
              >
                <IoCardOutline className="text-2xl text-gray-700" />
                <span className="text-sm font-medium">Cash</span>
              </div>

              <div
                onClick={() => setPaymentMethod("card")}
                className={`w-full p-5 rounded-xl border flex flex-col items-center gap-2 cursor-pointer transition ${
                  paymentMethod === "card"
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
              onClick={handlePayment}
              disabled={!paymentMethod}
              className={`w-full py-3 rounded-full cursor-pointer font-semibold transition ${
                paymentMethod
                  ? "bg-[#042452] text-white hover:bg-[#031f46]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {paymentMethod
                ? `Pay with ${paymentMethod.toUpperCase()}`
                : "Select Payment Method"}
            </button>
          </div>
        </div>
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
