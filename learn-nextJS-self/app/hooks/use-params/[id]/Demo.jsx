'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function Demo() {
  const { id } = useParams(); // reads the [id] segment from the URL

  return (
    <div className="demo">
      <p>URL param id: <strong>{id}</strong></p>
      <Link href="/hooks/use-params">← Back</Link>
    </div>
  );
}
