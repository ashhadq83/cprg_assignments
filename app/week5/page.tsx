import ItemList from "./item-list";
import React from "react";

const Page: React.FC = () => {
  return (
    <main className="relative min-h-screen">
      {/* Background image container */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-fixed bg-[url('/images/background2.jpg')]"
        aria-hidden="true"
      />

      {/* Dark overlay on top of the background image */}
      <div
        className="fixed inset-0 bg-black opacity-60 pointer-events-none"
        aria-hidden="true"
      />
      {/* Content container with scrolling */}
      <div className="relative p-4 md:p-8 flex items-center justify-center min-h-screen flex-col space-y-6">
        {/* Content sits on top of the overlay */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg">
          Shopping List - Week 5
        </h1>
        <div className="mt-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-7 border border-white/20 max-w-md w-full">
          <ItemList />
        </div>
      </div>
    </main>
  );
};

export default Page;
