// components/UserTable.jsx
//
// Presentational only: it renders rows and calls back. It does not fetch,
// does not delete, and does not know any URLs. The page that uses it
// decides what View, Edit and Delete actually do.
//
// Every action prop is optional. A page that has not learned deleting yet
// simply does not pass onDelete, and the button disappears.
export default function UserTable({ users, onView, onEdit, onDelete }) {
  const showActions = Boolean(onView || onEdit || onDelete);

  return (
    <table className="api-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Role</th>
          {showActions && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.firstname} {user.lastname}</td>
            <td>{user.email}</td>
            <td>{user.phonenumber || '-'}</td>
            <td><span className={`api-role ${user.role}`}>{user.role}</span></td>
            {showActions && (
              <td>
                <div className="row-actions">
                  {onView && <button type="button" onClick={() => onView(user)}>View</button>}
                  {onEdit && <button type="button" onClick={() => onEdit(user)}>Edit</button>}
                  {onDelete && (
                    <button type="button" className="danger" onClick={() => onDelete(user)}>
                      Delete
                    </button>
                  )}
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
