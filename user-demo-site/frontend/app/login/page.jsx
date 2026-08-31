'use client';

// login/page.jsx — Login Page
// URL: http://localhost:3000/login
//
// After login: stores token + user in localStorage, then redirects:
//   admin role → /admin/users
//   user role  → /profile

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { login } from '../../services/authService';
import { validateLoginForm } from '../../utils/validation';
import ErrorMessage from '../../components/ErrorMessage';

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    const validationErrors = validateLoginForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const result = await login(formData);

      // Store credentials in localStorage for subsequent requests
      localStorage.setItem('token', result.data.token);
      localStorage.setItem('user', JSON.stringify(result.data.user));

      // Role-based redirect
      if (result.data.user.role === 'admin') {
        router.push('/admin/users');
      } else {
        router.push('/profile');
      }
    } catch (err) {
      setApiError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
      <div className="card shadow-sm" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="card-body p-4">
          <h1 className="card-title text-center mb-4 h4">Login</h1>

          <ErrorMessage message={apiError} />

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@test.com"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                data-testid="login-email"
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Your password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                data-testid="login-password"
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-100 mb-3"
              data-testid="login-submit"
            >
              {loading
                ? <><span className="spinner-border spinner-border-sm me-2" role="status" />Logging in...</>
                : 'Login'
              }
            </button>
          </form>

          <p className="text-center text-muted small mb-0">
            No account?{' '}
            <Link href="/register" className="text-decoration-none">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
