import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api, getUserId } from '../api';

export default function SwapRequests() {
  const [swaps, setSwaps] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.swaps({ status: filter || undefined }).then(setSwaps).catch(console.error).finally(() => setLoading(false));
  }, [filter]);

  function statusColor(s) {
    return s === 'pending' ? 'bg-yellow-100 text-yellow-800' : s === 'accepted' ? 'bg-blue-100 text-blue-800' : s === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800';
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Swaps</h1>
          <p className="text-gray-600">Manage your swap requests</p>
        </div>
        <Link to="/clothing" className="btn-primary">Browse Items</Link>
      </div>
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {['', 'pending', 'accepted', 'rejected', 'completed'].map(v => (
          <button key={v} onClick={() => setFilter(v)} className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${filter === v ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>
            {v ? v.charAt(0).toUpperCase() + v.slice(1) : 'All'}
          </button>
        ))}
      </div>
      {loading ? (
        <div className="space-y-4">{[...Array(3)].map((_, i) => <div key={i} className="card p-6 animate-pulse"><div className="h-24 bg-gray-200 rounded" /></div>)}</div>
      ) : swaps.length === 0 ? (
        <div className="card p-12 text-center"><div className="text-6xl mb-4">🔄</div><h3 className="text-xl font-semibold mb-2">No swap requests</h3><p className="text-gray-600 mb-4">{filter ? 'No requests match this filter' : 'Start by browsing items'}</p><Link to="/clothing" className="btn-primary">Browse Items</Link></div>
      ) : (
        <div className="space-y-4">
          {swaps.map(s => (
            <Link key={s.id} to={`/swaps/${s.id}`} className="card p-6 hover:shadow-lg transition-shadow block">
              <div className="flex gap-6 items-center">
                <div className="flex-1">
                  <div className="text-xs text-gray-500 mb-2">{s.sender_id === parseInt(getUserId()) ? 'Your Item' : 'Their Item'}</div>
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      {s.sender_item_image ? <img src={s.sender_item_image} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-2xl text-gray-300">👕</div>}
                    </div>
                    <div>
                      <div className="font-semibold">{s.sender_item_title}</div>
                      <div className="text-sm text-gray-600">₹{s.sender_item_value}</div>
                      <div className="text-xs text-gray-500">@{s.sender_username}</div>
                    </div>
                  </div>
                </div>
                <div className="text-2xl text-gray-400">⇄</div>
                <div className="flex-1">
                  <div className="text-xs text-gray-500 mb-2">{s.sender_id === parseInt(getUserId()) ? 'Their Item' : 'Your Item'}</div>
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      {s.receiver_item_image ? <img src={s.receiver_item_image} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-2xl text-gray-300">👕</div>}
                    </div>
                    <div>
                      <div className="font-semibold">{s.receiver_item_title}</div>
                      <div className="text-sm text-gray-600">₹{s.receiver_item_value}</div>
                      <div className="text-xs text-gray-500">@{s.receiver_username}</div>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(s.status)}`}>{s.status.charAt(0).toUpperCase() + s.status.slice(1)}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
