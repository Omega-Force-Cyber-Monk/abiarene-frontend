import { useState } from "react";

import { CiSearch } from "react-icons/ci";
import { FaAngleRight } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import AddProductDialog from "./AddProductDialog";
const InventoryTable = () => {
  const [, setIsDialogOpen] = useState(false);
  const [, setSelectedUser] = useState<any>(null);

  const [products] = useState([
    {
      id: "PRD-001",
      product: "Rice Bag",
      barcode: "RENE-1001",
      stock: 50,
      price: 30,
    },
    {
      id: "PRD-002",
      product: "Cooking Oil",
      barcode: "RENE-1002",
      stock: 30,
      price: 90,
    },
    {
      id: "PRD-003",
      product: "Milk Pack",
      barcode: "RENE-1003",
      stock: 0,
      price: 99,
    },
    {
      id: "PRD-004",
      product: "Sugar",
      barcode: "RENE-1004",
      stock: 25,
      price: 99,
    },
    {
      id: "PRD-005",
      product: "Salt",
      barcode: "RENE-1005",
      stock: 5,
      price: 29,
    },
    {
      id: "PRD-006",
      product: "Flour",
      barcode: "RENE-1006",
      stock: 40,
      price: 49,
    },
  ]);

  const openDialog = (user: any) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const getStatusBadge = (stock: number) => {
    if (stock === 0) {
      return "bg-red-100 text-red-700"; // Out of stock
    } else if (stock <= 5) {
      return "bg-red-50 text-red-600"; // Critical low (<=5)
    } else if (stock <= 20) {
      return "bg-[#FFF4E5] text-[#B26A00]"; // Low stock
    } else {
      return "bg-[#E6F4EA] text-[#1E7E34]"; // In stock
    }
  };

  const getStockText = (stock: number) => {
    if (stock === 0) return "Out of stock";
    return `${stock} in stock`;
  };

  const [spinning, setSpinning] = useState(false);

  const handleClick = () => {
    setSpinning(true);

    // stop animation after 700ms
    setTimeout(() => {
      setSpinning(false);
    }, 700);
  };

  return (
    <div className="space-y-4">
      <div>
        <AddProductDialog />
      </div>
      <div className="p-6 shadow-2xl  rounded-3xl">
        {/* Search + Add Button Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex-1 w-full sm:max-w-md">
            <div className="relative w-full hidden md:block">
              <input
                type="text"
                placeholder="Search by name"
                className="w-full pl-10 pr-3 py-3 shadow-2xl  rounded-full outline-none focus:ring-2 focus:ring-blue-400"
              />
              <CiSearch className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          <button
            onClick={handleClick}
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
            <div className="w-full overflow-x-auto bg-white rounded-xl shadow-sm ">
              <table className="min-w-[800px] w-full text-sm">
                <thead className="border-b border-[#DBE0E5] bg-[#F8F8F8]">
                  <tr>
                    <th className="px-6 py-4 text-left text-[#6A6A65] text-base font-semibold">
                      Product
                    </th>
                    <th className="px-6 py-4 text-left text-[#6A6A65] text-base font-semibold">
                      BarCode
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
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-5">
                        <div className="font-semibold text-gray-900 whitespace-nowrap">
                          {product.product}
                        </div>
                      </td>
                      {/* <td className="px-6 py-5 text-gray-700 whitespace-nowrap">
                      {user.industry}
                    </td> */}
                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium `}
                        >
                          {product.barcode}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusBadge(product.stock)}`}
                        >
                          {getStockText(product.stock)}
                        </span>
                      </td>
                      <td className="px-6 py-5"> ${product.price}</td>

                      <td className="px-6 py-5 text-right">
                        <button
                          onClick={() => openDialog(product)}
                          className=" cursor-pointer"
                        >
                          <FaAngleRight className="text-[#A4A7AE]" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between px-2 sm:px-4 py-3">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium">{products.length}</span> of{" "}
            <span className="font-medium">20</span> products
          </div>
          <div className="flex items-center gap-2">
            <button className="cursor-pointer rounded-lg border px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100">
              Prev
            </button>
            <div className="min-w-[50px] rounded-md border border-[#E3E3E4] bg-gray-50 px-3 py-1.5 text-center text-sm font-medium text-gray-700 shadow-sm">
              1 / 5
            </div>
            <button className="cursor-pointer rounded-lg border px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryTable;
