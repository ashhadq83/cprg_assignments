"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import { useUserAuth } from "../../week8/_utils/auth-context";
import {
  getItems,
  addItem,
  deleteItem,
} from "../_services/shopping-list-service";
import { Item, ItemInput } from "./types";

type SortKey = "name" | "quantity" | "category";
type SortOrder = "asc" | "desc";
type GroupMode = "none" | "category";

export default function Page() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItemName, setSelectedItemName] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [groupMode, setGroupMode] = useState<GroupMode>("none");
  const { user, firebaseSignOut } = useUserAuth();
  const router = useRouter();

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!user) {
      router.push("/week8");
    }
  }, [user, router]);

  // Load items from Firestore when user is authenticated
  useEffect(() => {
    if (user) {
      loadItems();
    }
  }, [user]);

  const loadItems = async (): Promise<void> => {
    if (!user) return;

    setLoading(true);
    try {
      const fetchedItems = await getItems(user.uid);
      setItems(fetchedItems);
    } catch (error) {
      console.error("Error loading items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (newItem: ItemInput): Promise<void> => {
    if (!user) return;

    try {
      const newItemId = await addItem(user.uid, newItem);
      const itemWithId: Item = { ...newItem, id: newItemId };
      setItems([...items, itemWithId]);
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item. Please try again.");
    }
  };

  const handleDeleteItem = async (itemId: string): Promise<void> => {
    if (!user) return;

    try {
      const success = await deleteItem(user.uid, itemId);
      if (success) {
        setItems(items.filter((item) => item.id !== itemId));
      } else {
        alert("Failed to delete item. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item. Please try again.");
    }
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
    } catch (error) {
      console.log(error);
    }
  };

  const toggleSortOrder = () =>
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));

  const handleSortKey = (key: SortKey) => {
    if (sortKey === key) {
      toggleSortOrder();
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  // Sort items
  const sortedItems = [...items].sort((a, b) => {
    let valA: string | number = a[sortKey] ?? "";
    let valB: string | number = b[sortKey] ?? "";

    if (sortKey === "quantity") {
      valA = Number(valA);
      valB = Number(valB);
      return sortOrder === "asc" ? valA - valB : valB - valA;
    }

    return sortOrder === "asc"
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  // Group items if groupMode is "category"
  const groupedItems: Record<string, Item[]> =
    groupMode === "category"
      ? sortedItems.reduce(
          (acc, item) => {
            const cat = item.category || "Uncategorized";
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(item);
            return acc;
          },
          {} as Record<string, Item[]>,
        )
      : { All: sortedItems };

  const sortButtonClass = (key: SortKey) =>
    `px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
      sortKey === key
        ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
        : "bg-white/10 text-white/80 hover:bg-white/20"
    }`;

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
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg tracking-tight">
            🛒 Shopping List
          </h1>

          {/* User info and logout */}
          <div className="flex items-center gap-4 bg-black/30 backdrop-blur-md p-3 rounded-xl border border-white/10 shadow-xl">
            <div className="text-white text-right">
              <p className="text-xs opacity-60 uppercase tracking-wider">
                Signed in as
              </p>
              <p className="font-semibold text-sm">
                {user?.displayName || user?.email || "User"}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 active:scale-95 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm font-medium shadow-lg shadow-red-500/20"
            >
              <svg
                className="w-4 h-4"
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

        {/* Sort & Group Controls */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/10 shadow-xl p-4 mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Sort controls */}
          <div className="flex flex-col gap-1.5">
            <span className="text-white/50 text-xs uppercase tracking-widest font-semibold">
              Sort by
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              {(["name", "quantity", "category"] as SortKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => handleSortKey(key)}
                  className={sortButtonClass(key)}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                  {sortKey === key && (
                    <span className="text-white/80 text-xs">
                      {sortOrder === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-10 bg-white/10" />

          {/* Group controls */}
          <div className="flex flex-col gap-1.5">
            <span className="text-white/50 text-xs uppercase tracking-widest font-semibold">
              Group by
            </span>
            <div className="flex items-center gap-2">
              {(["none", "category"] as GroupMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setGroupMode(mode)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    groupMode === mode
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                      : "bg-white/10 text-white/80 hover:bg-white/20"
                  }`}
                >
                  {mode === "none" ? "None" : "Category"}
                </button>
              ))}
            </div>
          </div>

          {/* Item count badge */}
          <div className="ml-auto flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
            <span className="text-white/60 text-xs">Total</span>
            <span className="text-white font-bold text-lg leading-none">
              {items.length}
            </span>
            <span className="text-white/60 text-xs">
              {items.length === 1 ? "item" : "items"}
            </span>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left column */}
          <div className="flex-1 flex flex-col gap-6">
            <NewItem onAddItem={handleAddItem} />

            {loading ? (
              <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/10 p-8 text-center shadow-xl">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                  <p className="text-white/70 text-sm">Loading your items...</p>
                </div>
              </div>
            ) : items.length === 0 ? (
              <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/10 p-10 text-center shadow-xl">
                <p className="text-3xl mb-2">🛍️</p>
                <p className="text-white font-medium">Your list is empty</p>
                <p className="text-white/50 text-sm mt-1">
                  Add an item above to get started
                </p>
              </div>
            ) : groupMode === "category" ? (
              // Grouped view
              <div className="flex flex-col gap-4">
                {Object.entries(groupedItems)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([category, categoryItems]) => (
                    <div
                      key={category}
                      className="bg-white/10 backdrop-blur-md rounded-xl border border-white/10 shadow-xl overflow-hidden"
                    >
                      {/* Category header */}
                      <div className="bg-white/10 px-4 py-2.5 flex items-center justify-between border-b border-white/10">
                        <span className="text-white font-semibold text-sm uppercase tracking-wider">
                          {category}
                        </span>
                        <span className="bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                          {categoryItems.length}
                        </span>
                      </div>
                      {/* Items within category */}
                      <div className="p-2">
                        <ItemList
                          items={categoryItems}
                          onItemSelect={handleItemSelect}
                          onDeleteItem={handleDeleteItem}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              // Flat view
              <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/10 shadow-xl overflow-hidden">
                <ItemList
                  items={sortedItems}
                  onItemSelect={handleItemSelect}
                  onDeleteItem={handleDeleteItem}
                />
              </div>
            )}
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
