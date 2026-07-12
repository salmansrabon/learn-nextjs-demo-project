import PageHeader from '@/components/PageHeader';

export default function JsxSyntaxPage() {
  const name = 'Alex';
  const isAdmin = true;

  return (
    <>
      <PageHeader
        title="JSX Syntax Rules"
        description="JSX looks like HTML but compiles to JavaScript — a few attribute names and rules differ."
      />
      <div className="demo">
        {/* className, not class */}
        <h3 style={{ color: 'teal' }}>{name}</h3>
        {/* style is a JS object; {name} above is a JS expression */}

        {isAdmin && <span className="badge">Admin</span>}

        {/* htmlFor, not for */}
        <label htmlFor="email">Email</label>
        {/* every tag must self-close */}
        <input id="email" type="email" placeholder="you@example.com" />

        {/* this is a JSX comment — HTML's <!-- --> does not work in JSX */}
      </div>
    </>
  );
}
