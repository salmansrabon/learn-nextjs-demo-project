// Step 1: file created, named after the component
// Step 2: function name starts with a capital letter
export default function WelcomeCard({ name, role }) {
  // Step 3: return JSX — exactly one root element
  return (
    <div className="demo">
      <h3>Welcome, {name}!</h3>
      <p>Role: {role}</p>
    </div>
  );
}
// Step 4: exported above with `export default` — that's the whole component
