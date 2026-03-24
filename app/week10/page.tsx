// app/week10/page.tsx

"use client";

import React from "react";
import Link from "next/link";
import { useUserAuth } from "../week8/_utils/auth-context";

export default function Week10HomePage() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  return (
    <main className="min-h-screen bg-slate-900 py-12">
      <div className="max-w-4xl mx-auto p-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Week 10: Cloud Firestore
          </h1>
          <div className="w-24 h-0.5 bg-gray-300 mx-auto"></div>
          <p className="text-lg text-white mt-4">
            Shopping List with Firebase Database
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          {!user ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Sign In to Continue
              </h2>
              <p className="text-gray-600 mb-6">
                Please sign in with your GitHub account to access your shopping
                list.
              </p>
              <button
                onClick={gitHubSignIn}
                className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center gap-2 mx-auto"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                Sign in with GitHub
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-10 h-10 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Welcome, {user.displayName || user.email || "User"}!
                </h2>
                <p className="text-gray-600">
                  You are signed in with GitHub and ready to manage your
                  shopping list.
                </p>
              </div>

              <div className="flex gap-4 justify-center">
                <Link
                  href="/week10/Shoppinglist"
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Go to Shopping List
                </Link>
                <button
                  onClick={firebaseSignOut}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            About This Assignment
          </h2>
          <div className="space-y-3 text-gray-600">
            <p>
              This shopping list application demonstrates the integration of:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Cloud Firestore for persistent data storage</li>
              <li>Firebase Authentication with GitHub Sign-in</li>
              <li>Real-time data synchronization</li>
              <li>CRUD operations (Create, Read, Update, Delete)</li>
              <li>TypeScript for type safety</li>
            </ul>
            <p className="mt-4 text-sm text-gray-500">
              Each user has their own private shopping list stored in Firestore.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-gray-400 hover:text-white transition-colors"
          >
            ← Back to All Weeks
          </Link>
        </div>
      </div>
    </main>
  );
}
