import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { HiUser, HiMail, HiLocationMarker, HiPencil, HiShoppingBag, HiSwitchHorizontal, HiCalendar } from 'react-icons/hi';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { getUserListings, getUserSwaps } = useApp();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user.name, location: user.location, bio: user.bio || '' });
  const myListings = getUserListings(user.id);
  const mySwaps = getUserSwaps(user.id);

  const handleSave = () => {
    updateProfile(form);
    setEditing(false);
  };

  return (
    <div className="page-container max-w-3xl">
      {/* Profile Header */}
      <div className="card p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1">
            {editing ? (
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500 font-medium">Name</label>
                  <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input-field text-sm" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-medium">Location</label>
                  <input type="text" value={form.location} onChange={e => setForm({...form, location: e.target.value})} className="input-field text-sm" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-medium">Bio</label>
                  <textarea value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} className="input-field text-sm resize-none" rows={2} />
                </div>
                <div className="flex gap-2">
                  <button onClick={handleSave} className="btn-primary text-sm py-2 px-4">Save</button>
                  <button onClick={() => setEditing(false)} className="btn-secondary text-sm py-2 px-4">Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 font-display">{user.name}</h1>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><HiMail className="text-primary-500" /> {user.email}</span>
                      <span className="flex items-center gap-1"><HiLocationMarker className="text-primary-500" /> {user.location}</span>
                      <span className="flex items-center gap-1"><HiCalendar className="text-primary-500" /> Joined {user.joinDate}</span>
                    </div>
                    {user.bio && <p className="text-gray-600 mt-2 text-sm italic">"{user.bio}"</p>}
                  </div>
                  <button onClick={() => setEditing(true)} className="btn-secondary text-sm py-2 px-3 flex items-center gap-1.5">
                    <HiPencil /> Edit
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="card p-4 text-center">
          <HiShoppingBag className="text-2xl text-blue-500 mx-auto mb-2" />
          <p className="text-xl font-bold text-gray-900">{myListings.length}</p>
          <p className="text-xs text-gray-500">Listings</p>
        </div>
        <div className="card p-4 text-center">
          <HiSwitchHorizontal className="text-2xl text-purple-500 mx-auto mb-2" />
          <p className="text-xl font-bold text-gray-900">{mySwaps.filter(s => s.status === 'accepted').length}</p>
          <p className="text-xs text-gray-500">Successful Swaps</p>
        </div>
        <div className="card p-4 text-center">
          <span className="text-2xl block mb-2 text-green-500">&#9851;</span>
          <p className="text-xl font-bold text-gray-900">{mySwaps.length}</p>
          <p className="text-xs text-gray-500">Total Requests</p>
        </div>
      </div>

      {/* Recent Listings */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">My Listings</h2>
        {myListings.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-gray-500">You haven't listed any items yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {myListings.map(item => (
              <div key={item.id} className="card p-4 flex items-center gap-4">
                <img src={item.images[0]} alt="" className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.brand} &middot; Size {item.size} &middot; {item.condition}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary-600">{item.estimatedValue} pts</p>
                  <span className={`badge text-xs ${item.available ? 'badge-green' : 'badge-yellow'}`}>
                    {item.available ? 'Available' : 'Swapped'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
