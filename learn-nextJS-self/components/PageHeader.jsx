import Link from 'next/link';

// Shared header used by every example page — keeps navigation and
// title/description formatting consistent without repeating markup.
export default function PageHeader({ title, description }) {
  return (
    <div>
      <Link href="/" className="back-link">← All examples</Link>
      <h1>{title}</h1>
      {description && <p className="description">{description}</p>}
    </div>
  );
}
