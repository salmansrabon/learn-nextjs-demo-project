import PageHeader from '@/components/PageHeader';
import Theory from '@/components/Theory';
import CodePanel from '@/components/CodePanel';
import LivePreview from '@/components/LivePreview';
import Demo from './Demo';
import { readSource } from '@/lib/readSource';

export default function LoadingErrorLesson() {
  return (
    <>
      <PageHeader
        title="4.2 Loading and error states"
        description="Every request has three outcomes. Render all three, not just the happy one."
      />
      <Theory>
        <h3>The trap: fetch does not throw on 404</h3>
        <p>
          This surprises almost everyone. <code>fetch()</code> rejects only when the request never
          completed - the network is down, the server is unreachable, CORS blocked it. A{' '}
          <code>404</code> or a <code>500</code> is a <em>successful</em> round trip as far as{' '}
          <code>fetch</code> is concerned, so your <code>catch</code> block never runs and you end
          up calling <code>.json()</code> on an error page.
        </p>
        <p>
          That is what <code>if (!res.ok) throw new Error(...)</code> is for. <code>res.ok</code> is
          true only for status codes in the 200-299 range. Press the button in the preview to point
          the request at a URL that 404s and watch the error branch appear.
        </p>
        <p className="note">
          Section 4.5 replaces <code>fetch</code> with axios, which rejects on any non-2xx by
          itself. This is one of the main reasons the app uses it.
        </p>

        <h3>Why <code>finally</code></h3>
        <p>
          <code>setLoading(false)</code> has to happen whether the request succeeded or failed. Put
          it only in the <code>try</code> and a failed request leaves the spinner running forever.
          Put it in both branches and you have duplicated it. <code>finally</code> runs on both
          paths.
        </p>

        <h3>Order the three states deliberately</h3>
        <table>
          <thead>
            <tr><th>State</th><th>Condition</th><th>Why this order</th></tr>
          </thead>
          <tbody>
            <tr><td>Loading</td><td><code>loading</code></td><td>Checked first - nothing else is known yet</td></tr>
            <tr><td>Error</td><td><code>error</code></td><td>Checked before data, so a stale list never shows next to a failure</td></tr>
            <tr><td>Data</td><td><code>!loading &amp;&amp; !error</code></td><td>The only state where the response can be trusted</td></tr>
          </tbody>
        </table>
        <p>
          You will write this same trio on every page of the app. Section 4.6 turns the error branch
          into a reusable <code>Message</code> component so it is one line instead of five.
        </p>

        <h3>The dependency array earns its keep</h3>
        <p>
          The effect ends in <code>[breakIt]</code>, not <code>[]</code>. Flipping that value re-runs
          the request. This is exactly the mechanism section 4.11 uses to refetch when the search
          term or page number changes.
        </p>
        <p className="note">
          That is the end of the practice pages. Delete <code>app/practice/page.jsx</code> - the
          real app starts in 4.3.
        </p>
      </Theory>
      <CodePanel label="app/practice/page.jsx" code={readSource('app/project/loading-error/Demo.jsx')} />
      <LivePreview>
        <Demo />
      </LivePreview>
    </>
  );
}
