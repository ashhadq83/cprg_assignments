"use client";

import { useState } from "react";
import { Item } from "./types";

interface NewItemProps {
  onAddItem: (newItem: Item) => void;
}

export default function NewItem({ onAddItem }: NewItemProps) {
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [category, setCategory] = useState<string>("produce");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Create the new item object
    const newItem: Item = {
      name,
      quantity,
      category,
    };

    // Call the onAddItem prop with the new item
    onAddItem(newItem);

    // Reset form fields
    setName("");
    setQuantity(1);
    setCategory("produce");
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value));
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setCategory(event.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 shadow-sm w-218 mx-auto"
    >
      <h2 className="text-2xl font-bold text-white mb-4">Add New Item</h2>

      <div className="mb-4">
        <label className="block text-white text-sm font-semibold mb-2">
          Name
        </label>
        <input
          type="text"
          placeholder="Enter item name"
          value={name}
          onChange={handleNameChange}
          required
          className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-white text-sm font-semibold mb-2">
            Quantity
          </label>
          <input
            type="number"
            min="1"
            max="99"
            value={quantity}
            onChange={handleQuantityChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex-1">
          <label className="block text-white text-sm font-semibold mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="produce" className="bg-slate-800">
              Produce
            </option>
            <option value="dairy" className="bg-slate-800">
              Dairy
            </option>
            <option value="bakery" className="bg-slate-800">
              Bakery
            </option>
            <option value="meat" className="bg-slate-800">
              Meat
            </option>
            <option value="frozen" className="bg-slate-800">
              Frozen Foods
            </option>
            <option value="canned" className="bg-slate-800">
              Canned Goods
            </option>
            <option value="dry" className="bg-slate-800">
              Dry Goods
            </option>
            <option value="beverages" className="bg-slate-800">
              Beverages
            </option>
            <option value="snacks" className="bg-slate-800">
              Snacks
            </option>
            <option value="other" className="bg-slate-800">
              Other
            </option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
      >
        Add Item
      </button>
    </form>
  );
}
