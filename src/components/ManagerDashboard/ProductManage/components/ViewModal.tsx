import React from "react";

interface ViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: any;
}

export const ViewModal = ({
  isOpen,
  onClose,
  title,
  data,
}: ViewModalProps) => {
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
