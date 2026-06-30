import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api, getUserId } from '../api';

export default function SwapDetail() {
  const { id } = useParams();
  const [swap, setSwap] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    async function load() {
      try {
        const [s, m] = await Promise.all([api.swap(id), api.messages(id)]);
        setSwap(s); setMessages(m);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    }
    load();
  }, [id]);

  async function handleSend(e) {
    e.preventDefault();
    if (!newMsg.trim()) return;
    setSending(true);
    try {
      const msg = await api.sendMessage(id, newMsg);
      setMessages([...messages, msg]);
      setNewMsg('');
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch (e) { console.error(e); } finally { setSending(false); }
  }

  async function handleStatus(status) {
    try {
      await api.updateSwapStatus(id, status);
      setSwap(await api.swap(id));
    } catch (e) { alert(e.message); }
  }

  if (loading) return <div className="max-w-5xl mx-auto px-4 py-8"><div className="animate-pulse h-96 bg-gray-200 rounded-xl" /></div>;
  if (!swap) return <div className="text-center py-16"><h2 className="text-2xl font-bold mb-4">Swap not found</h2><Link to="/swaps" className="text-primary-600">Back to swaps</Link></div>;

  const isSender = swap.sender_id === parseInt(getUserId());
  const canRespond = !isSender && swap.status === 'pending';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/swaps" className="text-primary-600 hover:text-primary-700 mb-4 inline-block">← Back to Swaps</Link>
      <div className="card p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Swap Request</h1>
          <span className={`px-4 py-2 rounded-full text-sm font-semibold ${swap.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : swap.status === 'accepted' ? 'bg-blue-100 text-blue-800' : swap.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
            {swap.status.charAt(0).toUpperCase() + swap.status.slice(1)}
          </span>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { label: isSender ? 'Your Item' : 'Their Item', title: swap.sender_item_title, brand: swap.sender_item_brand, size: swap.sender_item_size, condition: swap.sender_item_condition, value: swap.sender_item_value, user: swap.sender_username, location: swap.sender_location, img: swap.sender_item_image },
            { label: isSender ? 'Their Item' : 'Your Item', title: swap.receiver_item_title, brand: swap.receiver_item_brand, size: swap.receiver_item_size, condition: swap.receiver_item_condition, value: swap.receiver_item_value, user: swap.receiver_username, location: swap.receiver_location, img: swap.receiver_item_image }
          ].map((it, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <div className="text-xs text-gray-500 mb-3">{it.label}</div>
              <div className="flex gap-4">
                <div className="w-28 h-28 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                  {it.img ? <img src={it.img} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-4xl text-gray-300">👕</div>}
                </div>
                <div>
                  <div className="font-semibold text-lg">{it.title}</div>
                  <div className="text-sm text-gray-600 mt-1">{it.brand} · {it.size}</div>
                  <div className="text-sm text-gray-600">Condition: {it.condition}</div>
                  <div className="text-lg font-bold text-primary-600 mt-2">₹{it.value}</div>
                  <div className="text-xs text-gray-500 mt-1">@{it.user} · {it.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {canRespond && (
          <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
            <button onClick={() => handleStatus('accepted')} className="btn-primary flex-1">Accept Swap</button>
            <button onClick={() => handleStatus('rejected')} className="btn-outline flex-1">Reject</button>
          </div>
        )}
        {isSender && swap.status === 'accepted' && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button onClick={() => handleStatus('completed')} className="btn-primary w-full">Mark as Completed</button>
          </div>
        )}
      </div>
      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold">Chat</h2>
          <p className="text-sm text-gray-600">Discuss swap details</p>
        </div>
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 py-12">No messages yet. Start the conversation!</div>
          ) : (
            messages.map(m => {
              const own = m.sender_id === parseInt(getUserId());
              return (
                <div key={m.id} className={`flex ${own ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] rounded-lg px-4 py-2 ${own ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
                    <div className="text-sm">{m.message}</div>
                    <div className={`text-xs mt-1 ${own ? 'text-primary-100' : 'text-gray-500'}`}>{new Date(m.created_at).toLocaleString()}</div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={endRef} />
        </div>
        <form onSubmit={handleSend} className="p-6 border-t border-gray-200">
          <div className="flex gap-3">
            <input type="text" className="input flex-1" placeholder="Type your message..." value={newMsg} onChange={e => setNewMsg(e.target.value)} disabled={sending} />
            <button type="submit" disabled={sending || !newMsg.trim()} className="btn-primary disabled:opacity-50">{sending ? 'Sending...' : 'Send'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
