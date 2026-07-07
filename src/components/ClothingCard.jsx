import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { HiLocationMarker, HiHeart, HiStar } from 'react-icons/hi';
import { useState } from 'react';

export default function ClothingCard({ listing }) {
  const { getUser } = useApp();
  const owner = getUser(listing.userId);
  const [liked, setLiked] = useState(false);

  // Generate a fake rating based on condition and value
  const rating = Math.min(5, Math.max(3, Math.round((listing.estimatedValue / 20) + (listing.condition === 'New' ? 1 : listing.condition === 'Like New' ? 0.5 : 0)))).toFixed(1);
  const ratingCount = Math.floor(listing.estimatedValue * 2.5) + 120;

  return (
    <div className="product-card group">
      <Link to={`/item/${listing.id}`} className="block">
        {/* Image */}
        <div className="product-img-wrap aspect-square relative">
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=400&fit=crop'; }}
          />
          {!listing.available && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="bg-white text-gray-900 font-bold px-4 py-2 text-sm">UNAVAILABLE</span>
            </div>
          )}
          {/* Wishlist button */}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLiked(!liked); }}
            className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <HiHeart className={`text-lg ${liked ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
          </button>
        </div>

        {/* Content */}
        <div className="p-3">
          {/* Title */}
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-accent-600 transition-colors mb-1">
            {listing.title}
          </h3>

          {/* Brand */}
          <p className="text-xs text-gray-500 mb-1.5">{listing.brand}</p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-2">
            <span className="rating-badge">
              {rating} <HiStar className="text-xs" />
            </span>
            <span className="text-xs text-gray-500">({ratingCount})</span>
          </div>

          {/* Price / Swap Value */}
          <div className="flex items-baseline gap-2 mb-2">
            <span className="price-tag">{listing.estimatedValue} pts</span>
            <span className="text-xs text-success-600 font-medium">Free Swap</span>
          </div>

          {/* Condition Badge */}
          <div className="flex items-center gap-1.5 mb-2">
            <span className={`text-xs font-medium px-1.5 py-0.5 rounded-sm ${
              listing.condition === 'New' ? 'bg-green-50 text-green-700' :
              listing.condition === 'Like New' ? 'bg-blue-50 text-blue-700' :
              listing.condition === 'Excellent' ? 'bg-purple-50 text-purple-700' :
              'bg-yellow-50 text-yellow-700'
            }`}>
              {listing.condition}
            </span>
            <span className="text-xs text-gray-500">Size {listing.size}</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <HiLocationMarker className="text-sm" />
            <span className="truncate">{listing.location}</span>
          </div>

          {/* Seller Info */}
          {owner && (
            <div className="mt-2 pt-2 border-t border-gray-100">
              <p className="text-xs text-gray-600">
                Sold by: <span className="font-medium text-gray-900">{owner.name}</span>
              </p>
            </div>
          )}
        </div>
      </Link>

      {/* Swap Button */}
      {listing.available && (
        <div className="px-3 pb-3">
          <Link to={`/item/${listing.id}`} className="btn-swap w-full text-center block">
            Request Swap
          </Link>
        </div>
      )}
    </div>
  );
}
