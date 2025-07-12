import React, { useState } from 'react';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await fetch('http://localhost:8081/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      localStorage.setItem('token', data.token);
      setSuccess('Registration successful!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded mt-8">
      <h2 className="text-2xl mb-4">Register</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {success && <div className="text-green-500 mb-2">{success}</div>}
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Register</button>
    </form>
  );
};

export default Register; 