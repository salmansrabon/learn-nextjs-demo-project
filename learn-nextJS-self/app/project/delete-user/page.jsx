import PageHeader from '@/components/PageHeader';
import Theory from '@/components/Theory';
import CodePanel from '@/components/CodePanel';
import BackendStatus from '@/components/BackendStatus';
import OpenApp from '@/components/OpenApp';
import { readSource } from '@/lib/readSource';

export default function DeleteUserLesson() {
  return (
    <>
      <PageHeader
        title="4.14 Deleting a user"
        description="The smallest request in the app, and the one that needs the most care around it."
      />
      <Theory>
        <h3>Still the same file</h3>
        <p>
          The delete lives in <code>app/users/page.jsx</code>, next to the list it modifies. Nothing
          new to create - this section is about the three decisions around the request.
        </p>

        <h3>A DELETE carries no body</h3>
        <p>
          <code>deleteUser(42)</code> becomes <code>DELETE /api/users/42</code> and that is the
          entire request. The id in the URL says which resource; there is nothing else to send. The
          server answers <code>{'{'} success, message, data: null {'}'}</code> - the{' '}
          <code>null</code> is the point, there is no resource left to return.
        </p>

        <h3>Do not use window.confirm</h3>
        <p>
          It is one line, and it is the wrong line:
        </p>
        <ul>
          <li>It blocks the JavaScript thread - everything on the page freezes, including any request in flight.</li>
          <li>It cannot be styled, so it looks like a browser alert rather than part of your app.</li>
          <li>Its wording and buttons are controlled by the browser and change between them.</li>
          <li>Automated tests have to reach outside the page to dismiss it.</li>
          <li>It cannot show context - it is a string, so it cannot render the user&apos;s name in bold.</li>
        </ul>
        <p>
          The page instead holds the pending user in state and renders a confirm/cancel pair. That
          is a few more lines and it is ordinary React: a piece of state, two branches, two
          handlers. Naming the person about to be deleted also makes the prompt genuinely useful
          rather than a reflex click.
        </p>

        <h3>The list is stale the moment it succeeds</h3>
        <p>
          The server has deleted the row; your <code>users</code> array has not heard. Two ways to
          fix it:
        </p>
        <table>
          <thead>
            <tr><th></th><th>Refetch the list</th><th>Remove the row locally</th></tr>
          </thead>
          <tbody>
            <tr><td>Correctness</td><td>Always right - the server is the source of truth</td><td>Right only if the delete really worked</td></tr>
            <tr><td>Feel</td><td>A brief flicker</td><td>Instant</td></tr>
            <tr><td>Cost</td><td>One extra request</td><td>None</td></tr>
            <tr><td>Also fixes</td><td>The total count and the page count</td><td>Neither</td></tr>
          </tbody>
        </table>
        <p>
          This app refetches. The last row of that table is the reason: after a delete the total
          drops and the number of pages may drop with it. An optimistic removal leaves the heading
          claiming there are 11 users and the pager offering a page that no longer exists.
        </p>
        <p className="note">
          Optimistic updates are the right call when the action is frequent and failure is rare -
          liking a post, ticking a checkbox. Deleting a person is neither.
        </p>

        <h3>Deleting the last row on a page</h3>
        <p>
          Remove the only user on page 3 and a plain refetch leaves you looking at an empty page 3.
          The page steps back when that happens. It is one line, and it is the kind of detail that
          separates a demo from something usable.
        </p>

        <h3>Try it</h3>
        <ul>
          <li>Register a throwaway account in 4.7, then delete it here.</li>
          <li>Start a delete and press Cancel - confirm no request is made.</li>
          <li>Watch the total in the heading change after a successful delete.</li>
        </ul>
      </Theory>
      <BackendStatus />
      <CodePanel label="app/users/page.jsx" code={readSource('app/users/page.jsx')} />
      <OpenApp href="/users">Open the users page</OpenApp>
    </>
  );
}
