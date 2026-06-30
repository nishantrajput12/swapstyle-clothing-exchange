import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

export default function AddClothing() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', type: '', brand: '', size: '', condition: '', description: '', estimated_value: '', location: '', image_url: '' });
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const sampleImages = {
    'T-Shirt': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    'Shirt': 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop',
    'Dress': 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop',
    'Pants': 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
    'Jacket': 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
    'Kurti': 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop',
    'Accessory': 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop',
    'Other': 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=400&fit=crop'
  };

  function handleTypeChange(type) {
    setForm({ ...form, type, image_url: sampleImages[type] || form.image_url });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErr(''); setLoading(true);
    try {
      await api.createClothing({ ...form, estimated_value: parseInt(form.estimated_value) });
      navigate('/dashboard');
    } catch (e) { setErr(e.message); } finally { setLoading(false); }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Clothing</h1>
      <div className="card p-6">
        {err && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">{err}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Title *</label>
            <input type="text" required className="input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g., Zara Floral Summer Dress" />
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Category *</label>
              <select required className="input" value={form.type} onChange={e => handleTypeChange(e.target.value)}>
                <option value="">Select...</option>
                {['T-Shirt', 'Shirt', 'Dress', 'Pants', 'Jacket', 'Kurti', 'Accessory', 'Other'].map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Brand *</label>
              <input type="text" required className="input" value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Size *</label>
              <input type="text" required className="input" value={form.size} onChange={e => setForm({ ...form, size: e.target.value })} placeholder="e.g., M, L, 30" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Condition *</label>
              <select required className="input" value={form.condition} onChange={e => setForm({ ...form, condition: e.target.value })}>
                <option value="">Select...</option>
                {['Excellent', 'Like New', 'Good', 'Fair'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Estimated Value (₹) *</label>
            <input type="number" required min="1" className="input" value={form.estimated_value} onChange={e => setForm({ ...form, estimated_value: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Location *</label>
            <input type="text" required className="input" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="e.g., Mumbai" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Description</label>
            <textarea className="input" rows="4" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Image URL 
              {form.image_url && <span className="text-green-600 font-normal ml-2">✓ Image set</span>}
            </label>
            <input type="url" className="input" value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} placeholder="Paste image URL or use auto-suggested image above" />
            {form.image_url && (
              <div className="mt-2 flex items-center gap-3">
                <img src={form.image_url} alt="Preview" className="w-16 h-16 rounded object-cover border" onError={(e) => { e.target.style.display = 'none'; }} />
                <span className="text-xs text-gray-500">Preview</span>
              </div>
            )}
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? 'Adding...' : 'Add Clothing'}</button>
        </form>
      </div>
    </div>
  );
}
