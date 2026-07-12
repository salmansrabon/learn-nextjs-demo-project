import Link from 'next/link';

export default function Demo() {
  return (
    <div className="demo">
      <ul>
        <li><Link href="/hooks/use-params/5">/hooks/use-params/5</Link></li>
        <li><Link href="/hooks/use-params/42">/hooks/use-params/42</Link></li>
        <li><Link href="/hooks/use-params/100">/hooks/use-params/100</Link></li>
      </ul>
    </div>
  );
}
