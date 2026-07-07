import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, CONDITIONS, BRANDS } from '../utils/seedData';
import { HiLightningBolt, HiInformationCircle } from 'react-icons/hi';

export default function ValueCalculator() {
  const { calculateValue } = useApp();
  const [form, setForm] = useState({ brand: '', category: '', condition: '' });
  const [result, setResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    if (form.brand && form.category && form.condition) {
      const value = calculateValue(form.brand, form.category, form.condition);
      setResult(value);
    }
  };

  return (
    <div className="page-container max-w-2xl">
      <h1 className="section-title flex items-center gap-3 mb-2">
        <span className="text-3xl text-primary-500 font-bold">$</span> Value Calculator
      </h1>
      <p className="text-gray-500 mb-8">Estimate the swap value of your clothing items based on brand, category, and condition.</p>

      <div className="card p-6 mb-6">
        <form onSubmit={handleCalculate} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Brand</label>
            <select value={form.brand} onChange={e => setForm({...form, brand: e.target.value})} className="input-field" required>
              <option value="">Select brand...</option>
              {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
            <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="input-field" required>
              <option value="">Select category...</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Condition</label>
            <select value={form.condition} onChange={e => setForm({...form, condition: e.target.value})} className="input-field" required>
              <option value="">Select condition...</option>
              {CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
            <HiLightningBolt /> Calculate Value
          </button>
        </form>
      </div>

      {result !== null && (
        <div className="card p-6 text-center bg-gradient-to-br from-primary-50 to-accent-50 border-primary-200">
          <p className="text-sm text-gray-600 mb-2">Estimated Swap Value</p>
          <p className="text-5xl font-bold text-primary-600 font-display mb-2">{result}</p>
          <p className="text-sm text-gray-500">Swap Points</p>
          <div className="mt-4 p-3 bg-white/60 rounded-xl">
            <p className="text-xs text-gray-500">
              This value is an estimate based on brand reputation, category average, and item condition.
              The actual swap value may vary based on negotiation with the other user.
            </p>
          </div>
        </div>
      )}

      {/* How it works */}
      <div className="card p-6 mt-6">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-4">
          <HiInformationCircle className="text-primary-500" /> How Values Work
        </h3>
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex gap-3">
            <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
            <p><strong>Base value</strong> is determined by the clothing category (e.g., jackets start higher than t-shirts).</p>
          </div>
          <div className="flex gap-3">
            <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
            <p><strong>Brand multiplier</strong> adjusts for brand reputation and resale value (e.g., The North Face &gt; H&amp;M).</p>
          </div>
          <div className="flex gap-3">
            <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
            <p><strong>Condition factor</strong> reduces value based on wear (New = 100%, Fair = 40%).</p>
          </div>
        </div>
      </div>
    </div>
  );
}
