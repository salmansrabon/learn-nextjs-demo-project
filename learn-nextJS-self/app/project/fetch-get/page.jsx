import PageHeader from '@/components/PageHeader';
import Theory from '@/components/Theory';
import CodePanel from '@/components/CodePanel';
import LivePreview from '@/components/LivePreview';
import Demo from './Demo';
import { readSource } from '@/lib/readSource';

export default function FetchGetLesson() {
  return (
    <>
      <PageHeader
        title="4.1 Calling a GET API and rendering it"
        description="fetch() inside useEffect, the response in useState, the array on the screen."
      />
      <Theory>
        <h3>Create a scratch page</h3>
        <p>
          This section and the next are practice. Make a throwaway page at{' '}
          <code>app/practice/page.jsx</code>, paste the code below into it, and open{' '}
          <code>/practice</code>. You will delete it before section 4.4 - the real app starts
          there. Nothing here needs the backend running.
        </p>

        <h3>Three pieces, always the same</h3>
        <p>
          Every page in this chapter that loads data is built from the same three parts. Learn them
          once here and the rest of the chapter is variations.
        </p>
        <ul>
          <li><strong>State</strong> to hold the response - the data does not exist on the first render.</li>
          <li><strong>An effect</strong> to start the request - fetching is a side effect, so it does not belong in the render body.</li>
          <li><strong>A render</strong> that maps over whatever state currently holds.</li>
        </ul>

        <h3>Why <code>&apos;use client&apos;</code> is at the top</h3>
        <p>
          Files under <code>app/</code> are Server Components by default. A Server Component runs on
          the server and ships HTML - no <code>useState</code>, no <code>useEffect</code>, no click
          handlers, because there is no browser involved. The moment a component needs any of those
          it must say <code>&apos;use client&apos;</code>. This one needs two hooks, so it does.
        </p>
        <p className="note">
          Every page you write in this chapter is a Client Component for the same reason: they all
          hold state and respond to clicks.
        </p>

        <h3>Why the effect ends in <code>[]</code></h3>
        <p>
          An effect with no dependency array runs after <em>every</em> render. Calling{' '}
          <code>setUsers</code> causes a render, which would run the effect again, which would fetch
          again - forever. <code>[]</code> means &quot;run once, after the first render&quot;.
        </p>

        <p className="note">
          Watch the preview as it loads: the list is empty for a moment before the data appears.
          That is not a bug, it is the first render happening before the response arrives. Section
          4.2 handles it properly.
        </p>
      </Theory>
      <CodePanel label="app/practice/page.jsx" code={readSource('app/project/fetch-get/Demo.jsx')} />
      <LivePreview>
        <Demo />
      </LivePreview>
    </>
  );
}
