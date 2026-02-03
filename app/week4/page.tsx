import React from "react";
import NewItem from "./new_item";

const Page: React.FC = () => {
  return (
    <main className="relative min-h-screen">
      {/* Background image container */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-fixed bg-[url('/images/background.png')]"
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
          Shopping List - Week 4
        </h1>
        <div className="mt-6 bg-zinc-600 backdrop-blur-sm rounded-2xl shadow-xl p-7 border border-gray-300 max-w-md w-full">
          <NewItem />
        </div>
      </div>
    </main>
  );
};

export default Page;
