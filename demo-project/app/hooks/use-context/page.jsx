'use client';
import PageHeader from '@/components/PageHeader';
import { ThemeProvider, useTheme } from './ThemeContext';

function ThemedBox() {
  const { theme, toggleTheme } = useTheme(); // no props needed — reads context directly
  return (
    <div className="demo" style={{ background: theme === 'dark' ? '#1a1a1a' : '#fff', color: theme === 'dark' ? '#fff' : '#1a1a1a' }}>
      <p>Current theme: <strong>{theme}</strong></p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

function DeeplyNestedConsumer() {
  const { theme } = useTheme();
  return <p className="note">A deeply nested child also knows the theme is &quot;{theme}&quot; — no props were passed down.</p>;
}

// STEP 1: create — see ThemeContext.jsx (createContext, Provider, custom hook)
export default function UseContextPage() {
  return (
    <>
      <PageHeader
        title="useContext — Shared State Without Prop Drilling"
        description="Wrap components in a Provider once; any descendant can read the value directly."
      />
      {/* STEP 3: provide — wrap the components that need the value */}
      <ThemeProvider>
        <ThemedBox />
        {/* STEP 4: consume — any depth, no props threaded through */}
        <DeeplyNestedConsumer />
      </ThemeProvider>
    </>
  );
}
