import Link from 'next/link';
import PageHeader from '@/components/PageHeader';

export default function DestinationPage() {
  return (
    <>
      <PageHeader
        title="You arrived via useRouter!"
        description="This page was reached by router.push or router.replace — not a clicked <a> tag."
      />
      <Link href="/hooks/use-router">← Back to useRouter example</Link>
    </>
  );
}
