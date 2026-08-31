'use client';

// profile/page.jsx — User Profile Page
// URL: http://localhost:3000/profile
//
// Shows logged-in user's info and allows profile photo upload.

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import SuccessMessage from '../../components/SuccessMessage';
import { getMe } from '../../services/authService';
import { updateProfilePhoto } from '../../services/userService';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/login');
      return;
    }

    getMe()
      .then((result) => setUser(result.data))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load profile'))
      .finally(() => setLoading(false));
  }, []);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('photo', file);

    setUploading(true);
    setError('');
    setSuccess('');

    try {
      const result = await updateProfilePhoto(formData);
      setUser(result.data);
      setSuccess('Profile photo updated!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload photo');
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <><Navbar /><Loading /></>;

  return (
    <>
      <Navbar />
      <div className="container mt-4" style={{ maxWidth: '600px' }}>
        <h2 className="mb-4">My Profile</h2>

        <ErrorMessage message={error} />
        <SuccessMessage message={success} />

        {user && (
          <div className="card shadow-sm">
            <div className="card-body p-4">

              {/* Profile photo */}
              <div className="text-center mb-4">
                <div
                  className="rounded-circle overflow-hidden d-inline-flex align-items-center justify-content-center bg-secondary mb-2"
                  style={{ width: 96, height: 96 }}
                >
                  {user.photoUrl ? (
                    <img
                      src={`${API_URL}${user.photoUrl}`}
                      alt="Profile"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <span className="text-white fs-2 fw-bold">
                      {user.firstname?.[0]?.toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <label style={{ cursor: 'pointer' }} className="text-primary small">
                    {uploading ? 'Uploading...' : 'Change Photo'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="d-none"
                      disabled={uploading}
                      data-testid="photo-upload-input"
                    />
                  </label>
                </div>
              </div>

              {/* User details */}
              <table className="table table-borderless mb-0">
                <tbody>
                  {[
                    ['Full Name', `${user.firstname} ${user.lastname}`],
                    ['Email', user.email],
                    ['Phone', user.phonenumber || 'Not provided'],
                    ['Role', user.role],
                    ['Member Since', new Date(user.created_at).toLocaleDateString()],
                  ].map(([label, value]) => (
                    <tr key={label}>
                      <td className="text-muted fw-medium" style={{ width: '140px' }}>{label}</td>
                      <td className="text-capitalize">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          </div>
        )}
      </div>
    </>
  );
}
