export default function LivePreview({ children }) {
  return (
    <div className="live-preview">
      <h2 className="live-preview-title">Live Preview</h2>
      <div className="live-preview-body">{children}</div>
    </div>
  );
}
