'use client';
import { useState } from 'react';
import PageHeader from '@/components/PageHeader';

export default function UseStatePage() {
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <PageHeader
        title="useState — Managing State"
        description="const [value, setValue] = useState(initialValue). Calling the setter tells React to re-render."
      />
      <div className="demo">
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <p>Live preview: <strong>{formData.name || '...'}</strong> — {formData.email || '...'}</p>
      </div>
    </>
  );
}
