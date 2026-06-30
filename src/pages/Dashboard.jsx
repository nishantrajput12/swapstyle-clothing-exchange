import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api, clearAuth } from '../api';
import ClothingCard from '../components/ClothingCard';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const u = await api.me();
        setUser(u);
      } catch (e) { console.error('Failed to load user:', e); }
      try {
        const i = await api.clothing({ user_id: 'me' });
        setItems(i);
      } catch (e) { console.error('Failed to load items:', e); }
      try {
        const s = await api.swapStats();
        setStats(s);
      } catch (e) { console.error('Failed to load stats:', e); }
      setLoading(false);
    }
    load();
  }, []);

  async function handleDelete(id) {
    if (!confirm('Delete this item?')) return;
    try { await api.deleteClothing(id); setItems(items.filter(i => i.id !== id)); } catch (e) { alert(e.message); }
  }

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-8"><div className="animate-pulse h-32 bg-gray-200 rounded-xl" /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="card p-6 mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{user?.full_name}</h1>
            <p className="text-gray-600">@{user?.username}</p>
            <div className="flex gap-4 mt-4 text-sm text-gray-600">
              <span>📍 {user?.location}</span>
              {user?.phone && <span>📞 {user?.phone}</span>}
            </div>
            {user?.bio && <p className="mt-4 text-gray-700">{user.bio}</p>}
          </div>
          <button onClick={() => { clearAuth(); window.location.href = '/'; }} className="btn-outline">Logout</button>
        </div>
      </div>
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[['Listings', items.length, 'text-primary-600'], ['Swaps Sent', stats.sent, 'text-accent-600'], ['Accepted', stats.accepted, 'text-blue-600'], ['Completed', stats.completed, 'text-green-600']].map(([l, v, c], i) => (
            <div key={i} className="card p-6 text-center">
              <div className={`text-3xl font-bold ${c}`}>{v}</div>
              <div className="text-sm text-gray-600 mt-1">{l}</div>
            </div>
          ))}
        </div>
      )}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">My Listings</h2>
          <Link to="/add" className="btn-primary">+ Add Item</Link>
        </div>
        {items.length === 0 ? (
          <div className="card p-12 text-center"><div className="text-6xl mb-4">👕</div><h3 className="text-xl font-semibold mb-2">No items yet</h3><p className="text-gray-600 mb-4">Add your first item to start swapping</p><Link to="/add" className="btn-primary">Add Item</Link></div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map(i => (
              <div key={i.id} className="relative group">
                <ClothingCard item={i} />
                <button onClick={() => handleDelete(i.id)} className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity">Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {[['🔄', 'View Swaps', 'Manage swap requests', '/swaps'], ['🔍', 'Browse Items', 'Find items to swap', '/clothing'], ['➕', 'Add New Item', 'List a new item', '/add']].map(([ic, t, d, l], i) => (
          <Link key={i} to={l} className="card p-6 hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-2">{ic}</div>
            <h3 className="font-semibold text-lg mb-1">{t}</h3>
            <p className="text-sm text-gray-600">{d}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
