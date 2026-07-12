'use client';
import { useState, useCallback, memo } from 'react';
import PageHeader from '@/components/PageHeader';

const Child = memo(function Child({ onIncrement }) {
  console.log('Child rendered'); // watch the console while typing below
  return <button onClick={onIncrement}>Increment (child button)</button>;
});

export default function UseCallbackPage() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // useCallback keeps the SAME function reference across renders (deps: []).
  // Without it, Child (wrapped in memo) would re-render on every keystroke
  // below, even though nothing it actually uses has changed.
  const handleIncrement = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  return (
    <>
      <PageHeader
        title="useCallback — Memoize a Function"
        description="Open the console. Typing below will NOT log 'Child rendered' because handleIncrement's reference stays stable."
      />
      <div className="demo">
        <p>Count: {count}</p>
        <Child onIncrement={handleIncrement} />
        <input
          placeholder="Type here — Child should NOT re-render"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </>
  );
}
