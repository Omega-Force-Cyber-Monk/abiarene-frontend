import React, { useState } from "react";
import { BsArrowUpCircle } from "react-icons/bs";
import { SlBadge } from "react-icons/sl";
import { RiDeleteBinLine, RiUserForbidLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

import Issuerefund from "@/assets/webvixxen/icon/Issuerefund.svg";
import { CiImport } from "react-icons/ci";
const ConversationsTable = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"refund" | "rating" | null>(
    null,
  );
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newUser, setNewUser] = useState({
    name: "",
    role: "",
    status: "active",
    rating: 0,
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [users, setUsers] = useState([
    {
      id: "USR-001",
      name: "John Smith",
      role: "Admin",
      status: "active",
      rating: 4.5,
    },
    {
      id: "USR-002",
      name: "Sarah Johnson",
      role: "Voice",
      status: "active",
      rating: 4.2,
    },
    {
      id: "USR-003",
      name: "Michael Chen",
      role: "Ear",
      status: "active",
      rating: 3.8,
    },
    {
      id: "USR-004",
      name: "Emily Rodriguez",
      role: "Admin",
      status: "suspended",
      rating: 2.5,
    },
    {
      id: "USR-005",
      name: "David Kim",
      role: "Voice",
      status: "suspended",
      rating: 3.0,
    },
    {
      id: "USR-006",
      name: "Lisa Thompson",
      role: "Ear ",
      status: "active",
      rating: 4.7,
    },
  ]);

  // Input handler
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  // Handle refund action
  const handleRefund = () => {
    console.log("Refund issued for:", selectedUser);
    setIsDialogOpen(false);
    setDialogType(null);
    setSelectedUser(null);
  };

  // Handle rating update
  const handleRatingUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers[editingIndex] = {
        ...updatedUsers[editingIndex],
        rating: newUser.rating,
      };
      setUsers(updatedUsers);
      console.log(
        "Rating Updated for:",
        selectedUser?.name,
        "to",
        newUser.rating,
      );
    }

    setIsDialogOpen(false);
    setDialogType(null);
    setSelectedUser(null);
    setEditingIndex(null);
    setNewUser({ name: "", role: "", status: "active", rating: 0 });
  };

  // Open refund dialog
  const openRefundDialog = (user: any, index: number) => {
    setSelectedUser(user);
    setDialogType("refund");
    setIsDialogOpen(true);
  };

  // Open rating dialog
  const openRatingDialog = (user: any, index: number) => {
    setSelectedUser(user);
    setDialogType("rating");
    setEditingIndex(index);
    setNewUser({
      name: user.name,
      role: user.role,
      status: user.status,
      rating: user.rating,
    });
    setIsDialogOpen(true);
  };

  // role badge colors
  const getRoleBadge = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-[#FBEBFF] text-[#CD13D0]";
      case "voice":
        return "bg-[#FFFFC7] text-[#CEA500]";
      case "ear":
        return "bg-[#EBF3FF] text-[#0088FF]";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-[#EDE6F4] text-[#6D2C93]";
      case "suspended":
        return "bg-red-100 text-red-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Render star rating
  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="flex items-center">
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${
                i < fullStars
                  ? "text-yellow-400"
                  : i === fullStars && hasHalfStar
                    ? "text-yellow-400/50"
                    : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="">
      {/* Search + Add Button Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Conversation Logs & Performance
        </h1>
        <div>
          <button
            type="submit"
            className="cursor-pointer flex gap-2 justify-center px-4 py-2 text-base text-white  bg-[linear-gradient(180deg,#A503A3_0%,#3F0193_100%)] shadow-md rounded-lg hover:shadow-xl hover:brightness-110 transition"
          >
            <CiImport className=" text-xl" />
            Export Logs
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-4 gap-5">
        <div className="xl:col-span-4 w-full">
          <div className="w-full overflow-x-auto bg-white rounded-xl shadow-sm border border-[#E3E3E4]">
            <table className="min-w-[800px] w-full text-sm">
              <thead className="border-b border-[#DBE0E5] bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-[#6D0C70] text-base font-semibold">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-[#6D0C70] text-base font-semibold">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-[#6D0C70] text-base font-semibold">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-[#6D0C70] text-base font-semibold">
                    Rating/Tier
                  </th>
                  <th className="px-6 py-4 text-center text-[#6D0C70] text-base font-semibold">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-5">
                      <div className="font-semibold text-gray-900 whitespace-nowrap">
                        {user.name}
                      </div>
                    </td>
                    {/* <td className="px-6 py-5 text-gray-700 whitespace-nowrap">
                      {user.role}
                    </td> */}
                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${getRoleBadge(user.role)}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusBadge(user.status)}`}
                      >
                        {user.status.charAt(0).toUpperCase() +
                          user.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-5">{renderRating(user.rating)}</td>

                    <td className="px-6 py-5 text-center">
                      <div className="flex justify-center items-center gap-4">
                        <BsArrowUpCircle className="w-5 h-5 text-gray-600 hover:text-gray-800 cursor-pointer" />

                        <SlBadge className="w-5 h-5 text-gray-600 hover:text-gray-800 cursor-pointer" />

                        <RiUserForbidLine
                          onClick={() => openRefundDialog(user, index)}
                          className="w-5 h-5 text-gray-600 hover:text-gray-800 cursor-pointer"
                        />

                        <RiDeleteBinLine
                          onClick={() => openRatingDialog(user, index)}
                          className="w-5 h-5 text-gray-600 hover:text-gray-800 cursor-pointer"
                        />
                      </div>
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
          Showing <span className="font-medium">{users.length}</span> of{" "}
          <span className="font-medium">20</span> users
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

      {/* Dynamic Dialog based on type */}
      {isDialogOpen && dialogType === "refund" && selectedUser && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 border border-gray-200">
            <div className=" flex justify-between items-center">
              <h2 className="text-lg font-semibold text-[#6D0C70] ">
                Issue Refund
              </h2>

              <p
                className=" cursor-pointer "
                onClick={() => {
                  setIsDialogOpen(false);
                  setDialogType(null);
                  setSelectedUser(null);
                }}
              >
                <RxCross2 />
              </p>
            </div>
            <hr className="my-4 border-gray-200" />

            <div className="space-y-4">
              <div className=" space-y-3">
                <div className=" flex justify-center items-center">
                  <div>
                    <img src={Issuerefund} alt="" />
                  </div>
                </div>
                <div className=" text-center">
                  <h1 className=" text-xl font-semibold text-[#6D0C70]">
                    Upgrade Tier{" "}
                  </h1>
                </div>
                <p className=" text-center">
                  Are you sure you want to upgrade Marcus Chen to the next ear
                  tier?
                </p>
              </div>

              <div className="flex gap-3 pt-4 w-full">
                <button
                  type="button"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setDialogType(null);
                    setSelectedUser(null);
                  }}
                  className="w-full cursor-pointer px-4 py-2 text-base font-medium  text-[#3F0193] border border-[#3F0193] rounded-lg  bg-white hover:bg-[#f3e8ff] transition shadow-sm hover:shadow-md"
                >
                  Cancel
                </button>

                <button
                  onClick={handleRefund}
                  className="w-full cursor-pointer px-4 py-2 text-base text-white bg-[linear-gradient(180deg,#A503A3_0%,#3F0193_100%)] shadow-md rounded-lg hover:shadow-xl hover:brightness-110 transition"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isDialogOpen && dialogType === "rating" && selectedUser && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-[#6D0C70] mb-3">
              Adjust Rating
            </h2>

            <hr className="my-4 border-gray-200" />
            <p>Adjust the community rating for Sarah Jenkins.</p>

            <form onSubmit={handleRatingUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  NEW RATING (0.0 - 5.0)
                </label>
                <input
                  type="number"
                  name="rating"
                  value={newUser.rating}
                  onChange={handleInputChange}
                  required
                  min="0"
                  max="5"
                  step="0.1"
                  placeholder="Enter rating"
                  className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:ring-2 focus:ring-[#346778] focus:border-[#346778] focus:outline-none placeholder-gray-400"
                />
              </div>
              <div className="flex gap-3 pt-4 w-full">
                <button
                  type="button"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setDialogType(null);
                    setSelectedUser(null);
                    setEditingIndex(null);
                    setNewUser({
                      name: "",
                      role: "",
                      status: "active",
                      rating: 0,
                    });
                  }}
                  className="w-full cursor-pointer px-4 py-2 text-base font-medium text-[#3F0193] border border-[#3F0193] rounded-lg bg-white hover:bg-[#f3e8ff] transition shadow-sm hover:shadow-md"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-full cursor-pointer px-4 py-2 text-base text-white  bg-[linear-gradient(180deg,#A503A3_0%,#3F0193_100%)] shadow-md rounded-lg hover:shadow-xl hover:brightness-110 transition"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationsTable;
