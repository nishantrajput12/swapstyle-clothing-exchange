import { useState } from 'react';
import { useApp } from '../context/AppContext';
import AdminStats from '../components/AdminStats';
import { HiShieldCheck, HiUserGroup, HiShoppingBag, HiSwitchHorizontal, HiTrash, HiFlag } from 'react-icons/hi';

export default function AdminPanel() {
  const { users, listings, swaps, deleteUser, deleteListing, showNotification } = useApp();
  const [tab, setTab] = useState('overview');
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleDeleteUser = (userId) => {
    deleteUser(userId);
    setConfirmDelete(null);
  };

  const handleDeleteListing = (listingId) => {
    deleteListing(listingId);
    setConfirmDelete(null);
  };

  const tabs = [
    { key: 'overview', label: 'Overview', icon: <HiShieldCheck /> },
    { key: 'users', label: 'Users', icon: <HiUserGroup /> },
    { key: 'listings', label: 'Listings', icon: <HiShoppingBag /> },
    { key: 'swaps', label: 'Swaps', icon: <HiSwitchHorizontal /> },
  ];

  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="section-title flex items-center gap-3">
          <HiShieldCheck className="text-primary-500" /> Admin Panel
        </h1>
        <p className="text-gray-500 mt-1">Manage users, listings, and platform activity</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-1">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${tab === t.key ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Overview */}
      {tab === 'overview' && <AdminStats />}

      {/* Users */}
      {tab === 'users' && (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">User</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Email</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Location</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Joined</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Role</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-xs font-semibold">{u.name.charAt(0)}</div>
                        <span className="font-medium text-gray-900">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-gray-600">{u.email}</td>
                    <td className="px-5 py-3 text-gray-600">{u.location}</td>
                    <td className="px-5 py-3 text-gray-600">{u.joinDate}</td>
                    <td className="px-5 py-3">{u.isAdmin ? <span className="badge-purple">Admin</span> : <span className="badge-blue">User</span>}</td>
                    <td className="px-5 py-3">
                      {!u.isAdmin && (
                        <button onClick={() => setConfirmDelete({ type: 'user', id: u.id })} className="text-red-500 hover:text-red-700 text-xs font-medium flex items-center gap-1">
                          <HiTrash /> Remove
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Listings */}
      {tab === 'listings' && (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Item</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Owner</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Category</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Value</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Status</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {listings.map(l => {
                  const owner = users.find(u => u.id === l.userId);
                  return (
                    <tr key={l.id} className="hover:bg-gray-50">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <img src={l.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
                          <span className="font-medium text-gray-900 truncate max-w-[200px]">{l.title}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-gray-600">{owner?.name || 'Unknown'}</td>
                      <td className="px-5 py-3 text-gray-600">{l.category}</td>
                      <td className="px-5 py-3 text-gray-600">{l.estimatedValue} pts</td>
                      <td className="px-5 py-3">{l.available ? <span className="badge-green">Available</span> : <span className="badge-yellow">Swapped</span>}</td>
                      <td className="px-5 py-3">
                        <button onClick={() => setConfirmDelete({ type: 'listing', id: l.id })} className="text-red-500 hover:text-red-700 text-xs font-medium flex items-center gap-1">
                          <HiTrash /> Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Swaps */}
      {tab === 'swaps' && (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">From</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">To</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Date</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Status</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {swaps.map(s => {
                  const sender = users.find(u => u.id === s.senderId);
                  const receiver = users.find(u => u.id === s.receiverId);
                  return (
                    <tr key={s.id} className="hover:bg-gray-50">
                      <td className="px-5 py-3 text-gray-900 font-medium">{sender?.name || 'Unknown'}</td>
                      <td className="px-5 py-3 text-gray-900 font-medium">{receiver?.name || 'Unknown'}</td>
                      <td className="px-5 py-3 text-gray-600">{s.createdAt}</td>
                      <td className="px-5 py-3">
                        <span className={`badge ${s.status === 'accepted' ? 'badge-green' : s.status === 'rejected' ? 'badge-red' : 'badge-yellow'}`}>
                          {s.status.charAt(0).toUpperCase() + s.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-gray-500 truncate max-w-[200px]">{s.message || '-'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setConfirmDelete(null)} />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-sm w-full p-6">
            <HiFlag className="text-red-500 text-3xl mb-3" />
            <h3 className="font-bold text-lg text-gray-900 mb-2">Confirm Removal</h3>
            <p className="text-sm text-gray-600 mb-5">Are you sure you want to remove this {confirmDelete.type}? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={() => confirmDelete.type === 'user' ? handleDeleteUser(confirmDelete.id) : handleDeleteListing(confirmDelete.id)} className="btn-danger flex-1">Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
