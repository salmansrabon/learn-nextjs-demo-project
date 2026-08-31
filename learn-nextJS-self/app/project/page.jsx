import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Theory from '@/components/Theory';

// The chapter 4 index. Each lesson is also linked from book.html, but a
// student working through the chapter wants one page to come back to.
const LESSONS = [
  { href: '/project/fetch-get', title: '4.1 Calling a GET API and rendering it', creates: 'app/practice/page.jsx', backend: false },
  { href: '/project/loading-error', title: '4.2 Loading and error states', creates: 'app/practice/page.jsx', backend: false },
  { href: '/project/backend-setup', title: '4.3 Running the backend', creates: '.env.local', backend: true },
  { href: '/project/app-structure', title: '4.4 The app you are building', creates: 'lib/apiConfig.js', backend: true },
  { href: '/project/axios-client', title: '4.5 The axios client and services', creates: 'services/', backend: true },
  { href: '/project/ui-pieces', title: '4.6 Two pieces every page needs', creates: 'components/Message.jsx, Field.jsx', backend: true },
  { href: '/project/register', title: '4.7 Registration', creates: 'utils/validation.js, app/register/page.jsx', backend: true },
  { href: '/project/login', title: '4.8 Login', creates: 'lib/session.js, app/login/page.jsx', backend: true },
  { href: '/project/navbar', title: '4.9 The navbar, and the hydration trap', creates: 'components/Navbar.jsx', backend: true },
  { href: '/project/users-list', title: '4.10 The admin user list', creates: 'components/UserTable.jsx, app/users/page.jsx', backend: true },
  { href: '/project/search-pagination', title: '4.11 Searching and paging through users', creates: 'app/users/page.jsx', backend: true },
  { href: '/project/view-user', title: '4.12 Viewing one user', creates: 'app/users/[id]/page.jsx', backend: true },
  { href: '/project/update-user', title: '4.13 Updating a user', creates: 'app/users/[id]/edit/page.jsx', backend: true },
  { href: '/project/delete-user', title: '4.14 Deleting a user', creates: 'app/users/page.jsx', backend: true },
  { href: '/project/profile', title: '4.15 The normal user: their own profile', creates: 'app/profile/page.jsx', backend: true },
  { href: '/project/finished-app', title: '4.16 The finished app', creates: '-', backend: false },
];

export default function ProjectIndexPage() {
  return (
    <>
      <PageHeader
        title="Chapter 4 - Frontend Development"
        description="Sixteen sections that build one working app: registration, login, and full user management with two roles."
      />
      <Theory>
        <h3>Work through them in order</h3>
        <p>
          Each section creates the files named beside it, and nothing is ever imported that an
          earlier section did not create. Follow it top to bottom and you will never hit a missing
          file.
        </p>
        <p>
          4.1 and 4.2 are throwaway practice and need only an internet connection. From 4.3 the
          Express backend must be running on port 5000 - every lesson shows a status strip telling
          you whether it is.
        </p>
        <p className="note">
          Log in once at 4.8 as <code>admin@test.com</code> to follow 4.10 to 4.14, then log in with
          an account you registered in 4.7 to see 4.15 from the other side.
        </p>
      </Theory>

      <table className="api-table">
        <thead>
          <tr>
            <th>Section</th>
            <th>Creates</th>
            <th>Backend</th>
          </tr>
        </thead>
        <tbody>
          {LESSONS.map((lesson) => (
            <tr key={lesson.href}>
              <td><Link href={lesson.href}>{lesson.title}</Link></td>
              <td><code>{lesson.creates}</code></td>
              <td>{lesson.backend ? 'required' : 'not needed'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Theory>
        <h3>The app itself</h3>
        <p>
          Once you have built it, these are the pages. They are live in this project too, so you can
          compare yours against them.
        </p>
        <ul>
          <li><Link href="/register">/register</Link> - sign up</li>
          <li><Link href="/login">/login</Link> - sign in</li>
          <li><Link href="/users">/users</Link> - admin only: list, search, delete</li>
          <li><Link href="/profile">/profile</Link> - your own record</li>
        </ul>
      </Theory>
    </>
  );
}
