'use client';

// register/page.jsx — User Registration Page
// URL: http://localhost:3000/register

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { register } from '../../services/authService';
import { validateRegisterForm } from '../../utils/validation';
import ErrorMessage from '../../components/ErrorMessage';
import SuccessMessage from '../../components/SuccessMessage';

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstname: '', lastname: '', email: '', phonenumber: '', password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    setSuccess('');

    const validationErrors = validateRegisterForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await register(formData);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => router.push('/login'), 2000);
    } catch (err) {
      setApiError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
      <div className="card shadow-sm" style={{ width: '100%', maxWidth: '480px' }}>
        <div className="card-body p-4">
          <h1 className="card-title text-center mb-4 h4">Create Account</h1>

          <ErrorMessage message={apiError} />
          <SuccessMessage message={success} />

          <form onSubmit={handleSubmit}>
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  placeholder="John"
                  className={`form-control ${errors.firstname ? 'is-invalid' : ''}`}
                  data-testid="register-firstname"
                />
                {errors.firstname && <div className="invalid-feedback">{errors.firstname}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  placeholder="Doe"
                  className={`form-control ${errors.lastname ? 'is-invalid' : ''}`}
                  data-testid="register-lastname"
                />
                {errors.lastname && <div className="invalid-feedback">{errors.lastname}</div>}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                data-testid="register-email"
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Phone (optional)</label>
              <input
                type="tel"
                name="phonenumber"
                value={formData.phonenumber}
                onChange={handleChange}
                placeholder="01234567890"
                className={`form-control ${errors.phonenumber ? 'is-invalid' : ''}`}
                data-testid="register-phonenumber"
              />
              {errors.phonenumber && <div className="invalid-feedback">{errors.phonenumber}</div>}
            </div>

            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Min. 4 characters"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                data-testid="register-password"
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-100 mb-3"
              data-testid="register-submit"
            >
              {loading
                ? <><span className="spinner-border spinner-border-sm me-2" role="status" />Registering...</>
                : 'Register'
              }
            </button>
          </form>

          <p className="text-center text-muted small mb-0">
            Already have an account?{' '}
            <Link href="/login" className="text-decoration-none">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
