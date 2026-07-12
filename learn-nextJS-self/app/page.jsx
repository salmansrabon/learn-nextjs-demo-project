import Link from 'next/link';
import CodePanel from '@/components/CodePanel';

const componentLinks = [
  ['/creating-component', '1. Creating a Component'],
  ['/using-components', '2. Using Components (Props)'],
  ['/fragments', '3. Fragments'],
];

const jsxEventsLinks = [
  ['/jsx-syntax', '4. JSX Syntax Rules'],
  ['/conditional-rendering', '5. Conditional Rendering'],
  ['/rendering-lists', '6. Rendering Lists (map + key)'],
  ['/events', '7. Event Handling'],
];

const hookLinks = [
  ['/hooks/use-state', '1. useState'],
  ['/hooks/use-effect', '2. useEffect'],
  ['/hooks/use-router', '3. useRouter'],
  ['/hooks/use-params', '4. useParams'],
  ['/hooks/use-ref', '5. useRef'],
  ['/hooks/use-callback', '6. useCallback'],
  ['/hooks/use-memo', '7. useMemo'],
  ['/hooks/use-context', '8. useContext'],
  ['/hooks/use-reducer', '9. useReducer'],
];

const installCommands = `mkdir my-next-app
cd my-next-app
npm init -y
npm install next react react-dom`;

const packageJson = `{
  "name": "my-next-app",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^14.2.35",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}`;

const nextConfigSource = `const nextConfig = {};

module.exports = nextConfig;`;

const jsconfigSource = `{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["*"]
    }
  }
}`;

const layoutSource = `import './globals.css';

export const metadata = {
  title: 'My Next App',
  description: 'A minimal Next.js app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`;

const pageSource = `export default function HomePage() {
  return (
    <main>
      <h1>Hello Next.js</h1>
      <p>Your app is running.</p>
    </main>
  );
}`;

const globalsSource = `* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
}`;

const runCommands = `npm run dev

# Open http://localhost:3000`;

export default function HomePage() {
  return (
    <div>
      <h1>Learn React &amp; Next.js From Scratch</h1>
      <p className="description">
        Start with the smallest working Next.js App Router setup, then use the lessons below to add
        components, JSX, events, and hooks one topic at a time.
      </p>

      <div className="theory">
        <h3>What is React?</h3>
        <p>
          <strong>React</strong> is a JavaScript library for building UIs from reusable components.
          You update state, React calculates what changed, and the browser UI updates.
        </p>

        <h3>What is Next.js?</h3>
        <p>
          <strong>Next.js</strong> is a React framework with built-in routing, server rendering, and
          production tooling. This project uses the <strong>App Router</strong>, where folders inside
          <code> app/</code> become URL routes when they contain a <code>page.jsx</code> file.
        </p>

        <table>
          <thead>
            <tr>
              <th>Topic</th>
              <th>React</th>
              <th>Next.js</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Type</td>
              <td>UI library</td>
              <td>Framework built on React</td>
            </tr>
            <tr>
              <td>Routing</td>
              <td>Added separately</td>
              <td>Built in through the app folder</td>
            </tr>
            <tr>
              <td>Rendering</td>
              <td>Usually client-side</td>
              <td>Server and client rendering</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="theory">
        <h3>Minimal Next.js installation</h3>
        <p>
          This minimal App Router setup uses the Next.js packages, scripts, project config files,
          and two required files inside <code>app/</code>: <code>layout.jsx</code> and{' '}
          <code>page.jsx</code>. A global CSS file is optional, but common enough to include here.
        </p>
      </div>

      <CodePanel label="1. Create the project and install dependencies" code={installCommands} />
      <CodePanel label="2. package.json" code={packageJson} />
      <CodePanel label="3. next.config.js" code={nextConfigSource} />
      <CodePanel label="4. jsconfig.json" code={jsconfigSource} />
      <CodePanel label="5. app/layout.jsx" code={layoutSource} />
      <CodePanel label="6. app/page.jsx" code={pageSource} />
      <CodePanel label="7. app/globals.css (optional)" code={globalsSource} />
      <CodePanel label="8. Run the app" code={runCommands} />

      <nav className="home-nav">
        <h2>Components</h2>
        <ul>
          {componentLinks.map(([href, label]) => (
            <li key={href}><Link href={href}>{label}</Link></li>
          ))}
        </ul>

        <h2>JSX &amp; Events</h2>
        <ul>
          {jsxEventsLinks.map(([href, label]) => (
            <li key={href}><Link href={href}>{label}</Link></li>
          ))}
        </ul>

        <h2>Hooks</h2>
        <ul>
          {hookLinks.map(([href, label]) => (
            <li key={href}><Link href={href}>{label}</Link></li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
