// Shows the real, live source of the file(s) passed to readSource() —
// what you're reading is exactly what's saved on disk right now.
export default function CodePanel({ label = 'Source', code }) {
  return (
    <div className="code-panel">
      <div className="code-panel-label">{label}</div>
      <pre className="code-block"><code>{code}</code></pre>
    </div>
  );
}
