// components/OpenApp.jsx
//
// Book-only helper. Some pages of the app guard themselves and redirect a
// visitor who is not logged in, which makes them unsuitable for an inline
// preview - the redirect would carry the reader out of the lesson. Those
// lessons link to the real page instead.
import Link from 'next/link';

export default function OpenApp({ href, children }) {
  return (
    <p className="open-app">
      <Link href={href}>{children} &rarr;</Link>
    </p>
  );
}
