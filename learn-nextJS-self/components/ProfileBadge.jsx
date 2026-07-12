// A tiny presentational component — used by the "Using Components" example
// to show importing from a separate file and passing different props.
export default function ProfileBadge({ name, role }) {
  return <span className="badge">{name} · {role}</span>;
}
