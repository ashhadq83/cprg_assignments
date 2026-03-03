"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";

interface ShoppingItem {
  id?: string;
  name: string;
  quantity: number;
  category: string;
}

export default function Page() {
  const [items, setItems] = useState<ShoppingItem[]>(itemsData);
  const [selectedItemName, setSelectedItemName] = useState<string | null>(null);

  const handleAddItem = (newItem: ShoppingItem) => {
    setItems([...items, newItem]);
  };

  const handleItemSelect = (itemName: string) => {
    setSelectedItemName(
      itemName
        .split(",")[0]
        .replace(
          /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
          "",
        )
        .trim(),
    );
  };

  return (
    <main
      className="relative min-h-screen py-8"
      style={{
        backgroundImage: 'url("/images/background2.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8 text-center drop-shadow-lg">
          Shopping List
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left column - Shopping list components */}
          <div className="flex-1 flex flex-col gap-6">
            <NewItem onAddItem={handleAddItem} />
            <ItemList items={items} onItemSelect={handleItemSelect} />
          </div>

          {/* Right column - Meal ideas */}
          <div className="flex-1">
            <MealIdeas ingredient={selectedItemName} />
          </div>
        </div>
      </div>
    </main>
  );
}
