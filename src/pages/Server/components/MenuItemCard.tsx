import React from "react";

interface MenuItemProps {
  name: string;
  price: number;
  description: string;
  image: string;
  onAdd?: () => void;
}

export const MenuItemCard: React.FC<MenuItemProps> = ({ name, price, description, image, onAdd }) => (
  <div
    onClick={onAdd}
    className="relative h-64 sm:h-80 md:h-96 rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden cursor-pointer group shadow-xl"
  >
    {/* Background Image */}
    <img src={image} alt={name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />

    {/* Dark Overlay for better text readability */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

    {/* Bottom Content */}
    <div className="absolute bottom-0 w-full p-4 sm:p-8 flex justify-between items-end">
      <div className="flex-1">
        <h3 className="text-[#FFB800] text-lg sm:text-2xl font-bold leading-none mb-1 sm:mb-2">{name}</h3>
        <p className="text-white/90 text-[10px] sm:text-sm leading-snug max-w-[150px] sm:max-w-[200px] font-medium line-clamp-2">{description}</p>
      </div>
      <span className="text-[#FFB800] text-xl sm:text-3xl font-black ml-4">${price.toFixed(2)}</span>
    </div>
  </div>
);