import PageHeader from '@/components/PageHeader';
import Theory from '@/components/Theory';
import CodePanel from '@/components/CodePanel';
import LivePreview from '@/components/LivePreview';
import Demo from './Demo';
import { readDemoSource } from '@/lib/readSource';

export default function UseRefPage() {
  return (
    <>
      <PageHeader
        title="useRef — Focusing an Input"
        description="Submit with the email box empty and the ref puts the cursor back in it."
      />
      <Theory>
        <p>
          <code>useRef</code> returns an object with a single <code>.current</code> property. It has
          two uses:
        </p>
        <ul>
          <li><strong>Hold a DOM element</strong> so you can call methods on it directly.</li>
          <li><strong>Store a mutable value</strong> that survives re-renders <em>without</em> triggering one — unlike <code>useState</code>.</li>
        </ul>

        <h3>Why this example needs a ref</h3>
        <p>
          There is no way to focus an input with state. Focus is not something you describe in JSX —
          there is no <code>focused</code> prop to set. It is an action you perform on the element
          itself, and to perform it you need the element. That gap is exactly what a ref fills.
        </p>
        <p>
          <code>ref={'{'}emailRef{'}'}</code> tells React to put the real DOM node into{' '}
          <code>emailRef.current</code> once it is on screen. From then on, anything the browser can
          do to an input is available: <code>.focus()</code>, <code>.select()</code>,{' '}
          <code>.scrollIntoView()</code>. The same idea plays a video with <code>.play()</code>.
        </p>

        <h3>State and ref, side by side</h3>
        <p>
          The example uses both, and the split is the point:
        </p>
        <table>
          <thead>
            <tr><th>Holds</th><th>What for</th><th>Re-renders?</th></tr>
          </thead>
          <tbody>
            <tr><td><code>useState</code></td><td>the email value and the message</td><td>Yes — the screen must change</td></tr>
            <tr><td><code>useRef</code></td><td>the input element</td><td>No — nothing on screen depends on it</td></tr>
          </tbody>
        </table>
        <p className="note">
          Put the input element in state instead and you get a re-render for nothing. Put the
          message in a ref and it would never appear, because changing{' '}
          <code>ref.current</code> does not tell React to render again.
        </p>

        <h3>Try it</h3>
        <p>
          Click <strong>Submit</strong> with the box empty. The message appears and the cursor jumps
          back into the field. On a long form this is the difference between a user reading an error
          and a user hunting for it.
        </p>
      </Theory>
      <CodePanel label="Source" code={readDemoSource('app/hooks/use-ref/page.jsx')} />
      <LivePreview>
        <Demo />
      </LivePreview>
    </>
  );
}
