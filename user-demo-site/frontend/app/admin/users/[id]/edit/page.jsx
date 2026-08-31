'use client';

// admin/users/[id]/edit/page.jsx — Admin Edit User Page
// URL: http://localhost:3000/admin/users/5/edit
//
// Fetches current user data, pre-fills the form, then calls PUT /api/users/:id.
// Two loading states: 'loading' (initial fetch) vs 'saving' (form submit).

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../../../../components/Navbar';
import Loading from '../../../../../components/Loading';
import ErrorMessage from '../../../../../components/ErrorMessage';
import SuccessMessage from '../../../../../components/SuccessMessage';
import UserForm from '../../../../../components/UserForm';
import { getUserById, updateUser } from '../../../../../services/userService';
import { validateEditUserForm } from '../../../../../utils/validation';

export default function EditUserPage() {
  const router = useRouter();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    firstname: '', lastname: '', email: '', phonenumber: '', role: 'user',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const raw = localStorage.getItem('user');
    if (!token || !raw) { router.push('/login'); return; }
    const currentUser = JSON.parse(raw);
    if (currentUser.role !== 'admin') { router.push('/profile'); return; }

    getUserById(id)
      .then((result) => {
        const { firstname, lastname, email, phonenumber, role } = result.data;
        setFormData({ firstname, lastname, email, phonenumber: phonenumber || '', role });
      })
      .catch((err) => setError(err.response?.data?.message || 'Failed to load user'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const validationErrors = validateEditUserForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSaving(true);
    try {
      await updateUser(id, formData);
      setSuccess('User updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update user');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <><Navbar /><Loading /></>;

  return (
    <>
      <Navbar />
      <div className="container mt-4" style={{ maxWidth: '540px' }}>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h2 className="mb-0">Edit User</h2>
          <Link href={`/admin/users/${id}`} className="text-decoration-none">← Back</Link>
        </div>

        <ErrorMessage message={error} />
        <SuccessMessage message={success} />

        <div className="card shadow-sm">
          <div className="card-body p-4">
            <UserForm
              formData={formData}
              errors={errors}
              onChange={handleChange}
              onSubmit={handleSubmit}
              loading={saving}
              submitLabel="Update User"
            />
          </div>
        </div>
      </div>
    </>
  );
}
