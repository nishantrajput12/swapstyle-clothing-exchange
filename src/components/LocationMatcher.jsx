import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { HiLocationMarker } from 'react-icons/hi';

export default function LocationMatcher() {
  const { user } = useAuth();
  const { listings, getUser } = useApp();

  if (!user?.location) return null;

  const userCity = user.location.split(',')[0].trim().toLowerCase();
  const nearbyListings = listings
    .filter(l => l.available && l.userId !== user.id && l.location.toLowerCase().includes(userCity))
    .slice(0, 4);

  if (nearbyListings.length === 0) {
    return (
      <div className="card p-6">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-3">
          <HiLocationMarker className="text-primary-500" /> Nearby Swaps
        </h3>
        <p className="text-sm text-gray-500">No listings found in your area ({user.location}). Try browsing the full marketplace!</p>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-4">
        <HiLocationMarker className="text-primary-500" /> Near You in {user.location.split(',')[0]}
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {nearbyListings.map(item => {
          const owner = getUser(item.userId);
          return (
            <Link key={item.id} to={`/item/${item.id}`} className="group flex gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <img src={item.images[0]} alt="" className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate group-hover:text-primary-600">{item.title}</p>
                <p className="text-xs text-gray-500">{item.brand} &middot; {owner?.name}</p>
                <p className="text-xs text-primary-600 font-medium">{item.estimatedValue} pts</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
