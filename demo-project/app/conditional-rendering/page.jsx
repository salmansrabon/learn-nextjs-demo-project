'use client';
import { useState } from 'react';
import PageHeader from '@/components/PageHeader';

export default function ConditionalRenderingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [apiError, setApiError] = useState('');

  return (
    <>
      <PageHeader
        title="Conditional Rendering"
        description="Use && for one case, a ternary for two, and null/false/undefined to render nothing."
      />
      <div className="demo">
        <button onClick={() => setIsLoggedIn(!isLoggedIn)}>Toggle Login State</button>
        <button onClick={() => setApiError(apiError ? '' : 'Something went wrong')}>Toggle Error</button>

        {/* Pattern 1: && — render only when the condition is true */}
        {apiError && <p style={{ color: 'crimson' }}>{apiError}</p>}

        {/* Pattern 2: ternary — render one of two options */}
        <p>{isLoggedIn ? 'Welcome back!' : 'Please log in.'}</p>

        {/* Pattern 3: null, undefined, and false render nothing */}
        {false && <p>You will never see this line.</p>}
      </div>
    </>
  );
}
