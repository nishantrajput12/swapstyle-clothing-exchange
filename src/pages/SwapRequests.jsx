import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import SwapCard from '../components/SwapCard';
import { HiSwitchHorizontal, HiFilter } from 'react-icons/hi';

export default function SwapRequests() {
  const { user } = useAuth();
  const { getUserSwaps } = useApp();
  const [filter, setFilter] = useState('all');
  const allSwaps = getUserSwaps(user.id);

  const filtered = filter === 'all' ? allSwaps : allSwaps.filter(s => s.status === filter);

  const tabs = [
    { key: 'all', label: 'All', count: allSwaps.length },
    { key: 'pending', label: 'Pending', count: allSwaps.filter(s => s.status === 'pending').length },
    { key: 'accepted', label: 'Accepted', count: allSwaps.filter(s => s.status === 'accepted').length },
    { key: 'rejected', label: 'Declined', count: allSwaps.filter(s => s.status === 'rejected').length },
  ];

  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="section-title flex items-center gap-3">
          <HiSwitchHorizontal className="text-primary-500" /> Swap Requests
        </h1>
        <p className="text-gray-500 mt-1">Manage your incoming and outgoing swap requests</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-1">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
              filter === tab.key ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {tab.label}
            <span className={`px-1.5 py-0.5 rounded-full text-xs ${filter === tab.key ? 'bg-white/20' : 'bg-gray-100'}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="card p-10 text-center">
          <HiSwitchHorizontal className="text-4xl text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">
            {filter === 'all' ? 'No swap requests yet. Browse the marketplace to start swapping!' : `No ${filter} swap requests.`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(swap => <SwapCard key={swap.id} swap={swap} />)}
        </div>
      )}
    </div>
  );
}
