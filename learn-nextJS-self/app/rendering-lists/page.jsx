import PageHeader from '@/components/PageHeader';
import Theory from '@/components/Theory';
import CodePanel from '@/components/CodePanel';
import LivePreview from '@/components/LivePreview';
import Demo from './Demo';
import { readDemoSource } from '@/lib/readSource';

export default function RenderingListsPage() {
  return (
    <>
      <PageHeader
        title="Rendering Lists with map()"
        description="Every mapped element needs a unique, stable key: the item's id, never the array index."
      />
      <Theory>
        <p>
          To render an array of items, use <code>.map()</code> to convert each one into JSX. Every
          mapped element <strong>must have a unique <code>key</code> prop</strong>. React uses it to
          track exactly which item changed, was added, or was removed.
        </p>
        <p>
          Never use the array index as the key if the list can reorder or shrink. If item #2 is
          deleted, every item after it shifts to a new index and React can apply state to the wrong
          row. Always use a stable, unique id from the data itself.
        </p>
      </Theory>
      <CodePanel label="Source" code={readDemoSource('app/rendering-lists/page.jsx')} />
      <LivePreview>
        <Demo />
      </LivePreview>
    </>
  );
}
