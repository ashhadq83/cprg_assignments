import React from "react";
import ItemList from "./itemlist";

const Page: React.FC = () => {
  return (
    <main
      className="min-h-screen p-4 md:p-8 bg-cover bg-center bg-fixed
      bg-[url('/week3/background.png')] flex items-center justify-center"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 drop-shadow-lg">
          Shopping List
        </h1>
        <p className="text-gray-600 mb-8">
          Your complete grocery shopping companion
        </p>

        <div className="bg-zinc-600 backdrop-blur-sm rounded-2xl shadow-xl p-7 border border-gray-300">
          <ItemList />
        </div>

        <div className="mt-8 text-sm text-gray-600 bg-white/80 backdrop-blur-sm rounded-lg p-4">
          <p>Total items: 12 | Organize by category for easier shopping!</p>
        </div>
      </div>
    </main>
  );
};

export default Page;
