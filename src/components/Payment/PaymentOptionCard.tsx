/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { cn } from "@/lib/utils";

interface PaymentOptionCardProps {
  provider: string;
  label: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export const PaymentOptionCard: React.FC<PaymentOptionCardProps> = ({
  provider,
  label,
  icon,
  bgColor,
  textColor,
  isSelected,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-300 cursor-pointer border-2",
        bgColor,
        isSelected ? "border-[#061E49] scale-105 shadow-md" : "border-transparent hover:scale-102 hover:shadow-sm"
      )}
    >
      <div className={cn("mb-3", textColor)}>
        {icon}
      </div>
      <span className={cn("font-semibold text-lg", textColor)}>
        {label}
      </span>
    </button>
  );
};
