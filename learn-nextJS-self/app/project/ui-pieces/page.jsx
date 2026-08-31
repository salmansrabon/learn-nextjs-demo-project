import PageHeader from '@/components/PageHeader';
import Theory from '@/components/Theory';
import CodePanel from '@/components/CodePanel';
import LivePreview from '@/components/LivePreview';
import Demo from './Demo';
import { readSource } from '@/lib/readSource';

export default function UiPiecesLesson() {
  return (
    <>
      <PageHeader
        title="4.6 Two pieces every page needs"
        description="A message box and a labelled input, written once so five pages do not repeat them."
      />
      <Theory>
        <h3>Why extract these two now</h3>
        <p>
          Every page from here on shows errors and most of them contain a form. Writing the same
          markup five times is how a codebase becomes hard to change - fix the spacing once and you
          have four other copies still wrong. These are the two smallest useful components in the
          app.
        </p>

        <h3><code>Message</code> returns null when empty</h3>
        <p>
          The interesting line is <code>if (!children) return null;</code>. A component is allowed
          to render nothing. Without it every caller would need{' '}
          <code>{'{'}error &amp;&amp; &lt;div className=&quot;api-message error&quot;&gt;{'{'}error{'}'}&lt;/div&gt;{'}'}</code>,
          and that pattern repeated on six pages is exactly the noise worth deleting. With it, the
          caller writes <code>&lt;Message kind=&quot;error&quot;&gt;{'{'}error{'}'}&lt;/Message&gt;</code>{' '}
          and stops thinking about it.
        </p>
        <p className="note">
          The preview below renders four <code>Message</code> elements. You can see three, because
          the fourth was given an empty string.
        </p>

        <h3><code>Field</code> owns no state</h3>
        <p>
          It takes <code>value</code>, <code>onChange</code> and <code>error</code> as props and
          keeps nothing of its own. That is deliberate. The parent form holds the values, which is
          what makes the inputs <strong>controlled</strong> - and controlled inputs are what let
          4.13 prefill an edit form from the server and 4.7 clear every box at once after a
          successful signup.
        </p>
        <p>
          A component that holds no state is also trivial to reason about: the same props always
          produce the same output. Push state down into <code>Field</code> and suddenly two places
          disagree about what the email is.
        </p>
        <p>
          <code>htmlFor</code> on the label matched to <code>id</code> on the input is not
          decoration either - it is what makes clicking the label focus the box, and what lets a
          screen reader announce the two together.
        </p>

        <h3>The error clears while you type</h3>
        <p>
          The pages that use <code>Field</code> clear a field&apos;s error inside their change
          handler. Leaving a message on screen while the user is busy correcting it reads as
          &quot;still wrong&quot; and is quietly infuriating. Try it in the preview: the message
          disappears the moment the value becomes valid.
        </p>

        <h3>Create these two files</h3>
      </Theory>
      <CodePanel label="components/Message.jsx" code={readSource('components/Message.jsx')} />
      <CodePanel label="components/Field.jsx" code={readSource('components/Field.jsx')} />
      <LivePreview>
        <Demo />
      </LivePreview>
    </>
  );
}
