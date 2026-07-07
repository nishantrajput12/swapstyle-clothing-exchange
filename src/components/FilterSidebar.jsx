import { CATEGORIES, SIZES, CONDITIONS, BRANDS } from '../utils/seedData';
import { HiFilter } from 'react-icons/hi';

export default function FilterSidebar({ filters, setFilters, showMobile, setShowMobile }) {
  const update = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));
  const clearAll = () => setFilters({ search: '', category: '', size: '', condition: '', brand: '', location: '', sort: 'newest' });

  const content = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <HiFilter /> Filters
        </h3>
        <button onClick={clearAll} className="text-sm text-primary-600 hover:text-primary-700 font-medium">Clear All</button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
        <select value={filters.category} onChange={e => update('category', e.target.value)} className="input-field text-sm">
          <option value="">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Size</label>
        <select value={filters.size} onChange={e => update('size', e.target.value)} className="input-field text-sm">
          <option value="">All Sizes</option>
          {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Condition</label>
        <select value={filters.condition} onChange={e => update('condition', e.target.value)} className="input-field text-sm">
          <option value="">Any Condition</option>
          {CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Brand</label>
        <select value={filters.brand} onChange={e => update('brand', e.target.value)} className="input-field text-sm">
          <option value="">All Brands</option>
          {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
        <input type="text" placeholder="City, India" value={filters.location} onChange={e => update('location', e.target.value)} className="input-field text-sm" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Sort By</label>
        <select value={filters.sort} onChange={e => update('sort', e.target.value)} className="input-field text-sm">
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="value-high">Value: High to Low</option>
          <option value="value-low">Value: Low to High</option>
        </select>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="card p-5 sticky top-24">{content}</div>
      </aside>

      {showMobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobile(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-5 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Filters</h2>
              <button onClick={() => setShowMobile(false)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
            </div>
            {content}
          </div>
        </div>
      )}
    </>
  );
}
