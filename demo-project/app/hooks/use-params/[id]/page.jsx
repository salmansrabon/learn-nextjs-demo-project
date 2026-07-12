'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';

export default function UseParamsDetailPage() {
  const { id } = useParams(); // reads the [id] segment from the URL

  return (
    <>
      <PageHeader
        title={`useParams — Showing id: ${id}`}
        description="This same page file renders for /5, /42, and /100 — only the id changes."
      />
      <div className="demo">
        <p>URL param id: <strong>{id}</strong></p>
        <Link href="/hooks/use-params">← Back</Link>
      </div>
    </>
  );
}
