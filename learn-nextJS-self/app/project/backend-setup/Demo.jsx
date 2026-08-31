'use client';

// Book-only helper, not part of the app you are building.
// It calls GET /api/health so you can confirm the backend is up before
// writing any code against it.

import { useState } from 'react';
import { API_URL } from '@/lib/apiConfig';

export default function HealthCheck() {
  const [raw, setRaw] = useState('');
  const [error, setError] = useState('');

  const ping = async () => {
    setError('');
    setRaw('');

    try {
      const res = await fetch(`${API_URL}/api/health`);
      setRaw(JSON.stringify(await res.json(), null, 2));
    } catch (err) {
      setError(`${err.message} - is the backend running on ${API_URL}?`);
    }
  };

  return (
    <div className="demo">
      <div className="api-actions">
        <button type="button" onClick={ping}>GET /api/health</button>
      </div>
      {error && <div className="api-message error">{error}</div>}
      {raw && <pre className="api-json">{raw}</pre>}
    </div>
  );
}
