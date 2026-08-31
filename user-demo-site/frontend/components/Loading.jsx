// Loading.jsx — Spinning loader shown while data is fetching
// Usage: <Loading /> or <Loading message="Fetching users..." />

export default function Loading({ message = 'Loading...' }) {
  return (
    <div className="d-flex justify-content-center align-items-center p-5" data-testid="loading">
      <div className="text-center">
        <div className="spinner-border text-primary mb-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted small mb-0">{message}</p>
      </div>
    </div>
  );
}
