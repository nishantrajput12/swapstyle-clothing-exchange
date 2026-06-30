import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api, setToken, setUser } from '../api';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '', full_name: '', location: '', phone: '', bio: '' });
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr(''); setLoading(true);
    try {
      const data = await api.register(form);
      setToken(data.token);
      setUser(data.user.id);
      navigate('/dashboard');
    } catch (e) { setErr(e.message); } finally { setLoading(false); }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-600">Join the Clothing Swap community</p>
          </div>
          {err && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">{err}</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name *</label>
                <input type="text" required className="input" value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Username *</label>
                <input type="text" required className="input" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Email *</label>
                <input type="email" required className="input" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Password *</label>
                <input type="password" required className="input" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Location *</label>
                <input type="text" required className="input" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Phone</label>
                <input type="tel" className="input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Bio</label>
              <textarea className="input" rows="3" value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? 'Creating...' : 'Create Account'}</button>
          </form>
          <p className="mt-6 text-center text-gray-600">Already have an account? <Link to="/login" className="text-primary-600 font-semibold">Login</Link></p>
        </div>
      </div>
    </div>
  );
}
