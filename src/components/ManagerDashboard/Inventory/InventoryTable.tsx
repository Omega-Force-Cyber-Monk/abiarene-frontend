import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaPrint, FaTrash, FaEdit } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import AddProductDialog from "./AddProductDialog";
import {
  useGetAllInventoryQuery,
  useDeleteInventoryMutation,
} from "@/redux/features/manager/managerInventory/inventoryApi";
import { toast } from "react-hot-toast";
import EditProductDialog from "./EditProductDialog";
import { MdDelete, MdLocalPrintshop } from "react-icons/md";

const InventoryTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const {
    data: products = [],
    refetch,
    isLoading,
    error,
  } = useGetAllInventoryQuery();
  const [deleteInventory] = useDeleteInventoryMutation();

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleRefresh = () => {
    setSpinning(true);
    refetch();
    setTimeout(() => {
      setSpinning(false);
      toast.success("Inventory refreshed");
    }, 700);
  };

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (product: any) => {
    if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
      try {
        await deleteInventory(product.id).unwrap();
        toast.success("Product deleted successfully!");
      } catch (error: any) {
        console.error("Failed to delete product:", error);
        toast.error(error?.data?.message || "Failed to delete product");
      }
    }
  };

  const handlePrint = (product: any) => {
    // Create printable content
    const printContent = `
      <html>
        <head>
          <title>Product Details - ${product.name}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; }
            h1 { color: #061E49; }
            .details { margin-top: 20px; }
            .row { margin-bottom: 10px; }
            .label { font-weight: bold; width: 150px; display: inline-block; }
            .value { display: inline-block; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Product Details</h1>
            <div class="details">
              <div class="row"><span class="label">Product Name:</span><span class="value">${product.name}</span></div>
              <div class="row"><span class="label">SKU:</span><span class="value">${product.sku}</span></div>
              <div class="row"><span class="label">Barcode:</span><span class="value">${product.barcode}</span></div>
              <div class="row"><span class="label">Price:</span><span class="value">$${product.price}</span></div>
              <div class="row"><span class="label">Stock:</span><span class="value">${product.stock}</span></div>
              <div class="row"><span class="label">Low Stock Threshold:</span><span class="value">${product.lowStockThreshold}</span></div>
            </div>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const getStatusBadge = (stock: number, lowStockThreshold: number) => {
    if (stock === 0) {
      return "bg-red-100 text-red-700"; // Out of stock
    } else if (stock <= lowStockThreshold) {
      return "bg-red-50 text-red-600"; // Critical low (<= threshold)
    } else if (stock <= 20) {
      return "bg-[#FFF4E5] text-[#B26A00]"; // Low stock
    } else {
      return "bg-[#E6F4EA] text-[#1E7E34]"; // In stock
    }
  };

  const getStockText = (stock: number, lowStockThreshold: number) => {
    if (stock === 0) return "Out of stock";
    if (stock <= lowStockThreshold) return `Critical low (${stock} left)`;
    if (stock <= 20) return `Low stock (${stock} left)`;
    return `${stock} in stock`;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#061E49] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading inventory...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center text-red-600">
          <p>Error loading inventory data</p>
          <button
            onClick={handleRefresh}
            className="mt-4 px-4 py-2 bg-[#061E49] text-white rounded-full"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <AddProductDialog onSuccess={refetch} />
      </div>
      <div className="p-6 shadow-2xl rounded-3xl">
        {/* Search + Add Button Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex-1 w-full sm:max-w-md">
            <div className="relative w-full hidden md:block">
              <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-3 shadow-2xl rounded-full outline-none focus:ring-2 focus:ring-blue-400"
              />
              <CiSearch className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          <button
            onClick={handleRefresh}
            className="p-4 cursor-pointer bg-[#061E49] rounded-full flex items-center justify-center"
          >
            <LuRefreshCw
              className={`text-white text-xl ${spinning ? "animate-spin" : ""}`}
            />
          </button>
        </div>

        {/* Table */}
        <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-4 gap-5">
          <div className="xl:col-span-4 w-full">
            <div className="w-full overflow-x-auto bg-white rounded-xl shadow-sm">
              <table className="min-w-[800px] w-full text-sm">
                <thead className="border-b border-[#DBE0E5] bg-[#F8F8F8]">
                  <tr>
                    <th className="px-6 py-4 text-left text-[#6A6A65] text-base font-semibold">
                      Product
                    </th>
                    <th className="px-6 py-4 text-left text-[#6A6A65] text-base font-semibold">
                      SKU
                    </th>
                    <th className="px-6 py-4 text-left text-[#6A6A65] text-base font-semibold">
                      Barcode
                    </th>
                    <th className="px-6 py-4 text-left text-[#6A6A65] text-base font-semibold">
                      Stock
                    </th>
                    <th className="px-6 py-4 text-left text-[#6A6A65] text-base font-semibold">
                      Price
                    </th>
                    <th className="px-6 py-4 text-center text-[#6A6A65] text-base font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-5">
                        <div className="font-semibold text-gray-900 whitespace-nowrap">
                          {product.name}
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className="text-gray-700">{product.sku}</span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className="text-gray-700">{product.barcode}</span>
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs whitespace-nowrap font-medium ${getStatusBadge(product.stock, product.lowStockThreshold)}`}
                        >
                          {getStockText(
                            product.stock,
                            product.lowStockThreshold,
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-5">${product.price}</td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-3">
                          {/* Edit Button */}
                          <button
                            onClick={() => handleEdit(product)}
                            className="flex items-center gap-2 px-2 py-2 cursor-pointer rounded-lg border border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300 transition duration-200"
                            title="Edit"
                          >
                            <FaEdit className="text-lg" />
                          </button>

                          {/* Print Button */}
                          <button
                            onClick={() => handlePrint(product)}
                            className="flex items-center gap-2 px-2 py-2 cursor-pointer rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition duration-200"
                            title="Print"
                          >
                            <MdLocalPrintshop className="text-lg" />
                          </button>
                          {/* Delete Button */}
                          <button
                            onClick={() => handleDelete(product)}
                            className="flex items-center gap-2 px-2 py-2 cursor-pointer rounded-lg border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition duration-200"
                            title="Delete"
                          >
                            <MdDelete className="text-lg" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredProducts.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No products found
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between px-2 sm:px-4 py-3">
          <div className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-medium">{filteredProducts.length}</span> of{" "}
            <span className="font-medium">{products.length}</span> products
          </div>
          <div className="flex items-center gap-2">
            <button className="cursor-pointer rounded-lg border px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100">
              Prev
            </button>
            <div className="min-w-[50px] rounded-md border border-[#E3E3E4] bg-gray-50 px-3 py-1.5 text-center text-sm font-medium text-gray-700 shadow-sm">
              1 / 1
            </div>
            <button className="cursor-pointer rounded-lg border px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      {selectedProduct && (
        <EditProductDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          product={selectedProduct}
          onSuccess={refetch}
        />
      )}
    </div>
  );
};

