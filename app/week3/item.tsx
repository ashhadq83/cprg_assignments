import React from "react";
import Link from "next/link";

export interface ItemProps {
  name: string;
  quantity: number;
  category: string;
}

const Item: React.FC<ItemProps> = ({ name, quantity, category }) => {
  return (
    <li className="flex items-center justify-between gap-4 px-4 py-2 bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
        <p className="text-xs text-gray-500">{category}</p>
      </div>
      <span className="text-sm font-semibold text-gray-700">{quantity}</span>
    </li>
  );
};

export default Item;
