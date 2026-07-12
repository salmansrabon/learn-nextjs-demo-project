import PageHeader from '@/components/PageHeader';
import Theory from '@/components/Theory';
import CodePanel from '@/components/CodePanel';
import LivePreview from '@/components/LivePreview';
import Demo from './Demo';
import { readDemoSource } from '@/lib/readSource';

export default function UseParamsDetailPage({ params }) {
  const { id } = params;

  return (
    <>
      <PageHeader
        title={`useParams — Showing id: ${id}`}
        description="This same page file renders for /5, /42, and /100 — only the id changes."
      />
      <Theory>
        <p>
          <code>useParams</code> reads the <strong>dynamic segments</strong> from the current URL —
          only useful inside a route folder wrapped in square brackets, like this one:{' '}
          <code>app/hooks/use-params/[id]/page.jsx</code>.
        </p>
      </Theory>
      <CodePanel label="Source" code={readDemoSource('app/hooks/use-params/[id]/page.jsx')} />
      <LivePreview>
        <Demo />
      </LivePreview>
    </>
  );
}
