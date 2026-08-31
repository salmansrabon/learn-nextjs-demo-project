import PageHeader from '@/components/PageHeader';
import Theory from '@/components/Theory';
import CodePanel from '@/components/CodePanel';
import { readSource } from '@/lib/readSource';

export default function AppStructureLesson() {
  return (
    <>
      <PageHeader
        title="4.4 The app you are building"
        description="Every file, where it goes, and which section creates it."
      />
      <Theory>
        <h3>The destination</h3>
        <p>
          The rest of the chapter builds one application. Nothing is imported that an earlier
          section did not create, so you can follow it top to bottom without ever hitting a missing
          file. Here is the whole thing:
        </p>
        <pre><code>{`your-app/
|-- app/
|   |-- layout.jsx                  already exists
|   |-- globals.css                 add the chapter styles here
|   |-- register/page.jsx           4.7   sign up
|   |-- login/page.jsx              4.8   sign in
|   |-- profile/page.jsx            4.15  a user's own profile
|   \`-- users/
|       |-- page.jsx                4.10  admin: list, search, delete
|       \`-- [id]/
|           |-- page.jsx            4.12  admin: view one user
|           \`-- edit/page.jsx       4.13  admin: update a user
|-- components/
|   |-- Message.jsx                 4.6   error / success box
|   |-- Field.jsx                   4.6   labelled input
|   |-- Navbar.jsx                  4.9   role-based menu
|   \`-- UserTable.jsx               4.10  the table
|-- services/
|   |-- api.js                      4.5   the axios client
|   |-- authService.js              4.5   register, login, me
|   \`-- userService.js              4.5   user CRUD
|-- lib/
|   |-- apiConfig.js                4.4   where the backend lives
|   \`-- session.js                  4.8   token + user in localStorage
\`-- utils/
    \`-- validation.js               4.7   form checks`}</code></pre>
        <p>
          Six pages, four components, five helpers. That is the entire application - the finished
          reference in <code>user-demo-site/frontend</code> is the same set plus a photo upload and
          Bootstrap styling.
        </p>

        <h3>Two roles, two experiences</h3>
        <table>
          <thead>
            <tr><th></th><th>admin</th><th>user</th></tr>
          </thead>
          <tbody>
            <tr><td>Lands after login on</td><td><code>/users</code></td><td><code>/profile</code></td></tr>
            <tr><td>See every user</td><td>yes</td><td>no</td></tr>
            <tr><td>Search, view, edit, delete users</td><td>yes</td><td>no</td></tr>
            <tr><td>See their own record</td><td>yes</td><td>yes</td></tr>
            <tr><td>Change their own photo</td><td>yes</td><td>yes</td></tr>
          </tbody>
        </table>
        <p className="warn">
          Every &quot;no&quot; in that table is enforced by the server, not by the menu. Hiding a
          link stops an honest user wandering somewhere useless; it stops nobody else. Section 4.9
          shows how to prove that to yourself.
        </p>

        <h3>Create the first file</h3>
        <p>
          <code>lib/apiConfig.js</code> holds the backend URL. Everything else imports it, so if the
          API ever moves you edit one line. Also add <code>.env.local</code> at the root of your
          project with a single line:
        </p>
        <pre><code>NEXT_PUBLIC_API_URL=http://localhost:5000</code></pre>
        <p>
          The <code>NEXT_PUBLIC_</code> prefix is not decoration. Without it the value is server-only
          and reads as <code>undefined</code> inside every Client Component you are about to write.
          Next.js loads <code>.env.local</code> at startup, so restart <code>npm run dev</code> after
          creating it.
        </p>
        <p className="note">
          Also copy the chapter&apos;s CSS into your <code>globals.css</code>. It is plain classes -
          no framework - and the source is in this project at <code>app/userapp.css</code>.
        </p>
      </Theory>
      <CodePanel label="lib/apiConfig.js" code={readSource('lib/apiConfig.js')} />
    </>
  );
}
