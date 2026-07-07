import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { CATEGORIES, SIZES, CONDITIONS, BRANDS } from '../utils/seedData';
import { HiPlus, HiTrash, HiArrowLeft } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function CreateListing() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { addListing, updateListing, getListing, calculateValue } = useApp();
  const isEditing = !!id;

  const [form, setForm] = useState({
    title: '', category: '', brand: '', size: '', condition: '', estimatedValue: '', description: '', location: user?.location || '', tags: '', imageUrl: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditing) {
      const listing = getListing(id);
      if (listing) {
        setForm({
          title: listing.title, category: listing.category, brand: listing.brand, size: listing.size, condition: listing.condition, estimatedValue: listing.estimatedValue.toString(), description: listing.description, location: listing.location, tags: listing.tags?.join(', ') || '', imageUrl: listing.images[0] || ''
        });
      }
    }
  }, [id]);

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const autoEstimate = () => {
    if (form.brand && form.category && form.condition) {
      const val = calculateValue(form.brand, form.category, form.condition);
      update('estimatedValue', val.toString());
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    if (!form.category) errs.category = 'Category is required';
    if (!form.brand.trim()) errs.brand = 'Brand is required';
    if (!form.size) errs.size = 'Size is required';
    if (!form.condition) errs.condition = 'Condition is required';
    if (!form.estimatedValue || form.estimatedValue <= 0) errs.estimatedValue = 'Value is required';
    if (!form.description.trim()) errs.description = 'Description is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const data = {
      title: form.title.trim(), category: form.category, brand: form.brand.trim(), size: form.size, condition: form.condition, estimatedValue: parseInt(form.estimatedValue), description: form.description.trim(), location: form.location.trim(), tags: form.tags.split(',').map(t => t.trim()).filter(Boolean), images: [form.imageUrl || 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=400&fit=crop'],
    };
    if (isEditing) {
      updateListing(id, data);
    } else {
      addListing(data);
    }
    navigate('/dashboard');
  };

  return (
    <div className="page-container max-w-2xl">
      <Link to="/dashboard" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6">
        <HiArrowLeft /> Back to Dashboard
      </Link>
      <h1 className="section-title mb-2">{isEditing ? 'Edit Listing' : 'Create New Listing'}</h1>
      <p className="text-gray-500 mb-8">{isEditing ? 'Update your clothing item details' : 'List a clothing item for swap'}</p>

      <form onSubmit={handleSubmit} className="card p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Title *</label>
          <input type="text" value={form.title} onChange={e => update('title', e.target.value)} className={`input-field ${errors.title ? 'border-red-300' : ''}`} placeholder="e.g., Zara Floral Summer Dress" />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Category *</label>
            <select value={form.category} onChange={e => update('category', e.target.value)} className={`input-field ${errors.category ? 'border-red-300' : ''}`}>
              <option value="">Select...</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Brand *</label>
            <select value={form.brand} onChange={e => update('brand', e.target.value)} className={`input-field ${errors.brand ? 'border-red-300' : ''}`}>
              <option value="">Select...</option>
              {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
            {errors.brand && <p className="text-red-500 text-xs mt-1">{errors.brand}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Size *</label>
            <select value={form.size} onChange={e => update('size', e.target.value)} className={`input-field ${errors.size ? 'border-red-300' : ''}`}>
              <option value="">Select...</option>
              {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            {errors.size && <p className="text-red-500 text-xs mt-1">{errors.size}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Condition *</label>
            <select value={form.condition} onChange={e => update('condition', e.target.value)} className={`input-field ${errors.condition ? 'border-red-300' : ''}`}>
              <option value="">Select...</option>
              {CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.condition && <p className="text-red-500 text-xs mt-1">{errors.condition}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Estimated Swap Value (Points) *</label>
          <div className="flex gap-2">
            <input type="number" min="1" value={form.estimatedValue} onChange={e => update('estimatedValue', e.target.value)} className={`input-field flex-1 ${errors.estimatedValue ? 'border-red-300' : ''}`} placeholder="e.g., 45" />
            <button type="button" onClick={autoEstimate} className="btn-secondary text-sm whitespace-nowrap">Auto Estimate</button>
          </div>
          {errors.estimatedValue && <p className="text-red-500 text-xs mt-1">{errors.estimatedValue}</p>}
          <p className="text-xs text-gray-400 mt-1">Click "Auto Estimate" to calculate based on brand, category, and condition.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Image URL</label>
          <input type="url" value={form.imageUrl} onChange={e => update('imageUrl', e.target.value)} className="input-field" placeholder="https://example.com/image.jpg (optional)" />
          <p className="text-xs text-gray-400 mt-1">Paste a direct image URL, or leave empty for a placeholder.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Description *</label>
          <textarea value={form.description} onChange={e => update('description', e.target.value)} rows={4} className={`input-field resize-none ${errors.description ? 'border-red-300' : ''}`} placeholder="Describe your item: style, fit, why you're swapping it, any flaws..." />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
          <input type="text" value={form.location} onChange={e => update('location', e.target.value)} className="input-field" placeholder="City, India" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Tags (comma separated)</label>
          <input type="text" value={form.tags} onChange={e => update('tags', e.target.value)} className="input-field" placeholder="e.g., summer, casual, floral" />
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-100">
          <button type="submit" className="btn-primary flex-1">{isEditing ? 'Update Listing' : 'Create Listing'}</button>
          <Link to="/dashboard" className="btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
