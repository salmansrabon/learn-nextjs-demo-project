// ErrorMessage.jsx — Red error alert box
// Returns null when message is empty — safe to always render.

export default function ErrorMessage({ message }) {
  if (!message) return null;
  return (
    <div className="alert alert-danger py-2" data-testid="error-message" role="alert">
      {message}
    </div>
  );
}
