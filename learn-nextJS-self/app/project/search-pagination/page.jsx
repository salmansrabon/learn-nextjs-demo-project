import PageHeader from '@/components/PageHeader';
import Theory from '@/components/Theory';
import CodePanel from '@/components/CodePanel';
import BackendStatus from '@/components/BackendStatus';
import OpenApp from '@/components/OpenApp';
import { readSource } from '@/lib/readSource';

export default function SearchPaginationLesson() {
  return (
    <>
      <PageHeader
        title="4.11 Searching and paging through users"
        description="Two pieces of state for one search box, and why the page number must reset."
      />
      <Theory>
        <h3>Same file, different angle</h3>
        <p>
          This is still <code>app/users/page.jsx</code> from 4.10. Nothing new is created - this
          section explains the search form, the pager, and the effect that ties them together.
        </p>

        <h3>Two pieces of state for one input</h3>
        <p>
          The box has a live value, and there is a separate <em>submitted</em> term that the request
          actually uses. Collapse them into one and the effect re-runs on every keystroke: typing
          &quot;alice&quot; fires five requests, four of them already stale by the time they land.
        </p>
        <p>
          Keeping them apart means the request happens when the user says so, by submitting the
          form. The alternative is <strong>debouncing</strong> - keep one piece of state, but wait
          until typing has stopped for a few hundred milliseconds before firing. That is the right
          answer for a search-as-you-type box; it is more machinery than this page needs.
        </p>

        <h3>The dependency array does the work</h3>
        <p>
          The effect ends in <code>[page, submittedSearch]</code>. Change either and it refetches.
          There is no manual &quot;reload&quot; call anywhere in the page - setting state is the
          reload. This is the same mechanism as <code>[breakIt]</code> back in 4.2, now doing
          something useful.
        </p>

        <h3>Reset the page on a new search</h3>
        <p className="warn">
          Submitting a search must also call <code>setPage(1)</code>. Without it, a user sitting on
          page 3 who searches for a name with two matches lands on page 3 of a two-row result and
          sees an empty table. They conclude there are no matches. This is the single most common
          bug in a paginated list.
        </p>

        <h3>Why the server pages, not the browser</h3>
        <p>
          <code>GET /api/users?page=2&amp;limit=5</code> returns five rows plus a{' '}
          <code>totalPages</code> count. The browser never holds the full table, so the page stays
          fast whether there are 20 users or 20,000.
        </p>
        <p>
          Client-side pagination - fetch everything once, slice it in JavaScript - is simpler and
          fine for a list you know is small. It stops being fine at the exact moment you cannot
          predict the size.
        </p>
        <table>
          <thead>
            <tr><th>Field in <code>data</code></th><th>Used for</th></tr>
          </thead>
          <tbody>
            <tr><td><code>users</code></td><td>the rows on this page</td></tr>
            <tr><td><code>page</code></td><td>which page the server thinks you are on</td></tr>
            <tr><td><code>totalPages</code></td><td>disabling Next at the end</td></tr>
            <tr><td><code>total</code></td><td>the &quot;N users&quot; count in the heading</td></tr>
          </tbody>
        </table>

        <h3>axios encodes the query for you</h3>
        <p>
          The call passes an object - <code>{'{'} params: {'{'} page, limit, search {'}'} {'}'}</code> -
          rather than a hand-built string. That is not only tidier; it is correct. A search for{' '}
          <code>a&amp;b</code> pasted into a URL by hand would end the <code>search</code> parameter
          early and start a new one. axios escapes it to <code>a%26b</code>.
        </p>

        <h3>Try it</h3>
        <ul>
          <li>Search for <code>admin</code> - one match, and the pager disappears.</li>
          <li>Register a few accounts in 4.7, then page through them five at a time.</li>
          <li>Go to page 2, then search for something with one match. Confirm you land on page 1 and not on an empty table.</li>
        </ul>
      </Theory>
      <BackendStatus />
      <CodePanel label="app/users/page.jsx" code={readSource('app/users/page.jsx')} />
      <OpenApp href="/users">Open the users page</OpenApp>
    </>
  );
}
