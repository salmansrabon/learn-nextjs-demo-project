'use client';

// app/users/[id]/page.jsx
// URL: /users/123   (123, 7, abc — anything in that position)
//
// The folder on disk is literally named [id]. Next.js treats the square
// brackets as "match any single segment here" and hands the matched text to
// the page. One folder therefore serves every user's detail page.
//
// Admin-only. GET /api/users/:id is behind adminMiddleware on the server, so
// a normal user's token gets a 403 no matter what the UI shows. The guard
// below exists to send people somewhere sensible, not to secure anything.

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Message from '@/components/Message';
import { getToken, getUser } from '@/lib/session';
import { getUserById } from '@/services/userService';
import { API_URL } from '@/lib/apiConfig';

export default function UserDetailPage() {
  const router = useRouter();

  // useParams() reads the values Next matched out of the URL. The keys are
  // the folder names without the brackets, so [id] arrives as `params.id`.
  //
  // IMPORTANT: the value is ALWAYS a string. A URL has no types — /users/12
  // gives you the string '12', never the number 12. That trips up almost
  // everybody once:
  //
  //   id === 12          // false  ('12' is not 12)
  //   id == 12           // true   (== converts, but avoid it)
  //   Number(id) === 12  // true   (convert on purpose, then compare)
  //
  // Here we only pass it straight back to the API inside a URL, so the string
  // is exactly what we want and no conversion is needed. Convert only when
  // you genuinely need to compare or do arithmetic.
  const params = useParams();
  const id = params.id;

  // --- route guard state -------------------------------------------------
  // `checking` starts true so the server render and the browser's FIRST
  // render produce the same markup. localStorage does not exist on the
  // server, so reading it during render would make the two disagree and
  // React would report a hydration mismatch. The effect runs only in the
  // browser, after that first paint.
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  // --- data state --------------------------------------------------------
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [forbidden, setForbidden] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = getToken();

    // No token at all: nobody is logged in.
    if (!token) {
      // replace() instead of push() so the Back button does not bounce the
      // visitor straight back onto a page they cannot see.
      router.replace('/login');
      return;
    }

    const currentUser = getUser();

    // Logged in, but not an admin. /profile is the page they DO own, so send
    // them there rather than to a dead end.
    if (currentUser?.role !== 'admin') {
      router.replace('/profile');
      return;
    }

    // Note that `checking` is left true on both redirect paths. The page keeps
    // showing its neutral placeholder while the router navigates away, instead
    // of flashing content the visitor is not allowed to see.
    setAllowed(true);
    setChecking(false);
  }, [router]);

  useEffect(() => {
    // Do not fetch until the guard has said yes. Without this the request
    // would fire on the very first render, before we know who is asking.
    if (!allowed) return;

    async function loadUser() {
      setLoading(true);
      setError('');
      setNotFound(false);
      setForbidden(false);

      try {
        const res = await getUserById(id);
        // The API answers { success, message, data }, so the record itself
        // lives one level down in res.data.
        setUser(res.data);
      } catch (err) {
        setUser(null);

        // axios REJECTS on any non-2xx status, so every failure lands here.
        // The status tells us what went wrong; the server's own wording is
        // the useful part of the body. err.message alone would only ever say
        // "Request failed with status code 403".
        const status = err.response?.status;
        const serverMessage = err.response?.data?.message;

        if (status === 403) {
          // A valid token that does not belong to an admin.
          setForbidden(true);
        } else if (status === 404) {
          // A valid request for an id that is not in the database.
          setNotFound(true);
        } else {
          // 500s, and the network being down (no err.response at all).
          setError(serverMessage || err.message);
        }
      } finally {
        // finally runs after both success and failure, so the spinner can
        // never be left on screen forever.
        setLoading(false);
      }
    }

    loadUser();
    // `id` is in the list because clicking through to another user changes
    // the URL without unmounting this page. Leave it out and the page would
    // keep showing the first user it ever loaded.
  }, [allowed, id]);

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

      <h1>User details</h1>

      {loading && <p>Loading user...</p>}

      {/* Three distinct outcomes, three distinct explanations. Collapsing
          them into one "Something went wrong" would leave the reader with no
          idea whether to log in again, fix the URL, or retry. */}
      {forbidden && (
        <Message kind="error">
          This page is for administrators only. Your account doesn&apos;t have
          permission to view other users.
        </Message>
      )}

      {notFound && (
        <Message kind="error">
          No user found with id {id}. They may have been deleted.
        </Message>
      )}

      <Message kind="error">{error}</Message>

      {/* `user &&` guards the whole block. Render it before the fetch resolves
          and user.firstname would throw, because user is still null. */}
      {user && (
        <div className="api-detail">
          <div>
            <span className="label">ID</span>
            <span>{user.id}</span>
          </div>

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
            {/* The column is nullable, so an account created without a phone
                stores null. React renders null as nothing at all, which would
                leave the row looking broken — say so instead. */}
            <span>{user.phonenumber || 'Not provided'}</span>
          </div>

          <div>
            <span className="label">Role</span>
            <span className={`api-role ${user.role}`}>{user.role}</span>
          </div>

          <div>
            <span className="label">Joined</span>
            {/* created_at arrives as an ISO string such as
                "2026-01-14T09:31:00.000Z". new Date() parses it and
                toLocaleDateString() prints it the way the reader's own
                computer writes dates. */}
            <span>{new Date(user.created_at).toLocaleDateString()}</span>
          </div>

          {/* Only render the photo row when there is a photo. Skip this check
              and the src becomes "http://localhost:5000null" and the browser
              shows a broken image. */}
          {user.photoUrl && (
            <div>
              <span className="label">Photo</span>
              {/* photoUrl is a path like /uploads/abc.jpg — a path, not a full
                  address — so it has to be joined onto API_URL. The images are
                  served by the backend on a different port from Next.js.

                  A plain <img> rather than next/image: next/image would need
                  the backend host registered in next.config.js first, which is
                  a detour from what this page is teaching. */}
              <img
                className="api-photo"
                src={`${API_URL}${user.photoUrl}`}
                alt={`${user.firstname} ${user.lastname}`}
              />
            </div>
          )}
        </div>
      )}

      <div className="api-actions">
        {/* Buttons that navigate, so both live in the same styled row.
            router.push() adds a history entry, exactly like clicking a link. */}
        <button
          type="button"
          className="secondary"
          onClick={() => router.push('/users')}
        >
          Back to list
        </button>

        {/* Nothing to edit until the record has actually loaded. */}
        <button
          type="button"
          disabled={!user}
          onClick={() => router.push(`/users/${id}/edit`)}
        >
          Edit
        </button>
      </div>
    </>
  );
}
