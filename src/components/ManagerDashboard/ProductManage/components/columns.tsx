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

export const getOrderColumns = (): Column<any>[] => [
  {
    header: "Order / Ticket",
    render: (order) => (
      <div className="font-semibold text-[#0A2540]">
        {order.ticket?.ticketCode ? `#${order.ticket.ticketCode}` : `#${order.id.substring(0, 8).toUpperCase()}`}
      </div>
    ),
  },
  {
    header: "Table",
    render: (order) => (
      <div className="flex items-center gap-2">
        <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-700 text-xs">
          T{order.table?.tableNumber || "?"}
        </span>
      </div>
    ),
  },
  {
    header: "Items",
    render: (order) => {
      const itemCount = order.items?.reduce((acc: number, curr: any) => acc + curr.quantity, 0) || 0;
      const firstItem = order.items?.[0]?.item?.name || "Unknown Item";
      return (
        <div className="flex flex-col">
          <span className="font-medium text-gray-800 text-sm">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </span>
          <span className="text-xs text-gray-500">
            {firstItem} {order.items?.length > 1 && `+${order.items.length - 1} more`}
          </span>
        </div>
      );
    },
  },
  {
    header: "Total",
    render: (order) => {
      const total = order.items?.reduce((acc: number, curr: any) => acc + (curr.quantity * (curr.item?.price || 0)), 0) || 0;
      return <span className="font-bold text-gray-800">${total.toFixed(2)}</span>;
    },
  },
  {
    header: "Status",
    render: (order) => {
      const statusColors: any = {
        CONFIRMED: "bg-blue-100 text-blue-700 border-blue-200",
        PREPARING: "bg-yellow-100 text-yellow-700 border-yellow-200",
        SERVED: "bg-green-100 text-green-700 border-green-200",
        COMPLETED: "bg-gray-100 text-gray-700 border-gray-200",
        CANCELLED: "bg-red-100 text-red-700 border-red-200",
      };
      const colorClass = statusColors[order.status] || "bg-gray-100 text-gray-700";
      return (
        <span className={`px-3 py-1 rounded-full text-[11px] uppercase tracking-wider font-bold border ${colorClass}`}>
          {order.status}
        </span>
      );
    },
  },
  {
    header: "Date",
    render: (order) => (
      <span className="text-sm font-medium text-gray-500">
        {new Date(order.createdAt).toLocaleString(undefined, { 
          month: 'short', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </span>
    ),
  },
];
