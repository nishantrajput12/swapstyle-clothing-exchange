import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api, isLoggedIn, getUserId } from '../api';

export default function ClothingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [myItems, setMyItems] = useState([]);
  const [sel, setSel] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => {
    api.clothingItem(id).then(setItem).catch(console.error).finally(() => setLoading(false));
    if (isLoggedIn()) api.clothing({ user_id: 'me' }).then(setMyItems).catch(console.error);
  }, [id]);

  async function handleSwap(e) {
    e.preventDefault();
    if (!sel) { setErr('Select an item to swap'); return; }
    setSending(true); setErr('');
    try {
      const swap = await api.createSwap({ receiver_id: item.owner_id, sender_item_id: parseInt(sel), receiver_item_id: parseInt(id), message: msg });
      navigate(`/swaps/${swap.id}`);
    } catch (e) { setErr(e.message); } finally { setSending(false); }
  }

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-8"><div className="animate-pulse h-96 bg-gray-200 rounded-xl" /></div>;
  if (!item) return <div className="text-center py-16"><h2 className="text-2xl font-bold mb-4">Item not found</h2><Link to="/clothing" className="text-primary-600 font-semibold">Browse items</Link></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/clothing" className="text-primary-600 hover:text-primary-700 font-medium mb-4 inline-block">← Back to Browse</Link>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="card">
          {item.image_url ? <img src={item.image_url} alt={item.title} className="w-full aspect-square object-cover" /> : <div className="w-full aspect-square flex items-center justify-center text-9xl text-gray-300 bg-gray-50">👕</div>}
        </div>
        <div className="space-y-6">
          <div className="card p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.title}</h1>
            <p className="text-lg text-gray-600 mb-4">{item.brand}</p>
            <div className="text-4xl font-bold text-gray-900 mb-6">₹{item.estimated_value} <span className="text-sm text-gray-500 font-normal">Swap Value</span></div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[['Category', item.type], ['Size', item.size], ['Condition', item.condition], ['Location', item.location]].map(([k, v]) => (
                <div key={k}><div className="text-sm text-gray-500">{k}</div><div className="font-semibold">{v}</div></div>
              ))}
            </div>
            {item.description && <div className="mb-6"><div className="text-sm font-semibold text-gray-900 mb-2">Description</div><p className="text-gray-700">{item.description}</p></div>}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm font-semibold text-gray-900 mb-2">Seller</div>
              <div className="font-semibold">@{item.owner_username} · {item.owner_location}</div>
            </div>
          </div>
          {isLoggedIn() && item.owner_id !== parseInt(getUserId()) && (
            <div className="card p-6">
              <h2 className="text-xl font-bold mb-4">Request a Swap</h2>
              {err && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">{err}</div>}
              {myItems.length === 0 ? (
                <div className="text-center py-6"><p className="text-gray-600 mb-4">List items first to swap</p><Link to="/add" className="btn-primary">Add Item</Link></div>
              ) : (
                <form onSubmit={handleSwap} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Select your item *</label>
                    <select required className="input" value={sel} onChange={e => setSel(e.target.value)}>
                      <option value="">Choose...</option>
                      {myItems.map(i => <option key={i.id} value={i.id}>{i.title} (₹{i.estimated_value})</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Message (optional)</label>
                    <textarea className="input" rows="3" value={msg} onChange={e => setMsg(e.target.value)} placeholder="Add a message..." />
                  </div>
                  <button type="submit" disabled={sending} className="btn-secondary w-full">{sending ? 'Sending...' : 'Send Swap Request'}</button>
                </form>
              )}
            </div>
          )}
          {!isLoggedIn() && <div className="card p-6 text-center"><p className="text-gray-600 mb-4">Login to request a swap</p><Link to="/login" className="btn-primary">Login</Link></div>}
        </div>
      </div>
    </div>
  );
}
