import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { HiX } from 'react-icons/hi';

export default function SwapRequestModal({ item, onClose }) {
  const { user } = useAuth();
  const { getUserListings, sendSwapRequest, showNotification } = useApp();
  const myListings = getUserListings(user.id).filter(l => l.available);
  const [selectedListing, setSelectedListing] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedListing) {
      showNotification('Please select one of your items to swap.', 'error');
      return;
    }
    sendSwapRequest(item.userId, selectedListing, item.id, message);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-900">Send Swap Request</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><HiX className="text-xl" /></button>
        </div>

        <div className="flex gap-3 p-3 bg-gray-50 rounded-xl mb-5">
          <img src={item.images[0]} alt="" className="w-16 h-16 rounded-lg object-cover" />
          <div>
            <p className="font-medium text-gray-900">{item.title}</p>
            <p className="text-sm text-gray-500">{item.brand} &middot; Size {item.size} &middot; {item.condition}</p>
            <p className="text-sm text-primary-600 font-semibold">{item.estimatedValue} pts</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Select your item to swap</label>
            {myListings.length === 0 ? (
              <p className="text-sm text-gray-500 bg-yellow-50 p-3 rounded-lg">You don't have any available listings. <a href="/listing/new" className="text-primary-600 underline">Create one</a></p>
            ) : (
              <select value={selectedListing} onChange={e => setSelectedListing(e.target.value)} className="input-field">
                <option value="">Choose an item...</option>
                {myListings.map(l => (
                  <option key={l.id} value={l.id}>{l.title} ({l.brand}, {l.size}) - {l.estimatedValue} pts</option>
                ))}
              </select>
            )}
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Message (optional)</label>
            <textarea value={message} onChange={e => setMessage(e.target.value)} rows={3} placeholder="Tell the other user why this swap would be great..." className="input-field resize-none" />
          </div>

          <button type="submit" className="btn-primary w-full" disabled={myListings.length === 0}>
            Send Swap Request
          </button>
        </form>
      </div>
    </div>
  );
}
