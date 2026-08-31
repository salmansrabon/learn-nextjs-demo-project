// components/Message.jsx
//
// A single message box used for errors, successes and hints.
// Renders nothing when there is no message, which keeps every caller free
// of `{error && <div>...</div>}` noise.
export default function Message({ kind = 'error', children }) {
  if (!children) return null;
  return <div className={`api-message ${kind}`}>{children}</div>;
}
