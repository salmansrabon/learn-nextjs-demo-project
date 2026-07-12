// Wraps the explanation block that precedes every demo — the actual
// "guidance" from book.html, shown live on the page instead of only in
// the book. Plain semantic HTML (h3/p/ul/table) authored per page.
export default function Theory({ children }) {
  return <div className="theory">{children}</div>;
}
