"use client";

import { Item } from "./types";

interface ItemListProps {
  items: Item[];
  onItemSelect: (itemName: string) => void;
  onDeleteItem: (itemId: string) => Promise<void> | void;
}

export default function ItemList({
  items,
  onItemSelect,
  onDeleteItem,
}: ItemListProps) {
  if (items.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center">
        <p className="text-white">No items in your shopping list yet.</p>
        <p className="text-gray-300 text-sm mt-2">
          Add some items using the form!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden">
      <div className="bg-white/20 px-4 py-3 border-b border-white/10">
        <h2 className="text-lg font-semibold text-white">Your Items</h2>
      </div>
      <ul className="divide-y divide-white/10">
        {items.map((item) => (
          <li
            key={item.id}
            className="p-4 hover:bg-white/10 transition-colors group"
          >
            <div className="flex justify-between items-start">
              <div
                className="flex-1 cursor-pointer"
                onClick={() => onItemSelect(item.name)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-white">{item.name}</h3>
                  <span className="text-sm text-gray-300">
                    Qty: {item.quantity}
                  </span>
                </div>
                <p className="text-sm text-gray-300 mt-1">{item.category}</p>
              </div>
              <button
                onClick={async () => {
                  if (item.id) {
                    await onDeleteItem(item.id);
                  }
                }}
                className="ml-4 text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Delete item"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
