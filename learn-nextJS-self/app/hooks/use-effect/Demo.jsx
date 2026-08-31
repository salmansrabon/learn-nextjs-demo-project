'use client';
import { useEffect, useState } from 'react';

export default function Demo() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Runs after the first render. [] is what makes it run only once.
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className="demo">
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
