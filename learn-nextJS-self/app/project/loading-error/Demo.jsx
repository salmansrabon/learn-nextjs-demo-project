'use client';

// app/practice/page.jsx  (section 4.2 version)
//
// The same request as 4.1, but honest about what it is doing. Replace the
// 4.1 version of the scratch page with this one.

import { useEffect, useState } from 'react';

export default function PracticePage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // true from the very start
  const [error, setError] = useState('');
  const [breakIt, setBreakIt] = useState(false);

  useEffect(() => {
    // Toggling breakIt points the request at a URL that 404s, so you can
    // see the failure path without unplugging your network.
    const url = breakIt
      ? 'https://jsonplaceholder.typicode.com/does-not-exist'
      : 'https://jsonplaceholder.typicode.com/users';

    async function load() {
      setLoading(true);
      setError('');

      try {
        const res = await fetch(url);

        // IMPORTANT: fetch does NOT throw on 404 or 500. It rejects only
        // when the request never completed at all (network down, CORS).
        // A 404 arrives as a perfectly successful Promise with ok === false,
        // so you have to check it yourself.
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        setUsers(await res.json());
      } catch (err) {
        setUsers([]);
        setError(err.message);
      } finally {
        // finally runs on both paths, so loading can never get stuck on.
        setLoading(false);
      }
    }

    load();
  }, [breakIt]); // re-runs whenever breakIt changes

  return (
    <div className="demo">
      <div className="api-actions">
        <button type="button" onClick={() => setBreakIt((b) => !b)}>
          {breakIt ? 'Use the working URL' : 'Break the URL on purpose'}
        </button>
      </div>

      {/* The three states, in the order you should write them */}
      {loading && <p>Loading users...</p>}

      {error && <div className="api-message error">{error}</div>}

      {!loading && !error && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name} - {user.email}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
