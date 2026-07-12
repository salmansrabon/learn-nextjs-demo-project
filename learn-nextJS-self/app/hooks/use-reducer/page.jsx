import PageHeader from '@/components/PageHeader';
import Theory from '@/components/Theory';
import CodePanel from '@/components/CodePanel';
import LivePreview from '@/components/LivePreview';
import Demo from './Demo';
import { readDemoSource } from '@/lib/readSource';

export default function UseReducerPage() {
  return (
    <>
      <PageHeader
        title="useReducer — Complex State via Actions"
        description="Instead of calling multiple setState functions, you dispatch an action and a reducer decides the new state."
      />
      <Theory>
        <p>
          <code>useReducer</code> is an alternative to <code>useState</code> for state that&apos;s{' '}
          <strong>complex or changes together</strong>. Instead of several <code>setX</code> calls
          scattered around a component, you <code>dispatch</code> a single <strong>action</strong>,
          and a <strong>reducer</strong> — a pure function of{' '}
          <code>(currentState, action) =&gt; newState</code> — decides exactly how state changes.
        </p>
        <p>
          <code>const [state, dispatch] = useReducer(reducerFn, initialState)</code>
        </p>
        <p>
          Use <code>useState</code> for simple, independent values. Reach for <code>useReducer</code>{' '}
          once you have 3+ related values that must always change together — it makes invalid
          in-between states impossible to represent.
        </p>
      </Theory>
      <CodePanel label="Source" code={readDemoSource('app/hooks/use-reducer/page.jsx')} />
      <LivePreview>
        <Demo />
      </LivePreview>
    </>
  );
}
