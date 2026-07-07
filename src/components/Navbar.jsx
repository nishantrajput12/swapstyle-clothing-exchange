import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiSearch, HiShoppingBag, HiSwitchHorizontal, HiChat, HiUser, HiLogout, HiShieldCheck, HiMenu, HiX } from 'react-icons/hi';
import { CATEGORIES } from '../utils/seedData';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const categoryIcons = {
    'Tops': '👕', 'T-Shirts': '👕', 'Shirts': '👔', 'Dresses': '👗',
    'Jeans': '👖', 'Pants': '👖', 'Skirts': '👗', 'Jackets': '🧥',
    'Blazers': '🧥', 'Hoodies': '🧥', 'Sweaters': '🧶', 'Ethnic Wear': '🥻',
    'Shoes': '👟', 'Accessories': '👜'
  };

  return (
    <>
      {/* Top Strip */}
      <div className="top-strip hidden md:block">
        <div className="max-w-[1400px] mx-auto px-4 flex items-center justify-between text-xs">
          <span>Swap clothes, not buy new ones! Sustainable fashion starts here.</span>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to="/profile" className="hover:underline">{user.name}</Link>
                <Link to="/swaps" className="hover:underline">Swap Requests</Link>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:underline">Login</Link>
                <Link to="/register" className="hover:underline">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="nav-main sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex items-center gap-6 h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-10 h-10 bg-primary-600 rounded flex items-center justify-center">
                <HiSwitchHorizontal className="text-white text-xl" />
              </div>
              <div className="hidden md:block">
                <div className="font-display font-bold text-xl text-white">SwapStyle</div>
                <div className="text-xs text-gray-400 -mt-1">Explore <span className="text-primary-500">Fashion</span></div>
              </div>
            </Link>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search for clothes, brands, categories..."
                  className="w-full h-10 pl-4 pr-12 bg-white text-gray-900 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button type="submit" className="absolute right-0 top-0 h-full px-4 bg-primary-600 hover:bg-primary-700 rounded-r-sm">
                  <HiSearch className="text-white text-xl" />
                </button>
              </div>
            </form>

            {/* Right Section */}
            <div className="hidden md:flex items-center gap-6">
              {user ? (
                <>
                  <Link to="/dashboard" className="flex flex-col items-center text-white hover:text-primary-500 transition-colors">
                    <HiShoppingBag className="text-2xl" />
                    <span className="text-xs mt-0.5">My Listings</span>
                  </Link>
                  <Link to="/swaps" className="flex flex-col items-center text-white hover:text-primary-500 transition-colors">
                    <HiSwitchHorizontal className="text-2xl" />
                    <span className="text-xs mt-0.5">Swaps</span>
                  </Link>
                  <Link to="/chat" className="flex flex-col items-center text-white hover:text-primary-500 transition-colors">
                    <HiChat className="text-2xl" />
                    <span className="text-xs mt-0.5">Messages</span>
                  </Link>
                  <button onClick={handleLogout} className="flex flex-col items-center text-white hover:text-red-500 transition-colors">
                    <HiLogout className="text-2xl" />
                    <span className="text-xs mt-0.5">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-white hover:text-primary-500 transition-colors">Login</Link>
                  <Link to="/register" className="btn-primary text-sm py-2 px-4">Sign Up</Link>
                </>
              )}
              {user?.isAdmin && (
                <Link to="/admin" className="flex flex-col items-center text-white hover:text-primary-500 transition-colors">
                  <HiShieldCheck className="text-2xl" />
                  <span className="text-xs mt-0.5">Admin</span>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
            </button>
          </div>
        </div>

        {/* Secondary Nav - Categories */}
        <div className="nav-secondary hidden md:block">
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="flex items-center gap-6 h-10 overflow-x-auto scrollbar-hide">
              <Link to="/marketplace" className="text-white hover:text-primary-500 whitespace-nowrap font-medium">All Items</Link>
              {CATEGORIES.slice(0, 10).map(cat => (
                <Link key={cat} to={`/marketplace?category=${encodeURIComponent(cat)}`} className="text-white hover:text-primary-500 whitespace-nowrap text-sm">
                  {cat}
                </Link>
              ))}
              <Link to="/value-calculator" className="text-white hover:text-primary-500 whitespace-nowrap text-sm">Value Calculator</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Category Scroll Bar */}
      <div className="category-scroll hidden md:flex">
        <div className="max-w-[1400px] mx-auto flex">
          {CATEGORIES.map(cat => (
            <Link key={cat} to={`/marketplace?category=${encodeURIComponent(cat)}`} className="category-chip">
              <span className="text-2xl">{categoryIcons[cat] || '👕'}</span>
              <span className="text-xs text-gray-700 font-medium text-center">{cat}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-gray-900 text-white border-t border-gray-700">
          <div className="px-4 py-4 space-y-3">
            <Link to="/" onClick={() => setMobileOpen(false)} className="block py-2 hover:text-primary-500">Home</Link>
            <Link to="/marketplace" onClick={() => setMobileOpen(false)} className="block py-2 hover:text-primary-500">Marketplace</Link>
            {user && (
              <>
                <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="block py-2 hover:text-primary-500">My Listings</Link>
                <Link to="/swaps" onClick={() => setMobileOpen(false)} className="block py-2 hover:text-primary-500">Swaps</Link>
                <Link to="/chat" onClick={() => setMobileOpen(false)} className="block py-2 hover:text-primary-500">Messages</Link>
                <Link to="/value-calculator" onClick={() => setMobileOpen(false)} className="block py-2 hover:text-primary-500">Value Calculator</Link>
                <Link to="/profile" onClick={() => setMobileOpen(false)} className="block py-2 hover:text-primary-500">Profile</Link>
                {user.isAdmin && <Link to="/admin" onClick={() => setMobileOpen(false)} className="block py-2 hover:text-primary-500">Admin</Link>}
                <button onClick={handleLogout} className="block py-2 text-red-500 w-full text-left">Logout</button>
              </>
            )}
            {!user && (
              <div className="flex gap-2 pt-2">
                <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-secondary text-sm py-2 flex-1 text-center">Login</Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="btn-primary text-sm py-2 flex-1 text-center">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
