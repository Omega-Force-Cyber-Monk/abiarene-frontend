import { useState } from "react";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";
import {
  initialMenuItems,
  initialCurrentOrder,
} from "./initialData";
import { TableCardProps, MenuItem, OrderItem, TableStatus } from "./index";
import { ManagerModal } from "./ManagerModal";
import {
  useGetTablesQuery,
  useCreateTableMutation,
  useUpdateTableMutation,
  useDeleteTableMutation,
} from "@/redux/features/restaurant";
import { toast } from "react-hot-toast";
import CommonTable, { Column } from "@/common/CommonTable";

type ActiveTab = "tables" | "menu" | "orders";

// Table Form Component
const TableForm = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
}: {
  initialData?: TableCardProps;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}) => {
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

// Menu Form Component
const MenuForm = ({
  initialData,
  onSubmit,
  onCancel,
}: {
  initialData?: MenuItem;
  onSubmit: (data: Omit<MenuItem, "id"> & { id?: string }) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || 0,
    image: initialData?.image || "",
    category: initialData?.category || "",
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ ...formData, id: initialData?.id });
      }}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A2540] focus:border-transparent"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A2540] focus:border-transparent"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price ($)
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: parseFloat(e.target.value) })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A2540] focus:border-transparent"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image URL
        </label>
        <input
          type="url"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A2540] focus:border-transparent"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <input
          type="text"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A2540] focus:border-transparent"
          required
        />
      </div>
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-[#0A2540] text-white rounded-lg hover:bg-[#0A2540]/90 cursor-pointer"
        >
          Save
        </button>
      </div>
    </form>
  );
};

// Order Form Component
const OrderForm = ({
  initialData,
  onSubmit,
  onCancel,
  menuItems,
}: {
  initialData?: OrderItem;
  onSubmit: (data: Omit<OrderItem, "id"> & { id?: string }) => void;
  onCancel: () => void;
  menuItems: MenuItem[];
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    price: initialData?.price || 0,
    quantity: initialData?.quantity || 1,
    customizations: initialData?.customizations?.join(", ") || "",
  });

  const handleMenuSelect = (menuId: string) => {
    const selected = menuItems.find((item) => item.id === menuId);
    if (selected) {
      setFormData({
        ...formData,
        name: selected.name,
        price: selected.price,
      });
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          ...formData,
          id: initialData?.id,
          customizations: formData.customizations
            ? formData.customizations.split(",").map((c) => c.trim())
            : [],
        });
      }}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select from Menu
        </label>
        <select
          onChange={(e) => handleMenuSelect(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A2540] focus:border-transparent"
          defaultValue=""
        >
          <option value="">-- Select Menu Item --</option>
          {menuItems.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} - ${item.price}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A2540] focus:border-transparent"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price ($)
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: parseFloat(e.target.value) })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A2540] focus:border-transparent"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Quantity
        </label>
        <input
          type="number"
          min="1"
          value={formData.quantity}
          onChange={(e) =>
            setFormData({ ...formData, quantity: parseInt(e.target.value) })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A2540] focus:border-transparent"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Customizations (comma separated)
        </label>
        <input
          type="text"
          value={formData.customizations}
          onChange={(e) =>
            setFormData({ ...formData, customizations: e.target.value })
          }
          placeholder="Extra spicy, No onion, Less salt"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A2540] focus:border-transparent"
        />
      </div>
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-[#0A2540] text-white rounded-lg hover:bg-[#0A2540]/90 cursor-pointer"
        >
          Save
        </button>
      </div>
    </form>
  );
};

