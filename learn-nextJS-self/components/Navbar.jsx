'use client';

// components/Navbar.jsx
//
// The bar at the top of every page of the app. It shows different links
// depending on who is logged in: an admin, a normal user, or nobody.
//
// The one hard part is WHERE localStorage is read. It must happen inside
// useEffect. Read it while rendering and the server (which has no
// localStorage) produces different HTML from the browser, and React throws
// a hydration mismatch.

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getUser, clearSession } from '@/lib/session';

export default function Navbar() {
  const router = useRouter();

  const [user, setUser] = useState(null);

  // "Has the effect run yet?" This is false on the server AND on the
  // browser's first render, so both produce identical HTML. Only after the
  // effect does the real bar appear.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUser(getUser());
    setReady(true);
  }, []);

  const handleLogout = () => {
    // A JWT is stateless, so there is nothing to tell the server. Logging
    // out is only ever "forget the token".
    clearSession();
    setUser(null);
    router.push('/login');
  };

  if (!ready) {
    // Deliberately identical to what the server sent.
    return <nav className="api-menu">...</nav>;
  }

  return (
    <nav className="api-menu">
      <strong>User Manager</strong>

      {/* Admin-only link. Hiding it is a convenience, not security - the
          server rejects /api/users for a non-admin either way. */}
      {user?.role === 'admin' && <Link href="/users">Users</Link>}

      {user && <Link href="/profile">My profile</Link>}

      <span className="spacer" />

      {user ? (
        <>
          <span>{user.firstname} {user.lastname}</span>
          <span className={`api-role ${user.role}`}>{user.role}</span>
          <button type="button" onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
