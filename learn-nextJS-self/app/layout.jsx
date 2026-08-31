import './globals.css';
import './userapp.css';

export const metadata = {
  title: 'Learn React & Next.js From Scratch',
  description: 'A live Next.js project that teaches itself — install, then build every JSX/Events topic and every hook, one real page at a time.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="container">{children}</div>
      </body>
    </html>
  );
}
