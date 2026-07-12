import PageHeader from '@/components/PageHeader';
import Theory from '@/components/Theory';
import CodePanel from '@/components/CodePanel';
import LivePreview from '@/components/LivePreview';
import Demo from './Demo';
import { readDemoSource } from '@/lib/readSource';

export default function UseEffectPage() {
  return (
    <>
      <PageHeader
        title="useEffect — Dependencies & Lifecycle"
        description="[] = run once on mount. [count] = mount + every time count changes. The returned function runs on unmount."
      />
      <Theory>
        <h3>The dependency array</h3>
        <p>
          <code>useEffect</code> runs a side effect <em>after</em> render. Its second argument — the
          dependency array — controls exactly when it re-runs:
        </p>
        <table>
          <thead>
            <tr>
              <th>Dependency</th>
              <th>Runs</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>[]</code></td>
              <td>Once, right after the component first mounts</td>
            </tr>
            <tr>
              <td><code>[count]</code></td>
              <td>On mount, then again every time <code>count</code> changes</td>
            </tr>
            <tr>
              <td>no array</td>
              <td>After <em>every</em> render — almost always a bug; avoid it</td>
            </tr>
          </tbody>
        </table>
        <h3>Three lifecycle phases</h3>
        <ul>
          <li><strong>Mounting</strong> — the component is created and shown for the first time. Good place for: fetching data, checking auth. <code>useEffect(fn, [])</code></li>
          <li><strong>Updating</strong> — a watched value changed and the component re-rendered. <code>useEffect(fn, [value])</code></li>
          <li><strong>Unmounting</strong> — the component is removed. The <strong>function returned</strong> from the effect is the cleanup — React calls it automatically to stop timers or listeners and prevent memory leaks.</li>
        </ul>
      </Theory>
      <CodePanel label="Source" code={readDemoSource('app/hooks/use-effect/page.jsx')} />
      <LivePreview>
        <Demo />
      </LivePreview>
    </>
  );
}
