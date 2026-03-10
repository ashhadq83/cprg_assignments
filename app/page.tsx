"use client";
import React from "react";
import Link from "next/link";
import { useUserAuth } from "./week8/_utils/auth-context";

export default function HomePage() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  return (
    <main className="min-h-screen bg-slate-900 py-12">
      <div className="max-w-4xl mx-auto p-8">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            CPRG 306: Web Development 2
          </h1>
          <div className="w-24 h-0.5 bg-gray-300 mx-auto"></div>
          <p className="text-lg text-white mt-4">Assignments & Projects</p>
        </div>

        {/* Week Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/week2"
            className="block bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-800 text-lg">
                  Week 2
                </span>
                <p className="text-sm text-gray-500 mt-0.5">Student Info</p>
              </div>
              <span className="text-gray-400">→</span>
            </div>
          </Link>

          <Link
            href="/week3"
            className="block bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-800 text-lg">
                  Week 3
                </span>
                <p className="text-sm text-gray-500 mt-0.5">Shopping List</p>
              </div>
              <span className="text-gray-400">→</span>
            </div>
          </Link>

          <Link
            href="/week4"
            className="block bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-800 text-lg">
                  Week 4
                </span>
                <p className="text-sm text-gray-500 mt-0.5">
                  Forms & Validation
                </p>
              </div>
              <span className="text-gray-400">→</span>
            </div>
          </Link>

          <Link
            href="/week5"
            className="block bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-800 text-lg">
                  Week 5
                </span>
                <p className="text-sm text-gray-500 mt-0.5">
                  Sorting & Grouping
                </p>
              </div>
              <span className="text-gray-400">→</span>
            </div>
          </Link>

          <Link
            href="/week6"
            className="block bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-800 text-lg">
                  Week 6
                </span>
                <p className="text-sm text-gray-500 mt-0.5">
                  APIs & Data Fetching
                </p>
              </div>
              <span className="text-gray-400">→</span>
            </div>
          </Link>

          <Link
            href="/week7"
            className="block bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-800 text-lg">
                  Week 7
                </span>
                <p className="text-sm text-gray-500 mt-0.5">Advanced Topics</p>
              </div>
              <span className="text-gray-400">→</span>
            </div>
          </Link>
          <Link
            href="/week8"
            className="block bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-800 text-lg">
                  Week 8
                </span>
                <p className="text-sm text-gray-500 mt-0.5">Advanced Topics</p>
              </div>
              <span className="text-gray-400">→</span>
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
