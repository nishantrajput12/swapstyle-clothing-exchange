import { useState, useEffect } from 'react';
import { api } from '../api';
import ClothingCard from '../components/ClothingCard';

export default function ClothingList() {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({});
  const [options, setOptions] = useState({ types: [], brands: [], sizes: [], conditions: [], locations: [] });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    api.clothing(filters).then(setItems).catch(console.error);
  }, [filters]);

  useEffect(() => {
    api.filterOptions().then(setOptions).catch(console.error);
  }, []);

  function update(key, val) {
    const next = { ...filters };
    if (val) next[key] = val; else delete next[key];
    setFilters(next);
  }

  function clearAll() { setFilters({ }); }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Browse Clothing</h1>
        <button onClick={() => setShowFilters(!showFilters)} className="btn-outline md:hidden">Filters</button>
      </div>

      <div className="grid md:grid-cols-[250px_1fr] gap-8">
        <aside className={`${showFilters ? 'block' : 'hidden'} md:block`}>
          <div className="card p-4 space-y-4 sticky top-24">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Filters</h3>
              <button onClick={clearAll} className="text-sm text-primary-600 hover:text-primary-700">Clear All</button>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Search</label>
              <input type="text" className="input" placeholder="Search..." onChange={e => update('search', e.target.value)} />
            </div>
            {[
              { key: 'type', label: 'Category', opts: options.types },
              { key: 'brand', label: 'Brand', opts: options.brands },
              { key: 'size', label: 'Size', opts: options.sizes },
              { key: 'condition', label: 'Condition', opts: options.conditions },
              { key: 'location', label: 'Location', opts: options.locations }
            ].map(f => (
              <div key={f.key}>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{f.label}</label>
                <select className="input" value={filters[f.key] || ''} onChange={e => update(f.key, e.target.value)}>
                  <option value="">All</option>
                  {f.opts.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
        </aside>

        <div>
          {items.length === 0 ? (
            <div className="card p-12 text-center"><p className="text-gray-500">No items found.</p></div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map(item => <ClothingCard key={item.id} item={item} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
