import { Link } from 'react-router-dom';

export default function ClothingCard({ item }) {
  return (
    <Link to={`/clothing/${item.id}`} className="card hover:shadow-lg transition-shadow group">
      <div className="aspect-square bg-gray-100 overflow-hidden relative">
        {item.image_url ? (
          <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
        ) : null}
        <div className={`w-full h-full flex flex-col items-center justify-center text-gray-400 ${item.image_url ? 'absolute inset-0 hidden' : ''}`} style={{ background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)' }}>
          <svg className="w-16 h-16 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span className="text-xs font-medium text-gray-400">{item.type || 'Clothing'}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2">{item.title}</h3>
          {item.status && item.status !== 'available' && (
            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full whitespace-nowrap">{item.status}</span>
          )}
        </div>
        <div className="text-lg font-bold text-primary-600 mb-1">₹{item.estimated_value}</div>
        <div className="text-sm text-gray-600 space-y-0.5">
          <div>{item.brand} · {item.size}</div>
          <div className="flex items-center gap-1 text-gray-500">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {item.location || item.owner_location}
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{item.condition}</span>
          <span className="text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded">{item.type}</span>
        </div>
      </div>
    </Link>
  );
}
