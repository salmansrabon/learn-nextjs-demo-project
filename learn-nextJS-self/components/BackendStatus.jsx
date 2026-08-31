'use client';

// BackendStatus.jsx — shown at the top of every lesson from 4.4 onward.
//
// The lessons in this chapter talk to a real Express server. If it isn't
// running, every request fails with the same unhelpful "Failed to fetch".
// This component asks GET /api/health once on mount and says plainly which
// of the two situations you're in.

import { useEffect, useState } from 'react';
import { API_URL } from '@/lib/apiConfig';

export default function BackendStatus() {
  // 'checking' | 'up' | 'down' — three states, same shape as section 4.2
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    let cancelled = false;

    fetch(`${API_URL}/api/health`)
      .then((res) => {
        if (!cancelled) setStatus(res.ok ? 'up' : 'down');
      })
      .catch(() => {
        if (!cancelled) setStatus('down');
      });

    // Cleanup: if the student navigates away mid-request, don't call
    // setStatus on an unmounted component.
    return () => { cancelled = true; };
  }, []);

  if (status === 'checking') {
    return <div className="api-status checking">Checking the backend...</div>;
  }

  if (status === 'up') {
    return (
      <div className="api-status up">
        Backend is running at <code>{API_URL}</code>
      </div>
    );
  }

  return (
    <div className="api-status down">
      <span>
        Backend is not reachable at <code>{API_URL}</code>. Start it with{' '}
        <code>cd user-demo-site/backend &amp;&amp; npm run dev</code> — see section 4.3.
      </span>
    </div>
  );
}
