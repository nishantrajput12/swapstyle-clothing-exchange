const BASE = import.meta.env.VITE_API_BASE || '/api';

function token() {
  return localStorage.getItem('swap_token') || '';
}

async function req(path, opts = {}) {
  const headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) };
  if (opts.auth) headers.Authorization = `Bearer ${token()}`;
  const res = await fetch(`${BASE}${path}`, { ...opts, headers });

  // Auto-clear stale/invalid tokens and force re-login
  if (res.status === 401) {
    clearAuth();
    if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
    throw new Error('Session expired. Please login again.');
  }

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return res.json();
}

export const api = {
  login: (body) => req('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  register: (body) => req('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  me: () => req('/auth/me', { auth: true }),
  clothing: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    const needsAuth = params.user_id === 'me';
    return req(`/clothing${q ? `?${q}` : ''}`, needsAuth ? { auth: true } : {});
  },
  clothingItem: (id) => req(`/clothing/${id}`),
  createClothing: (body) => req('/clothing', { method: 'POST', body: JSON.stringify(body), auth: true }),
  updateClothing: (id, body) => req(`/clothing/${id}`, { method: 'PUT', body: JSON.stringify(body), auth: true }),
  deleteClothing: (id) => req(`/clothing/${id}`, { method: 'DELETE', auth: true }),
  filterOptions: () => req('/clothing/filters/options'),
  swaps: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return req(`/swaps${q ? `?${q}` : ''}`, { auth: true });
  },
  swap: (id) => req(`/swaps/${id}`, { auth: true }),
  createSwap: (body) => req('/swaps', { method: 'POST', body: JSON.stringify(body), auth: true }),
  updateSwapStatus: (id, status) => req(`/swaps/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }), auth: true }),
  swapStats: () => req('/swaps/stats/summary', { auth: true }),
  messages: (swapId) => req(`/messages/${swapId}`, { auth: true }),
  sendMessage: (swapId, message) => req(`/messages/${swapId}`, { method: 'POST', body: JSON.stringify({ message }), auth: true }),
  nearby: () => req('/location/nearby', { auth: true }),
  suggestions: () => req('/location/suggestions', { auth: true }),
  adminUsers: () => req('/admin/users', { auth: true }),
  adminListings: () => req('/admin/listings', { auth: true }),
  adminSwaps: () => req('/admin/swaps', { auth: true }),
  adminStats: () => req('/admin/stats', { auth: true }),
  deleteListing: (id) => req(`/admin/listings/${id}`, { method: 'DELETE', auth: true }),
  updateListingStatus: (id, status) => req(`/admin/listings/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }), auth: true })
};

export function setToken(t) { localStorage.setItem('swap_token', t); }
export function setUser(id) { localStorage.setItem('user_id', String(id)); }
export function clearAuth() { localStorage.removeItem('swap_token'); localStorage.removeItem('user_id'); }
export function isLoggedIn() { return !!token(); }
export function getUserId() { return localStorage.getItem('user_id'); }
