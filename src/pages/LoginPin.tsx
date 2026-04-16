import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loginphoto from "@/assets/photo/signup.svg";
import { useAppSelector } from "@/redux/hooks/redux-hook";
import { usePinLoginMutation } from "@/redux/features/auth/authApi";

const LoginPin: React.FC = () => {
  const [pin, setPin] = useState("");
  const [tenantId, setTenantId] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const [pinLogin, { isLoading }] = usePinLoginMutation();

  useEffect(() => {
    if (user) {
      redirectBasedOnRole(user.role);
    }
  }, [user]);

  const redirectBasedOnRole = (role: string) => {
    const roleRoutes: Record<string, string> = {
      ADMIN: "/admin-dashboard",
      MANAGER: "/manager-dashboard",
      SERVER: "/server-dashboard",
      KITCHEN: "/kitchen-dashboard",
      CASHIER: "/cashier-dashboard",
    };

    navigate(roleRoutes[role] || "/dashboard");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!pin || !tenantId) {
      setError("Please enter PIN and Tenant ID");
      return;
    }

    try {
      const result = await pinLogin({ pin, tenantId }).unwrap();

      // redirect directly using response
      redirectBasedOnRole(result.user.role.toUpperCase());
    } catch (err: any) {
      setError(
        err?.data?.message || err?.error || "PIN login failed. Try again.",
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-5xl w-full flex overflow-hidden bg-white rounded-2xl shadow-lg">
        {/* Left Image */}
        <div className="hidden md:flex w-1/2">
          <img
            src={loginphoto}
            alt="illustration"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Form */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            Login by PIN
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* PIN */}
            <div>
              <label className="block mb-1">PIN</label>
              <input
                type="text"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter PIN"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            {/* Tenant ID */}
            <div>
              <label className="block mb-1">Tenant ID</label>
              <input
                type="text"
                value={tenantId}
                onChange={(e) => setTenantId(e.target.value)}
                placeholder="Enter Tenant ID"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-yellow-400 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPin;
