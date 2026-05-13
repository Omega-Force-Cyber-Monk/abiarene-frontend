/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetPaymentStatusQuery } from "@/redux/features/subscription/subscriptionApi";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

const PaymentSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");
  const provider = searchParams.get("provider");

  const { data, isLoading, error, refetch } = useGetPaymentStatusQuery(reference || "", {
    skip: !reference,
    pollingInterval: 3000, // Poll every 3 seconds for async payments like MoMo
  });

  useEffect(() => {
    if (data?.payment?.status === "COMPLETED") {
      toast.success("Payment Successful!");
      setTimeout(() => {
        navigate("/manager-dashboard");
      }, 3000);
    }
    
    if (data?.payment?.status === "FAILED") {
      toast.error("Payment Failed. Please try again.");
    }
  }, [data, navigate]);

  if (!reference) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold">Invalid Reference</h1>
          <button 
            onClick={() => navigate("/payment-selection")}
            className="mt-4 text-blue-600 hover:underline"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-gray-100 text-center">
        {isLoading || data?.payment?.status === "PENDING" ? (
          <>
            <Loader2 className="w-16 h-16 animate-spin text-[#061E49] mx-auto mb-6" />
            <h1 className="text-2xl font-bold mb-2">Verifying Payment...</h1>
            <p className="text-gray-500">
              {provider === "mtnMomo" 
                ? "Please approve the request on your phone. We are waiting for confirmation."
                : "Please wait while we verify your transaction status."}
            </p>
          </>
        ) : data?.payment?.status === "COMPLETED" ? (
          <>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold mb-2 text-gray-800">Payment Confirmed!</h1>
            <p className="text-gray-600 mb-8">
              Thank you for your payment. Your subscription is now active.
            </p>
            <div className="space-y-2 text-sm text-gray-500 mb-8">
              <p>Reference: {reference}</p>
              <p>Amount: ${data.payment.amount}</p>
            </div>
            <button
              onClick={() => navigate("/manager-dashboard")}
              className="w-full bg-[#061E49] text-white py-3 rounded-xl font-semibold hover:bg-[#0A2540] transition-all"
            >
              Go to Dashboard
            </button>
          </>
        ) : (
          <>
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-12 h-12 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold mb-2 text-gray-800">Payment Failed</h1>
            <p className="text-gray-600 mb-8">
              We couldn't confirm your payment. Please contact support if the amount was deducted.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => refetch()}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all"
              >
                Try Again
              </button>
              <button
                onClick={() => navigate("/payment-selection")}
                className="flex-1 bg-[#061E49] text-white py-3 rounded-xl font-semibold hover:bg-[#0A2540] transition-all"
              >
                Back to Payment
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
