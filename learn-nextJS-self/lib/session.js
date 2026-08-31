// lib/session.js
//
// Everything that touches localStorage lives here, so no page has to
// remember that the user is stored as a JSON string while the token is
// stored as plain text.
//
// Every function guards with `typeof window === 'undefined'`, because
// localStorage does not exist while Next.js renders on the server. Without
// the guard the very first render on the server would crash.

export function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

export function getUser() {
  if (typeof window === 'undefined') return null;

  const raw = localStorage.getItem('user');
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    // Somebody edited localStorage by hand, or an older version of the app
    // stored a different shape. Treat unreadable data as logged out rather
    // than letting JSON.parse throw and blank the page.
    clearSession();
    return null;
  }
}

export function saveSession(token, user) {
  localStorage.setItem('token', token);
  // localStorage only holds strings, so objects must be stringified.
  localStorage.setItem('user', JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}
