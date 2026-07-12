import PageHeader from '@/components/PageHeader';
import Theory from '@/components/Theory';
import CodePanel from '@/components/CodePanel';
import LivePreview from '@/components/LivePreview';
import Demo from './Demo';
import { readDemoSource } from '@/lib/readSource';

export default function UseContextPage() {
  return (
    <>
      <PageHeader
        title="useContext — Shared State Without Prop Drilling"
        description="Wrap components in a Provider once; any descendant can read the value directly."
      />
      <Theory>
        <p>
          Passing data through several component layers that don&apos;t use it, just so a
          deeply-nested child can, is called <strong>prop drilling</strong>. Context is React&apos;s
          built-in fix — a shared store any descendant can read directly, no matter how deep. Three
          steps:
        </p>
        <ul>
          <li><strong>Create</strong> — <code>const MyContext = createContext(null)</code></li>
          <li><strong>Provide</strong> — wrap the components that need the value in <code>&lt;MyContext.Provider value={'{...}'}&gt;</code></li>
          <li><strong>Consume</strong> — any descendant calls <code>useContext(MyContext)</code> to read it, with zero props passed down manually</li>
        </ul>
        <p>
          The demo wraps step 3 in a small custom hook (<code>useTheme()</code>) — a common pattern
          that lets every consumer write <code>useTheme()</code> instead of importing and calling{' '}
          <code>useContext(ThemeContext)</code> everywhere. See <code>ThemeContext.jsx</code> for
          steps 1 and 2.
        </p>
      </Theory>
      <CodePanel
        label="Source"
        code={readDemoSource('app/hooks/use-context/ThemeContext.jsx', 'app/hooks/use-context/page.jsx')}
      />
      <LivePreview>
        <Demo />
      </LivePreview>
    </>
  );
}
