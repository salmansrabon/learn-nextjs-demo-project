'use client';

// app/practice/page.jsx
//
// A scratch page for section 4.1. It is not part of the finished app -
// delete it once you have understood it. Nothing here needs the backend.

import { useEffect, useState } from 'react';

export default function PracticePage() {
  // The response has not arrived on the first render, so start with an
  // empty array. Starting with null would break users.map() below.
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // fetch() returns a Promise. res.json() parses the body and returns
    // another Promise, which is why there are two .then() calls.
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []); // [] = run once, after the first render

  return (
    <div className="demo">
      <p>{users.length} users loaded.</p>
      <ul>
        {users.map((user) => (
          // key comes from the data, never the array index
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
