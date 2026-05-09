// components/MenuItemCard.tsx

import { MenuItem } from "@/pages/Server/DammyData";

export const MenuItemCard = ({ name, description, price, image }: MenuItem) => {
  return (
    <div className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <img
        src={image}
        alt={name}
        className="w-20 h-20 rounded-xl object-cover"
      />
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h4 className="font-bold text-gray-800">{name}</h4>
          <span className="font-bold text-[#0A2540]">${price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{description}</p>
      </div>
    </div>
  );
};
