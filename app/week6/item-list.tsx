"use client";

import { useState } from "react";
import Item from "./item";

interface ShoppingItem {
  id?: string; // Make id optional since new items might not have it
  name: string;
  quantity: number;
  category: string;
}

interface ItemListProps {
  items: ShoppingItem[]; // Accept items as a prop
}

export default function ItemList({ items }: ItemListProps) {
  const [sortBy, setSortBy] = useState<"name" | "category" | "grouped">("name");

  // Function to sort items - now using props items
  const getSortedItems = () => {
    if (sortBy === "grouped") {
      return items;
    }

    // Create a copy before sorting to avoid mutating props
    return [...items].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else {
        return a.category.localeCompare(b.category);
      }
    });
  };

  // Function to group items by category - now using props items
  const getGroupedItems = () => {
    const grouped = items.reduce(
      (acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
      },
      {} as Record<string, ShoppingItem[]>,
    );

    // Sort categories alphabetically
    const sortedCategories = Object.keys(grouped).sort();

    // Sort items within each category by name
    sortedCategories.forEach((category) => {
      grouped[category].sort((a, b) => a.name.localeCompare(b.name));
    });

    return { grouped, sortedCategories };
  };

  const sortedItems = getSortedItems();
  const { grouped, sortedCategories } = getGroupedItems();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <span className="text-white font-semibold mr-2 whitespace-nowrap">
          Sort by:
        </span>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex flex-1 gap-3">
            <button
              className={`px-4 py-2 rounded-lg transition-all flex-1 text-center ${
                sortBy === "name"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => setSortBy("name")}
            >
              Name
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-all flex-1 text-center ${
                sortBy === "category"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => setSortBy("category")}
            >
              Category
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-all flex-1 text-center ${
                sortBy === "grouped"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => setSortBy("grouped")}
            >
              Group by Category
            </button>
          </div>
        </div>

        <div className="text-sm text-white">
          {sortBy === "name" && "Sorted alphabetically by name"}
          {sortBy === "category" && "Sorted by category"}
          {sortBy === "grouped" && "Grouped by category, sorted alphabetically"}
        </div>
      </div>

      {sortBy !== "grouped" ? (
        <ul className="space-y-3">
          {sortedItems.map((item, index) => (
            <Item
              key={item.id || index} // Use id if available, otherwise fallback to index
              name={item.name}
              quantity={item.quantity}
              category={item.category}
            />
          ))}
        </ul>
      ) : (
        <div className="space-y-6">
          {sortedCategories.map((category) => (
            <div
              key={category}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-white mb-4 capitalize border-b pb-2">
                {category}
              </h2>
              <ul className="space-y-3">
                {grouped[category].map((item, index) => (
                  <Item
                    key={item.id || index} // Use id if available, otherwise fallback to index
                    name={item.name}
                    quantity={item.quantity}
                    category={item.category}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 text-center text-white text-sm">
        Total items: {items.length}
      </div>
    </div>
  );
}
