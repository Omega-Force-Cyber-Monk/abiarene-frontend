/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetTenantSubscriptionQuery, useInitiatePaymentMutation } from "@/redux/features/subscription/subscriptionApi";
import { PaymentOptionCard } from "@/components/Payment/PaymentOptionCard";
import logoIcon from "@/assets/primepos/logo/logo.svg";
import { 
  CreditCard, 
  Smartphone, 
  Layers, 
  Globe, 
  Wallet,
  Loader2
} from "lucide-react";
import { toast } from "react-hot-toast";

const PaymentSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetTenantSubscriptionQuery();
  const [initiatePayment, { isLoading: isPaying }] = useInitiatePaymentMutation();
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [momoMessage, setMomoMessage] = useState<string | null>(null);

  // Redirect if already active
  useEffect(() => {
    if (data?.tenant?.subscriptionStatus === "ACTIVE") {
      navigate("/manager-dashboard");
    }
  }, [data, navigate]);


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 animate-spin text-[#061E49]" />
      </div>
    );
  }

  const subscriptionFee = data?.subscription?.fee || 32;

  const paymentMethods = [
    {
      provider: "stripe",
      label: "Stripe",
      icon: <Wallet size={32} />,
      bgColor: "bg-[#F0F0FF]",
      textColor: "text-[#6772E5]",
    },
    {
      provider: "paystack",
      label: "Paystack",
      icon: <Layers size={32} />,
      bgColor: "bg-[#E6F7FF]",
      textColor: "text-[#00A3FF]",
    },
    {
      provider: "mtnMomo",
      label: "MTN MoMo",
      icon: <Smartphone size={32} />,
      bgColor: "bg-[#FFF9E6]",
      textColor: "text-[#FFB000]",
    },
  ];

  const handlePayNow = async () => {
    if (!selectedProvider) {
      toast.error("Please select a payment method");
      return;
    }

    if (selectedProvider === "mtnMomo" && !phoneNumber) {
      toast.error("Please enter your phone number");
      return;
    }

    try {
      const response = await initiatePayment({ 
        provider: selectedProvider,
        payerPhoneNumber: selectedProvider === "mtnMomo" ? phoneNumber : undefined
      }).unwrap();

      // Handle Stripe
      if (selectedProvider === "stripe" && response.checkout?.url) {
        window.location.href = response.checkout.url;
        return;
      }

      // Handle Paystack
      if (selectedProvider === "paystack" && response.checkout?.authorizationUrl) {
        window.location.href = response.checkout.authorizationUrl;
        return;
      }

      // Handle MTN MoMo
      if (selectedProvider === "mtnMomo") {
        setMomoMessage(response.nextStep?.message || "Please approve the request on your phone");
        toast.success("Request sent to your phone!");
        
        // Start checking status after a delay
        setTimeout(() => {
          navigate(`/subscription/success?reference=${response.payment.reference}&provider=mtnMomo`);
        }, 5000);
        return;
      }

    } catch (error: any) {
      toast.error(error?.data?.message || "Payment initiation failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      {/* Logo Section */}
      <div className="mb-12 flex flex-col items-center gap-2">
        <img src={logoIcon} alt="Prime POS Logo" className="w-16 h-16" />
        <h1 className="text-3xl font-bold tracking-wider text-[#061E49]">
          PRIME <span className="text-[#FFB000]">POS</span>
        </h1>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-2xl bg-[#F0FAF4] rounded-[40px] p-8 md:p-12 shadow-sm relative overflow-hidden">
        <h2 className="text-2xl font-medium text-gray-500 mb-8 text-center md:text-left">
          Select Payment Method
        </h2>

        {/* Payment Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {paymentMethods.map((method) => (
            <PaymentOptionCard
              key={method.provider}
              {...method}
              isSelected={selectedProvider === method.provider}
              onClick={() => {
                setSelectedProvider(method.provider);
                setMomoMessage(null);
              }}
            />
          ))}
        </div>

        {/* MTN MoMo Specific Input */}
        {selectedProvider === "mtnMomo" && (
          <div className="mb-8 animate-in fade-in slide-in-from-top-2 duration-300">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number (MTN MoMo)
            </label>
            <input
              type="tel"
              placeholder="e.g. 56733123453"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FFB000] focus:border-transparent outline-none transition-all"
            />
          </div>
        )}

        {/* Message for MoMo */}
        {momoMessage && (
          <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-700 text-center animate-pulse">
            {momoMessage}
          </div>
        )}

        {/* Pricing Info */}
        <div className="text-center space-y-2 mb-10">
          <h3 className="text-2xl font-bold text-[#34A853]">
            Your Charged ${subscriptionFee}
          </h3>
          <p className="text-gray-500">
            Please make payment to enter the platform
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={handlePayNow}
          disabled={isPaying}
          className="w-full bg-[#061E49] text-white py-4 rounded-2xl text-xl font-semibold hover:bg-[#0A2540] transition-all disabled:opacity-70 cursor-pointer shadow-lg active:scale-98"
        >
          {isPaying ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin" />
              Processing...
            </span>
          ) : (
            "Pay Now"
          )}
        </button>
      </div>
    </div>
  );
};

export default PaymentSelectionPage;