export default InventoryTable;

// import { useState } from "react";

// import { CiSearch } from "react-icons/ci";
// import { FaPrint, FaTrash } from "react-icons/fa";
// import { LuRefreshCw } from "react-icons/lu";
// import AddProductDialog from "./AddProductDialog";
// const InventoryTable = () => {
//   const [, setIsDialogOpen] = useState(false);
//   const [, setSelectedUser] = useState<any>(null);

//   const [products] = useState([
//     {
//       id: "PRD-001",
//       product: "Rice Bag",
//       barcode: "RENE-1001",
//       stock: 50,
//       price: 30,
//     },
//     {
//       id: "PRD-002",
//       product: "Cooking Oil",
//       barcode: "RENE-1002",
//       stock: 30,
//       price: 90,
//     },
//     {
//       id: "PRD-003",
//       product: "Milk Pack",
//       barcode: "RENE-1003",
//       stock: 0,
//       price: 99,
//     },
//     {
//       id: "PRD-004",
//       product: "Sugar",
//       barcode: "RENE-1004",
//       stock: 25,
//       price: 99,
//     },
//     {
//       id: "PRD-005",
//       product: "Salt",
//       barcode: "RENE-1005",
//       stock: 5,
//       price: 29,
//     },
//     {
//       id: "PRD-006",
//       product: "Flour",
//       barcode: "RENE-1006",
//       stock: 40,
//       price: 49,
//     },
//   ]);

//   const handlePrint = (user: any) => {
//     setSelectedUser(user);
//     setIsDialogOpen(true);
//   };
//   const handleDelete = (user: any) => {
//     setSelectedUser(user);
//     setIsDialogOpen(true);
//   };

//   const getStatusBadge = (stock: number) => {
//     if (stock === 0) {
//       return "bg-red-100 text-red-700"; // Out of stock
//     } else if (stock <= 5) {
//       return "bg-red-50 text-red-600"; // Critical low (<=5)
//     } else if (stock <= 20) {
//       return "bg-[#FFF4E5] text-[#B26A00]"; // Low stock
//     } else {
//       return "bg-[#E6F4EA] text-[#1E7E34]"; // In stock
//     }
//   };

