// components/Field.jsx
//
// One labelled input plus its validation message.
//
// It owns no state on purpose. The parent form holds the value and the
// error, which is what makes the input *controlled*.
export default function Field({
  label,
  name,
  value,
  onChange,
  error,
  type = 'text',
  placeholder,
  disabled,
}) {
  return (
    <div className={`api-field${error ? ' has-error' : ''}`}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
      {error && <span className="api-field-error">{error}</span>}
    </div>
  );
}
