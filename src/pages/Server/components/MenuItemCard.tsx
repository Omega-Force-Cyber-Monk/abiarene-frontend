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
    className="relative h-80 rounded-[2.5rem] overflow-hidden cursor-pointer group shadow-lg"
  >
    {/* Background Image */}
    <img src={image} alt={name} className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110" />
    
    {/* Bottom Glass Overlay */}
    <div className="absolute bottom-0 w-full p-6 bg-black/40 backdrop-blur-md flex justify-between items-end">
      <div className="text-white">
        <h3 className="text-[#FFB800] text-xl font-bold">{name}</h3>
        <p className="text-gray-200 text-xs mt-1 leading-tight max-w-[150px]">{description}</p>
      </div>
      <span className="text-[#FFB800] text-2xl font-black">${price.toFixed(2)}</span>
    </div>
  </div>
);