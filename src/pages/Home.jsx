import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { api } from '../api';
import ClothingCard from '../components/ClothingCard';

export default function Home() {
  const [items, setItems] = useState([]);
  useEffect(() => { api.clothing().then(setItems).catch(console.error); }, []);

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Swap Clothes, Not Buy</h1>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">Join the sustainable fashion movement. Exchange your pre-loved clothes with others and refresh your wardrobe without spending a rupee.</p>
          <div className="flex gap-4 justify-center">
            <Link to="/clothing" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-bold hover:bg-primary-50 transition-colors">Browse Items</Link>
            <Link to="/register" className="bg-accent-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-accent-600 transition-colors">Join Now</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '📤', title: 'List Your Clothes', desc: 'Upload clothes you no longer wear. Add details like brand, size, and condition.' },
              { icon: '🔄', title: 'Find a Match', desc: 'Browse items from other users and find something you like.' },
              { icon: '✅', title: 'Swap & Enjoy', desc: 'Send a swap request, chat with the owner, and exchange items.' }
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-6xl mb-4">{s.icon}</div>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Latest Listings</h2>
          {items.length === 0 ? (
            <p className="text-center text-gray-500">No items available yet.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {items.slice(0, 8).map(item => <ClothingCard key={item.id} item={item} />)}
            </div>
          )}
          <div className="text-center mt-8">
            <Link to="/clothing" className="btn-primary">View All Items</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
