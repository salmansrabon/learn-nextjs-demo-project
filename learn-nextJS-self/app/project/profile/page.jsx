import PageHeader from '@/components/PageHeader';
import Theory from '@/components/Theory';
import CodePanel from '@/components/CodePanel';
import BackendStatus from '@/components/BackendStatus';
import OpenApp from '@/components/OpenApp';
import { readSource } from '@/lib/readSource';

export default function ProfileLesson() {
  return (
    <>
      <PageHeader
        title="4.15 The normal user: their own profile, and nothing else"
        description="What the other half of the app looks like when you are not an admin."
      />
      <Theory>
        <h3>The whole app, from the other side</h3>
        <p>
          Every section since 4.10 has been the admin experience. Log in with an account you
          registered in 4.7 and the same application becomes something much smaller: one page,
          showing one record - your own.
        </p>
        <table>
          <thead>
            <tr><th></th><th>admin</th><th>user</th></tr>
          </thead>
          <tbody>
            <tr><td>Lands after login on</td><td><code>/users</code></td><td><code>/profile</code></td></tr>
            <tr><td>Navbar shows</td><td>Users, My profile</td><td>My profile</td></tr>
            <tr><td>Can list every user</td><td>yes</td><td>no - 403</td></tr>
            <tr><td>Can open <code>/users/7</code></td><td>yes</td><td>no - 403</td></tr>
            <tr><td>Can see their own record</td><td>yes</td><td>yes</td></tr>
            <tr><td>Can change their own photo</td><td>yes</td><td>yes</td></tr>
          </tbody>
        </table>

        <h3>getMe() cannot leak anybody else</h3>
        <p>
          This is the nicest piece of API design in the backend. <code>GET /api/auth/me</code> takes
          no id. The server reads the token, finds the id inside it, and returns that record.
        </p>
        <p>
          There is no parameter to tamper with. Compare it to{' '}
          <code>GET /api/users/:id</code>, where the id comes from the caller and the server must
          therefore check permissions before answering. An endpoint that derives identity from the
          token instead of from the request cannot be made to return the wrong person.
        </p>

        <h3>The guard here is different</h3>
        <p>
          The admin pages check for a token <em>and</em> for <code>role === &apos;admin&apos;</code>.
          This one checks only for a token, because both roles are allowed. An admin who visits{' '}
          <code>/profile</code> sees their own record like anyone else - with an extra link back to
          the user list so they are not stranded.
        </p>

        <h3>What a normal user cannot change, and why</h3>
        <p className="warn">
          This backend gives a normal user no way to edit their own name, email or phone. The only
          route that updates those fields is <code>PUT /api/users/:id</code>, and it sits behind{' '}
          <code>adminMiddleware</code> - so a non-admin calling it gets <strong>403</strong>,
          whether they call it from your form or from the console.
        </p>
        <p>
          So the profile page is read-only apart from the photo, and it says so. That is the honest
          implementation of this API. Building an edit form here would produce a page that looks
          like it works and fails on submit for every user who is not an admin.
        </p>
        <p className="note">
          If you wanted self-service edits, the change belongs on the server: a{' '}
          <code>PUT /api/auth/me</code> route that takes the id from the token, exactly as{' '}
          <code>getMe</code> does, and refuses to touch <code>role</code>. That is a backend
          exercise, and this chapter deliberately does not modify the backend.
        </p>

        <h3>Uploading a file is not JSON</h3>
        <p>
          The photo upload is the one request in the app that does not send JSON. A file goes in a{' '}
          <code>FormData</code> object under the key the server expects - <code>photo</code> - and
          the <code>Content-Type</code> becomes <code>multipart/form-data</code>.
        </p>
        <p>
          <code>photoUrl</code> comes back as a path such as <code>/uploads/abc.jpg</code>, so the
          image src is built as <code>{'`${API_URL}${user.photoUrl}`'}</code>. The page updates its
          user from the response rather than guessing the new filename.
        </p>

        <h3>Prove the boundary to yourself</h3>
        <ol>
          <li>Log in as a normal user. The Users link is absent from the navbar.</li>
          <li>Type <code>/users</code> into the address bar anyway. The page loads - the guard sends you back to <code>/profile</code>.</li>
          <li>Open DevTools and call the endpoint directly. The server answers <strong>403 Access denied. Admins only.</strong></li>
        </ol>
        <p>
          Step 2 is your UI being helpful. Step 3 is the thing that actually protects the data. This
          is the point the whole chapter has been building toward.
        </p>

        <h3>Create this file</h3>
      </Theory>
      <BackendStatus />
      <CodePanel label="app/profile/page.jsx" code={readSource('app/profile/page.jsx')} />
      <OpenApp href="/profile">Open your profile</OpenApp>
    </>
  );
}
