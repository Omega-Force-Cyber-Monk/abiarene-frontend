// src/components/ProtectedRoute.tsx
import { useAppSelector } from "@/redux/hooks/redux-hook";
import { Navigate, useLocation } from "react-router-dom";
import { useGetTenantSubscriptionQuery } from "@/redux/features/subscription/subscriptionApi";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, token } = useAppSelector((state) => state.auth);
  const location = useLocation();

  // Subscription check for MANAGER role
  const { data: subscriptionData, isLoading: isSubLoading } = useGetTenantSubscriptionQuery(undefined, {
    skip: !token || user?.role !== "MANAGER",
  });

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Show loading while checking subscription status for managers
  if (isSubLoading && user?.role === "MANAGER") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#061E49]"></div>
      </div>
    );
  }

  // Redirect manager based on subscription status

  if (!isSubLoading && user?.role === "MANAGER") {
    const isPending = subscriptionData?.tenant?.subscriptionStatus === "PENDING";
    const isActive = subscriptionData?.tenant?.subscriptionStatus === "ACTIVE";
    const isPaymentFlowPage = 
      location.pathname === "/payment-selection" || 
      location.pathname === "/subscription/success" || 
      location.pathname === "/subscription/paystack/callback";

    if (isPending && !isPaymentFlowPage) {
      return <Navigate to="/payment-selection" replace />;
    }

    if (isActive && isPaymentFlowPage) {
      return <Navigate to="/manager-dashboard" replace />;
    }
  }



  return <>{children}</>;
};

export default ProtectedRoute;

