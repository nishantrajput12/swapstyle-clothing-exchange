import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiMail, HiLockClosed, HiUser, HiLocationMarker, HiArrowLeft } from 'react-icons/hi';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', location: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) { setError('Passwords do not match'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setLoading(true);
    setTimeout(() => {
      const result = register(form.name, form.email, form.password, form.location);
      setLoading(false);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error);
      }
    }, 400);
  };

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-8">
          <HiArrowLeft /> Back to home
        </Link>
        <div className="card p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 font-display">Create your account</h1>
            <p className="text-gray-500 mt-1">Start swapping clothes sustainably</p>
          </div>
          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-5">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
              <div className="relative">
                <HiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" required value={form.name} onChange={e => update('name', e.target.value)} className="input-field pl-10" placeholder="Your full name" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <div className="relative">
                <HiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" required value={form.email} onChange={e => update('email', e.target.value)} className="input-field pl-10" placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
              <div className="relative">
                <HiLocationMarker className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" required value={form.location} onChange={e => update('location', e.target.value)} className="input-field pl-10" placeholder="City, India" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="password" required value={form.password} onChange={e => update('password', e.target.value)} className="input-field pl-10" placeholder="Min 6 characters" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
              <div className="relative">
                <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="password" required value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} className="input-field pl-10" placeholder="Repeat your password" />
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3">
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account? <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
