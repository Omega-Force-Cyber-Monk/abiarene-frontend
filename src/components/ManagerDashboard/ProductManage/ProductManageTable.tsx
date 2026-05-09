import { useState } from "react";
import { Plus } from "lucide-react";
import { TableCardProps, MenuItem, OrderItem } from "./index";
import { ManagerModal } from "./ManagerModal";
import {
  useGetTablesQuery,
  useCreateTableMutation,
  useUpdateTableMutation,
  useDeleteTableMutation,
  useGetItemsQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
  useGetOrdersQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} from "@/redux/features/restaurant";
import { toast } from "react-hot-toast";
import CommonTable from "@/common/CommonTable";

// Component Imports
import { TableForm } from "./components/TableForm";
import { MenuForm } from "./components/MenuForm";
import { OrderForm } from "./components/OrderForm";
import { ViewModal } from "./components/ViewModal";
import { getTableColumns, getMenuColumns, getOrderColumns } from "./components/columns";

type ActiveTab = "tables" | "menu" | "orders";

export const ProductManageTable = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("tables");
  const [page, setPage] = useState(1);
  const limit = 10;

  // API Hooks
  const { data: tables, isLoading: isTablesLoading } = useGetTablesQuery({ page, limit });
  const [createTable, { isLoading: isCreatingTable }] = useCreateTableMutation();
  const [updateTable, { isLoading: isUpdatingTable }] = useUpdateTableMutation();
  const [deleteTable] = useDeleteTableMutation();

  const { data: menuItemsData, isLoading: isMenuItemsLoading } = useGetItemsQuery({ page, limit });
  const [createItem, { isLoading: isCreatingItem }] = useCreateItemMutation();
  const [updateItem, { isLoading: isUpdatingItem }] = useUpdateItemMutation();
  const [deleteItem] = useDeleteItemMutation();

  const { data: ordersData, isLoading: isOrdersLoading } = useGetOrdersQuery({ page, limit });
  const [createOrder, { isLoading: isCreatingOrder }] = useCreateOrderMutation();
  const [updateOrder, { isLoading: isUpdatingOrder }] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();


  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Handlers
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

  const closeModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setIsViewModalOpen(false);
    setSelectedItem(null);
  };

  // Table CRUD Handlers
  const handleTableSubmit = async (data: any) => {
    try {
      if (isEditModalOpen) {
        await updateTable({ id: selectedItem.id, data }).unwrap();
        toast.success("Table updated successfully");
      } else {
        await createTable(data).unwrap();
        toast.success("Table created successfully");
      }
      closeModal();
    } catch (error: any) {
      toast.error(error?.data?.message || "Operation failed");
    }
  };

  const handleDeleteTable = async (id: string | number) => {
    if (confirm("Are you sure you want to delete this table?")) {
      try {
        await deleteTable(id.toString()).unwrap();
        toast.success("Table deleted successfully");
      } catch (error: any) {
        toast.error(error?.data?.message || "Delete failed");
      }
    }
  };

  // Menu CRUD Handlers
  const handleMenuSubmit = async (data: any) => {
    try {
      if (isEditModalOpen) {
        await updateItem({ id: selectedItem.id, data }).unwrap();
        toast.success("Item updated successfully");
      } else {
        await createItem({ ...data, isActive: true }).unwrap();
        toast.success("Item created successfully");
      }
      closeModal();
    } catch (error: any) {
      toast.error(error?.data?.message || "Operation failed");
    }
  };

  const handleDeleteMenu = async (id: string | number) => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteItem(id.toString()).unwrap();
        toast.success("Item deleted successfully");
      } catch (error: any) {
        toast.error(error?.data?.message || "Delete failed");
      }
    }
  };

  // Order CRUD Handlers
  const handleOrderSubmit = async (data: any) => {
    try {
      if (isEditModalOpen) {
        await updateOrder({ id: selectedItem.id, data }).unwrap();
        toast.success("Order updated successfully");
      } else {
        await createOrder(data).unwrap();
        toast.success("Order created successfully");
      }
      closeModal();
    } catch (error: any) {
      toast.error(error?.data?.message || "Operation failed");
    }
  };

  const handleDeleteOrder = async (id: string | number) => {
    if (confirm("Are you sure?")) {
      try {
        await deleteOrder(id.toString()).unwrap();
        toast.success("Order deleted successfully");
      } catch (error: any) {
        toast.error(error?.data?.message || "Delete failed");
      }
    }
  };


  const renderTableContent = () => {
    const handlers = {
      openViewModal,
      openEditModal,
      handleDelete: activeTab === "tables" ? handleDeleteTable : activeTab === "menu" ? handleDeleteMenu : handleDeleteOrder
    };

    if (activeTab === "tables") {
      return (
        <CommonTable
          columns={getTableColumns(handlers)}
          data={tables?.data || []}
          isLoading={isTablesLoading}
          emptyMessage="No tables found."
          pagination={{
            currentPage: page,
            totalPages: tables?.meta?.totalPages || 1,
            onPageChange: (newPage) => setPage(newPage),
          }}
        />
      );
    }

    if (activeTab === "menu") {
      return (
        <CommonTable
          columns={getMenuColumns(handlers)}
          data={menuItemsData?.data || []}
          isLoading={isMenuItemsLoading}
          emptyMessage="No menu items found."
          pagination={{
            currentPage: page,
            totalPages: menuItemsData?.meta?.totalPages || 1,
            onPageChange: (newPage) => setPage(newPage),
          }}
        />
      );
    }

    return (
      <CommonTable
        columns={getOrderColumns(handlers)}
        data={ordersData?.data || []}
        isLoading={isOrdersLoading}
        emptyMessage="No orders found."
        pagination={{
          currentPage: page,
          totalPages: ordersData?.meta?.totalPages || 1,
          onPageChange: (newPage) => setPage(newPage),
        }}
      />
    );
  };

  const labels: Record<ActiveTab, string> = {
    tables: "Table",
    menu: "Menu",
    orders: "Order",
  };

  const getModalTitle = () => {
    const entity = labels[activeTab];
    if (isAddModalOpen) return `Add New ${entity}`;
    if (isEditModalOpen) return `Edit ${entity}`;
    if (isViewModalOpen) return `View ${entity} Details`;
    return "";
  };

  return (
    <div className="min-h-screen">
      <div className="w-full mx-auto">
        <div className="flex justify-end mb-8">
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#061E49] text-white rounded-full hover:bg-[#0A2540]/90 cursor-pointer transition-colors"
          >
            <Plus size={20} />
            Add {labels[activeTab]}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 bg-white rounded-xl p-2 shadow-sm mb-6">
          {(["tables", "menu", "orders"] as ActiveTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setPage(1);
              }}
              className={`w-full sm:flex-1 px-4 py-2.5 rounded-lg font-medium capitalize transition-all cursor-pointer ${activeTab === tab ? "bg-[#0A2540] text-white shadow-sm" : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {renderTableContent()}
        </div>
      </div>

      {/* Modals */}
      {isViewModalOpen && (
        <ViewModal
          isOpen={isViewModalOpen}
          onClose={closeModal}
          title={getModalTitle()}
          data={selectedItem}
        />
      )}

      {(isAddModalOpen || isEditModalOpen) && (
        <ManagerModal
          isOpen={isAddModalOpen || isEditModalOpen}
          onClose={closeModal}
          title={getModalTitle()}
        >
          {activeTab === "tables" && (
            <TableForm
              initialData={selectedItem as TableCardProps}
              onSubmit={handleTableSubmit}
              isSubmitting={isCreatingTable || isUpdatingTable}
              onCancel={closeModal}
            />
          )}
          {activeTab === "menu" && (
            <MenuForm
              initialData={selectedItem as MenuItem}
              onSubmit={handleMenuSubmit}
              isSubmitting={isCreatingItem || isUpdatingItem}
              onCancel={closeModal}
            />
          )}
          {activeTab === "orders" && (
            <OrderForm
              initialData={selectedItem as OrderItem}
              onSubmit={handleOrderSubmit}
              onCancel={closeModal}
              menuItems={menuItemsData?.data || []}
            />
          )}
        </ManagerModal>
      )}
    </div>
  );
};
