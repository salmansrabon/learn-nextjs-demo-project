import PageHeader from '@/components/PageHeader';
import Theory from '@/components/Theory';
import CodePanel from '@/components/CodePanel';
import LivePreview from '@/components/LivePreview';
import Demo from './Demo';
import { readDemoSource } from '@/lib/readSource';

export default function ConditionalRenderingPage() {
  return (
    <>
      <PageHeader
        title="Conditional Rendering"
        description="Use && for one case, a ternary for two, and null/false/undefined to render nothing."
      />
      <Theory>
        <p>
          JSX has no <code>if/else</code> directly inside the return statement. Use one of these
          three patterns inside <code>{'{}'}</code> instead:
        </p>
        <table>
          <thead>
            <tr>
              <th>Pattern</th>
              <th>Use when</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>&amp;&amp;</code></td>
              <td>Render something, or nothing at all</td>
              <td><code>{'{apiError && <p>{apiError}</p>}'}</code></td>
            </tr>
            <tr>
              <td>Ternary <code>? :</code></td>
              <td>Render one of exactly two options</td>
              <td><code>{'{isLoggedIn ? <A/> : <B/>}'}</code></td>
            </tr>
            <tr>
              <td><code>null</code> / <code>false</code> / <code>undefined</code></td>
              <td>Render nothing at all</td>
              <td>a component&apos;s <code>if (!x) return null;</code></td>
            </tr>
          </tbody>
        </table>
      </Theory>
      <CodePanel label="Source" code={readDemoSource('app/conditional-rendering/page.jsx')} />
      <LivePreview>
        <Demo />
      </LivePreview>
    </>
  );
}
