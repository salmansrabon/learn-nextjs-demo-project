// app/page.jsx — Root page (URL: /)
// Redirects straight to /login so users never land on a blank page.
import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/login');
}
