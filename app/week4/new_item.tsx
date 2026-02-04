"use client";

import { useState } from "react";

// Define the Item type
type Item = {
  id: number;
  name: string;
  quantity: number;
  category: string;
};

export default function NewItem() {
  // Form state variables
  const [name, setName] = useState("");
  const [category, setCategory] = useState("produce");
  const [quantity, setQuantity] = useState(1);
  const [nameTouched, setNameTouched] = useState(false);

  // State to store all items
  const [items, setItems] = useState<Item[]>([]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create item object with unique id
    const newItem: Item = {
      id: Date.now(),
      name,
      quantity,
      category,
    };

    // Add item to the list
    setItems([...items, newItem]);

    // Log it
    console.log(newItem);

    // Show alert
    alert(`Added: ${name}, Qty: ${quantity}, Category: ${category}`);

    // Reset fields
    setName("");
    setQuantity(1);
    setCategory("produce");
    setNameTouched(false);
  };

  // Function to get category display name
  const getCategoryName = (value: string) => {
    const categories: { [key: string]: string } = {
      produce: "Produce",
      dairy: "Dairy",
      bakery: "Bakery",
      meat: "Meat",
      frozen: "Frozen Foods",
      canned: "Canned Goods",
      dry: "Dry Goods",
      beverages: "Beverages",
      snacks: "Snacks",
      household: "Household",
      other: "Other",
    };
    return categories[value] || value;
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Form Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">Add New Item</h2>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-white mb-2">
              Item Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setNameTouched(true)}
              required
              className={`w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 border ${
                name === "" && nameTouched
                  ? "border-red-500"
                  : "border-gray-600"
              }`}
              placeholder="Enter item name"
            />
            {name === "" && nameTouched && (
              <p className="text-red-500 text-sm mt-1">Name is required</p>
            )}
            {(!name || name.trim().length < 2) && nameTouched && (
              <p className="text-red-400 text-sm mt-1">
                Please enter at least 2 characters
              </p>
            )}
          </div>

          {/* Quantity Field */}
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-white mb-2">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              min="1"
              max="99"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value) || 1)}
              required
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Field */}
          <div className="mb-4">
            <label htmlFor="category" className="block text-white mb-2">
              Category:
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="produce">Produce</option>
              <option value="dairy">Dairy</option>
              <option value="bakery">Bakery</option>
              <option value="meat">Meat</option>
              <option value="frozen">Frozen Foods</option>
              <option value="canned">Canned Goods</option>
              <option value="dry">Dry Goods</option>
              <option value="beverages">Beverages</option>
              <option value="snacks">Snacks</option>
              <option value="household">Household</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={name === "" || name.length < 2}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            Add Item
          </button>
        </form>
      </div>

      {/* Items List Section */}
      {items.length > 0 && (
        <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-white mb-4">
            Shopping List ({items.length}{" "}
            {items.length === 1 ? "item" : "items"})
          </h2>
          <ul className="space-y-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="bg-gray-700 p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="text-white font-semibold">{item.name}</p>
                  <p className="text-gray-400 text-sm">
                    {getCategoryName(item.category)}
                  </p>
                </div>
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  x{item.quantity}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
