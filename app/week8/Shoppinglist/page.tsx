"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";
import { useUserAuth } from "../_utils/auth-context";

interface ShoppingItem {
  id?: string;
  name: string;
  quantity: number;
  category: string;
}

export default function Page() {
  const [items, setItems] = useState<ShoppingItem[]>(itemsData);
  const [selectedItemName, setSelectedItemName] = useState<string | null>(null);
  const { user, firebaseSignOut } = useUserAuth();
  const router = useRouter();

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!user) {
      router.push("/week8");
    }
  }, [user, router]);

  const handleAddItem = (newItem: ShoppingItem) => {
    // Generate a unique ID for the new item
    const itemWithId = {
      ...newItem,
      id: Math.random().toString(36).substr(2, 9),
    };
    setItems([...items, itemWithId]);
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

  const handleLogout = async (): Promise<void> => {
    try {
      await firebaseSignOut();
      // Redirect will happen automatically via the useEffect
    } catch (error) {
      console.log(error);
    }
  };

  // Don't render anything if not authenticated
  if (!user) {
    return null;
  }

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
        {/* Header with title and user section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">
            Shopping List
          </h1>

          {/* User info and logout button */}
          <div className="flex items-center gap-4 bg-black/30 backdrop-blur-md p-3 rounded-lg border border-white/10">
            <div className="text-white text-right">
              <p className="text-sm opacity-75">Signed in as</p>
              <p className="font-semibold">
                {user?.displayName || user?.email || "User"}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
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
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>

        {/* Main content area */}
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
