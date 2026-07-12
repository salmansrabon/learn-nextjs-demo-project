import PageHeader from '@/components/PageHeader';
import WelcomeCard from '@/components/WelcomeCard';

export default function CreatingComponentPage() {
  return (
    <>
      <PageHeader
        title="Creating a Component"
        description="This page demonstrates how to create a simple React component in Next.js."
      />
      <WelcomeCard name="Alex" role="Admin" />
      <WelcomeCard name="Sara" role="User" />
    </>
  );
}
