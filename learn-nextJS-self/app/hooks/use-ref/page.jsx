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
        title="useRef — DOM Access & Silent Values"
        description="Changing ref.current does not re-render the component — unlike useState."
      />
      <Theory>
        <p>
          <code>useRef</code> returns an object with a single <code>.current</code> property. It has
          two uses:
        </p>
        <ul>
          <li><strong>Access a DOM element directly</strong> — e.g. auto-focus an input on mount.</li>
          <li><strong>Store a mutable value</strong> that survives re-renders <em>without</em> triggering one — unlike <code>useState</code>.</li>
        </ul>
        <p>
          <strong>Common mistake:</strong> mutating <code>ref.current</code> directly inside a
          component&apos;s render body (not inside <code>useEffect</code> or an event handler) can
          cause a real bug in Next.js — a server/client <strong>hydration mismatch</strong>. The
          render body runs once during the server-rendered pass and again during the client&apos;s
          hydration pass, so the ref would get incremented twice, producing two different values and
          a &quot;text content did not match&quot; console error. Always mutate a ref inside an effect
          or a handler, never directly in the render body — the demo below shows the correct pattern.
        </p>
      </Theory>
      <CodePanel label="Source" code={readDemoSource('app/hooks/use-ref/page.jsx')} />
      <LivePreview>
        <Demo />
      </LivePreview>
    </>
  );
}
