import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api, setToken, setUser } from '../api';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr(''); setLoading(true);
    try {
      const data = await api.login(form);
      setToken(data.token);
      setUser(data.user.id);
      navigate('/dashboard');
    } catch (e) { setErr(e.message); } finally { setLoading(false); }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-block bg-primary-100 p-3 rounded-full mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Login to your account</p>
          </div>
          {err && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">{err}</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Username or Email</label>
              <input type="text" required className="input" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} placeholder="Enter your username" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Password</label>
              <input type="password" required className="input" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Enter your password" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? 'Logging in...' : 'Login'}</button>
          </form>
          <p className="mt-6 text-center text-gray-600">Don't have an account? <Link to="/register" className="text-primary-600 font-semibold hover:text-primary-700">Sign up</Link></p>
        </div>
        <div className="mt-4 bg-white rounded-lg shadow p-4 text-center">
          <p className="text-sm text-gray-600 mb-2">Demo: <span className="font-mono font-semibold text-primary-600">priya_sharma</span> / <span className="font-mono font-semibold text-primary-600">password123</span></p>
        </div>
      </div>
    </div>
  );
}
