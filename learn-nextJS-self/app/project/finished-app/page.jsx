import PageHeader from '@/components/PageHeader';
import Theory from '@/components/Theory';
import CodePanel from '@/components/CodePanel';
import { readUserDemoSource } from '@/lib/readSource';

export default function FinishedAppLesson() {
  return (
    <>
      <PageHeader
        title="4.16 The finished app"
        description="What you built, next to the reference implementation it was modelled on."
      />
      <Theory>
        <h3>What you have</h3>
        <p>
          Six pages, four components and five helpers - and a working application with two roles,
          real authentication and full CRUD:
        </p>
        <ul>
          <li><strong>Anyone</strong> can register and log in.</li>
          <li><strong>An admin</strong> lands on the user list, searches and pages through it, opens a user, edits them, changes their role, and deletes them.</li>
          <li><strong>A normal user</strong> lands on their own profile, sees only their own record, and can change their photo.</li>
          <li>Every restriction is enforced by the server; the UI only reflects it.</li>
        </ul>

        <h3>Where yours differs from the reference</h3>
        <p>
          <code>user-demo-site/frontend</code> is the same application built independently. The
          differences are worth knowing, because none of them are React:
        </p>
        <table>
          <thead>
            <tr><th></th><th>What you built</th><th>The reference</th></tr>
          </thead>
          <tbody>
            <tr><td>Styling</td><td>Plain CSS classes</td><td>Bootstrap</td></tr>
            <tr><td>Admin routes</td><td><code>/users</code></td><td><code>/admin/users</code></td></tr>
            <tr><td>Messages</td><td>One <code>Message</code> with a <code>kind</code> prop</td><td><code>ErrorMessage</code> and <code>SuccessMessage</code></td></tr>
            <tr><td>Session helpers</td><td><code>lib/session.js</code></td><td>localStorage read inline in each page</td></tr>
            <tr><td>Delete confirmation</td><td>Component state</td><td><code>window.confirm</code></td></tr>
            <tr><td>Table actions</td><td>Callbacks</td><td><code>&lt;Link&gt;</code> with hard-coded paths</td></tr>
          </tbody>
        </table>
        <p className="note">
          Two of those are deliberate improvements on the reference rather than differences of
          taste - the session helpers and the delete confirmation, for the reasons given in 4.8 and
          4.14. The rest are arbitrary. Neither version is more correct.
        </p>

        <h3>Read the reference now</h3>
        <p>
          Its <code>services/api.js</code> should look familiar down to the interceptors. Its admin
          users page is the same four jobs as yours in one file. Reading it should feel like
          recognition, which is the actual test of whether this chapter worked.
        </p>

        <h3>What you would add next</h3>
        <ul>
          <li>
            <strong>Route protection in middleware.</strong> Every guarded page repeats the same
            check. Next.js middleware can do it once, before the page renders, so a protected page
            never flashes.
          </li>
          <li>
            <strong>A refresh-token flow.</strong> Right now a 24-hour token expires mid-session and
            the user is silently logged out on their next click.
          </li>
          <li>
            <strong>A data-fetching library.</strong> You hand-wrote loading and error state on six
            pages. That is the right way to learn it and the wrong way to keep doing it.
          </li>
          <li>
            <strong>Self-service profile edits</strong>, which needs the backend route described in
            4.15.
          </li>
        </ul>
      </Theory>
      <CodePanel
        label="user-demo-site/frontend/services/api.js"
        code={readUserDemoSource('frontend/services/api.js')}
      />
      <CodePanel
        label="user-demo-site/frontend/app/admin/users/page.jsx"
        code={readUserDemoSource('frontend/app/admin/users/page.jsx')}
      />
    </>
  );
}
