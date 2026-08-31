import PageHeader from '@/components/PageHeader';
import Theory from '@/components/Theory';
import CodePanel from '@/components/CodePanel';
import { readSource } from '@/lib/readSource';

export default function AxiosClientLesson() {
  return (
    <>
      <PageHeader
        title="4.5 The axios client and the services layer"
        description="One HTTP client, two interceptors, and three files that hold every URL in the app."
      />
      <Theory>
        <h3>Why not carry on with fetch</h3>
        <p>
          You wrote two <code>fetch</code> calls in 4.1 and 4.2, so the comparison is not abstract.
          Here is what changes across the whole app:
        </p>
        <table>
          <thead>
            <tr><th></th><th>fetch</th><th>axios</th></tr>
          </thead>
          <tbody>
            <tr><td>Reading the body</td><td><code>await res.json()</code></td><td><code>res.data</code>, already parsed</td></tr>
            <tr><td>404 and 500</td><td>Resolves - you must remember <code>res.ok</code></td><td>Rejects, so <code>catch</code> runs</td></tr>
            <tr><td>Query params</td><td>Build the string yourself</td><td>A <code>params</code> object, URL-encoded for you</td></tr>
            <tr><td>The auth header</td><td>Written at every call site</td><td>One request interceptor</td></tr>
          </tbody>
        </table>
        <p>
          The second row is the one that bites. A forgotten <code>res.ok</code> check turns a 403
          into a crash inside <code>.json()</code>, three lines away from the real cause.
        </p>

        <h3>What an interceptor is</h3>
        <p>
          A function axios runs on every request, or every response, before your code sees it. It is
          how a rule that applies everywhere gets written once.
        </p>
        <ul>
          <li>
            The <strong>request</strong> interceptor reads the token from <code>localStorage</code>{' '}
            and sets <code>Authorization: Bearer &lt;token&gt;</code>. Every admin call in sections
            4.10 to 4.14 depends on it, and not one of those pages mentions the header.
          </li>
          <li>
            The <strong>response</strong> interceptor watches for <code>401</code>. That status means
            the token is missing, expired or invalid, so it clears storage - once, centrally, instead
            of in every page.
          </li>
        </ul>
        <p>
          Both guard with <code>typeof window !== &apos;undefined&apos;</code>. That is not
          superstition: <code>localStorage</code> does not exist while Next.js renders on the server,
          and the call would throw.
        </p>
        <p className="note">
          The response interceptor still returns <code>Promise.reject(error)</code> after cleaning
          up. Swallow the error there and the page that made the call would sit on a spinner
          forever, never learning it failed.
        </p>

        <h3>Why three service files and not one</h3>
        <p>
          <code>api.js</code> is the configured client. <code>authService.js</code> and{' '}
          <code>userService.js</code> are thin wrappers that name the endpoints. The point is that no
          page ever contains a URL - so when an endpoint moves, you edit one line in one file
          instead of searching the codebase.
        </p>
        <p>
          It also makes the pages readable. <code>getAllUsers({'{'} page, limit: 5, search {'}'})</code>{' '}
          says what is happening; <code>fetch(`${'{'}API_URL{'}'}/api/users?page=...`)</code> makes you
          decode it.
        </p>

        <h3>401 and 403 are different, and you will meet both</h3>
        <table>
          <thead>
            <tr><th>Status</th><th>Means</th><th>Who handles it</th></tr>
          </thead>
          <tbody>
            <tr><td><code>401</code></td><td>I do not know who you are - no token, or it expired</td><td>The response interceptor clears the session</td></tr>
            <tr><td><code>403</code></td><td>I know who you are and you may not do this</td><td>The page shows the server&apos;s message</td></tr>
          </tbody>
        </table>
        <p>
          Log in as a normal user and open <code>/users</code> and you will get a 403 from the
          server even though the menu never offered you the link.
        </p>

        <h3>Create these three files</h3>
        <p>
          <code>services/api.js</code> first - the other two import it. Nothing calls them yet;
          section 4.7 is the first page that does.
        </p>
      </Theory>
      <CodePanel label="services/api.js" code={readSource('services/api.js')} />
      <CodePanel label="services/authService.js" code={readSource('services/authService.js')} />
      <CodePanel label="services/userService.js" code={readSource('services/userService.js')} />
    </>
  );
}
