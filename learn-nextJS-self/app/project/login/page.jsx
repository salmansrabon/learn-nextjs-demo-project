import PageHeader from '@/components/PageHeader';
import Theory from '@/components/Theory';
import CodePanel from '@/components/CodePanel';
import LivePreview from '@/components/LivePreview';
import BackendStatus from '@/components/BackendStatus';
import LoginPage from '@/app/login/page';
import { readSource } from '@/lib/readSource';

export default function LoginLesson() {
  return (
    <>
      <PageHeader
        title="4.8 Login"
        description="The POST is nothing new. Keeping the token, and deciding where to send people, is."
      />
      <Theory>
        <h3>The request is the easy half</h3>
        <p>
          <code>POST /api/auth/login</code> has the same shape as the register call. What is new is
          the response: <code>data.data</code> contains a <code>token</code> and a{' '}
          <code>user</code>. Everything else in the app depends on those two.
        </p>

        <h3>What a JWT actually is</h3>
        <p>
          A signed string the server issues at login. Send it back with a later request and the
          server knows who you are without keeping a session of its own. It is{' '}
          <strong>signed, not encrypted</strong> - anyone can read its contents, so it must never
          hold anything secret - and it expires after 24 hours here, which is why the response
          interceptor from 4.5 bothers to handle a 401.
        </p>

        <h3>Why localStorage and not useState</h3>
        <p>
          State dies on refresh. A token in <code>useState</code> would log the user out every time
          they pressed F5. <code>localStorage</code> survives refreshes and closed tabs, which is
          what &quot;staying logged in&quot; means.
        </p>
        <table>
          <thead>
            <tr><th>Holds</th><th>Survives refresh?</th><th>Use for</th></tr>
          </thead>
          <tbody>
            <tr><td><code>useState</code></td><td>No</td><td>form values, loading flags</td></tr>
            <tr><td><code>localStorage</code></td><td>Yes</td><td>the token, the logged-in user</td></tr>
          </tbody>
        </table>
        <p>
          It stores strings only. The token already is one; the user object needs{' '}
          <code>JSON.stringify</code> going in and <code>JSON.parse</code> coming out. Forget the
          parse and every property reads as <code>undefined</code>, with no error to tell you why.
          That is the whole reason <code>lib/session.js</code> exists - so no page has to remember
          it.
        </p>
        <p className="warn">
          Anything in localStorage is readable by any JavaScript on the page, so an XSS bug leaks
          the token. An httpOnly cookie is not readable by JavaScript but brings CSRF concerns
          instead. Neither option is free; this app uses localStorage because it is the clearest to
          learn from.
        </p>

        <h3>The guards inside session.js</h3>
        <p>
          Every read guards with <code>typeof window === &apos;undefined&apos;</code>, because these
          helpers can be called while Next.js renders on the server, where <code>localStorage</code>{' '}
          does not exist. The write inside the submit handler needs no guard - a click handler only
          ever runs in a browser.
        </p>
        <p>
          <code>getUser()</code> also wraps <code>JSON.parse</code> in a <code>try</code>. If
          somebody has edited localStorage by hand, unreadable data should log them out, not blank
          the page with an exception.
        </p>

        <h3>Redirecting by role</h3>
        <p>
          One line decides between <code>/users</code> and <code>/profile</code> based on{' '}
          <code>user.role</code>. That single branch is what makes the two roles feel like two
          different applications while sharing every file.
        </p>
        <p>
          <code>useRouter</code> comes from <code>next/navigation</code>, not{' '}
          <code>next/router</code> - the latter is the old Pages Router import and throws at runtime
          here. Use <code>router.push()</code> when navigation is the <em>result of something
          happening</em>, as it is after a login. Use <code>&lt;Link&gt;</code> when the user is
          choosing to navigate; that is the next section.
        </p>

        <h3>Create these two files</h3>
        <p className="note">
          Log in as <code>admin@test.com</code> to follow sections 4.10 to 4.14, then as an account
          you registered in 4.7 to see what a normal user gets in 4.15.
        </p>
      </Theory>
      <BackendStatus />
      <CodePanel label="lib/session.js" code={readSource('lib/session.js')} />
      <CodePanel label="app/login/page.jsx" code={readSource('app/login/page.jsx')} />
      <LivePreview>
        <LoginPage />
      </LivePreview>
    </>
  );
}
