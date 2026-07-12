import PageHeader from '@/components/PageHeader';
import Theory from '@/components/Theory';
import CodePanel from '@/components/CodePanel';
import LivePreview from '@/components/LivePreview';
import Demo from './Demo';
import { readDemoSource } from '@/lib/readSource';

export default function EventsPage() {
  return (
    <>
      <PageHeader
        title="React Event Handling"
        description="Events are camelCase (onClick, onChange...) and take a function, not a string. Every handler receives an event object 'e'."
      />
      <Theory>
        <p>
          React events are written in <strong>camelCase</strong> (<code>onClick</code>, not{' '}
          <code>onclick</code>) and receive a <strong>function</strong> as their value, not a string.
          React wraps native browser events in a cross-browser-consistent &quot;SyntheticEvent&quot;
          so the same code behaves identically everywhere.
        </p>
        <table>
          <thead>
            <tr>
              <th>Property / method</th>
              <th>What it gives you</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>e.target.name</code></td>
              <td>The <code>name</code> attribute of the element that fired the event</td>
            </tr>
            <tr>
              <td><code>e.target.value</code></td>
              <td>The input&apos;s current value — sync it into state on every keystroke</td>
            </tr>
            <tr>
              <td><code>e.preventDefault()</code></td>
              <td>Stops the browser&apos;s default behaviour, e.g. a form-submit page reload</td>
            </tr>
            <tr>
              <td><code>e.key</code></td>
              <td>Which keyboard key was pressed (<code>&quot;Enter&quot;</code>, <code>&quot;Escape&quot;</code>...)</td>
            </tr>
          </tbody>
        </table>
      </Theory>
      <CodePanel label="Source" code={readDemoSource('app/events/page.jsx')} />
      <LivePreview>
        <Demo />
      </LivePreview>
    </>
  );
}
