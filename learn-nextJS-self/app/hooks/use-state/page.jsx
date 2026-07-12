import PageHeader from '@/components/PageHeader';
import Theory from '@/components/Theory';
import CodePanel from '@/components/CodePanel';
import LivePreview from '@/components/LivePreview';
import Demo from './Demo';
import { readDemoSource } from '@/lib/readSource';

export default function UseStatePage() {
  return (
    <>
      <PageHeader
        title="useState — Managing State"
        description="const [value, setValue] = useState(initialValue). Calling the setter tells React to re-render."
      />
      <Theory>
        <h3>What is a React Hook?</h3>
        <p>
          A hook is a built-in function whose name starts with <code>use</code>. Hooks let a function
          component tap into React features — state, side effects, performance, routing — without
          writing a class. Two golden rules apply to every hook you&apos;ll meet in this section:
        </p>
        <ul>
          <li>Call hooks only at the <strong>top level</strong> of a component — never inside loops, conditions, or nested functions.</li>
          <li>Call hooks only <strong>inside a component</strong> (or a custom hook) — never in a plain JS utility file.</li>
        </ul>
        <h3>useState — the basics</h3>
        <p>
          The key difference from a plain variable: calling the setter <strong>tells React to
          re-render</strong>. A plain variable can change all it wants — the screen never finds out.{' '}
          <code>const [value, setValue] = useState(initialValue)</code> is the entire syntax.
        </p>
      </Theory>
      <CodePanel label="Source" code={readDemoSource('app/hooks/use-state/page.jsx')} />
      <LivePreview>
        <Demo />
      </LivePreview>
    </>
  );
}
