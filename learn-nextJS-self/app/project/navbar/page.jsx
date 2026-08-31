import PageHeader from '@/components/PageHeader';
import Theory from '@/components/Theory';
import CodePanel from '@/components/CodePanel';
import LivePreview from '@/components/LivePreview';
import Navbar from '@/components/Navbar';
import { readSource } from '@/lib/readSource';

export default function NavbarLesson() {
  return (
    <>
      <PageHeader
        title="4.9 The navbar, and the hydration trap"
        description="One component that shows three different menus - and the bug almost everyone hits building it."
      />
      <Theory>
        <h3>Three menus, one component</h3>
        <p>
          The bar shows different links to an admin, to a normal user, and to somebody who is not
          logged in. It is the first place the two roles visibly diverge, and it is only a handful
          of conditionals over the <code>user</code> object saved at login.
        </p>

        <h3>The hydration trap</h3>
        <p>
          This is the important part of the section. Next.js renders your page{' '}
          <strong>twice</strong>: once on the server to produce HTML, then again in the browser to
          attach the JavaScript. React compares the two, and if they disagree it throws a hydration
          mismatch.
        </p>
        <p>
          <code>localStorage</code> does not exist on the server. So a component that reads it while
          rendering produces two different results:
        </p>
        <table>
          <thead>
            <tr><th>Pass</th><th>What localStorage returns</th><th>What renders</th></tr>
          </thead>
          <tbody>
            <tr><td>Server</td><td>nothing - the API does not exist there</td><td>Login / Register, or a crash</td></tr>
            <tr><td>Browser</td><td>the saved user</td><td>the logged-in menu</td></tr>
          </tbody>
        </table>
        <p>
          React sees the mismatch and complains. The fix is two rules, both visible in the source
          below:
        </p>
        <ul>
          <li>
            Read <code>localStorage</code> inside <code>useEffect</code>. Effects never run on the
            server, so by the time that line executes you are certainly in a browser.
          </li>
          <li>
            Hold a <code>ready</code> flag that starts <code>false</code>. It is false on the server{' '}
            <em>and</em> on the browser first paint, so both produce identical markup. Only after
            the effect does it flip and the real bar appear.
          </li>
        </ul>
        <p className="note">
          The same pattern appears in every guarded page from here on. Once you have seen it in the
          navbar, you will recognise it in 4.10 through 4.15 as the same three lines.
        </p>

        <h3>Link or router.push?</h3>
        <table>
          <thead>
            <tr><th></th><th><code>&lt;Link&gt;</code></th><th><code>router.push()</code></th></tr>
          </thead>
          <tbody>
            <tr><td>Used when</td><td>the user chooses to go</td><td>something happened and you send them</td></tr>
            <tr><td>Renders</td><td>a real <code>&lt;a&gt;</code></td><td>nothing - it is a function call</td></tr>
            <tr><td>Middle-click, copy link</td><td>works</td><td>does not</td></tr>
            <tr><td>Here</td><td>the menu links</td><td>the redirect after logout</td></tr>
          </tbody>
        </table>
        <p>
          A menu item built from a button instead of a Link cannot be opened in a new tab, and its
          address cannot be copied. Use the element that matches the intent.
        </p>

        <h3>Logging out</h3>
        <p>
          There is no request. The server never kept a session - it only ever reads the token you
          hand it on each request - so logging out is deleting the two localStorage keys and
          pushing to <code>/login</code>. React does not watch localStorage, which is why{' '}
          <code>setUser(null)</code> is needed as well: removing the keys changes nothing on screen
          by itself.
        </p>

        <h3>Hidden is not forbidden</h3>
        <p className="warn">
          The admin link is hidden from a normal user. That is a convenience, not a permission.
          Log in as a normal user, then type <code>/users</code> into the address bar - the page
          loads, and the server answers the data request with <strong>403</strong>. The menu shapes
          the experience; <code>adminMiddleware</code> on the backend is what actually stops
          anybody.
        </p>

        <h3>Create this file</h3>
        <p className="note">
          The preview below is the real navbar, reading your real session. If you logged in during
          4.8 it knows who you are.
        </p>
      </Theory>
      <CodePanel label="components/Navbar.jsx" code={readSource('components/Navbar.jsx')} />
      <LivePreview>
        <Navbar />
      </LivePreview>
    </>
  );
}
