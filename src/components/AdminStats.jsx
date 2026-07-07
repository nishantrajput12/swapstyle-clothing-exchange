import { useApp } from '../context/AppContext';

export default function AdminStats() {
  const { listings, swaps, users } = useApp();

  const stats = [
    { label: 'Total Users', value: users.length, color: 'bg-blue-500', change: '+12%' },
    { label: 'Active Listings', value: listings.filter(l => l.available).length, color: 'bg-green-500', change: '+8%' },
    { label: 'Total Swaps', value: swaps.length, color: 'bg-purple-500', change: '+23%' },
    { label: 'Successful Swaps', value: swaps.filter(s => s.status === 'accepted').length, color: 'bg-amber-500', change: '+15%' },
    { label: 'Pending Requests', value: swaps.filter(s => s.status === 'pending').length, color: 'bg-orange-500', change: '-5%' },
    { label: 'Conversion Rate', value: swaps.length > 0 ? Math.round((swaps.filter(s => s.status === 'accepted').length / swaps.length) * 100) + '%' : '0%', color: 'bg-teal-500', change: '+3%' },
  ];

  const categoryData = {};
  listings.forEach(l => {
    categoryData[l.category] = (categoryData[l.category] || 0) + 1;
  });
  const topCategories = Object.entries(categoryData).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const maxCat = topCategories.length > 0 ? topCategories[0][1] : 1;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map(stat => (
          <div key={stat.label} className="card p-4">
            <div className={`w-8 h-8 ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
              <span className="text-white font-bold text-sm">{typeof stat.value === 'number' ? stat.value.toString().charAt(0) : '%'}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="card p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Top Categories</h3>
        <div className="space-y-3">
          {topCategories.map(([cat, count]) => (
            <div key={cat}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-700 font-medium">{cat}</span>
                <span className="text-gray-500">{count} listings</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary-500 rounded-full transition-all duration-500" style={{ width: `${(count / maxCat) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
