'use client';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/PageHeader';

export default function UseRouterPage() {
  const router = useRouter();

  return (
    <>
      <PageHeader
        title="useRouter — Programmatic Navigation"
        description="Navigate from code instead of a clicked link — used for redirects after login, logout, and route guards."
      />
      <div className="demo">
        <button onClick={() => router.push('/hooks/use-router/destination')}>
          router.push('/destination')
        </button>
        <button onClick={() => router.replace('/hooks/use-router/destination')}>
          router.replace('/destination')
        </button>
        <button onClick={() => router.back()}>router.back()</button>
      </div>
    </>
  );
}
