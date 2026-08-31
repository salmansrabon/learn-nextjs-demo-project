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
        title="useEffect — Fetching Data After Render"
        description="The effect calls a GET API once, after the first render, and stores the response in state."
      />
      <Theory>
        <h3>Why data loading lives in an effect</h3>
        <p>
          A component body must be predictable: given the same props and state it returns the same
          JSX, and it may run more than once. A network request is the opposite — it takes time, it
          can fail, and it must happen <em>once</em>, not on every render. So the request goes in{' '}
          <code>useEffect</code>, which React runs <em>after</em> the render is on screen, and the
          response is stored in <code>useState</code> so the arrival of data triggers a re-render.
        </p>
        <p>
          The example calls <code>https://jsonplaceholder.typicode.com/users</code>, a free public
          read-only API. No key, no login, nothing to install.
        </p>

        <h3>The dependency array</h3>
        <p>
          The second argument to <code>useEffect</code> controls when it runs again:
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
              <td><code>[value]</code></td>
              <td>On mount, then again every time <code>value</code> changes</td>
            </tr>
            <tr>
              <td>no array</td>
              <td>After <em>every</em> render — almost always a bug</td>
            </tr>
          </tbody>
        </table>
        <p className="note">
          The last row matters here. Without <code>[]</code>, the response would call{' '}
          <code>setUsers</code>, the state change would re-render, the re-render would run the
          effect, and the component would fetch forever.
        </p>

        <h3>Cleanup</h3>
        <p>
          The function an effect <strong>returns</strong> is its cleanup, and React runs it when the
          component unmounts or before the effect runs again. It is what stops timers, closes
          subscriptions, and removes event listeners.
        </p>
        <p>
          This example returns nothing, because a single fetch on mount has nothing to tear down.
          You will see a real cleanup in chapter 4, where a request that is still in flight has to
          be ignored if the component goes away before it lands.
        </p>

        <h3>What is deliberately missing</h3>
        <p>
          A real request also needs a loading state and an error state — this one shows an empty
          list until the data arrives, and nothing at all if the request fails. That is fine for
          learning the hook itself, and section 4.2 adds both properly.
        </p>
      </Theory>
      <CodePanel label="Source" code={readDemoSource('app/hooks/use-effect/page.jsx')} />
      <LivePreview>
        <Demo />
      </LivePreview>
    </>
  );
}
