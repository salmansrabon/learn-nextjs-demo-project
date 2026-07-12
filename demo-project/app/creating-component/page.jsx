import PageHeader from '@/components/PageHeader';
import WelcomeCard from '@/components/WelcomeCard';

export default function CreatingComponentPage() {
  return (
    <>
      <PageHeader
        title="Creating a Component"
        description="A component is just a function: capital-letter name, returns one root element, and gets exported. See components/WelcomeCard.jsx."
      />
      <WelcomeCard name="Alex" role="Admin" />
      <WelcomeCard name="Sara" role="User" />
    </>
  );
}
