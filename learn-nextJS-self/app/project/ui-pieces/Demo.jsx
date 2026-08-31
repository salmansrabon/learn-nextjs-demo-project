'use client';

// Book-only preview of the two components created in this section.
// Type in the box to watch the error clear itself.

import { useState } from 'react';
import Field from '@/components/Field';
import Message from '@/components/Message';

export default function UiPiecesPreview() {
  const [email, setEmail] = useState('not-an-email');

  const error = email.includes('@') ? '' : 'Invalid email format';

  return (
    <div className="demo">
      <div className="api-form">
        <Field
          label="Email"
          name="preview-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
        />
      </div>

      <Message kind="error">Something went wrong on the server.</Message>
      <Message kind="success">Saved.</Message>
      <Message kind="info">A hint the user might need.</Message>
      <Message kind="error">{''}</Message>
    </div>
  );
}
