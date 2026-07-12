import PageHeader from '@/components/PageHeader';
import Theory from '@/components/Theory';
import CodePanel from '@/components/CodePanel';
import LivePreview from '@/components/LivePreview';
import ProfileBadge from '@/components/ProfileBadge';
import { readDemoSource } from '@/lib/readSource';

export default function UsingComponentsPage() {
  return (
    <>
      <PageHeader
        title="Using Components in JSX"
        description="Import a component, then use it like a custom HTML tag. Same component, different props, different output."
      />
      <Theory>
        <p>
          Once a component is created and exported, you use it anywhere by <strong>importing</strong>{' '}
          it and writing it like a custom HTML tag: <code>&lt;ProfileBadge /&gt;</code>. The capital
          letter tells React this is a component, not a built-in HTML element.
        </p>
        <table>
          <thead>
            <tr>
              <th>Concept</th>
              <th>Syntax</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Import</td>
              <td><code>import ProfileBadge from &apos;@/components/ProfileBadge&apos;</code></td>
            </tr>
            <tr>
              <td>Use, no children</td>
              <td><code>&lt;ProfileBadge name=&quot;Alex&quot; role=&quot;Admin&quot; /&gt;</code></td>
            </tr>
            <tr>
              <td>Same component, new data</td>
              <td>Call it again with different props.</td>
            </tr>
          </tbody>
        </table>
      </Theory>
      <CodePanel
        label="Source"
        code={readDemoSource('components/ProfileBadge.jsx', 'app/using-components/page.jsx')}
      />
      <LivePreview>
        <div className="demo">
          <ProfileBadge name="Alex" role="Admin" />
          <ProfileBadge name="Sara" role="User" />

          <div style={{ marginTop: 10 }}>
            <p>Components can be nested inside other elements:</p>
            <ProfileBadge name="Nested" role="Guest" />
          </div>
        </div>
      </LivePreview>
    </>
  );
}
