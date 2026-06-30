import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn, clearAuth } from '../api';
import { useState } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  function logout() {
    clearAuth();
    navigate('/');
  }

  return (
    <nav className="bg-primary-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold tracking-tight">ClothingSwap</Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="hover:text-primary-100">Home</Link>
            <Link to="/clothing" className="hover:text-primary-100">Browse</Link>
            {isLoggedIn() ? (
              <>
                <Link to="/swaps" className="hover:text-primary-100">My Swaps</Link>
                <Link to="/add" className="bg-accent-500 hover:bg-accent-600 px-4 py-2 rounded-lg font-semibold">+ Add Item</Link>
                <Link to="/dashboard" className="hover:text-primary-100">Dashboard</Link>
                <button onClick={logout} className="hover:text-primary-100">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-primary-100">Login</Link>
                <Link to="/register" className="bg-accent-500 hover:bg-accent-600 px-4 py-2 rounded-lg font-semibold">Sign Up</Link>
              </>
            )}
          </div>
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>
        {open && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" className="block py-2 hover:text-primary-100" onClick={() => setOpen(false)}>Home</Link>
            <Link to="/clothing" className="block py-2 hover:text-primary-100" onClick={() => setOpen(false)}>Browse</Link>
            {isLoggedIn() ? (
              <>
                <Link to="/swaps" className="block py-2 hover:text-primary-100" onClick={() => setOpen(false)}>My Swaps</Link>
                <Link to="/add" className="block py-2 hover:text-primary-100" onClick={() => setOpen(false)}>Add Item</Link>
                <Link to="/dashboard" className="block py-2 hover:text-primary-100" onClick={() => setOpen(false)}>Dashboard</Link>
                <button onClick={() => { logout(); setOpen(false); }} className="block py-2 hover:text-primary-100">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block py-2 hover:text-primary-100" onClick={() => setOpen(false)}>Login</Link>
                <Link to="/register" className="block py-2 hover:text-primary-100" onClick={() => setOpen(false)}>Sign Up</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
