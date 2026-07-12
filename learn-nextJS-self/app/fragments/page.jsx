import PageHeader from '@/components/PageHeader';
import Theory from '@/components/Theory';
import CodePanel from '@/components/CodePanel';
import LivePreview from '@/components/LivePreview';
import Demo from './Demo';
import { readDemoSource } from '@/lib/readSource';

export default function FragmentsPage() {
  return (
    <>
      <PageHeader
        title="Fragments"
        description="Return multiple sibling elements without adding an extra <div> to the DOM."
      />
      <Theory>
        <p>
          A component must return <strong>exactly one root value</strong>. When you have multiple
          sibling elements and do not want an extra wrapper element in the DOM, wrap them in a
          <strong> Fragment</strong>.
        </p>
        <table>
          <thead>
            <tr>
              <th>Syntax</th>
              <th>When to use</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>&lt;&gt;...&lt;/&gt;</code></td>
              <td>Short syntax: the common form.</td>
            </tr>
            <tr>
              <td><code>&lt;Fragment&gt;...&lt;/Fragment&gt;</code></td>
              <td>Long syntax: useful when a Fragment needs a prop such as <code>key</code>.</td>
            </tr>
          </tbody>
        </table>
      </Theory>
      <CodePanel label="Source" code={readDemoSource('app/fragments/page.jsx')} />
      <LivePreview>
        <Demo />
      </LivePreview>
    </>
  );
}
