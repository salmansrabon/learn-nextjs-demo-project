'use client';

// app/login/page.jsx — Login page
// URL: http://localhost:3000/login
//
// On success this page does three things in order:
//   1. save the token + user so the rest of the app stays logged in
//   2. decide where to go based on the user's role
//   3. navigate there
//
// 'use client' is required: useState, useRouter and onSubmit all need the
// browser.

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Field from '@/components/Field';
import Message from '@/components/Message';
import { login } from '@/services/authService';
import { saveSession } from '@/lib/session';
import { validateLoginForm } from '@/utils/validation';

export default function LoginPage() {
  // useRouter comes from 'next/navigation', NOT 'next/router'.
  // 'next/router' belongs to the old Pages Router; importing it inside the
  // App Router throws at runtime with "NextRouter was not mounted".
  const router = useRouter();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    // One handler for both inputs: the input's `name` picks the key.
    setForm((prev) => ({ ...prev, [name]: value }));

    // Drop this field's error as soon as the user edits it.
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    // Stops the browser from reloading the page on submit.
    e.preventDefault();
    setApiError('');

    const validationErrors = validateLoginForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // a blank password never needs a network call to be rejected
    }

    setErrors({});
    setLoading(true);

    try {
      // The API replies { success, message, data: { token, user } }.
      const result = await login(form);
      const { token, user } = result.data;

      // saveSession writes to localStorage, which only exists in the
      // browser. That is safe here without a `typeof window` check: this
      // line runs inside a click/submit handler, and a handler can only
      // fire in a browser that already painted the button. lib/session.js
      // guards its READ functions because those can be called while
      // Next.js renders the page on the server, where there is no window.
      //
      // localStorage (rather than useState) is what makes the login
      // survive a refresh and a closed tab.
      saveSession(token, user);

      // Role decides the destination. An admin manages everybody; a normal
      // user only ever sees their own record.
      if (user.role === 'admin') {
        router.push('/users');
      } else {
        router.push('/profile');
      }

      // Note: no setLoading(false) after a successful push. The button
      // should stay disabled while the next page loads.
    } catch (err) {
      // axios rejects on any non-2xx response, so a wrong password lands
      // here. The server explains what went wrong in its JSON body; read
      // that, because err.message alone only says "Request failed with
      // status code 401".
      setApiError(
        err.response?.data?.message || 'Login failed. Please check your email and password.'
      );
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Login</h1>

      {/* noValidate switches off the browser's own validation bubbles so
          the only messages on screen are the ones under each Field. */}
      <form className="api-form" onSubmit={handleSubmit} noValidate>
        <Field
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="admin@test.com"
          disabled={loading}
        />

        <Field
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Your password"
          disabled={loading}
        />

        <div className="api-actions">
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>

      {/* Renders nothing while apiError is an empty string. */}
      <Message kind="error">{apiError}</Message>

      <Message kind="info">
        The seeded administrator account is <strong>admin@test.com</strong> —
        log in with it to reach the user list. Don&apos;t have an account?{' '}
        <Link href="/register">Register here</Link>.
      </Message>
    </>
  );
}
