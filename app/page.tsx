import React from "react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto p-8">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent mb-3">
            CPRG 306: Web Development 2
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          <p className="text-xl text-gray-600 mt-4 font-light">
            Assignments & Projects
          </p>
        </div>

        {/* Week Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/week2"
            className="group relative overflow-hidden bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl mr-3"></span>
                <span className="font-semibold text-gray-800 text-lg">
                  Week 2
                </span>
                <p className="text-sm text-gray-500 mt-1">Student Info</p>
              </div>
              <span className="text-blue-600 group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </div>
          </Link>

          <Link
            href="/week3"
            className="group relative overflow-hidden bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl mr-3">🛒</span>
                <span className="font-semibold text-gray-800 text-lg">
                  Week 3
                </span>
                <p className="text-sm text-gray-500 mt-1">Shopping List</p>
              </div>
              <span className="text-green-600 group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </div>
          </Link>

          <Link
            href="/week4"
            className="group relative overflow-hidden bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl mr-3">📝</span>
                <span className="font-semibold text-gray-800 text-lg">
                  Week 4
                </span>
                <p className="text-sm text-gray-500 mt-1">Forms & Validation</p>
              </div>
              <span className="text-purple-600 group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </div>
          </Link>

          <Link
            href="/week5"
            className="group relative overflow-hidden bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl mr-3">📊</span>
                <span className="font-semibold text-gray-800 text-lg">
                  Week 5
                </span>
                <p className="text-sm text-gray-500 mt-1">Sorting & Grouping</p>
              </div>
              <span className="text-orange-600 group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm border-t border-gray-200 pt-6">
          <p>CPRG 306 • SAIT • Web Development 2</p>
        </div>
      </div>
    </main>
  );
}
