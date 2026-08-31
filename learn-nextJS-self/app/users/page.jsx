'use client';

// app/users/page.jsx
//
// URL: /users
//
// The admin user list. Four jobs, in this order:
//
//   1. guard   — decide whether this visitor is allowed to see the page
//   2. list    — fetch page 1 of the users and render it
//   3. search  — let an admin narrow the list, with Prev/Next paging
//   4. delete  — remove a user, after an in-page confirmation
//
// Everything the page needs already exists: session.js knows how to read
// localStorage, userService.js knows the endpoints, and UserTable knows how
// to draw rows. This file is only the glue: state, effects and decisions.

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken, getUser } from '@/lib/session';
import { getAllUsers, deleteUser } from '@/services/userService';
import Navbar from '@/components/Navbar';
import UserTable from '@/components/UserTable';
import Message from '@/components/Message';
import Field from '@/components/Field';

// Small on purpose: five rows means a handful of users is enough to see the
// pager actually work while you are building this.
const LIMIT = 5;

export default function UsersPage() {
  const router = useRouter();

  // "Have we finished checking the session yet?"
  //
  // This starts true, so the server and the browser's FIRST render produce
  // exactly the same HTML. localStorage does not exist on the server, so
  // reading it while rendering would make the two disagree and React would
  // throw a hydration mismatch. The check therefore happens in an effect,
  // which only ever runs in the browser.
  const [checking, setChecking] = useState(true);

  // TWO pieces of state for ONE search box, and the difference is the point:
  //
  //   search           — what is in the input right now, changes every keystroke
  //   submittedSearch  — what the server was actually asked for
  //
  // Only submittedSearch is in the effect's dependency array. Put the live
  // input value there instead and typing "admin" fires five requests. The
  // other way to solve that is debouncing (wait ~400ms after the last
  // keystroke, then search); an explicit Search button is simpler and gives
  // the user control over when the request happens.
  const [search, setSearch] = useState('');
  const [submittedSearch, setSubmittedSearch] = useState('');

  const [page, setPage] = useState(1);

  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // The user waiting for delete confirmation, or null when nothing is pending.
  // Storing the whole object, not just the id, lets the confirmation say the
  // person's name: "Delete Ada Lovelace?" is a question someone can answer,
  // "Delete user 7?" is not.
  const [pending, setPending] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // load() lives here in the component body rather than inside the effect,
  // because two different things have to call it: the effect below, and every
  // successful delete.
  async function load() {
    setLoading(true);
    setError('');

    try {
      // axios builds ?page=2&limit=5&search=... from this object and
      // URL-encodes each value, so a search for "a b&c" cannot break the URL.
      const res = await getAllUsers({ page, limit: LIMIT, search: submittedSearch });

      // The backend answers { success, message, data }, and for this endpoint
      // data is { users, total, page, limit, totalPages }.
      setUsers(res.data.users);
      setTotal(res.data.total);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      // axios rejects on any non-2xx status, so a 401 or 403 lands here and
      // not in the success branch. The server's own message is the useful
      // one; err.message ("Request failed with status code 403") is the
      // fallback for when the server sent no body at all.
      setUsers([]);
      setTotal(0);
      setTotalPages(1);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // THE ROUTE GUARD.
    //
    // It runs before every fetch, not just once, because the session can go
    // away underneath us: api.js clears the token the moment the server
    // answers 401, so the next paging click should send the visitor to login
    // rather than fire another doomed request.
    const token = getToken();
    const user = getUser();

    if (!token) {
      // Not logged in at all.
      router.push('/login');
      return;
    }

    if (user?.role !== 'admin') {
      // Logged in, but this list is admin-only. Send them somewhere they are
      // allowed to be instead of showing an empty page.
      //
      // Hiding the page is a convenience, not the security boundary: the
      // server returns 403 for a non-admin no matter what this file does.
      router.push('/profile');
      return;
    }

    // Guard passed — only now is it worth asking the server for anything.
    setChecking(false);
    load();

    // Changing either value means "ask the server again". router is stable
    // between renders, and load() is re-created every render on purpose so
    // it always closes over the current page and search.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, submittedSearch]);

  const handleSubmit = (e) => {
    // Without this the browser reloads the page and the whole app restarts.
    e.preventDefault();

    setSuccess('');

    // Reset to page 1 BEFORE storing the new term. Forget this line and an
    // admin sitting on page 3 of 40 users who searches for "sam" asks for
    // page 3 of a 2-row result. The server correctly returns nothing, the
    // table goes blank, and nothing on screen explains why — the search box
    // shows a valid term and the pager still says "Page 3".
    setPage(1);
    setSubmittedSearch(search);
  };

  const handleClear = () => {
    setSearch('');
    setSubmittedSearch('');
    setPage(1);
    setSuccess('');
  };

  // UserTable is presentational: it hands back the whole user object and has
  // no idea what a URL is. Deciding where View and Edit go is this page's job.
  const handleView = (user) => router.push(`/users/${user.id}`);
  const handleEdit = (user) => router.push(`/users/${user.id}/edit`);

  // Nothing is deleted here. This only opens the confirmation.
  //
  // window.confirm() would be shorter, and is the wrong tool: it freezes the
  // whole tab until it is answered, cannot be styled to match the app, and is
  // invisible to a test that only sees the page.
  const askToDelete = (user) => {
    setError('');
    setSuccess('');
    setPending(user);
  };

  const confirmDelete = async () => {
    setDeleting(true);
    setError('');

    try {
      // DELETE carries no body — the id in the URL says everything.
      const res = await deleteUser(pending.id);

      setSuccess(`${res.message} (${pending.firstname} ${pending.lastname})`);
      setPending(null);

      // REFETCH, do not patch the local array. The delete happened on the
      // server; `users` in this component still describes a world that no
      // longer exists, and its total and totalPages are now wrong too.
      //
      // The alternative is an optimistic removal: drop the row immediately,
      // put it back if the request fails. It feels faster, but it is a guess
      // — and when the guess is wrong the user has already been told the
      // delete worked. Refetching is slower and always true.
      if (users.length === 1 && page > 1) {
        // That was the only row on this page, so the page no longer exists.
        // Changing page re-runs the effect, which does the refetch for us.
        setPage((p) => p - 1);
      } else {
        await load();
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setPending(null);
    } finally {
      setDeleting(false);
    }
  };

  if (checking) {
    // Deliberately the same markup the server sent, so hydration matches.
    return (
      <>
        <Navbar />
        <h1>Users</h1>
        <p>Checking your access...</p>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <h1>Users</h1>

      <form className="api-form" onSubmit={handleSubmit} noValidate>
        <Field
          label="Search by name or email"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="e.g. ada"
          disabled={loading}
        />

        <div className="api-actions">
          <button type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
          <button
            type="button"
            className="secondary"
            onClick={handleClear}
            disabled={loading || (!search && !submittedSearch)}
          >
            Clear
          </button>
        </div>
      </form>

      <Message kind="error">{error}</Message>
      <Message kind="success">{success}</Message>

      {/* The confirmation step: ordinary state and ordinary JSX. Nothing is
          blocked while it is open, and it names the person, so an admin can
          see they picked the wrong row before it is too late. */}
      {pending && (
        <div className="api-message info">
          <div>
            Delete <strong>{pending.firstname} {pending.lastname}</strong> ({pending.email})? This
            cannot be undone.
          </div>
          <div className="api-actions">
            <button type="button" className="danger" onClick={confirmDelete} disabled={deleting}>
              {deleting ? 'Deleting...' : 'Yes, delete'}
            </button>
            <button
              type="button"
              className="secondary"
              onClick={() => setPending(null)}
              disabled={deleting}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading && <p>Loading users...</p>}

      {/* Three separate outcomes, and each needs its own words. "No users
          match your search" and "something went wrong" look identical if you
          only ever check users.length. */}
      {!loading && !error && users.length === 0 && (
        <Message kind="info">
          {submittedSearch
            ? `No users match "${submittedSearch}".`
            : 'There are no users to show yet.'}
        </Message>
      )}

      {!loading && !error && users.length > 0 && (
        <UserTable
          users={users}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={askToDelete}
        />
      )}

      {!error && (
        <div className="api-pager">
          {/* Disabled at both ends: page 0 and page 6-of-5 are requests worth
              not making. totalPages comes from the server, not from us. */}
          <button
            type="button"
            onClick={() => setPage((p) => p - 1)}
            disabled={page <= 1 || loading}
          >
            Previous
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            type="button"
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= totalPages || loading}
          >
            Next
          </button>

          <span>
            {total} user{total === 1 ? '' : 's'} found
          </span>
        </div>
      )}
    </>
  );
}
