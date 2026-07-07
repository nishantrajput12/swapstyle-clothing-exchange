import { createContext, useContext, useState, useEffect } from 'react';
import { getSeedData } from '../utils/seedData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSeedData();
    const saved = localStorage.getItem('swapstyle_current_user');
    if (saved) {
      setUser(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('swapstyle_users') || '[]');
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...safeUser } = found;
      setUser(safeUser);
      localStorage.setItem('swapstyle_current_user', JSON.stringify(safeUser));
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const register = (name, email, password, location) => {
    const users = JSON.parse(localStorage.getItem('swapstyle_users') || '[]');
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'Email already registered' };
    }
    const newUser = {
      id: 'u' + Date.now(),
      name, email, password, location,
      bio: '',
      isAdmin: false,
      joinDate: new Date().toISOString().split('T')[0],
      avatar: ''
    };
    users.push(newUser);
    localStorage.setItem('swapstyle_users', JSON.stringify(users));
    const { password: _, ...safeUser } = newUser;
    setUser(safeUser);
    localStorage.setItem('swapstyle_current_user', JSON.stringify(safeUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('swapstyle_current_user');
  };

  const updateProfile = (updates) => {
    const users = JSON.parse(localStorage.getItem('swapstyle_users') || '[]');
    const idx = users.findIndex(u => u.id === user.id);
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...updates };
      localStorage.setItem('swapstyle_users', JSON.stringify(users));
      const { password: _, ...safeUser } = users[idx];
      setUser(safeUser);
      localStorage.setItem('swapstyle_current_user', JSON.stringify(safeUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
