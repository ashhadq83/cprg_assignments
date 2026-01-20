import Link from 'next/link';
import React from 'react';

const NavBar: React.FC = () => {
  return (
    <>
    <nav >
      <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', padding: 0 }}>
        <li >
          <Link href="/">MyApp</Link>
        </li>
        <li>
          <Link href="/week2">Week 2</Link>
        </li>
      </ul>
    </nav>
    </>
  );
};

export default NavBar;