import PageHeader from '@/components/PageHeader';
import Theory from '@/components/Theory';
import CodePanel from '@/components/CodePanel';
import LivePreview from '@/components/LivePreview';
import Demo from './Demo';
import { readDemoSource } from '@/lib/readSource';

export default function JsxSyntaxPage() {
  return (
    <>
      <PageHeader
        title="JSX Syntax Rules"
        description="JSX looks like HTML but compiles to JavaScript: a few attribute names and rules differ."
      />
      <Theory>
        <p>
          JSX looks like HTML, but it is JavaScript syntax. Because JavaScript is underneath, a few
          HTML attributes use different names and every tag must close.
        </p>
        <table>
          <thead>
            <tr>
              <th>Rule</th>
              <th>HTML</th>
              <th>JSX</th>
              <th>Why</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CSS class</td>
              <td><code>class=&quot;btn&quot;</code></td>
              <td><code>className=&quot;btn&quot;</code></td>
              <td><code>class</code> is a reserved JS keyword.</td>
            </tr>
            <tr>
              <td>Label for</td>
              <td><code>for=&quot;email&quot;</code></td>
              <td><code>htmlFor=&quot;email&quot;</code></td>
              <td><code>for</code> is a reserved JS keyword.</td>
            </tr>
            <tr>
              <td>Inline style</td>
              <td><code>style=&quot;color:red&quot;</code></td>
              <td><code>{'style={{ color: "red" }}'}</code></td>
              <td>Style is a JS object.</td>
            </tr>
            <tr>
              <td>Self-closing tags</td>
              <td><code>&lt;input&gt;</code></td>
              <td><code>&lt;input /&gt;</code></td>
              <td>Every tag must close in JSX.</td>
            </tr>
          </tbody>
        </table>
      </Theory>
      <CodePanel label="Source" code={readDemoSource('app/jsx-syntax/page.jsx')} />
      <LivePreview>
        <Demo />
      </LivePreview>
    </>
  );
}
