import PageHeader from '@/components/PageHeader';
import Theory from '@/components/Theory';
import CodePanel from '@/components/CodePanel';
import LivePreview from '@/components/LivePreview';
import Demo from './Demo';
import { readDemoSource } from '@/lib/readSource';

export default function UseRouterPage() {
  return (
    <>
      <PageHeader
        title="useRouter — Programmatic Navigation"
        description="Navigate from code instead of a clicked link — used for redirects after login, logout, and route guards."
      />
      <Theory>
        <p>
          <code>useRouter</code> is a <strong>Next.js</strong> hook — imported from{' '}
          <code>'next/navigation'</code>, not <code>'react'</code>. It gives your code the ability to
          redirect the user without them clicking a link — the exact thing a login form needs after a
          successful submit.
        </p>
        <table>
          <thead>
            <tr>
              <th>Method</th>
              <th>Behaviour</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>router.push('/path')</code></td>
              <td>Navigate to a path; adds a new entry to browser history</td>
            </tr>
            <tr>
              <td><code>router.replace('/path')</code></td>
              <td>Navigate, but replace the current history entry (no back-button return)</td>
            </tr>
            <tr>
              <td><code>router.back()</code></td>
              <td>Go to the previous page in history</td>
            </tr>
          </tbody>
        </table>
        <p>
          This hook only works in a Client Component — the page using it must start with{' '}
          <code>'use client'</code>.
        </p>
      </Theory>
      <CodePanel
        label="Source"
        code={readDemoSource('app/hooks/use-router/page.jsx', 'app/hooks/use-router/destination/page.jsx')}
      />
      <LivePreview>
        <Demo />
      </LivePreview>
    </>
  );
}
