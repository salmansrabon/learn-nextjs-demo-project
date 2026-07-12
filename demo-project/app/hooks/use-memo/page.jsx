'use client';
import { useState, useMemo } from 'react';
import PageHeader from '@/components/PageHeader';

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Carl' },
  { id: 4, name: 'Diana' },
];

export default function UseMemoPage() {
  const [search, setSearch] = useState('');
  const [unrelated, setUnrelated] = useState(0);

  const filteredUsers = useMemo(() => {
    console.log('Filtering users...'); // open the console and watch when this logs
    return users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()));
  }, [search]); // only recomputes when 'search' changes

  return (
    <>
      <PageHeader
        title="useMemo — Memoize a Computed Value"
        description="Open the console. Clicking 'Re-render' will NOT log 'Filtering users...' because 'search' didn't change."
      />
      <div className="demo">
        <input placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <button onClick={() => setUnrelated((n) => n + 1)}>Re-render (unrelated state: {unrelated})</button>
        <ul>{filteredUsers.map((u) => <li key={u.id}>{u.name}</li>)}</ul>
      </div>
    </>
  );
}
