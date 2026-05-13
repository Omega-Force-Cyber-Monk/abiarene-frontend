/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetPaymentStatusQuery } from "@/redux/features/subscription/subscriptionApi";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

const PaystackCallbackPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Paystack returns reference in the URL
  const reference = searchParams.get("reference") || searchParams.get("trxref");

  const { data, isLoading, error } = useGetPaymentStatusQuery(reference || "", {
    skip: !reference,
  });

  useEffect(() => {
    if (data?.payment?.status === "COMPLETED") {
      toast.success("Paystack Payment Successful!");
      setTimeout(() => {
        navigate("/manager-dashboard");
      }, 3000);
    }
    
    if (data?.payment?.status === "FAILED") {
      toast.error("Paystack Payment Failed.");
    }
  }, [data, navigate]);

  if (!reference) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold">Invalid Paystack Session</h1>
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
            <Loader2 className="w-16 h-16 animate-spin text-[#00A3FF] mx-auto mb-6" />
            <h1 className="text-2xl font-bold mb-2">Verifying Paystack...</h1>
            <p className="text-gray-500">
              Please wait while we confirm your transaction with Paystack.
            </p>
          </>
        ) : data?.payment?.status === "COMPLETED" ? (
          <>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold mb-2 text-gray-800">Payment Successful</h1>
            <p className="text-gray-600 mb-8">
              Paystack has confirmed your payment.
            </p>
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
            <h1 className="text-2xl font-bold mb-2 text-gray-800">Verification Failed</h1>
            <p className="text-gray-600 mb-8">
              We couldn't verify the transaction reference: {reference}
            </p>
            <button
              onClick={() => navigate("/payment-selection")}
              className="w-full bg-[#061E49] text-white py-3 rounded-xl font-semibold hover:bg-[#0A2540] transition-all"
            >
              Back to Payment
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaystackCallbackPage;
