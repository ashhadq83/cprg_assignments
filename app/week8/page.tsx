"use client";

import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await gitHubSignIn();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await firebaseSignOut();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <main
      className="relative min-h-screen py-12"
      style={{
        backgroundImage: 'url("/images/background2.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay to ensure text readability - exactly like shopping list page */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            Week 8: Authentication
          </h1>
          <div className="w-24 h-0.5 bg-white/50 mx-auto"></div>
          <p className="text-lg text-white/90 mt-4 drop-shadow">
            Firebase Authentication with GitHub OAuth
          </p>
        </div>

        {/* Back to Home Button - Styled like shopping list cards */}
        <div className="mb-8">
          <button
            onClick={handleBackToHome}
            className="w-full bg-slate-900/80 backdrop-blur-sm rounded-lg p-5 shadow-lg border border-white/10 hover:border-white/20 transition-all duration-200 text-left"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-white text-lg">
                  ← Back to Home
                </span>
                <p className="text-sm text-white/60 mt-0.5">
                  Return to main assignments page
                </p>
              </div>
              <span className="text-white/40">←</span>
            </div>
          </button>
        </div>

        {/* Authentication Card - Matching shopping list styling */}
        <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-white/10 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 drop-shadow">
            {user ? "Welcome to Week 8!" : "Authentication Required"}
          </h2>

          {user ? (
            <div className="space-y-6">
              {/* User Info - Styled to match shopping list theme */}
              <div className="bg-slate-800/50 rounded-lg p-6 border border-white/10">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center text-white text-2xl font-bold border-2 border-white/20">
                    {user.displayName
                      ? user.displayName.charAt(0).toUpperCase()
                      : user.email?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Signed in as</p>
                    <p className="text-xl font-semibold text-white">
                      {user.displayName || "User"}
                    </p>
                    <p className="text-white/80 break-all">
                      {user.email || "No email provided"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons - Matching shopping list button styling */}
              <div className="space-y-4">
                <Link
                  href="/week8/Shoppinglist"
                  className="block w-full bg-blue-500/80 hover:bg-blue-600 backdrop-blur-sm rounded-lg p-5 transition-all duration-200 border border-white/10 hover:border-white/20"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-white text-lg">
                        Go to Shopping List
                      </span>
                      <p className="text-sm text-white/70 mt-0.5">
                        Access your protected shopping list
                      </p>
                    </div>
                    <span className="text-white/60">→</span>
                  </div>
                </Link>

                <button
                  onClick={handleLogout}
                  disabled={isLoading}
                  className="w-full bg-red-500/80 hover:bg-red-600 backdrop-blur-sm rounded-lg p-5 transition-all duration-200 border border-white/10 hover:border-white/20 text-left disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-white text-lg">
                        {isLoading ? "Signing Out..." : "Sign Out"}
                      </span>
                      <p className="text-sm text-white/70 mt-0.5">
                        End your current session
                      </p>
                    </div>
                    {isLoading ? (
                      <svg
                        className="animate-spin h-5 w-5 text-white/60"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      <span className="text-white/60">→</span>
                    )}
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Features List - Styled as info cards matching theme */}
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center space-x-3 p-4 bg-slate-800/50 rounded-lg border border-white/10">
                  <span className="text-green-400 text-xl">✓</span>
                  <span className="text-white/90">
                    Secure GitHub authentication
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-slate-800/50 rounded-lg border border-white/10">
                  <span className="text-green-400 text-xl">✓</span>
                  <span className="text-white/90">
                    Protected shopping list page
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-slate-800/50 rounded-lg border border-white/10">
                  <span className="text-green-400 text-xl">✓</span>
                  <span className="text-white/90">
                    Meal ideas based on your items
                  </span>
                </div>
              </div>

              {/* Login Button - Matching shopping list button styling */}
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full bg-slate-700/80 hover:bg-slate-600 backdrop-blur-sm rounded-lg p-5 transition-all duration-200 border border-white/10 hover:border-white/20 text-left disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-white text-lg">
                      {isLoading
                        ? "Signing in with GitHub..."
                        : "Sign in with GitHub"}
                    </span>
                    <p className="text-sm text-white/70 mt-0.5">
                      Use your GitHub account to authenticate
                    </p>
                  </div>
                  {isLoading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white/60"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <svg
                        className="w-5 h-5 text-white/60"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                      </svg>
                      <span className="text-white/60">→</span>
                    </div>
                  )}
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-white/60 border-t border-white/10 pt-6">
            CPRG 306 • Web Development 2 • Secure Authentication with Firebase
          </p>
        </div>
      </div>
    </main>
  );
}
