import PageHeader from '@/components/PageHeader';
import Theory from '@/components/Theory';
import CodePanel from '@/components/CodePanel';
import LivePreview from '@/components/LivePreview';
import BackendStatus from '@/components/BackendStatus';
import RegisterPage from '@/app/register/page';
import { readSource } from '@/lib/readSource';

export default function RegisterLesson() {
  return (
    <>
      <PageHeader
        title="4.7 Registration"
        description="The first real page: a controlled form, client-side validation, and a POST."
      />
      <Theory>
        <h3>Controlled inputs</h3>
        <p>
          An input is <strong>controlled</strong> when React owns its value:{' '}
          <code>value={'{'}form.email{'}'}</code> puts state into the box and <code>onChange</code>{' '}
          puts typing back into state. The DOM stops being the source of truth. That is what lets
          this page clear every box at once after a successful signup, and what lets 4.13 prefill an
          edit form from the server.
        </p>

        <h3>One object, one handler</h3>
        <p>
          Five fields could mean five <code>useState</code> calls and five handlers. Instead there is
          one object and one handler that keys off <code>e.target.name</code>:
        </p>
        <p><code>setForm((prev) =&gt; ({'{'} ...prev, [name]: value {'}'}))</code></p>
        <p>
          The square brackets around <code>name</code> are a computed property - the <em>value</em>{' '}
          of the variable becomes the key. Spreading <code>...prev</code> first matters: without it,
          typing in one field would wipe the other four.
        </p>

        <h3>Validate in the browser, but never trust it</h3>
        <p>
          <code>validateRegisterForm</code> returns an errors object keyed by field name, empty when
          everything is fine. Keying by field is what lets each message render beside its own input;
          a single <code>isValid</code> boolean could only ever produce one message for the whole
          form. <code>Object.keys(found).length &gt; 0</code> is the check, and the handler{' '}
          <strong>returns early</strong> - no request is made.
        </p>
        <p className="warn">
          Client validation is a convenience: it saves a round trip and puts the message next to the
          field. It is not security. The server validates because it must - a request can come from
          anywhere, not just your form. Delete the client checks and the app is still safe. Delete
          the server checks and it is not.
        </p>

        <h3>noValidate on the form</h3>
        <p>
          The browser has its own validation bubbles. They cannot be styled, they appear one at a
          time, and their wording is out of your control. <code>noValidate</code> switches them off
          so your messages are the only ones the user sees.
        </p>

        <h3>preventDefault is not optional</h3>
        <p>
          A <code>&lt;form&gt;</code> submit reloads the page by default - behaviour older than
          JavaScript. The reload throws away your React state and the request you just started.
          Every submit handler in this app begins with <code>e.preventDefault()</code>.
        </p>

        <h3>Try both layers</h3>
        <ul>
          <li>
            Type <code>abc</code> in the email box and submit. Blocked in the browser, no request
            sent - open the Network tab and confirm nothing left the page.
          </li>
          <li>
            Register a valid email, then register the same one again. The browser is happy, the
            server is not. That second message came back over the wire as <code>data.message</code>.
          </li>
        </ul>
        <p className="note">
          New accounts always get the role <code>user</code>. There is no way to sign up as an
          admin, which is correct - the seeded <code>admin@test.com</code> is the only one, and 4.13
          is where an admin can promote somebody.
        </p>

        <h3>Create these two files</h3>
      </Theory>
      <BackendStatus />
      <CodePanel label="utils/validation.js" code={readSource('utils/validation.js')} />
      <CodePanel label="app/register/page.jsx" code={readSource('app/register/page.jsx')} />
      <LivePreview>
        <RegisterPage />
      </LivePreview>
    </>
  );
}
