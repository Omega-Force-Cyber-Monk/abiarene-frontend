import React, { useState } from "react";
import { TableCardProps, TableStatus } from "../index";

interface TableFormProps {
  initialData?: TableCardProps;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const TableForm = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
}: TableFormProps) => {
  const [formData, setFormData] = useState({
    tableNumber: initialData?.tableNumber || 0,
    seatCount: initialData?.seatCount || 4,
    status: initialData?.status || "AVAILABLE",
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Table Number
        </label>
        <input
          type="number"
          min="1"
          value={formData.tableNumber}
          onChange={(e) =>
            setFormData({ ...formData, tableNumber: parseInt(e.target.value) })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A2540] focus:border-transparent"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Seat Count
        </label>
        <input
          type="number"
          min="1"
          max="50"
          value={formData.seatCount}
          onChange={(e) =>
            setFormData({ ...formData, seatCount: parseInt(e.target.value) })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A2540] focus:border-transparent"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          value={formData.status}
          onChange={(e) =>
            setFormData({ ...formData, status: e.target.value as TableStatus })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A2540] focus:border-transparent"
        >
          <option value="AVAILABLE">AVAILABLE</option>
          <option value="OCCUPIED">OCCUPIED</option>
          <option value="SERVED">SERVED</option>
        </select>
      </div>
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 px-4 py-2 bg-[#0A2540] text-white rounded-lg hover:bg-[#0A2540]/90 cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};
