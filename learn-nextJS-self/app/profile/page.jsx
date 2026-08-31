'use client';

// app/profile/page.jsx
// URL: /profile
//
// The page a normal user lands on after logging in. Both roles may open it,
// and each one sees their OWN record — there is no id anywhere in this file.
//
// WHAT A NORMAL USER CAN AND CANNOT DO HERE
//
// Read: this page calls GET /api/auth/me, which every logged-in account may
// call. The server works out who is asking from the token alone, so no id is
// ever sent and there is no field to tamper with. Changing the URL cannot
// make it return somebody else's record — that is why /auth/me exists
// alongside the admin-only /users/:id.
//
// Write: the ONLY thing a normal user may change is their photo, through
// PUT /api/users/profile/photo. Name, email and phone are deliberately not
// editable here. The endpoint that changes them, PUT /api/users/:id, is
// admin-only, so a non-admin calling it gets a 403 — no matter how the form
// is built. Adding those inputs would produce a page that looks like it
// works and fails on every submit, so this page does not attempt it. Users
// ask an administrator instead; the admin edits them at /users/:id/edit.

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Message from '@/components/Message';
import { getToken } from '@/lib/session';
import { getMe } from '@/services/authService';
import { updateProfilePhoto } from '@/services/userService';
import { API_URL } from '@/lib/apiConfig';

export default function ProfilePage() {
  const router = useRouter();

  // Same hydration-safe pattern as the admin pages: false on the server and
  // on the browser's first render, so both produce identical HTML. The token
  // lives in localStorage, which does not exist while Next renders on the
  // server, so it can only be read inside an effect.
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // The only requirement is "logged in". No role check — an admin viewing
    // their own profile is a perfectly normal thing to do.
    if (!getToken()) {
      router.replace('/login');
      return;
    }

    setAllowed(true);
    setChecking(false);
  }, [router]);

  useEffect(() => {
    if (!allowed) return;

    async function loadMe() {
      setLoading(true);
      setError('');

      try {
        const res = await getMe();
        setUser(res.data);
      } catch (err) {
        // A 401 means the token expired while the tab sat open. The response
        // interceptor in services/api.js has already cleared it, so the next
        // reload lands on /login by itself.
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    }

    loadMe();
  }, [allowed]);

  const handlePhotoChange = async (event) => {
    // Hold on to the element now. It is needed again in `finally`, and
    // reading event.target after an await is easy to get wrong.
    const input = event.target;

    // files is a list, because an <input type="file"> can allow several. This
    // one does not, so there is at most one entry. It is empty when the
    // visitor opened the picker and then cancelled — nothing to upload.
    const file = input.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');
    setSuccess('');

    try {
      // A file cannot travel as JSON. FormData packages it as a multipart
      // request instead — the same encoding an old-fashioned HTML form uses
      // to upload a file.
      const formData = new FormData();

      // 'photo' is not a free choice: it must match the field name the
      // server's upload middleware listens for. Spell it differently and the
      // request arrives with no file attached.
      formData.append('photo', file);

      const res = await updateProfilePhoto(formData);

      // The response carries the updated record, including the new photoUrl,
      // so the picture on screen refreshes without a second GET.
      setUser(res.data);
      setSuccess(res.message);
    } catch (err) {
      // Typical failures: the file is larger than the server allows, or it is
      // not an image type the server accepts. Both come back with a real
      // explanation in the body.
      setError(err.response?.data?.message || err.message);
    } finally {
      setUploading(false);

      // Clear the input's value. The change event fires when the value
      // CHANGES, so re-picking the very same file after a failed upload would
      // otherwise be silently ignored.
      input.value = '';
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

      <h1>My profile</h1>

      {loading && <p>Loading your profile...</p>}

      <Message kind="error">{error}</Message>
      <Message kind="success">{success}</Message>

      {user && (
        <>
          <div className="api-detail">
            <div>
              <span className="label">Name</span>
              <span>{user.firstname} {user.lastname}</span>
            </div>

            <div>
              <span className="label">Email</span>
              <span>{user.email}</span>
            </div>

            <div>
              <span className="label">Phone</span>
              <span>{user.phonenumber || 'Not provided'}</span>
            </div>

            <div>
              <span className="label">Role</span>
              <span className={`api-role ${user.role}`}>{user.role}</span>
            </div>

            <div>
              <span className="label">Joined</span>
              <span>{new Date(user.created_at).toLocaleDateString()}</span>
            </div>

            <div>
              <span className="label">Photo</span>
              {user.photoUrl ? (
                // photoUrl is a path such as /uploads/abc.jpg, so it has to be
                // joined onto API_URL — the images are served by the backend,
                // on a different port from the Next.js app.
                <img
                  className="api-photo"
                  src={`${API_URL}${user.photoUrl}`}
                  alt={`${user.firstname} ${user.lastname}`}
                />
              ) : (
                <span>No photo yet</span>
              )}
            </div>
          </div>

          {/* The one editable thing on the page. There is no Save button on
              purpose: choosing a file IS the action, so the upload starts from
              the input's own onChange. */}
          <div className="api-field">
            <label htmlFor="photo">Change your photo</label>
            <input
              id="photo"
              name="photo"
              type="file"
              // accept only filters what the file picker shows first. The
              // server checks the real type as well, because this attribute is
              // a hint to the browser and nothing more.
              accept="image/*"
              onChange={handlePhotoChange}
              disabled={uploading}
            />
          </div>

          {uploading && <p>Uploading your photo...</p>}

          <p className="warn">
            Your name, email and phone number can&apos;t be changed here. Please
            ask an administrator if any of them needs updating.
          </p>

          {/* An admin who clicks "My profile" still has work to get back to.
              Without this link the page is a dead end for them. Normal users
              never see it — and hiding it is only tidiness, since the server
              rejects /api/users for a non-admin regardless. */}
          {user.role === 'admin' && (
            <p>
              <Link href="/users">Go to user management</Link>
            </p>
          )}
        </>
      )}
    </>
  );
}
