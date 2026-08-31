// UserTable.jsx — Displays users in a Bootstrap table with action buttons
//
// Props:
//   users    — array of user objects
//   onDelete — called with user.id when Delete is clicked (defined in parent page)

import Link from 'next/link';

export default function UserTable({ users, onDelete }) {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover align-middle" data-testid="user-table">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.firstname} {user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.phonenumber || '—'}</td>
              <td>
                <span className={`badge ${user.role === 'admin' ? 'bg-warning text-dark' : 'bg-success'}`}>
                  {user.role}
                </span>
              </td>
              <td>
                <div className="d-flex gap-1">
                  <Link
                    href={`/admin/users/${user.id}`}
                    className="btn btn-sm btn-outline-primary"
                    data-testid="view-user-button"
                  >
                    View
                  </Link>
                  <Link
                    href={`/admin/users/${user.id}/edit`}
                    className="btn btn-sm btn-outline-warning"
                    data-testid="edit-user-button"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="btn btn-sm btn-outline-danger"
                    data-testid="delete-user-button"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
