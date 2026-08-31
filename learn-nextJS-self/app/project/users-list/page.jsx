import PageHeader from '@/components/PageHeader';
import Theory from '@/components/Theory';
import CodePanel from '@/components/CodePanel';
import BackendStatus from '@/components/BackendStatus';
import OpenApp from '@/components/OpenApp';
import { readSource } from '@/lib/readSource';

export default function UsersListLesson() {
  return (
    <>
      <PageHeader
        title="4.10 The admin user list"
        description="A guarded route, an authenticated GET, and a table component that knows no URLs."
      />
      <Theory>
        <h3>One page, four jobs</h3>
        <p>
          <code>app/users/page.jsx</code> is the biggest file in the app because it does four things
          at once: it guards the route, lists users, searches them, and deletes them. This section
          covers the first two. Section 4.11 covers the search and pagination in the same file, and
          4.14 covers the delete. It is one file - the panels in those sections show the same
          finished code from a different angle.
        </p>

        <h3>Guarding the route</h3>
        <p>
          Two checks, in this order:
        </p>
        <ul>
          <li>No token at all - send them to <code>/login</code>. They are not logged in.</li>
          <li>A token, but <code>role !== &apos;admin&apos;</code> - send them to <code>/profile</code>, the page they are allowed to see.</li>
        </ul>
        <p>
          Both reads happen inside <code>useEffect</code> behind a <code>checking</code> flag, for
          exactly the reason 4.9 explained: <code>localStorage</code> does not exist during the
          server render, so reading it while rendering would produce different HTML on the two
          passes.
        </p>
        <p className="warn">
          This guard is a redirect, not a defence. It stops a normal user landing on a page full of
          errors. It does not stop them calling <code>GET /api/users</code> directly - the server
          does that, with a 403.
        </p>

        <h3>Where the Authorization header went</h3>
        <p>
          Nowhere in this page will you find <code>Authorization: Bearer</code>. The request
          interceptor from 4.5 adds it to every call, so the page just says{' '}
          <code>getAllUsers(...)</code>. That is the payoff of the services layer: the page is about
          users, not about HTTP.
        </p>

        <h3>UserTable takes callbacks, not URLs</h3>
        <p>
          <code>UserTable</code> renders rows and calls back. It does not fetch, does not delete,
          and does not know that a user detail page lives at <code>/users/:id</code>. The page
          passes <code>onView</code>, <code>onEdit</code> and <code>onDelete</code>, and decides
          what each one means.
        </p>
        <p>
          That split is worth the extra prop. It means the table can be dropped into any page - one
          that navigates, one that opens a drawer, one that does nothing at all - without editing
          the table. Every action prop is optional, so a page that has not learned deleting yet
          simply omits <code>onDelete</code> and the button disappears.
        </p>

        <h3>Reading the response</h3>
        <p>
          The server answers <code>{'{'} success, message, data {'}'}</code>, and for this endpoint{' '}
          <code>data</code> is <code>{'{'} users, total, page, limit, totalPages {'}'}</code>. So the
          array is at <code>result.data.users</code> - a double unwrap that trips people up once.
        </p>

        <h3>Four states, not one</h3>
        <table>
          <thead>
            <tr><th>State</th><th>What the user sees</th></tr>
          </thead>
          <tbody>
            <tr><td>Checking the session</td><td>Nothing yet - identical to what the server rendered</td></tr>
            <tr><td>Loading</td><td>A loading line</td></tr>
            <tr><td>Error</td><td>The server message, e.g. &quot;Access denied. Admins only.&quot;</td></tr>
            <tr><td>Empty</td><td>&quot;No users found&quot; - not the same thing as an error</td></tr>
          </tbody>
        </table>
        <p className="note">
          An empty result and a failed request look identical if you only render the table. Give
          them separate branches - a user who searched for a name that does not exist should not
          think the app is broken.
        </p>

        <h3>Create these two files</h3>
      </Theory>
      <BackendStatus />
      <CodePanel label="components/UserTable.jsx" code={readSource('components/UserTable.jsx')} />
      <CodePanel label="app/users/page.jsx" code={readSource('app/users/page.jsx')} />
      <OpenApp href="/users">Open the users page</OpenApp>
      <p className="note">
        You must be logged in as <code>admin@test.com</code> - any other account is redirected to
        the profile page.
      </p>
    </>
  );
}
