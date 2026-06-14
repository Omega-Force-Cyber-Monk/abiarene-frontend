import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  useGetTenantUsersQuery,
  useResetSupervisorCredentialsMutation,
} from "@/redux/features/admin/adminTenant/adminTenantApi";

interface ResetSupervisorPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  tenantId: string;
  tenantName: string;
}

export const ResetSupervisorPasswordModal: React.FC<
  ResetSupervisorPasswordModalProps
> = ({ isOpen, onClose, tenantId, tenantName }) => {
  const [pin, setPin] = useState("");
  
  // Fetch users for this tenant
  const { data: tenantUsers, isLoading } = useGetTenantUsersQuery(
    { tenantId },
    { skip: !isOpen || !tenantId }
  );

  const [resetCredentials, { isLoading: isResetting }] =
    useResetSupervisorCredentialsMutation();

  // Safely extract users array
  const users = Array.isArray(tenantUsers)
    ? tenantUsers
    : (tenantUsers as any)?.data || [];

  // Find the supervisor
  const supervisor = users.find(
    (u: any) => u.role?.name === "SUPERVISOR"
  );

  // Clear state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setPin("");
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!supervisor) {
      toast.error("Supervisor not found for this tenant.");
      return;
    }

    if (!pin || pin.length < 4) {
      toast.error("PIN must be at least 4 characters long.");
      return;
    }

    try {
      await resetCredentials({
        tenantId,
        userId: supervisor.id,
        data: {
          email: supervisor.email,
          pin: pin,
        },
      }).unwrap();

      toast.success("Supervisor password reset successfully");
      setPin("");
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to reset password");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Reset Supervisor Password
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Reset credentials for {tenantName}'s supervisor
          </p>
        </div>

        {isLoading ? (
          <div className="py-8 text-center text-gray-500">
            Loading supervisor details...
          </div>
        ) : !supervisor ? (
          <div className="py-8 text-center text-red-500">
            No supervisor found for this tenant. Please create a supervisor user first.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Supervisor Email
              </label>
              <input
                type="email"
                value={supervisor.email}
                disabled
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-500 outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                New PIN / Password
              </label>
              <input
                type="text"
                placeholder="Enter new PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-900 outline-none focus:border-[#052350] focus:ring-1 focus:ring-[#052350]"
                required
              />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isResetting}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isResetting}
                className="rounded-lg bg-[#052350] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#041a3d] disabled:opacity-50"
              >
                {isResetting ? "Resetting..." : "Reset Password"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
