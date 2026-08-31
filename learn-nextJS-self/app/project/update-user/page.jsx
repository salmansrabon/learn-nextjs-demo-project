import PageHeader from '@/components/PageHeader';
import Theory from '@/components/Theory';
import CodePanel from '@/components/CodePanel';
import BackendStatus from '@/components/BackendStatus';
import OpenApp from '@/components/OpenApp';
import { readSource } from '@/lib/readSource';

export default function UpdateUserLesson() {
  return (
    <>
      <PageHeader
        title="4.13 Updating a user"
        description="An edit form is a create form that starts full - and that difference is the whole lesson."
      />
      <Theory>
        <h3>Prefilling is the difference</h3>
        <p>
          The registration form in 4.7 started empty. This one has to start with the user already in
          it, which means a GET must finish before the form can render. Everything awkward about
          edit forms comes from that gap between mount and data.
        </p>

        <h3>Never bind an input to undefined</h3>
        <p className="warn">
          This is the trap. If <code>value={'{'}form.firstname{'}'}</code> is{' '}
          <code>undefined</code> on the first render, React treats the input as{' '}
          <strong>uncontrolled</strong>. When the data arrives and the value becomes a string, React
          switches it to controlled and logs a warning most people never read. The symptom is an
          input that ignores what you type, or a cursor that jumps to the end.
        </p>
        <p>Two rules avoid it, both visible in the source:</p>
        <ul>
          <li>
            Start <code>form</code> as <code>null</code> and render a loading state until the GET
            resolves. No inputs exist, so none can be bound to nothing.
          </li>
          <li>
            Seed every field with <code>?? &apos;&apos;</code>. The server stores a missing phone
            number as <code>null</code>, and <code>value={'{'}null{'}'}</code> is just as
            uncontrolled as <code>undefined</code>.
          </li>
        </ul>
        <p className="note">
          <code>??</code> and not <code>||</code>. The nullish operator only substitutes for{' '}
          <code>null</code> and <code>undefined</code>; <code>||</code> would also replace a
          legitimate <code>0</code> or empty string.
        </p>

        <h3>Two loading flags, not one</h3>
        <p>
          <code>loading</code> is the GET that fills the form. <code>saving</code> is the PUT that
          sends it back. They mean different things to the user - one hides the form, the other
          disables the button - and sharing a single flag makes both behave wrongly.
        </p>

        <h3>Where each piece of the request goes</h3>
        <table>
          <thead>
            <tr><th>Part</th><th>Goes in</th><th>Why</th></tr>
          </thead>
          <tbody>
            <tr><td>Which user</td><td>the URL - <code>/api/users/42</code></td><td>It identifies the resource</td></tr>
            <tr><td>The new values</td><td>the body</td><td>They are the content being sent</td></tr>
            <tr><td>Who is asking</td><td>the <code>Authorization</code> header</td><td>Added by the interceptor from 4.5</td></tr>
          </tbody>
        </table>

        <h3>PUT or PATCH?</h3>
        <p>
          <code>PUT</code> replaces the resource; <code>PATCH</code> updates part of it. This form
          sends every field every time, so <code>PUT</code> is the honest verb. If you only sent the
          fields that changed, <code>PATCH</code> would be the right one - and this backend supports
          it on the same route.
        </p>

        <h3>The role dropdown is the interesting field</h3>
        <p>
          Changing <code>role</code> from <code>user</code> to <code>admin</code> is how the second
          administrator gets created - registration always produces a normal user. It is also the
          field the server guards most carefully: a non-admin who calls this endpoint gets a 403
          before the body is even looked at.
        </p>
        <p className="note">
          Try demoting <code>admin@test.com</code> to <code>user</code> and you will lock yourself
          out of the admin pages, because your own token still says admin but the next login will
          not. Re-seed the database with <code>npm run seed</code> if you do.
        </p>

        <h3>Re-seed the form from the response</h3>
        <p>
          On success the page fills the form from <code>res.data</code> rather than leaving what was
          typed. The server may have trimmed, normalised or rejected part of the input - showing its
          version means the form always reflects what is actually stored.
        </p>

        <h3>Create this file</h3>
      </Theory>
      <BackendStatus />
      <CodePanel label="app/users/[id]/edit/page.jsx" code={readSource('app/users/[id]/edit/page.jsx')} />
      <OpenApp href="/users">Open the users page and click Edit</OpenApp>
    </>
  );
}
