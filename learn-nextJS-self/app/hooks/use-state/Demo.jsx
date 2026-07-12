'use client';
import { useState } from 'react';

export default function Demo() {
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="demo">
      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
      <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
      <p>Live preview: <strong>{formData.name || '...'}</strong> — {formData.email || '...'}</p>
    </div>
  );
}
