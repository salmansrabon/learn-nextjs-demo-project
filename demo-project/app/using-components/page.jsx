import PageHeader from '@/components/PageHeader';
import ProfileBadge from '@/components/ProfileBadge';

export default function UsingComponentsPage() {
  return (
    <>
      <PageHeader
        title="Using Components in JSX"
        description="Import a component, then use it like a custom HTML tag. Same component, different props, different output."
      />
      <div className="demo">
        <ProfileBadge name="Alex" role="Admin" />
        <ProfileBadge name="Sara" role="User" />

        <div style={{ marginTop: 10 }}>
          <p>Components can be nested inside other elements:</p>
          <ProfileBadge name="Nested" role="Guest" />
        </div>
      </div>
    </>
  );
}
