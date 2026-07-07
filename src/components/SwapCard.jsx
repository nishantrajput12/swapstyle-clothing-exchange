import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { HiCalendar } from 'react-icons/hi';

export default function SwapCard({ swap }) {
  const { getUser, getListing, respondToSwap } = useApp();
  const sender = getUser(swap.senderId);
  const receiver = getUser(swap.receiverId);
  const senderListing = getListing(swap.senderListingId);
  const receiverListing = getListing(swap.receiverListingId);

  const statusColors = {
    pending: 'badge-yellow',
    accepted: 'badge-green',
    rejected: 'badge-red',
    completed: 'badge-blue',
  };

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <span className={`badge ${statusColors[swap.status]}`}>
          {swap.status.charAt(0).toUpperCase() + swap.status.slice(1)}
        </span>
        <span className="flex items-center gap-1 text-xs text-gray-400">
          <HiCalendar /> {swap.createdAt}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 mb-1 font-medium">You offer</p>
          {senderListing ? (
            <Link to={`/item/${senderListing.id}`} className="flex gap-3 group">
              <img src={senderListing.images[0]} alt="" className="w-16 h-16 rounded-lg object-cover" />
              <div>
                <p className="text-sm font-medium text-gray-900 group-hover:text-primary-600 truncate">{senderListing.title}</p>
                <p className="text-xs text-gray-500">{senderListing.brand} &middot; {senderListing.size}</p>
              </div>
            </Link>
          ) : <p className="text-sm text-gray-400 italic">Item removed</p>}
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1 font-medium">You receive</p>
          {receiverListing ? (
            <Link to={`/item/${receiverListing.id}`} className="flex gap-3 group">
              <img src={receiverListing.images[0]} alt="" className="w-16 h-16 rounded-lg object-cover" />
              <div>
                <p className="text-sm font-medium text-gray-900 group-hover:text-primary-600 truncate">{receiverListing.title}</p>
                <p className="text-xs text-gray-500">{receiverListing.brand} &middot; {receiverListing.size}</p>
              </div>
            </Link>
          ) : <p className="text-sm text-gray-400 italic">Item removed</p>}
        </div>
      </div>

      {swap.message && (
        <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3 mb-4 italic">"{swap.message}"</p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-xs font-semibold">
            {sender?.name.charAt(0)}
          </div>
          <span className="text-gray-600">{sender?.name}</span>
          <span className="text-gray-300">&harr;</span>
          <div className="w-6 h-6 bg-accent-100 text-accent-700 rounded-full flex items-center justify-center text-xs font-semibold">
            {receiver?.name.charAt(0)}
          </div>
          <span className="text-gray-600">{receiver?.name}</span>
        </div>

        {swap.status === 'pending' && (
          <div className="flex gap-2">
            <button onClick={() => respondToSwap(swap.id, 'accepted')} className="text-sm bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg font-medium transition-colors">Accept</button>
            <button onClick={() => respondToSwap(swap.id, 'rejected')} className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg font-medium transition-colors">Decline</button>
          </div>
        )}
      </div>
    </div>
  );
}
