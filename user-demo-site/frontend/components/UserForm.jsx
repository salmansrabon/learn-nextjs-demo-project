// UserForm.jsx — Reusable controlled form for editing a user
//
// Props:
//   formData    — { firstname, lastname, email, phonenumber, role }
//   errors      — field-level validation error messages
//   onChange    — updates formData in parent on every keystroke
//   onSubmit    — called when form is submitted
//   loading     — disables submit button during API call
//   submitLabel — submit button text (default: 'Save')

export default function UserForm({ formData, errors = {}, onChange, onSubmit, loading, submitLabel = 'Save' }) {
  return (
    <form onSubmit={onSubmit}>

      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label className="form-label">First Name</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname || ''}
            onChange={onChange}
            className={`form-control ${errors.firstname ? 'is-invalid' : ''}`}
            data-testid="edit-firstname"
          />
          {errors.firstname && <div className="invalid-feedback">{errors.firstname}</div>}
        </div>

        <div className="col-md-6">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname || ''}
            onChange={onChange}
            className={`form-control ${errors.lastname ? 'is-invalid' : ''}`}
            data-testid="edit-lastname"
          />
          {errors.lastname && <div className="invalid-feedback">{errors.lastname}</div>}
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email || ''}
          onChange={onChange}
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          data-testid="edit-email"
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Phone Number</label>
        <input
          type="text"
          name="phonenumber"
          value={formData.phonenumber || ''}
          onChange={onChange}
          className={`form-control ${errors.phonenumber ? 'is-invalid' : ''}`}
          data-testid="edit-phonenumber"
        />
        {errors.phonenumber && <div className="invalid-feedback">{errors.phonenumber}</div>}
      </div>

      <div className="mb-4">
        <label className="form-label">Role</label>
        <select
          name="role"
          value={formData.role || 'user'}
          onChange={onChange}
          className="form-select"
          data-testid="edit-role"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-100"
        data-testid="edit-submit"
      >
        {loading
          ? <><span className="spinner-border spinner-border-sm me-2" role="status" />Saving...</>
          : submitLabel
        }
      </button>
    </form>
  );
}
