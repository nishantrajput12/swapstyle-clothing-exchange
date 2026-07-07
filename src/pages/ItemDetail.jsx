import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import SwapRequestModal from '../components/SwapRequestModal';
import { HiLocationMarker, HiChevronRight, HiChat, HiSwitchHorizontal, HiStar, HiHeart, HiShieldCheck, HiCalendar, HiTruck, HiCheckCircle } from 'react-icons/hi';

export default function ItemDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { getListing, getUser } = useApp();
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [liked, setLiked] = useState(false);
  const listing = getListing(id);

  if (!listing) {
    return (
      <div className="page-container text-center py-20">
        <p className="text-gray-400 text-lg">Item not found</p>
        <Link to="/marketplace" className="btn-accent mt-4 inline-block">Back to Marketplace</Link>
      </div>
    );
  }

  const owner = getUser(listing.userId);
  const isOwner = user?.id === listing.userId;
  const rating = Math.min(5, Math.max(3, Math.round((listing.estimatedValue / 20) + (listing.condition === 'New' ? 1 : listing.condition === 'Like New' ? 0.5 : 0)))).toFixed(1);
  const ratingCount = Math.floor(listing.estimatedValue * 2.5) + 120;

  const handleChat = () => {
    if (!user) { navigate('/login'); return; }
    navigate(`/chat/${listing.userId}`);
  };

  const handleSwap = () => {
    if (!user) { navigate('/login'); return; }
    if (isOwner) return;
    setShowSwapModal(true);
  };

  return (
    <div className="page-container">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-gray-500 mb-4 flex-wrap">
        <Link to="/" className="hover:text-gray-700">Home</Link>
        <HiChevronRight className="text-xs" />
        <Link to="/marketplace" className="hover:text-gray-700">Marketplace</Link>
        <HiChevronRight className="text-xs" />
        <Link to={`/marketplace?category=${listing.category}`} className="hover:text-gray-700">{listing.category}</Link>
        <HiChevronRight className="text-xs" />
        <span className="text-gray-900 font-medium truncate max-w-[200px]">{listing.title}</span>
      </nav>

      {/* Main Product Section */}
      <div className="bg-white rounded-sm border border-gray-200 p-4 md:p-6">
        <div className="grid md:grid-cols-12 gap-6">
          {/* Image - Left */}
          <div className="md:col-span-5">
            <div className="sticky top-24">
              <div className="aspect-square rounded-sm overflow-hidden border border-gray-200 bg-gray-50">
                <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=400&fit=crop'; }} />
              </div>
              <button
                onClick={() => setLiked(!liked)}
                className="mt-3 flex items-center gap-2 text-sm text-gray-600 hover:text-red-500"
              >
                <HiHeart className={`text-xl ${liked ? 'text-red-500 fill-red-500' : ''}`} />
                {liked ? 'Added to Wishlist' : 'Add to Wishlist'}
              </button>
            </div>
          </div>

          {/* Details - Middle */}
          <div className="md:col-span-4 space-y-4">
            {/* Brand & Title */}
            <div>
              <p className="text-sm text-accent-600 font-medium mb-1">{listing.brand}</p>
              <h1 className="text-xl md:text-2xl font-medium text-gray-900 leading-tight">{listing.title}</h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <span className="rating-badge">
                {rating} <HiStar className="text-xs" />
              </span>
              <span className="text-sm text-gray-500">{ratingCount} ratings</span>
              <span className="text-sm text-gray-400">|</span>
              <span className="text-sm text-gray-500">{listing.condition}</span>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200" />

            {/* Price / Swap Value */}
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">{listing.estimatedValue} pts</span>
              </div>
              <p className="text-sm text-success-600 font-medium mt-1">Free Swap - No money required</p>
              <p className="text-xs text-gray-500 mt-1">Swap points represent the estimated value of this item for exchange purposes.</p>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200" />

            {/* Details Table */}
            <div className="space-y-2">
              <div className="flex text-sm">
                <span className="text-gray-500 w-28 flex-shrink-0">Category</span>
                <span className="text-gray-900 font-medium">{listing.category}</span>
              </div>
              <div className="flex text-sm">
                <span className="text-gray-500 w-28 flex-shrink-0">Size</span>
                <span className="text-gray-900 font-medium">{listing.size}</span>
              </div>
              <div className="flex text-sm">
                <span className="text-gray-500 w-28 flex-shrink-0">Condition</span>
                <span className="text-gray-900 font-medium">{listing.condition}</span>
              </div>
              <div className="flex text-sm">
                <span className="text-gray-500 w-28 flex-shrink-0">Location</span>
                <span className="text-gray-900 font-medium flex items-center gap-1"><HiLocationMarker className="text-gray-400" /> {listing.location}</span>
              </div>
              <div className="flex text-sm">
                <span className="text-gray-500 w-28 flex-shrink-0">Listed</span>
                <span className="text-gray-900 font-medium flex items-center gap-1"><HiCalendar className="text-gray-400" /> {listing.createdAt}</span>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200" />

            {/* Description */}
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wide">Description</h3>
              <p className="text-gray-700 leading-relaxed text-sm">{listing.description}</p>
            </div>

            {/* Tags */}
            {listing.tags && listing.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {listing.tags.map(tag => (
                  <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-sm">#{tag}</span>
                ))}
              </div>
            )}

            {/* Divider */}
            <div className="border-t border-gray-200" />

            {/* Seller Info */}
            {owner && (
              <div>
                <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Sold by</h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent-100 text-accent-700 rounded-full flex items-center justify-center font-bold text-lg">
                    {owner.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">{owner.name}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1"><HiLocationMarker /> {owner.location}</p>
                    <p className="text-xs text-gray-400">Member since {owner.joinDate}</p>
                  </div>
                  <button onClick={handleChat} className="text-accent-600 hover:text-accent-700 text-sm font-medium">
                    Chat &rarr;
                  </button>
                </div>
                {owner.bio && (
                  <p className="text-xs text-gray-500 italic mt-2 bg-gray-50 p-2 rounded-sm">"{owner.bio}"</p>
                )}
              </div>
            )}
          </div>

          {/* Swap Box - Right (Amazon Buy Box style) */}
          <div className="md:col-span-3">
            <div className="border border-gray-200 rounded-sm p-4 sticky top-24">
              {/* Price */}
              <p className="text-2xl font-bold text-gray-900 mb-1">{listing.estimatedValue} <span className="text-base font-normal">pts</span></p>
              <p className="text-sm text-success-600 font-medium mb-3">Free Swap</p>

              {/* Availability */}
              <div className="space-y-2 mb-4">
                {listing.available ? (
                  <>
                    <p className="text-sm text-success-600 font-medium flex items-center gap-1">
                      <HiCheckCircle /> Available for Swap
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <HiTruck className="text-gray-400" /> Local or courier exchange
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <HiShieldCheck className="text-gray-400" /> Secure swap platform
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-red-600 font-medium">Currently Unavailable</p>
                )}
              </div>

              {/* Action Buttons */}
              {!isOwner && listing.available && (
                <div className="space-y-2">
                  <button onClick={handleSwap} className="btn-swap w-full flex items-center justify-center gap-2 py-3">
                    <HiSwitchHorizontal /> Request Swap
                  </button>
                  <button onClick={handleChat} className="btn-secondary w-full flex items-center justify-center gap-2 py-2.5 text-sm">
                    <HiChat /> Contact Seller
                  </button>
                </div>
              )}

              {isOwner && (
                <div className="space-y-2">
                  <Link to={`/listing/edit/${listing.id}`} className="btn-secondary w-full text-center py-2.5 text-sm block">Edit Listing</Link>
                  <Link to="/dashboard" className="btn-accent w-full text-center py-2.5 text-sm block">My Listings</Link>
                </div>
              )}

              {/* Divider */}
              <div className="border-t border-gray-200 my-4" />

              {/* Swap Info */}
              <div className="text-xs text-gray-500 space-y-1">
                <p className="flex items-start gap-1">
                  <HiCheckCircle className="text-success-500 mt-0.5 flex-shrink-0" />
                  <span>No money exchanged - just swap!</span>
                </p>
                <p className="flex items-start gap-1">
                  <HiCheckCircle className="text-success-500 mt-0.5 flex-shrink-0" />
                  <span>Chat with seller to negotiate</span>
                </p>
                <p className="flex items-start gap-1">
                  <HiCheckCircle className="text-success-500 mt-0.5 flex-shrink-0" />
                  <span>Safe and secure platform</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSwapModal && <SwapRequestModal item={listing} onClose={() => setShowSwapModal(false)} />}
    </div>
  );
}
