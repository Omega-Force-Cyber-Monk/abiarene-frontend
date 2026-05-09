import { Column } from "@/common/CommonTable";
import { TableCardProps, MenuItem, OrderItem } from "../index";
import { Eye, Pencil, Trash2 } from "lucide-react";

interface ActionHandlers {
  openViewModal: (item: any) => void;
  openEditModal: (item: any) => void;
  handleDelete: (id: string | number) => void;
}

export const getTableColumns = (handlers: ActionHandlers): Column<TableCardProps>[] => [
  {
    header: "Table Number",
    render: (table) => (
      <span className="font-medium text-gray-700">Table {table.tableNumber}</span>
    ),
  },
  {
    header: "Seat Count",
    render: (table) => table.seatCount,
  },
  {
    header: "Status",
    render: (table) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${
          table.status === "AVAILABLE"
            ? "bg-green-100 text-green-700"
            : table.status === "OCCUPIED"
              ? "bg-orange-100 text-orange-700"
              : table.status === "SERVED"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700"
        }`}
      >
        {table.status}
      </span>
    ),
  },
  {
    header: "Created At",
    render: (table) => new Date(table.createdAt).toLocaleDateString(),
  },
  {
    header: "Actions",
    className: "text-right",
    render: (table) => (
      <div className="flex gap-2 justify-end">
        <button
          onClick={() => handlers.openViewModal(table)}
          className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 cursor-pointer"
          title="View"
        >
          <Eye size={18} />
        </button>
        <button
          onClick={() => handlers.openEditModal(table)}
          className="p-1.5 rounded-lg hover:bg-yellow-50 text-yellow-600 cursor-pointer"
          title="Edit"
        >
          <Pencil size={18} />
        </button>
        <button
          onClick={() => handlers.handleDelete(table.id)}
          className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 cursor-pointer"
          title="Delete"
        >
          <Trash2 size={18} />
        </button>
      </div>
    ),
  },
];

export const getMenuColumns = (handlers: ActionHandlers): Column<MenuItem>[] => [
  {
    header: "Image",
    render: (item) => (
      <img
        src={item.image}
        alt={item.name}
        className="w-10 h-10 rounded-lg object-cover"
      />
    ),
  },
  {
    header: "Name",
    render: (item) => item.name,
  },
  {
    header: "Category",
    render: (item) => item.category,
  },
  {
    header: "Price",
    render: (item) => (
      <span className="font-semibold text-gray-800">${item.price.toFixed(2)}</span>
    ),
  },
  {
    header: "Actions",
    className: "text-right",
    render: (item) => (
      <div className="flex gap-2 justify-end">
        <button
          onClick={() => handlers.openViewModal(item)}
          className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 cursor-pointer"
          title="View"
        >
          <Eye size={18} />
        </button>
        <button
          onClick={() => handlers.openEditModal(item)}
          className="p-1.5 rounded-lg hover:bg-yellow-50 text-yellow-600 cursor-pointer"
          title="Edit"
        >
          <Pencil size={18} />
        </button>
        <button
          onClick={() => handlers.handleDelete(item.id)}
          className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 cursor-pointer"
          title="Delete"
        >
          <Trash2 size={18} />
        </button>
      </div>
    ),
  },
];

export const getOrderColumns = (handlers: ActionHandlers): Column<OrderItem>[] => [
  {
    header: "Name",
    render: (item) => item.name,
  },
  {
    header: "Price",
    render: (item) => `$${item.price.toFixed(2)}`,
  },
  {
    header: "Quantity",
    render: (item) => item.quantity,
  },
  {
    header: "Total",
    render: (item) => (
      <span className="font-semibold text-gray-800">
        ${(item.price * item.quantity).toFixed(2)}
      </span>
    ),
  },
  {
    header: "Customizations",
    render: (item) => (
      <span className="text-gray-500">
        {item.customizations?.slice(0, 2).join(", ")}
        {item.customizations?.length > 2 && ` +${item.customizations.length - 2}`}
      </span>
    ),
  },
  {
    header: "Actions",
    className: "text-right",
    render: (item) => (
      <div className="flex gap-2 justify-end">
        <button
          onClick={() => handlers.openViewModal(item)}
          className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 cursor-pointer"
          title="View"
        >
          <Eye size={18} />
        </button>
        <button
          onClick={() => handlers.openEditModal(item)}
          className="p-1.5 rounded-lg hover:bg-yellow-50 text-yellow-600 cursor-pointer"
          title="Edit"
        >
          <Pencil size={18} />
        </button>
        <button
          onClick={() => handlers.handleDelete(item.id)}
          className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 cursor-pointer"
          title="Delete"
        >
          <Trash2 size={18} />
        </button>
      </div>
    ),
  },
];
