/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import AddVoucherDialog from "./AddVoucherDialog";
import VoucherCard from "./VoucherCard";
import EditVoucherModal from "./EditVoucherModal";
import { useGetDiscountsQuery, useDeleteDiscountMutation, Discount } from "@/redux/features/restaurant/discount/discountApi";
import { toast } from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function Approvals() {
  const { data: discounts, isLoading, isError } = useGetDiscountsQuery();
  const [deleteDiscount] = useDeleteDiscountMutation();
  
  const [editingVoucher, setEditingVoucher] = useState<Discount | null>(null);

  const handleEdit = (voucher: Discount) => {
    setEditingVoucher(voucher);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this voucher?")) {
      try {
        await deleteDiscount(id).unwrap();
        toast.success("Voucher deleted successfully");
      } catch (error: any) {
        console.error("Failed to delete voucher:", error);
        toast.error(error?.data?.message || "Failed to delete voucher");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4 sm:space-y-6 w-full mx-auto">
        <AddVoucherDialog />
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-40 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Failed to load vouchers. Please try again.</p>
      </div>
    );
  }

  return (
    <div className=" space-y-4 sm:space-y-6 w-full mx-auto">
      <AddVoucherDialog />
      
      {discounts?.data && discounts.data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {discounts.data.map((voucher) => (
            <VoucherCard 
              key={voucher.id} 
              voucher={voucher} 
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-400">No vouchers found. Create one to get started!</p>
        </div>
      )}

      {editingVoucher && (
        <EditVoucherModal 
          voucher={editingVoucher} 
          isOpen={!!editingVoucher} 
          onClose={() => setEditingVoucher(null)} 
        />
      )}
    </div>
  );
}
