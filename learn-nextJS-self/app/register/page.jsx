'use client';

// app/register/page.jsx — Create Account page
// URL: http://localhost:3000/register
//
// 'use client' is required because this page uses useState and an onSubmit
// handler. Without it Next.js would render this as a Server Component,
// where hooks and browser events do not exist.

import { useState } from 'react';
import Link from 'next/link';
import Field from '@/components/Field';
import Message from '@/components/Message';
import { register } from '@/services/authService';
import { validateRegisterForm } from '@/utils/validation';

// The empty shape lives outside the component so it is created once, and so
// "clear the form" is a single assignment instead of five.
const EMPTY_FORM = {
  firstname: '',
  lastname: '',
  email: '',
  phonenumber: '',
  password: '',
};

export default function RegisterPage() {
  // ONE state object for all five inputs, not five useState calls. The keys
  // match the `name` on each input, which is what lets a single
  // handleChange serve every field.
  const [form, setForm] = useState(EMPTY_FORM);

  // Per-field validation messages, keyed by field name: { email: '...' }.
  const [errors, setErrors] = useState({});

  // True while the request is in flight. It disables the button so an
  // impatient double-click cannot create the same account twice.
  const [loading, setLoading] = useState(false);

  // The message the SERVER sent back when it refused (duplicate email, etc.).
  const [apiError, setApiError] = useState('');

  // The message the server sent back when it succeeded.
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Copy the previous object and overwrite one key. [name] is a computed
    // property: whichever input fired the event names the key to update.
    // Never mutate `form` directly — React compares by reference and would
    // not re-render.
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear this field's error the moment the user starts fixing it.
    // Leaving the old message up while they type reads as "still wrong".
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    // Without this the browser does a full page reload on submit and the
    // request below never happens.
    e.preventDefault();

    // Clear anything left over from the previous attempt.
    setApiError('');
    setSuccess('');

    // Check the form BEFORE spending a network round trip. An empty object
    // means everything passed.
    const validationErrors = validateRegisterForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // nothing leaves the browser
    }

    setErrors({});
    setLoading(true);

    try {
      // register() posts to /api/auth/register and hands back the whole
      // { success, message, data } envelope the API always replies with.
      const result = await register(form);

      setSuccess(result.message || 'Registration successful.');
      setForm(EMPTY_FORM); // a submitted form should not still hold a password
    } catch (err) {
      // axios REJECTS on any non-2xx status, so this catch is the normal
      // path for "email already registered" — not just for crashes.
      // The useful sentence is the server's own message; err.message alone
      // only ever says "Request failed with status code 400".
      setApiError(
        err.response?.data?.message || 'Registration failed. Please try again.'
      );
    } finally {
      // `finally` runs on both success and failure, so the button can never
      // stay stuck on "Registering...".
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Create your account</h1>

      {/* noValidate turns OFF the browser's built-in validation popups.
          Those grey bubbles cannot be styled, appear one at a time, and
          would fire before our own checks ever run — so the user would see
          two competing sets of messages. With noValidate, the messages
          under each Field are the only ones on screen. */}
      <form className="api-form" onSubmit={handleSubmit} noValidate>
        <Field
          label="First name"
          name="firstname"
          value={form.firstname}
          onChange={handleChange}
          error={errors.firstname}
          placeholder="John"
          disabled={loading}
        />

        <Field
          label="Last name"
          name="lastname"
          value={form.lastname}
          onChange={handleChange}
          error={errors.lastname}
          placeholder="Doe"
          disabled={loading}
        />

        <Field
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="john@example.com"
          disabled={loading}
        />

        <Field
          label="Phone (optional)"
          name="phonenumber"
          value={form.phonenumber}
          onChange={handleChange}
          error={errors.phonenumber}
          placeholder="01712345678"
          disabled={loading}
        />

        {/* type="password" is what turns the characters into dots. */}
        <Field
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="At least 4 characters"
          disabled={loading}
        />

        <div className="api-actions">
          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>

      {/* Message renders nothing at all when its children are empty, so
          these two lines can sit here unconditionally. */}
      <Message kind="error">{apiError}</Message>

      {success && (
        <Message kind="success">
          {success} You can now <Link href="/login">log in</Link> with your
          email and password.
        </Message>
      )}
    </>
  );
}
