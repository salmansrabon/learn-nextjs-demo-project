import PageHeader from '@/components/PageHeader';
import Theory from '@/components/Theory';
import CodePanel from '@/components/CodePanel';
import LivePreview from '@/components/LivePreview';
import Demo from './Demo';
import { readDemoSource } from '@/lib/readSource';

export default function UseCallbackPage() {
  return (
    <>
      <PageHeader
        title="useCallback — Memoize a Function"
        description="Open the console. Typing below will NOT log 'Child rendered' because handleIncrement's reference stays stable."
      />
      <Theory>
        <p>
          Without <code>useCallback</code>, a component creates a <strong>brand-new function</strong>{' '}
          on every render. If that function is passed down as a prop to a child wrapped in{' '}
          <code>React.memo</code>, the child sees a &quot;new&quot; prop every time and re-renders
          anyway, even though the logic never changed.
        </p>
        <p>
          <code>useCallback(fn, [deps])</code> keeps the <strong>same function reference</strong>{' '}
          across renders as long as the dependencies haven&apos;t changed — so a memoized child can
          correctly skip re-rendering.
        </p>
        <p>
          Rule of thumb: reach for <code>useCallback</code> when a function is passed to a memoized
          child, or used as a dependency in another <code>useEffect</code>.
        </p>
      </Theory>
      <CodePanel label="Source" code={readDemoSource('app/hooks/use-callback/page.jsx')} />
      <LivePreview>
        <Demo />
      </LivePreview>
    </>
  );
}
