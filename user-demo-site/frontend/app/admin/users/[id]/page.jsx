'use client';

// admin/users/[id]/page.jsx — Admin User Details Page
// URL: http://localhost:3000/admin/users/5
//
// useParams() reads the dynamic [id] segment from the URL.

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../../../components/Navbar';
import Loading from '../../../../components/Loading';
import ErrorMessage from '../../../../components/ErrorMessage';
import { getUserById } from '../../../../services/userService';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function UserDetailsPage() {
  const router = useRouter();
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const raw = localStorage.getItem('user');
    if (!token || !raw) { router.push('/login'); return; }
    const currentUser = JSON.parse(raw);
    if (currentUser.role !== 'admin') { router.push('/profile'); return; }

    getUserById(id)
      .then((result) => setUser(result.data))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load user'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <><Navbar /><Loading /></>;

  return (
    <>
      <Navbar />
      <div className="container mt-4" style={{ maxWidth: '600px' }}>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h2 className="mb-0">User Details</h2>
          <Link href="/admin/users" className="text-decoration-none">← Back</Link>
        </div>

        <ErrorMessage message={error} />

        {user && (
          <div className="card shadow-sm">
            <div className="card-body p-4">

              {user.photoUrl && (
                <div className="text-center mb-4">
                  <img
                    src={`${API_URL}${user.photoUrl}`}
                    alt="Profile"
                    className="rounded-circle"
                    style={{ width: 80, height: 80, objectFit: 'cover' }}
                  />
                </div>
              )}

              <table className="table table-borderless mb-4">
                <tbody>
                  {[
                    ['ID', user.id],
                    ['First Name', user.firstname],
                    ['Last Name', user.lastname],
                    ['Email', user.email],
                    ['Phone', user.phonenumber || 'N/A'],
                    ['Role', user.role],
                    ['Created', new Date(user.created_at).toLocaleString()],
                    ['Updated', new Date(user.updated_at).toLocaleString()],
                  ].map(([label, value]) => (
                    <tr key={label}>
                      <td className="text-muted fw-medium" style={{ width: '130px' }}>{label}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Link
                href={`/admin/users/${user.id}/edit`}
                className="btn btn-warning"
                data-testid="edit-user-button"
              >
                Edit User
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
