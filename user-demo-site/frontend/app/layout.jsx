// layout.jsx — Root layout — wraps every page in the app
// Bootstrap is imported here once so it's available on all pages.
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';

export const metadata = {
  title: 'User Management Mini App',
  description: 'QA/SDET Teaching Application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
