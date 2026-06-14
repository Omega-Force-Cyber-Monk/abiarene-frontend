import React, { useState } from "react";
import {
  useGetAllSubscriptionPricesQuery,
  useCreateSubscriptionPriceMutation,
  useUpdateSubscriptionPriceMutation,
  useDeleteSubscriptionPriceMutation,
} from "@/redux/features/admin/subscription/subscriptionApi";
import SubscriptionDialog from "./SubscriptionDialog";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import { SubscriptionPrice } from "@/redux/features/admin/subscription/subscription";
import SubscriptionCard from "./SubscribtionCard";
import SectionTitle from "@/common/SectionTitle";
import Loader from "../Shared/Loader";
import { useSelector } from "react-redux";
import { AppRootState } from "@/redux/store";

const SubscriptionManagement = () => {
  const selectedCurrency = useSelector((state: AppRootState) => state.currency.selectedCurrency);
  const {
    data: plansWithCurrency,
    isLoading: isPlansLoading,
    error: plansError,
    refetch: refetchPlans,
  } = useGetAllSubscriptionPricesQuery({ currency: selectedCurrency });

  // Fallback if the backend crashes due to invalid currency in the DB
  const {
    data: rawPlans,
    refetch: refetchRawPlans,
  } = useGetAllSubscriptionPricesQuery(undefined, { skip: !plansError });

  const plans = plansError ? rawPlans : plansWithCurrency;
  const isLoading = isPlansLoading && !plansError;
  const error = plansError && !rawPlans;

  const refetch = () => {
    refetchPlans();
    refetchRawPlans();
  };

  const [createSubscription] = useCreateSubscriptionPriceMutation();
  const [updateSubscription] = useUpdateSubscriptionPriceMutation();
  const [deleteSubscription] = useDeleteSubscriptionPriceMutation();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPrice | null>(
    null,
  );
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({ show: false, message: "", type: "success" });

  const handleCreateClick = () => {
    setSelectedPlan(null);
    setDialogOpen(true);
  };

  const handleEditClick = (plan: SubscriptionPrice) => {
    setSelectedPlan(plan);
    setDialogOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setSelectedDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleDialogSubmit = async (formData: any) => {
    setIsSubmitting(true);
    try {
      if (selectedPlan) {
        await updateSubscription({
          id: selectedPlan.id,
          data: formData,
        }).unwrap();
        showNotification("Subscription plan updated successfully!", "success");
      } else {
        await createSubscription(formData).unwrap();
        showNotification("Subscription plan created successfully!", "success");
      }
      setDialogOpen(false);
      refetch();
    } catch (err: any) {
      showNotification(err.data?.message || "An error occurred", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedDeleteId) return;
    setIsSubmitting(true);
    try {
      await deleteSubscription(selectedDeleteId).unwrap();
      showNotification("Subscription plan deleted successfully!", "success");
      setDeleteDialogOpen(false);
      refetch();
    } catch (err: any) {
      showNotification(err.data?.message || "An error occurred", "error");
    } finally {
      setIsSubmitting(false);
      setSelectedDeleteId(null);
    }
  };

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "success" });
    }, 5000);
  };

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-800">
              Failed to load subscription plans. Please try again later.
            </p>
          </div>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-[#052350] text-white rounded-lg hover:bg-[#061E49] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Sort plans: FREE, MONTHLY, YEARLY
  const sortedPlans = [...(plans || [])].sort((a, b) => {
    const order = { FREE: 0, MONTHLY: 1, YEARLY: 2 };
    return order[a.planType] - order[b.planType];
  });

  return (
    <div className="">
      <div className="">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
          <div>
            <SectionTitle title="Subscription" description="" />
          </div>

          <button
            onClick={handleCreateClick}
            className="w-full sm:w-auto bg-[#052350] cursor-pointer text-white px-6 py-2 rounded-xl font-medium hover:bg-[#061E49] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create New Plan
          </button>
        </div>

        {/* Plans Grid */}
        {sortedPlans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPlans.map((plan) => (
              <SubscriptionCard
                key={plan.id}
                plan={plan}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No plans</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new subscription plan.
            </p>
            <div className="mt-6">
              <button
                onClick={handleCreateClick}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#052350] hover:bg-[#061E49] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#052350]"
              >
                <svg
                  className="-ml-1 mr-2 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create New Plan
              </button>
            </div>
          </div>
        )}

        {/* Dialogs */}
        <SubscriptionDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onSubmit={handleDialogSubmit}
          initialData={selectedPlan}
          isLoading={isSubmitting}
        />

        <DeleteConfirmationDialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={handleDeleteConfirm}
          isLoading={isSubmitting}
          planName={plans?.find((p) => p.id === selectedDeleteId)?.name}
        />

        {/* Notification */}
        {notification.show && (
          <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
            <div
              className={`rounded-lg shadow-lg p-4 ${
                notification.type === "success"
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200"
              } border`}
            >
              <div className="flex items-center">
                {notification.type === "success" ? (
                  <svg
                    className="h-5 w-5 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5 text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
                <p
                  className={`ml-3 text-sm font-medium ${
                    notification.type === "success"
                      ? "text-green-800"
                      : "text-red-800"
                  }`}
                >
                  {notification.message}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SubscriptionManagement;
