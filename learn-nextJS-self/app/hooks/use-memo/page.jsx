import PageHeader from '@/components/PageHeader';
import Theory from '@/components/Theory';
import CodePanel from '@/components/CodePanel';
import LivePreview from '@/components/LivePreview';
import Demo from './Demo';
import { readDemoSource } from '@/lib/readSource';

export default function UseMemoPage() {
  return (
    <>
      <PageHeader
        title="useMemo — Memoize a Computed Value"
        description="Open the console. Clicking 'Re-render' will NOT log 'Filtering users...' because 'search' didn't change."
      />
      <Theory>
        <p>
          <code>useMemo</code> memoizes a <strong>computed value</strong> instead of a function. Use
          it when a calculation is expensive (filtering a large list, sorting, deriving a total) and
          you don&apos;t want it re-running on every render — only when the values it actually
          depends on change.
        </p>
        <p>
          <code>const value = useMemo(() =&gt; expensiveCalc(), [deps])</code>
        </p>
        <p>
          <code>useCallback</code> memoizes a <em>function</em>; <code>useMemo</code> memoizes a{' '}
          <em>value</em> — that&apos;s the entire difference between the two.
        </p>
      </Theory>
      <CodePanel label="Source" code={readDemoSource('app/hooks/use-memo/page.jsx')} />
      <LivePreview>
        <Demo />
      </LivePreview>
    </>
  );
}
