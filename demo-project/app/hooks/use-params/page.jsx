import Link from 'next/link';
import PageHeader from '@/components/PageHeader';

export default function UseParamsIndexPage() {
  return (
    <>
      <PageHeader
        title="useParams — Read Dynamic URL Segments"
        description="Click a link below — the same page file reads a different id from the URL each time."
      />
      <div className="demo">
        <ul>
          <li><Link href="/hooks/use-params/5">/hooks/use-params/5</Link></li>
          <li><Link href="/hooks/use-params/42">/hooks/use-params/42</Link></li>
          <li><Link href="/hooks/use-params/100">/hooks/use-params/100</Link></li>
        </ul>
      </div>
    </>
  );
}
