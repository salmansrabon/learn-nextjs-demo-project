import ProfileBadge from '@/components/ProfileBadge';

export default function Demo() {
  return (
    <div className="demo">
      <ProfileBadge name="Alex" role="Admin" />
      <ProfileBadge name="Sara" role="User" />

      <div style={{ marginTop: 10 }}>
        <p>Components can be nested inside other elements:</p>
        <ProfileBadge name="Nested" role="Guest" />
      </div>
    </div>
  );
}
