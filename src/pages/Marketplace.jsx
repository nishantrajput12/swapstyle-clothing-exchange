import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ClothingCard from '../components/ClothingCard';
import FilterSidebar from '../components/FilterSidebar';
import { HiFilter, HiChevronRight, HiViewGrid, HiViewBoards } from 'react-icons/hi';

export default function Marketplace() {
  const { getAvailableListings } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({ search: '', category: '', size: '', condition: '', brand: '', location: '', sort: 'newest' });
  const [showMobile, setShowMobile] = useState(false);
  const allListings = getAvailableListings();

  useEffect(() => {
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    if (category) setFilters(f => ({ ...f, category }));
    if (search) setFilters(f => ({ ...f, search }));
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = [...allListings];
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(l => l.title.toLowerCase().includes(q) || l.brand.toLowerCase().includes(q) || l.description.toLowerCase().includes(q));
    }
    if (filters.category) result = result.filter(l => l.category === filters.category);
    if (filters.size) result = result.filter(l => l.size === filters.size);
    if (filters.condition) result = result.filter(l => l.condition === filters.condition);
    if (filters.brand) result = result.filter(l => l.brand === filters.brand);
    if (filters.location) {
      const loc = filters.location.toLowerCase();
      result = result.filter(l => l.location.toLowerCase().includes(loc));
    }
    switch (filters.sort) {
      case 'oldest': result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); break;
      case 'value-high': result.sort((a, b) => b.estimatedValue - a.estimatedValue); break;
      case 'value-low': result.sort((a, b) => a.estimatedValue - b.estimatedValue); break;
      default: result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return result;
  }, [allListings, filters]);

  // Active filters display
  const activeFilters = Object.entries(filters).filter(([key, val]) => val && key !== 'sort' && key !== 'search');

  const removeFilter = (key) => {
    setFilters(f => ({ ...f, [key]: '' }));
  };

  return (
    <div className="page-container">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-gray-500 mb-3">
        <Link to="/" className="hover:text-gray-700">Home</Link>
        <HiChevronRight className="text-xs" />
        <span className="text-gray-900 font-medium">
          {filters.category || 'All Items'}
        </span>
      </nav>

      {/* Header */}
      <div className="bg-white rounded-sm border border-gray-200 p-4 mb-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {filters.category ? `${filters.category} - ` : ''}{filtered.length} Items
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">Browse items available for swap</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={filters.sort}
              onChange={e => setFilters({ ...filters, sort: e.target.value })}
              className="border border-gray-300 rounded-sm px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-accent-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="value-high">Value: High to Low</option>
              <option value="value-low">Value: Low to High</option>
            </select>
            <button onClick={() => setShowMobile(true)} className="lg:hidden btn-secondary flex items-center gap-2 py-2 px-3 text-sm">
              <HiFilter /> Filters
            </button>
          </div>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
            <span className="text-xs text-gray-500 self-center">Active Filters:</span>
            {activeFilters.map(([key, val]) => (
              <span key={key} className="inline-flex items-center gap-1 bg-accent-50 text-accent-700 text-xs font-medium px-2 py-1 rounded-sm">
                {key}: {val}
                <button onClick={() => removeFilter(key)} className="hover:text-accent-900">&times;</button>
              </span>
            ))}
            <button onClick={() => setFilters({ search: '', category: '', size: '', condition: '', brand: '', location: '', sort: 'newest' })} className="text-xs text-accent-600 hover:text-accent-700 font-medium self-center">
              Clear All
            </button>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <FilterSidebar filters={filters} setFilters={setFilters} showMobile={showMobile} setShowMobile={setShowMobile} />
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-sm border border-gray-200 text-center py-16">
              <p className="text-gray-500 text-lg mb-2">No items match your filters</p>
              <p className="text-gray-400 text-sm mb-4">Try adjusting your search or filters</p>
              <button onClick={() => setFilters({ search: '', category: '', size: '', condition: '', brand: '', location: '', sort: 'newest' })} className="btn-accent text-sm py-2 px-4">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {filtered.map(item => <ClothingCard key={item.id} listing={item} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
