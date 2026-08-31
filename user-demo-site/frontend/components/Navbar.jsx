'use client';

// Navbar.jsx — Top navigation bar shown on all protected pages
//
// 'use client' is required because this component uses useState, useEffect,
// and localStorage — all browser-only APIs.
// localStorage is read inside useEffect to avoid SSR hydration mismatch.

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { logout } from '../services/authService';

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Runs only in the browser after render — safe to read localStorage here
    const raw = localStorage.getItem('user');
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch {}
    }
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    router.push('/login');
  };

  return (
    <nav className="navbar navbar-dark bg-primary px-4 shadow-sm">
      <Link href="/" className="navbar-brand fw-bold">
        User Management App
      </Link>

      <div className="d-flex align-items-center gap-3">
        {user ? (
          <>
            <span className="text-white small">
              {user.firstname} {user.lastname}
              {' '}
              <span className="badge bg-light text-primary ms-1">{user.role}</span>
            </span>

            {user.role === 'admin' ? (
              <Link href="/admin/users" className="text-white text-decoration-none small">Users</Link>
            ) : (
              <Link href="/profile" className="text-white text-decoration-none small">Profile</Link>
            )}

            <button
              onClick={handleLogout}
              className="btn btn-light btn-sm"
              data-testid="logout-button"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-white text-decoration-none small">Login</Link>
            <Link href="/register" className="btn btn-outline-light btn-sm">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
