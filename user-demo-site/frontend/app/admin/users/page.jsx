'use client';

// admin/users/page.jsx — Admin Users List Page
// URL: http://localhost:3000/admin/users
//
// Route-guarded: redirects to /login if no token, /profile if not admin.

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import UserTable from '../../../components/UserTable';
import Loading from '../../../components/Loading';
import ErrorMessage from '../../../components/ErrorMessage';
import SuccessMessage from '../../../components/SuccessMessage';
import { getAllUsers, deleteUser } from '../../../services/userService';

export default function AdminUsersPage() {
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const raw = localStorage.getItem('user');
    if (!token || !raw) { router.push('/login'); return; }

    const currentUser = JSON.parse(raw);
    if (currentUser.role !== 'admin') { router.push('/profile'); return; }

    fetchUsers(1, '');
  }, []);

  const fetchUsers = async (page, searchTerm) => {
    setLoading(true);
    setError('');
    try {
      const result = await getAllUsers({ page, limit: 10, search: searchTerm });
      setUsers(result.data.users);
      setPagination({
        page: result.data.page,
        totalPages: result.data.totalPages,
        total: result.data.total,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers(1, search);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this user? This cannot be undone.')) return;
    setError('');
    setSuccess('');
    try {
      await deleteUser(id);
      setSuccess('User deleted');
      fetchUsers(pagination.page, search);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete user');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2 className="mb-4">
          Users
          <small className="text-muted fs-6 ms-1">({pagination.total} total)</small>
        </h2>

        <ErrorMessage message={error} />
        <SuccessMessage message={success} />

        {/* Search form */}
        <form onSubmit={handleSearch} className="d-flex gap-2 mb-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="form-control"
            data-testid="search-input"
          />
          <button type="submit" className="btn btn-primary" data-testid="search-button">
            Search
          </button>
        </form>

        {loading ? (
          <Loading />
        ) : users.length === 0 ? (
          <div className="text-center py-5 text-muted" data-testid="empty-state">
            No users found.
          </div>
        ) : (
          <>
            <UserTable users={users} onDelete={handleDelete} />

            {/* Pagination — only shown when more than one page */}
            {pagination.totalPages > 1 && (
              <nav className="mt-4" data-testid="pagination">
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${pagination.page === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => fetchUsers(pagination.page - 1, search)}>
                      Previous
                    </button>
                  </li>
                  <li className="page-item active">
                    <span className="page-link">{pagination.page} of {pagination.totalPages}</span>
                  </li>
                  <li className={`page-item ${pagination.page === pagination.totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => fetchUsers(pagination.page + 1, search)}>
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </>
        )}
      </div>
    </>
  );
}
