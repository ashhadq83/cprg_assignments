import React from "react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="p-8 font-sans">
      <h1 className="text-3xl font-semibold mb-4">
        CPRG 306: Web Development 2 - Assignments
      </h1>

      <p className="mt-4">
        <Link href="/week2" className="text-blue-600 underline">
          Go to Week 2
        </Link>
      </p>

      <div className="mt-4">
        <Link href="/week3" className="text-blue-600 underline">
          Go to Week 3
        </Link>
      </div>
      <div className="mt-4">
        <Link href="/week4" className="text-blue-600 underline">
          Go to Week 4
        </Link>
      </div>
      <div className="mt-4">
        <Link href="/week5" className="text-blue-600 underline">
          Go to Week 5
        </Link>
      </div>
    </main>
  );
}
