import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import ClothingCard from '../components/ClothingCard';
import LocationMatcher from '../components/LocationMatcher';
import SwapCard from '../components/SwapCard';
import { HiPlus, HiShoppingBag, HiSwitchHorizontal, HiChat, HiClipboardList } from 'react-icons/hi';

export default function Dashboard() {
  const { user } = useAuth();
  const { getUserListings, getUserSwaps, getPendingSwaps, getChatPartners } = useApp();
  const myListings = getUserListings(user.id);
  const mySwaps = getUserSwaps(user.id);
  const pendingSwaps = getPendingSwaps(user.id);
  const chatPartners = getChatPartners(user.id);

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="section-title">Welcome, {user.name.split(' ')[0]}</h1>
          <p className="text-gray-500 mt-1">Manage your listings, swaps, and messages</p>
        </div>
        <Link to="/listing/new" className="btn-primary flex items-center gap-2">
          <HiPlus /> New Listing
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'My Listings', value: myListings.length, icon: <HiShoppingBag className="text-xl" />, color: 'bg-blue-50 text-blue-600', link: '#listings' },
          { label: 'Total Swaps', value: mySwaps.length, icon: <HiSwitchHorizontal className="text-xl" />, color: 'bg-purple-50 text-purple-600', link: '/swaps' },
          { label: 'Pending', value: pendingSwaps.length, icon: <HiClipboardList className="text-xl" />, color: 'bg-yellow-50 text-yellow-600', link: '/swaps' },
          { label: 'Conversations', value: chatPartners.length, icon: <HiChat className="text-xl" />, color: 'bg-green-50 text-green-600', link: '/chat' },
        ].map(stat => (
          <Link key={stat.label} to={stat.link} className="card p-4 hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mb-3`}>{stat.icon}</div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Pending Swap Requests */}
          {pendingSwaps.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <HiClipboardList className="text-yellow-500" /> Pending Swap Requests
              </h2>
              <div className="space-y-4">
                {pendingSwaps.map(swap => <SwapCard key={swap.id} swap={swap} />)}
              </div>
            </div>
          )}

          {/* My Listings */}
          <div id="listings">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <HiShoppingBag className="text-blue-500" /> My Listings
              </h2>
              <Link to="/marketplace" className="text-sm text-primary-600 hover:text-primary-700 font-medium">Browse Marketplace</Link>
            </div>
            {myListings.length === 0 ? (
              <div className="card p-10 text-center">
                <HiShoppingBag className="text-4xl text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-3">You haven't listed any items yet</p>
                <Link to="/listing/new" className="btn-primary">Create Your First Listing</Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {myListings.slice(0, 6).map(item => <ClothingCard key={item.id} listing={item} />)}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {/* Location Matcher */}
          <LocationMatcher />

          {/* Recent Activity */}
          <div className="card p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/swaps" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <HiSwitchHorizontal className="text-primary-500" />
                <span className="text-sm text-gray-700">View All Swaps</span>
              </Link>
              <Link to="/chat" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <HiChat className="text-green-500" />
                <span className="text-sm text-gray-700">Messages</span>
              </Link>
              <Link to="/value-calculator" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-primary-500 font-bold text-sm">$</span>
                <span className="text-sm text-gray-700">Value Calculator</span>
              </Link>
              <Link to="/profile" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-purple-500">&#9733;</span>
                <span className="text-sm text-gray-700">Edit Profile</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
