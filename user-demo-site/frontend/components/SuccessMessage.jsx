// SuccessMessage.jsx — Green success alert box
// Returns null when message is empty — safe to always render.

export default function SuccessMessage({ message }) {
  if (!message) return null;
  return (
    <div className="alert alert-success py-2" data-testid="success-message" role="status">
      {message}
    </div>
  );
}
