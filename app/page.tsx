// app/page.tsx
import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'Inter, sans-serif' }}>
      <h1>CPRG 306: Web Development 2 - Assignments</h1>
      <p style={{ marginTop: '1rem' }}>
        <Link href="/week2" style={{ color: 'blue', textDecoration: 'underline' }}>
          Go to Week 2
        </Link>
      </p>
    </main>
  );
}