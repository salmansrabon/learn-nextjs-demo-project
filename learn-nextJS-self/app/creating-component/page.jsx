import PageHeader from '@/components/PageHeader';
import Theory from '@/components/Theory';
import CodePanel from '@/components/CodePanel';
import LivePreview from '@/components/LivePreview';
import WelcomeCard from '@/components/WelcomeCard';
import { readDemoSource } from '@/lib/readSource';

export default function CreatingComponentPage() {
  return (
    <>
      <PageHeader
        title="Creating a Component"
        description="A component is just a function: capital-letter name, returns one root element, and gets exported. See components/WelcomeCard.jsx."
      />
      <Theory>
        <h3>What is a React component?</h3>
        <p>
          A component is a JavaScript function that returns JSX: a reusable, self-contained piece of
          UI, like a custom HTML tag you define yourself. Two rules every component must follow:
        </p>
        <ul>
          <li>The function name must start with a <strong>capital letter</strong>.</li>
          <li>It must return <strong>exactly one root element</strong>, or a Fragment.</li>
        </ul>
        <h3>Creating a component: 4 steps</h3>
        <ul>
          <li>Create a file named after the component: <code>components/WelcomeCard.jsx</code></li>
          <li>Write a function starting with a capital letter</li>
          <li>Return JSX</li>
          <li>Export it with <code>export default</code></li>
        </ul>
      </Theory>
      <CodePanel
        label="Source"
        code={readDemoSource('components/WelcomeCard.jsx', 'app/creating-component/page.jsx')}
      />
      <LivePreview>
        <WelcomeCard name="Alex" role="Admin" />
        <WelcomeCard name="Sara" role="User" />
      </LivePreview>
    </>
  );
}
