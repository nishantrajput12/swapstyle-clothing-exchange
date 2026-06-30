import { useState, useEffect } from 'react';
import { api } from '../api';

export default function AdminPanel() {
  const [tab, setTab] = useState('stats');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [swaps, setSwaps] = useState([]);

  useEffect(() => {
    api.adminStats().then(setStats).catch(console.error);
    api.adminUsers().then(setUsers).catch(console.error);
    api.adminListings().then(setListings).catch(console.error);
    api.adminSwaps().then(setSwaps).catch(console.error);
  }, []);

  async function deleteListing(id) {
    if (!confirm('Delete this listing?')) return;
    try { await api.deleteListing(id); setListings(listings.filter(l => l.id !== id)); } catch (e) { alert(e.message); }
  }

  async function updateStatus(id, status) {
    try { await api.updateListingStatus(id, status); setListings(listings.map(l => l.id === id ? { ...l, status } : l)); } catch (e) { alert(e.message); }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Panel</h1>
      <div className="flex gap-2 mb-6">
        {['stats', 'users', 'listings', 'swaps'].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg font-medium ${tab === t ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
      {tab === 'stats' && stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[['Users', stats.users], ['Listings', stats.listings], ['Swaps', stats.swaps], ['Completed', stats.completed]].map(([l, v], i) => (
            <div key={i} className="card p-6 text-center">
              <div className="text-3xl font-bold text-primary-600">{v}</div>
              <div className="text-sm text-gray-600 mt-1">{l}</div>
            </div>
          ))}
        </div>
      )}
      {tab === 'users' && (
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50"><tr><th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Username</th><th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th><th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Location</th><th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Joined</th></tr></thead>
            <tbody className="divide-y divide-gray-200">
              {users.map(u => <tr key={u.id}><td className="px-4 py-3">{u.username}</td><td className="px-4 py-3">{u.email}</td><td className="px-4 py-3">{u.location}</td><td className="px-4 py-3">{new Date(u.created_at).toLocaleDateString()}</td></tr>)}
            </tbody>
          </table>
        </div>
      )}
      {tab === 'listings' && (
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50"><tr><th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Title</th><th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Owner</th><th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Value</th><th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th><th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th></tr></thead>
            <tbody className="divide-y divide-gray-200">
              {listings.map(l => (
                <tr key={l.id}>
                  <td className="px-4 py-3">{l.title}</td>
                  <td className="px-4 py-3">@{l.owner_username}</td>
                  <td className="px-4 py-3">₹{l.estimated_value}</td>
                  <td className="px-4 py-3"><span className={`text-xs px-2 py-1 rounded-full ${l.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{l.status}</span></td>
                  <td className="px-4 py-3 flex gap-2">
                    <button onClick={() => updateStatus(l.id, l.status === 'available' ? 'removed' : 'available')} className="text-xs text-blue-600 hover:text-blue-700">{l.status === 'available' ? 'Remove' : 'Restore'}</button>
                    <button onClick={() => deleteListing(l.id)} className="text-xs text-red-600 hover:text-red-700">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {tab === 'swaps' && (
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50"><tr><th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Sender</th><th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Receiver</th><th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th><th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th></tr></thead>
            <tbody className="divide-y divide-gray-200">
              {swaps.map(s => <tr key={s.id}><td className="px-4 py-3">@{s.sender_username}</td><td className="px-4 py-3">@{s.receiver_username}</td><td className="px-4 py-3">{s.status}</td><td className="px-4 py-3">{new Date(s.created_at).toLocaleDateString()}</td></tr>)}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
