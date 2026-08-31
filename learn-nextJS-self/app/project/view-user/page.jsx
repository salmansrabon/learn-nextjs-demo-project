import PageHeader from '@/components/PageHeader';
import Theory from '@/components/Theory';
import CodePanel from '@/components/CodePanel';
import BackendStatus from '@/components/BackendStatus';
import OpenApp from '@/components/OpenApp';
import { readSource } from '@/lib/readSource';

export default function ViewUserLesson() {
  return (
    <>
      <PageHeader
        title="4.12 Viewing one user"
        description="Dynamic routes: a folder called [id], and the string that is not a number."
      />
      <Theory>
        <h3>A folder named [id]</h3>
        <p>
          <code>app/users/[id]/page.jsx</code> matches <code>/users/1</code>, <code>/users/42</code>{' '}
          and every other value. The square brackets make the segment a parameter rather than a
          literal path. <code>useParams()</code> from <code>next/navigation</code> reads it.
        </p>

        <h3>The value is always a string</h3>
        <p className="warn">
          <code>useParams()</code> returns <code>{'{'} id: &apos;42&apos; {'}'}</code> - the string,
          never the number. So <code>id === 42</code> is <code>false</code>, and{' '}
          <code>users.find((u) =&gt; u.id === id)</code> silently finds nothing. There is no error,
          no warning, just an empty screen. Convert with <code>Number(id)</code> when you need to
          compare, or compare as strings on both sides.
        </p>
        <p>
          Passing it straight into a URL, as this page does with{' '}
          <code>getUserById(id)</code>, is fine - it is going back into a string anyway.
        </p>

        <h3>Fetch by id rather than passing the object</h3>
        <p>
          The list page already has the whole user object when you click View. It would be tempting
          to hand it over during navigation and skip the request.
        </p>
        <p>
          Do not. A URL has to work on its own. Someone bookmarks <code>/users/42</code>, refreshes
          it, or pastes it to a colleague - and there is no object to hand over. A page that owns
          its data by fetching from the URL works in every one of those cases; a page that depends
          on how you arrived breaks in all of them.
        </p>

        <h3>Distinguish the failures</h3>
        <p>
          One <code>catch</code> that prints &quot;something went wrong&quot; wastes information the
          server already gave you:
        </p>
        <table>
          <thead>
            <tr><th>Status</th><th>Means</th><th>What to show</th></tr>
          </thead>
          <tbody>
            <tr><td><code>401</code></td><td>token missing or expired</td><td>Send them to log in again</td></tr>
            <tr><td><code>403</code></td><td>logged in, but not an admin</td><td>The server&apos;s own message</td></tr>
            <tr><td><code>404</code></td><td>no user with that id</td><td>&quot;User not found&quot; and a way back</td></tr>
            <tr><td>no response</td><td>the backend is not running</td><td>A connection hint</td></tr>
          </tbody>
        </table>
        <p>
          Try it: change the id in the address bar to something absurd like <code>/users/9999</code>{' '}
          and confirm you get the not-found branch and not a crash.
        </p>

        <h3>Rendering a record</h3>
        <p>
          The detail rows use <code>.api-detail</code> with a <code>.label</code> span - a plain
          two-column layout, no table needed, because this is one record rather than a list.
        </p>
        <p>
          <code>photoUrl</code> comes back as a path like <code>/uploads/abc.jpg</code>, not a full
          URL, so the <code>src</code> is built as <code>{'`${API_URL}${user.photoUrl}`'}</code>.
          The field is null for anyone who has never uploaded one, which is why the image is behind
          a conditional.
        </p>
        <p>
          Dates arrive as ISO strings. <code>new Date(user.created_at).toLocaleDateString()</code>{' '}
          renders them in the reader&apos;s own locale rather than as{' '}
          <code>2026-08-27T04:15:22.000Z</code>.
        </p>

        <h3>Create this file</h3>
      </Theory>
      <BackendStatus />
      <CodePanel label="app/users/[id]/page.jsx" code={readSource('app/users/[id]/page.jsx')} />
      <OpenApp href="/users">Open the users page and click View</OpenApp>
    </>
  );
}
