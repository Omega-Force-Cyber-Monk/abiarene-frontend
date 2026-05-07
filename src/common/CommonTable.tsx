import React from "react";

export interface Column<T> {
  header: string;
  render: (item: T) => React.ReactNode;
  className?: string;
}

interface CommonTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    totalItems?: number;
  };
}

const CommonTable = <T extends { id: string | number }>({
  columns,
  data,
  isLoading,
  emptyMessage = "No data found",
  pagination,
}: CommonTableProps<T>) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0A2540]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="w-full overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
        <table className="min-w-[800px] w-full text-sm">
          <thead className="border-b border-[#DBE0E5] bg-[#F8F8F8]">
            <tr className="border-b border-gray-200 bg-gray-50">
              {columns.map((col, index) => (
                <th
                  key={index}
                  className={`px-4 py-3 text-left text-sm font-semibold text-gray-600 ${col.className || ""}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  {columns.map((col, index) => (
                    <td key={index} className={`px-4 py-3 ${col.className || ""}`}>
                      {col.render(item)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between px-2 py-3">
          <div className="text-sm text-gray-600">
            {pagination.totalItems && (
              <>
                Showing <span className="font-medium">{data.length}</span> of{" "}
                <span className="font-medium">{pagination.totalItems}</span> items
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="cursor-pointer rounded-lg border px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            <div className="min-w-[80px] rounded-md border border-[#E3E3E4] bg-gray-50 px-3 py-1.5 text-center text-sm font-medium text-gray-700 shadow-sm">
              {pagination.currentPage} / {pagination.totalPages}
            </div>
            <button
              onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              className="cursor-pointer rounded-lg border px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommonTable;
