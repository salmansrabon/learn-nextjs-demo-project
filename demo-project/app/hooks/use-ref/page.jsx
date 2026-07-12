'use client';
import { useRef, useEffect, useState } from 'react';
import PageHeader from '@/components/PageHeader';

export default function UseRefPage() {
  const inputRef = useRef(null);
  const renderCount = useRef(0);
  const [, forceRerender] = useState(0);

  useEffect(() => {
    inputRef.current.focus(); // use case 1: DOM access — auto-focus on mount
  }, []);

  // use case 2: a mutable value that survives renders without causing one.
  // Mutated inside an effect (not directly in the render body) to avoid a
  // server/client hydration mismatch.
  useEffect(() => {
    renderCount.current += 1;
  });

  return (
    <>
      <PageHeader
        title="useRef — DOM Access & Silent Values"
        description="Changing ref.current does not re-render the component — unlike useState."
      />
      <div className="demo">
        <input ref={inputRef} placeholder="Auto-focused on mount" />
        <p>This component has rendered {renderCount.current} time(s).</p>
        <button onClick={() => forceRerender((t) => t + 1)}>Force a re-render</button>
      </div>
    </>
  );
}
