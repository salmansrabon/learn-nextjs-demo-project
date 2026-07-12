'use client';
import { useEffect, useState } from 'react';
import PageHeader from '@/components/PageHeader';

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

export default function UseEffectPage() {
  const [showTimer, setShowTimer] = useState(true);
  const [log, setLog] = useState([]);
  const addLog = (msg) => setLog((prev) => [msg, ...prev].slice(0, 8));

  return (
    <>
      <PageHeader
        title="useEffect — Dependencies & Lifecycle"
        description="[] = run once on mount. [count] = mount + every time count changes. The returned function runs on unmount."
      />
      <button onClick={() => setShowTimer(!showTimer)}>
        {showTimer ? 'Hide Timer (unmount)' : 'Show Timer (mount)'}
      </button>
      {showTimer && <Timer onLog={addLog} />}
      <h4>Lifecycle log:</h4>
      <ul>{log.map((entry, i) => <li key={i}>{entry}</li>)}</ul>
    </>
  );
}
