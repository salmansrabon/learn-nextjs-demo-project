'use client';
import { useEffect, useState } from 'react';
import PageHeader from '@/components/PageHeader';

export default function UseEffectPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Runs after the first render. [] is what makes it run only once.
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <>
      <PageHeader
        title="useEffect — Fetching Data After Render"
        description="The effect calls a GET API once, after the first render, and stores the response in state."
      />
      <div className="demo">
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
