'use client';
import { useRouter } from 'next/navigation';

export default function Demo() {
  const router = useRouter();

  return (
    <div className="demo">
      <button onClick={() => router.push('/hooks/use-router/destination')}>
        router.push('/destination')
      </button>
      <button onClick={() => router.replace('/hooks/use-router/destination')}>
        router.replace('/destination')
      </button>
      <button onClick={() => router.back()}>router.back()</button>
    </div>
  );
}
