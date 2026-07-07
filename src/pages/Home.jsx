import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import ClothingCard from '../components/ClothingCard';
import { HiSwitchHorizontal, HiShieldCheck, HiLocationMarker, HiLightningBolt, HiHeart, HiUserGroup, HiTrendingUp, HiClock, HiSparkles } from 'react-icons/hi';

export default function Home() {
  const { user } = useAuth();
  const { getAvailableListings } = useApp();
  const allListings = getAvailableListings();
  const featured = allListings.slice(0, 10);
  const trending = allListings.filter(l => l.estimatedValue > 50).slice(0, 5);
  const newArrivals = allListings.filter(l => l.condition === 'New' || l.condition === 'Like New').slice(0, 5);

  return (
    <div>
      {/* Hero Banner */}
      <section className="gradient-bg text-white">
        <div className="max-w-[1400px] mx-auto px-4 py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-sm text-sm font-medium mb-4">
                #1 Clothing Exchange Platform
              </div>
              <h1 className="text-4xl md:text-5xl font-bold font-display leading-tight mb-4">
                Swap Your Style,<br />Sustainably.
              </h1>
              <p className="text-lg text-primary-100 mb-6 leading-relaxed">
                Join the clothing exchange revolution. Trade your pre-loved fashion with people who will give it a new life. No money needed, just great style.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/marketplace" className="bg-white text-primary-700 font-bold py-3 px-8 rounded-sm hover:bg-gray-100 transition-colors shadow-lg">
                  Shop Now
                </Link>
                {!user && (
                  <Link to="/register" className="border-2 border-white/50 text-white font-bold py-3 px-8 rounded-sm hover:bg-white/10 transition-colors">
                    Join Free
                  </Link>
                )}
              </div>
            </div>
            <div className="hidden md:block">
              <div className="grid grid-cols-2 gap-3">
                {featured.slice(0, 4).map(item => (
                  <div key={item.id} className="bg-white/10 backdrop-blur-sm rounded-sm p-2">
                    <img src={item.images[0]} alt="" className="w-full aspect-square object-cover rounded-sm" />
                    <p className="text-xs mt-2 truncate">{item.title}</p>
                    <p className="text-sm font-bold">{item.estimatedValue} pts</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <HiSwitchHorizontal className="text-3xl text-primary-600" />, value: '500+', label: 'Items Listed' },
              { icon: <HiUserGroup className="text-3xl text-accent-600" />, value: '200+', label: 'Active Users' },
              { icon: <HiHeart className="text-3xl text-red-500" />, value: '150+', label: 'Successful Swaps' },
              { icon: <HiShieldCheck className="text-3xl text-success-500" />, value: '100%', label: 'Free to Use' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex-shrink-0">{stat.icon}</div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Now */}
      {trending.length > 0 && (
        <section className="py-8 bg-white">
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <HiTrendingUp className="text-2xl text-primary-600" />
                <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
              </div>
              <Link to="/marketplace" className="btn-accent text-sm py-2 px-4">View All</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {trending.map(item => <ClothingCard key={item.id} listing={item} />)}
            </div>
          </div>
        </section>
      )}

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="py-8 bg-gray-50">
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <HiSparkles className="text-2xl text-accent-600" />
                <h2 className="text-2xl font-bold text-gray-900">New Arrivals</h2>
              </div>
              <Link to="/marketplace" className="btn-accent text-sm py-2 px-4">View All</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {newArrivals.map(item => <ClothingCard key={item.id} listing={item} />)}
            </div>
          </div>
        </section>
      )}

      {/* How it Works */}
      <section className="py-8 bg-white">
        <div className="max-w-[1400px] mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">How SwapStyle Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: '01', icon: <HiLightningBolt className="text-2xl" />, title: 'List Your Clothes', desc: 'Upload items you no longer wear. Add photos, brand, size, condition, and estimated value.' },
              { step: '02', icon: <HiSwitchHorizontal className="text-2xl" />, title: 'Find & Request Swaps', desc: 'Browse the marketplace, find items you love, and send a swap request to the owner.' },
              { step: '03', icon: <HiLocationMarker className="text-2xl" />, title: 'Swap & Enjoy', desc: 'Negotiate via chat, agree on the swap, and exchange items locally or via courier.' },
            ].map(item => (
              <div key={item.step} className="bg-gray-50 rounded-sm p-6 text-center relative hover:shadow-md transition-shadow">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{item.step}</span>
                </div>
                <div className="w-14 h-14 bg-primary-100 text-primary-600 rounded-sm flex items-center justify-center mx-auto mb-4 mt-2">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <HiClock className="text-2xl text-gray-700" />
              <h2 className="text-2xl font-bold text-gray-900">Featured Items</h2>
            </div>
            <Link to="/marketplace" className="btn-accent text-sm py-2 px-4">View All</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {featured.map(item => <ClothingCard key={item.id} listing={item} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="max-w-[1400px] mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-3">Ready to Swap?</h2>
          <p className="text-gray-400 mb-6 text-lg">Join thousands of sustainable fashion lovers. List your first item in under 2 minutes.</p>
          <Link to={user ? '/listing/new' : '/register'} className="btn-primary text-lg py-3 px-10">
            {user ? 'List an Item' : 'Get Started Free'}
          </Link>
        </div>
      </section>
    </div>
  );
}
