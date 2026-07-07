import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiMail, HiLockClosed, HiArrowLeft } from 'react-icons/hi';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const result = login(form.email, form.password);
      setLoading(false);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error);
      }
    }, 400);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-8">
          <HiArrowLeft /> Back to home
        </Link>

        <div className="card p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 font-display">Welcome back</h1>
            <p className="text-gray-500 mt-1">Log in to your SwapStyle account</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-5">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <div className="relative">
                <HiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="input-field pl-10" placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="password" required value={form.password} onChange={e => setForm({...form, password: e.target.value})} className="input-field pl-10" placeholder="Enter your password" />
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3">
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Don't have an account? <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">Sign up</Link>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-500 font-medium mb-2">Demo Accounts:</p>
            <div className="space-y-1 text-xs text-gray-600">
              <p><strong>User:</strong> priya@example.com / password123</p>
              <p><strong>Admin:</strong> admin@swapstyle.com / admin123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
