'use client';

// app/users/[id]/edit/page.jsx
// URL: /users/123/edit
//
// The folder sits INSIDE app/users/[id]/, so the URL keeps the id and adds
// a fixed "edit" segment on the end. useParams() still hands us the same
// params.id it hands the detail page one level up.
//
// This page does two round trips:
//   1. GET  /api/users/:id  on mount, to fill the form with what is stored
//   2. PUT  /api/users/:id  on submit, to save what the admin typed
//
// Both are admin-only on the server.

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Field from '@/components/Field';
import Message from '@/components/Message';
import { getToken, getUser } from '@/lib/session';
import { getUserById, updateUser } from '@/services/userService';
import { validateEditUserForm } from '@/utils/validation';

export default function EditUserPage() {
  const router = useRouter();

  // Same as the detail page: params.id is a STRING. It goes straight into the
  // request URL, so no conversion is needed here.
  const params = useParams();
  const id = params.id;

  // --- route guard -------------------------------------------------------
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  // --- form state --------------------------------------------------------
  //
  // THE IMPORTANT LINE ON THIS PAGE.
  //
  // `form` starts as null, NOT as an object of empty strings, and the JSX
  // below refuses to render the inputs until it is a real object.
  //
  // Why it matters: an input whose `value` is undefined or null is treated by
  // React as UNCONTROLLED — the browser owns the text, not React. When the
  // GET later resolves and a real string arrives, React switches the same
  // input to controlled and logs
  //
  //   "A component is changing an uncontrolled input to be controlled"
  //
  // to the console. It is only a warning, it is easy to scroll past, and the
  // symptom users report is much stranger: text they typed disappears. Never
  // let an input's value be undefined or null, not even for one render.
  const [form, setForm] = useState(null);

  // Per-field messages from validateEditUserForm, keyed by field name.
  const [errors, setErrors] = useState({});

  // Two separate flags, because they describe two different requests.
  // `loading` is the GET that fills the form; `saving` is the PUT that stores
  // it. Share one flag and submitting the form would blank the very inputs
  // the admin is looking at.
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.replace('/login');
      return;
    }

    const currentUser = getUser();

    if (currentUser?.role !== 'admin') {
      router.replace('/profile');
      return;
    }

    setAllowed(true);
    setChecking(false);
  }, [router]);

  useEffect(() => {
    if (!allowed) return;

    async function loadUser() {
      setLoading(true);
      setError('');

      try {
        const res = await getUserById(id);
        setForm(seedForm(res.data));
      } catch (err) {
        const status = err.response?.status;
        const serverMessage = err.response?.data?.message;

        if (status === 403) {
          setError('Only administrators can edit users.');
        } else if (status === 404) {
          setError(`No user found with id ${id}.`);
        } else {
          setError(serverMessage || err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [allowed, id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    // The functional form of the setter. `previous` is guaranteed to be the
    // latest state, and spreading it keeps the other fields untouched — the
    // computed key [name] overwrites just the one that changed.
    setForm((previous) => ({ ...previous, [name]: value }));

    // Clear this field's error the moment the admin starts fixing it. Leaving
    // a red message under an input that is now correct is confusing.
    setErrors((previous) => ({ ...previous, [name]: '' }));

    // Any edit invalidates the last "Saved" banner.
    setSuccess('');
  };

  const handleSubmit = async (event) => {
    // A <form> reloads the whole page on submit by default, which would throw
    // away all of this component's state. preventDefault stops that.
    event.preventDefault();

    setError('');
    setSuccess('');

    // Validate before spending a network round trip on data we already know
    // is wrong. This is a convenience for the admin, not a security check —
    // the server validates again, and only the server's answer is trusted.
    const foundErrors = validateEditUserForm(form);
    setErrors(foundErrors);

    if (Object.keys(foundErrors).length > 0) return;

    setSaving(true);

    try {
      // PUT, not PATCH. The two differ in intent: PUT sends the complete new
      // state of the record, PATCH sends only the changed pieces. This form
      // holds every editable field and sends all of them, so PUT is the
      // honest verb — and it is what this backend implements.
      //
      // Note how the two halves of the request are split: WHICH record to
      // change travels in the URL (/api/users/123), and WHAT to change it to
      // travels in the body. Putting the id in the body as well is a common
      // mistake; the server reads it from the URL and ignores it.
      const res = await updateUser(id, form);

      // The server's own wording, not a hardcoded "Saved!". If the backend
      // ever changes what it did, the message changes with it.
      setSuccess(res.message);

      // Re-seed from the response rather than leaving the typed values in
      // place. The server may have trimmed whitespace or lowercased the
      // email, and the form should show what is actually stored now.
      setForm(seedForm(res.data));
    } catch (err) {
      const status = err.response?.status;
      const serverMessage = err.response?.data?.message;

      if (status === 403) {
        setError('Only administrators can edit users.');
      } else {
        // A duplicate email comes back as a 400 with a real explanation in
        // the body, which is exactly what the admin needs to read.
        setError(serverMessage || err.message);
      }
    } finally {
      setSaving(false);
    }
  };

  if (checking) {
    return (
      <>
        <Navbar />
        <p>Checking your access...</p>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <h1>Edit user</h1>

      {loading && <p>Loading user...</p>}

      <Message kind="error">{error}</Message>
      <Message kind="success">{success}</Message>

      {/* The other half of the null-form rule: no form until there is state to
          bind it to. `form &&` is what actually keeps every value a string. */}
      {form && (
        <form className="api-form" onSubmit={handleSubmit}>
          <Field
            label="First name"
            name="firstname"
            value={form.firstname}
            onChange={handleChange}
            error={errors.firstname}
            disabled={saving}
          />

          <Field
            label="Last name"
            name="lastname"
            value={form.lastname}
            onChange={handleChange}
            error={errors.lastname}
            disabled={saving}
          />

          <Field
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            disabled={saving}
          />

          <Field
            label="Phone"
            name="phonenumber"
            value={form.phonenumber}
            onChange={handleChange}
            error={errors.phonenumber}
            placeholder="01700000000"
            disabled={saving}
          />

          {/* Field only renders an <input>, so the role dropdown is written
              out by hand. It reuses the same .api-field wrapper so it lines up
              with the inputs above, and its own <label htmlFor> points at the
              select's id — clicking the word "Role" then focuses the box. */}
          <div className="api-field">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={form.role}
              onChange={handleChange}
              disabled={saving}
            >
              {/* In React a <select> is controlled through value on the select
                  itself, never through `selected` on an <option>. */}
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
          </div>

          <div className="api-actions">
            {/* type="submit" is the default inside a form, but writing it out
                makes the pair below unambiguous. */}
            <button type="submit" disabled={saving}>
              {saving ? 'Saving...' : 'Save changes'}
            </button>

            {/* type="button" is essential here. Without it this button would
                also submit the form — the browser's default for any button
                inside a <form>. */}
            <button
              type="button"
              className="secondary"
              disabled={saving}
              onClick={() => router.push(`/users/${id}`)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </>
  );
}

// Turns an API user record into form state.
//
// `?? ''` on every field is the point of this helper. The phone column is
// nullable, so a user who never gave one comes back as phonenumber: null —
// and binding null to an input is the uncontrolled-input bug described above.
// ?? substitutes only for null and undefined, so a genuine 0 or '' survives
// untouched, which || would not manage.
function seedForm(user) {
  return {
    firstname: user.firstname ?? '',
    lastname: user.lastname ?? '',
    email: user.email ?? '',
    phonenumber: user.phonenumber ?? '',
    role: user.role ?? 'user',
  };
}
