'use client';
import { useEffect, useState } from 'react';

function Timer({ onLog }) {
  const [count, setCount] = useState(0);

  // MOUNTING + UNMOUNTING — empty dependency array runs once, cleanup on unmount
  useEffect(() => {
    onLog('✅ mounted');
    return () => onLog('❌ unmounted');
  }, []);

  // UPDATING — re-runs on mount, then again every time count changes
  useEffect(() => {
    onLog(`🔄 count updated: ${count}`);
  }, [count]);

  return (
    <div className="demo">
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increase</button>
    </div>
  );
}

export default function Demo() {
  const [showTimer, setShowTimer] = useState(true);
  const [log, setLog] = useState([]);
  const addLog = (msg) => setLog((prev) => [msg, ...prev].slice(0, 8));

  return (
    <>
      <button onClick={() => setShowTimer(!showTimer)}>
        {showTimer ? 'Hide Timer (unmount)' : 'Show Timer (mount)'}
      </button>
      {showTimer && <Timer onLog={addLog} />}
      <h4>Lifecycle log:</h4>
      <ul>{log.map((entry, i) => <li key={i}>{entry}</li>)}</ul>
    </>
  );
}