// View Modal Component
const ViewModal = ({
  isOpen,
  onClose,
  title,
  data,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: any;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center cursor-pointer justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600"
          >
            &times;
          </button>
        </div>
        {/* <div className="p-6">
          <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div> */}
        <div className="p-6 space-y-3">
          {data &&
            Object.entries(data).map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between items-start border-b border-gray-100 pb-2"
              >
                <span className="font-medium text-gray-600 capitalize">
                  {key.replace(/_/g, " ")}
                </span>
                <span className="text-gray-800 text-right max-w-[60%] break-words">
                  {String(value)}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export const ProductManageTable = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("tables");
  const [page, setPage] = useState(1);
  
  const { data: tables = [], isLoading: isTablesLoading } = useGetTablesQuery({ 
    page, 
    limit: 10 
  });

  const [createTable, { isLoading: isCreatingTable }] = useCreateTableMutation();
  const [updateTable, { isLoading: isUpdatingTable }] = useUpdateTableMutation();
  const [deleteTable] = useDeleteTableMutation();

  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [orderItems, setOrderItems] =
    useState<OrderItem[]>(initialCurrentOrder);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Table CRUD
  const handleAddTable = async (data: any) => {
    try {
      await createTable(data).unwrap();
      toast.success("Table created successfully");
      setIsAddModalOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create table");
    }
  };

  const handleEditTable = async (data: any) => {
    try {
      await updateTable({ id: selectedItem.id, data }).unwrap();
      toast.success("Table updated successfully");
      setIsEditModalOpen(false);
      setSelectedItem(null);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update table");
    }
  };

  const handleDeleteTable = async (id: string) => {
    if (confirm("Are you sure you want to delete this table?")) {
      try {
        await deleteTable(id).unwrap();
        toast.success("Table deleted successfully");
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to delete table");
      }
    }
  };

  // Menu CRUD
  const handleAddMenuItem = (data: Omit<MenuItem, "id"> & { id?: string }) => {
    const newId = `m${Math.max(...menuItems.map((m) => parseInt(m.id.slice(1))), 0) + 1}`;
    setMenuItems([...menuItems, { ...data, id: newId } as MenuItem]);
    setIsAddModalOpen(false);
  };

  const handleEditMenuItem = (data: Omit<MenuItem, "id"> & { id?: string }) => {
    setMenuItems(
      menuItems.map((m) => (m.id === data.id ? { ...m, ...data } : m)),
    );
    setIsEditModalOpen(false);
    setSelectedItem(null);
  };

  const handleDeleteMenuItem = (id: string) => {
    if (confirm("Are you sure you want to delete this menu item?")) {
      setMenuItems(menuItems.filter((m) => m.id !== id));
    }
  };

  // Order CRUD
  const handleAddOrderItem = (
    data: Omit<OrderItem, "id"> & { id?: string },
  ) => {
    const newId = `o${Math.max(...orderItems.map((o) => parseInt(o.id.slice(1))), 0) + 1}`;
    setOrderItems([...orderItems, { ...data, id: newId } as OrderItem]);
    setIsAddModalOpen(false);
  };

  const handleEditOrderItem = (
    data: Omit<OrderItem, "id"> & { id?: string },
  ) => {
    setOrderItems(
      orderItems.map((o) => (o.id === data.id ? { ...o, ...data } : o)),
    );
    setIsEditModalOpen(false);
    setSelectedItem(null);
  };

  const handleDeleteOrderItem = (id: string) => {
    if (confirm("Are you sure you want to delete this order item?")) {
      setOrderItems(orderItems.filter((o) => o.id !== id));
    }
  };

  const openAddModal = () => {
    setSelectedItem(null);
    setIsAddModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  const openViewModal = (item: any) => {
    setSelectedItem(item);
    setIsViewModalOpen(true);
  };


  const tableColumns: Column<TableCardProps>[] = [
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
            onClick={() => openViewModal(table)}
            className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 cursor-pointer"
            title="View"
          >
            <Eye size={18} />
          </button>
          <button
            onClick={() => openEditModal(table)}
            className="p-1.5 rounded-lg hover:bg-yellow-50 text-yellow-600 cursor-pointer"
            title="Edit"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => handleDeleteTable(table.id)}
            className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 cursor-pointer"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  const menuColumns: Column<MenuItem>[] = [
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
            onClick={() => openViewModal(item)}
            className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 cursor-pointer"
            title="View"
          >
            <Eye size={18} />
          </button>
          <button
            onClick={() => openEditModal(item)}
            className="p-1.5 rounded-lg hover:bg-yellow-50 text-yellow-600 cursor-pointer"
            title="Edit"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => handleDeleteMenuItem(item.id)}
            className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 cursor-pointer"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  const orderColumns: Column<OrderItem>[] = [
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
            onClick={() => openViewModal(item)}
            className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 cursor-pointer"
            title="View"
          >
            <Eye size={18} />
          </button>
          <button
            onClick={() => openEditModal(item)}
            className="p-1.5 rounded-lg hover:bg-yellow-50 text-yellow-600 cursor-pointer"
            title="Edit"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => handleDeleteOrderItem(item.id)}
            className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 cursor-pointer"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  const renderTableContent = () => {
    if (activeTab === "tables") {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-4 gap-5">
          <div className="xl:col-span-4 w-full">
            <CommonTable
              columns={tableColumns}
              data={tables}
              isLoading={isTablesLoading}
              emptyMessage="No tables found."
              pagination={{
                currentPage: page,
                totalPages: tables.length === 10 ? page + 1 : page,
                onPageChange: (newPage) => setPage(newPage),
                totalItems: undefined,
              }}
            />
          </div>
        </div>
      );
    }

    if (activeTab === "menu") {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-4 gap-5">
          <div className="xl:col-span-4 w-full">
            <CommonTable
              columns={menuColumns}
              data={menuItems}
              emptyMessage="No menu items found."
            />
          </div>
        </div>
      );
    }

    // Orders tab
    return (
      <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-4 gap-5">
        <div className="xl:col-span-4 w-full">
          <CommonTable
            columns={orderColumns}
            data={orderItems}
            emptyMessage="No order items found."
          />
        </div>
      </div>
    );
  };

  const getModalTitle = () => {
    if (isAddModalOpen) return `Add New ${activeTab.slice(0, -1)}`;
    if (isEditModalOpen) return `Edit ${activeTab.slice(0, -1)}`;
    if (isViewModalOpen) return `View ${activeTab.slice(0, -1)} Details`;
    return "";
  };

  const getModalContent = () => {
    if (isViewModalOpen) {
      return (
        <ViewModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title={getModalTitle()}
          data={selectedItem}
        />
      );
    }

    if (activeTab === "tables") {
      return (
        <ManagerModal
          isOpen={isAddModalOpen || isEditModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            setIsEditModalOpen(false);
            setSelectedItem(null);
          }}
          title={getModalTitle()}
        >
          <TableForm
            initialData={isEditModalOpen ? selectedItem : undefined}
            onSubmit={isEditModalOpen ? handleEditTable : handleAddTable}
            isSubmitting={isEditModalOpen ? isUpdatingTable : isCreatingTable}
            onCancel={() => {
              setIsAddModalOpen(false);
              setIsEditModalOpen(false);
              setSelectedItem(null);
            }}
          />
        </ManagerModal>
      );
    }

    if (activeTab === "menu") {
      return (
        <ManagerModal
          isOpen={isAddModalOpen || isEditModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            setIsEditModalOpen(false);
            setSelectedItem(null);
          }}
          title={getModalTitle()}
        >
          <MenuForm
            initialData={isEditModalOpen ? selectedItem : undefined}
            onSubmit={isEditModalOpen ? handleEditMenuItem : handleAddMenuItem}
            onCancel={() => {
              setIsAddModalOpen(false);
              setIsEditModalOpen(false);
              setSelectedItem(null);
            }}
          />
        </ManagerModal>
      );
    }

    return (
      <ManagerModal
        isOpen={isAddModalOpen || isEditModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setIsEditModalOpen(false);
          setSelectedItem(null);
        }}
        title={getModalTitle()}
      >
        <OrderForm
          initialData={isEditModalOpen ? selectedItem : undefined}
          onSubmit={isEditModalOpen ? handleEditOrderItem : handleAddOrderItem}
          onCancel={() => {
            setIsAddModalOpen(false);
            setIsEditModalOpen(false);
            setSelectedItem(null);
          }}
          menuItems={menuItems}
        />
      </ManagerModal>
    );
  };

  return (
    <div className="min-h-screen ">
      <div className="w-full mx-auto ">
        {/* Header */}
        <div className="flex justify-end mb-8">
          {/* <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Manager Product
            </h1>
            <p className="text-gray-500 mt-1">
              Manage tables, menu items, and orders
            </p>
          </div> */}
          <button
            onClick={openAddModal}
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 bg-[#061E49] text-white rounded-full hover:bg-[#0A2540]/90 cursor-pointer transition-colors"
          >
            <Plus size={20} />
            Add {activeTab.slice(0, -1)}
          </button>
        </div>

        {/* Tabs */}
        {/* Tabs */}
        <div className="flex flex-col sm:flex-row gap-2 bg-white rounded-xl p-2 shadow-sm mb-6">
          {(["tables", "menu", "orders"] as ActiveTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full sm:flex-1 px-4 py-2.5 rounded-lg font-medium capitalize transition-all cursor-pointer ${
                activeTab === tab
                  ? "bg-[#0A2540] text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {renderTableContent()}
        </div>
      </div>

      {/* Modals */}
      {getModalContent()}
    </div>
  );
};
