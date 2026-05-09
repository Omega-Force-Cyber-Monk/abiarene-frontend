import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-hot-toast";
import { useCreateInventoryMutation } from "@/redux/features/manager/managerInventory/inventoryApi";

interface AddProductDialogProps {
  onSuccess?: () => void;
}

export default function AddProductDialog({ onSuccess }: AddProductDialogProps) {
  const [open, setOpen] = useState(false);
  const [createInventory, { isLoading }] = useCreateInventoryMutation();

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    barcode: "",
    stock: 0,
    price: 0,
    lowStockThreshold: 5,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "stock" || name === "price" || name === "lowStockThreshold"
          ? parseFloat(value) || 0
          : value,
    }));
  };

  const generateSKU = () => {
    const randomNum = Math.floor(Math.random() * 1000000);
    setFormData((prev) => ({
      ...prev,
      sku: `SKU-${randomNum}`,
    }));
  };

  const generateBarcode = () => {
    const randomNum = Math.floor(Math.random() * 1000000000);
    setFormData((prev) => ({
      ...prev,
      barcode: `BAR-${randomNum}`,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.sku || !formData.barcode) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await createInventory({
        name: formData.name,
        price: formData.price,
        sku: formData.sku,
        barcode: formData.barcode,
        stock: formData.stock,
        lowStockThreshold: formData.lowStockThreshold,
      }).unwrap();

      toast.success("Product added successfully!");
      setFormData({
        name: "",
        sku: "",
        barcode: "",
        stock: 0,
        price: 0,
        lowStockThreshold: 5,
      });
      setOpen(false);
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error("Failed to create product:", error);
      toast.error(error?.data?.message || "Failed to add product");
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setFormData({
      name: "",
      sku: "",
      barcode: "",
      stock: 0,
      price: 0,
      lowStockThreshold: 5,
    });
  };

  return (
    <div className="w-full bg-white border-[#DDDDDD]">
      {/* Add Product Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2 bg-[#061E49] text-white px-5 py-2 cursor-pointer rounded-full shadow-md hover:opacity-90 transition"
        >
          {open ? "Close Form" : "+ Add Product"}
        </button>
      </div>

      {/* Smooth Expand Form */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <form onSubmit={handleSubmit}>
          <div className="bg-[#FFF7EC] rounded-2xl shadow-xl p-6 border border-gray-100">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 border-b border-[#C6CAD1] pb-2">
              <h2 className="text-lg font-semibold text-gray-800">
                New Product Details
              </h2>
              <button
                type="button"
                onClick={handleCancel}
                className="text-gray-500 hover:text-red-500"
              >
                <IoMdClose size={22} />
              </button>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-[#6C7787]">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Farm Chicken"
                  className="w-full bg-white border-[#DDDDDD] mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-[#6C7787]">SKU *</label>
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleInputChange}
                    placeholder="Enter SKU"
                    className="w-full bg-white border-[#DDDDDD] px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
                    required
                  />
                  <button
                    type="button"
                    onClick={generateSKU}
                    className="px-4 py-2 rounded-xl bg-orange-100 text-orange-600 border hover:bg-orange-200 whitespace-nowrap"
                  >
                    Generate
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm text-[#6C7787]">Barcode *</label>
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    name="barcode"
                    value={formData.barcode}
                    onChange={handleInputChange}
                    placeholder="Scan or enter code"
                    className="w-full bg-white border-[#DDDDDD] px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
                    required
                  />
                  <button
                    type="button"
                    onClick={generateBarcode}
                    className="px-4 py-2 rounded-xl bg-orange-100 text-orange-600 border hover:bg-orange-200 whitespace-nowrap"
                  >
                    Generate
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm text-[#6C7787]">Initial Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="w-full bg-white border-[#DDDDDD] mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
                />
              </div>

              <div>
                <label className="text-sm text-[#6C7787]">Price ($)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0"
                  step="0.01"
                  className="w-full bg-white border-[#DDDDDD] mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
                />
              </div>

              <div>
                <label className="text-sm text-[#6C7787]">
                  Low Stock Threshold
                </label>
                <input
                  type="number"
                  name="lowStockThreshold"
                  value={formData.lowStockThreshold}
                  onChange={handleInputChange}
                  placeholder="5"
                  className="w-full bg-white border-[#DDDDDD] mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="px-5 py-2 cursor-pointer rounded-full border hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-2 cursor-pointer rounded-full bg-[#061E49] text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Saving..." : "Save Product"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// import { useState } from "react";
// import { IoMdClose } from "react-icons/io";

// export default function AddProductDialog() {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="w-full bg-white border-[#DDDDDD]">
//       {/* Add Product Button */}
//       <div className="flex justify-end mb-4">
//         <button
//           onClick={() => setOpen((prev) => !prev)}
//           className="flex items-center gap-2 bg-[#061E49] text-white px-5 py-2 cursor-pointer rounded-full shadow-md hover:opacity-90 transition"
//         >
//           {open ? "Close Form" : "+ Add Product"}
//         </button>
//       </div>

//       {/* Smooth Expand Form */}
//       <div
//         className={`overflow-hidden transition-all duration-500 ease-in-out ${
//           open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
//         }`}
//       >
//         <div className="bg-[#FFF7EC] rounded-2xl shadow-xl p-6 border border-gray-100">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-4 border-b border-[#C6CAD1] pb-2">
//             <h2 className="text-lg font-semibold text-gray-800">
//               New Product Details
//             </h2>

//             <button
//               onClick={() => setOpen(false)}
//               className="text-gray-500 hover:text-red-500"
//             >
//               <IoMdClose size={22} />
//             </button>
//           </div>

//           {/* Form */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="text-sm text-[#6C7787]">Product Name</label>
//               <input
//                 type="text"
//                 placeholder="e.g. Farm Chicken"
//                 className="w-full bg-white border-[#DDDDDD] mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
//               />
//             </div>

//             <div>
//               <label className="text-sm text-[#6C7787]">Barcode / SKU</label>
//               <div className="flex gap-2 mt-1">
//                 <input
//                   type="text"
//                   placeholder="Scan or enter code"
//                   className="w-full bg-white border-[#DDDDDD] px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
//                 />
//                 <button className="px-4 py-2 rounded-xl bg-orange-100 text-orange-600 border hover:bg-orange-200">
//                   Generate
//                 </button>
//               </div>
//             </div>

//             <div>
//               <label className="text-sm text-[#6C7787]">Initial Stock</label>
//               <input
//                 type="number"
//                 placeholder="0"
//                 className="w-full bg-white border-[#DDDDDD] mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
//               />
//             </div>

//             <div>
//               <label className="text-sm text-[#6C7787]">Price ($)</label>
//               <input
//                 type="number"
//                 placeholder="0"
//                 className="w-full bg-white border-[#DDDDDD] mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
//               />
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-end gap-3 mt-6">
//             <button
//               onClick={() => setOpen(false)}
//               className="px-5 py-2 cursor-pointer rounded-full border hover:bg-gray-100"
//             >
//               Cancel
//             </button>

//             <button className="px-5 py-2 cursor-pointer rounded-full bg-[#061E49] text-white hover:opacity-90">
//               Save Product
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