//   const getStockText = (stock: number) => {
//     if (stock === 0) return "Out of stock";
//     return `${stock} in stock`;
//   };

//   const [spinning, setSpinning] = useState(false);

//   const handleClick = () => {
//     setSpinning(true);

//     // stop animation after 700ms
//     setTimeout(() => {
//       setSpinning(false);
//     }, 700);
//   };

//   return (
//     <div className="space-y-4">
//       <div>
//         <AddProductDialog />
//       </div>
//       <div className="p-6 shadow-2xl  rounded-3xl">
//         {/* Search + Add Button Row */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//           <div className="flex-1 w-full sm:max-w-md">
//             <div className="relative w-full hidden md:block">
//               <input
//                 type="text"
//                 placeholder="Search by name"
//                 className="w-full pl-10 pr-3 py-3 shadow-2xl  rounded-full outline-none focus:ring-2 focus:ring-blue-400"
//               />
//               <CiSearch className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
//             </div>
//           </div>

//           <button
//             onClick={handleClick}
//             className="p-4 cursor-pointer bg-[#061E49] rounded-full flex items-center justify-center"
//           >
//             <LuRefreshCw
//               className={`text-white text-xl ${spinning ? "animate-spin" : ""}`}
//             />
//           </button>
//         </div>

//         {/* Table */}
//         <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-4 gap-5">
//           <div className="xl:col-span-4 w-full">
//             <div className="w-full overflow-x-auto bg-white rounded-xl shadow-sm ">
//               <table className="min-w-[800px] w-full text-sm">
//                 <thead className="border-b border-[#DBE0E5] bg-[#F8F8F8]">
//                   <tr>
//                     <th className="px-6 py-4 text-left text-[#6A6A65] text-base font-semibold">
//                       Product
//                     </th>
//                     <th className="px-6 py-4 text-left text-[#6A6A65] text-base font-semibold">
//                       BarCode
//                     </th>
//                     <th className="px-6 py-4 text-left text-[#6A6A65] text-base font-semibold">
//                       Stock
//                     </th>
//                     <th className="px-6 py-4 text-left text-[#6A6A65] text-base font-semibold">
//                       Price
//                     </th>
//                     <th className="px-6 py-4 text-center text-[#6A6A65] text-base font-semibold">
//                       Action
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {products.map((product) => (
//                     <tr
//                       key={product.id}
//                       className="border-b border-gray-100 hover:bg-gray-50 transition"
//                     >
//                       <td className="px-6 py-5">
//                         <div className="font-semibold text-gray-900 whitespace-nowrap">
//                           {product.product}
//                         </div>
//                       </td>
//                       {/* <td className="px-6 py-5 text-gray-700 whitespace-nowrap">
//                       {user.industry}
//                     </td> */}
//                       <td className="px-6 py-5">
//                         <span
//                           className={`rounded-full px-3 py-1 text-xs font-medium `}
//                         >
//                           {product.barcode}
//                         </span>
//                       </td>
//                       <td className="px-6 py-5">
//                         <span
//                           className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusBadge(product.stock)}`}
//                         >
//                           {getStockText(product.stock)}
//                         </span>
//                       </td>
//                       <td className="px-6 py-5"> ${product.price}</td>

//                       <td className="px-6 py-5 text-right">
//                         <div className="flex items-center justify-end gap-3">
//                           {/* Print Button */}
//                           <button
//                             onClick={() => handlePrint(product)}
//                             className="p-2 rounded-full hover:bg-gray-100 transition"
//                             title="Print"
//                           >
//                             <FaPrint className="text-blue-500" />
//                           </button>

//                           {/* Delete Button */}
//                           <button
//                             onClick={() => handleDelete(product)}
//                             className="p-2 rounded-full hover:bg-red-100 transition"
//                             title="Delete"
//                           >
//                             <FaTrash className="text-red-500" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>

//         {/* Pagination */}
//         <div className="mt-6 flex items-center justify-between px-2 sm:px-4 py-3">
//           <div className="text-sm text-gray-600">
//             Showing <span className="font-medium">{products.length}</span> of{" "}
//             <span className="font-medium">20</span> products
//           </div>
//           <div className="flex items-center gap-2">
//             <button className="cursor-pointer rounded-lg border px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100">
//               Prev
//             </button>
//             <div className="min-w-[50px] rounded-md border border-[#E3E3E4] bg-gray-50 px-3 py-1.5 text-center text-sm font-medium text-gray-700 shadow-sm">
//               1 / 5
//             </div>
//             <button className="cursor-pointer rounded-lg border px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100">
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InventoryTable;
