import PageHeader from '@/components/PageHeader';
import Theory from '@/components/Theory';
import CodePanel from '@/components/CodePanel';
import LivePreview from '@/components/LivePreview';
import Demo from './Demo';
import { readDemoSource } from '@/lib/readSource';

export default function UseParamsIndexPage() {
  return (
    <>
      <PageHeader
        title="useParams — Read Dynamic URL Segments"
        description="Click a link below — the same page file reads a different id from the URL each time."
      />
      <Theory>
        <p>
          <code>useParams</code> reads the <strong>dynamic segments</strong> from the current URL.
          It&apos;s only useful inside a route folder wrapped in square brackets — the page these
          links go to lives at <code>app/hooks/use-params/[id]/page.jsx</code>, so visiting{' '}
          <code>/hooks/use-params/42</code> gives you <code>{'{ id: "42" }'}</code> back.
        </p>
        <p>
          One file, infinite URLs: <code>/5</code>, <code>/42</code>, and <code>/100</code> below all
          render this same component — only the value of <code>id</code> changes.
        </p>
      </Theory>
      <CodePanel
        label="Source"
        code={readDemoSource('app/hooks/use-params/page.jsx', 'app/hooks/use-params/[id]/page.jsx')}
      />
      <LivePreview>
        <Demo />
      </LivePreview>
    </>
  );
}
