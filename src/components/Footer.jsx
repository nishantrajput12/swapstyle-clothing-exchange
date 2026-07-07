import { Link } from 'react-router-dom';
import { HiSwitchHorizontal } from 'react-icons/hi';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* About */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded flex items-center justify-center">
                <HiSwitchHorizontal className="text-white text-xl" />
              </div>
              <div>
                <div className="font-display font-bold text-lg text-white">SwapStyle</div>
                <div className="text-xs text-gray-500 -mt-1">Explore <span className="text-primary-500">Fashion</span></div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              The sustainable way to refresh your wardrobe. Swap clothes, not buy new ones. Join our community and reduce fashion waste.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-primary-600 rounded flex items-center justify-center transition-colors">
                <span className="text-xs">FB</span>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-primary-600 rounded flex items-center justify-center transition-colors">
                <span className="text-xs">TW</span>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-primary-600 rounded flex items-center justify-center transition-colors">
                <span className="text-xs">IG</span>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/marketplace" className="hover:text-white transition-colors">All Items</Link></li>
              <li><Link to="/marketplace?category=Dresses" className="hover:text-white transition-colors">Dresses</Link></li>
              <li><Link to="/marketplace?category=Jeans" className="hover:text-white transition-colors">Jeans</Link></li>
              <li><Link to="/marketplace?category=Jackets" className="hover:text-white transition-colors">Jackets</Link></li>
              <li><Link to="/marketplace?category=Shoes" className="hover:text-white transition-colors">Shoes</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Account</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
              <li><Link to="/register" className="hover:text-white transition-colors">Sign Up</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">My Listings</Link></li>
              <li><Link to="/swaps" className="hover:text-white transition-colors">Swap Requests</Link></li>
              <li><Link to="/profile" className="hover:text-white transition-colors">Profile</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="cursor-default">How It Works</span></li>
              <li><span className="cursor-default">Swap Guidelines</span></li>
              <li><span className="cursor-default">Safety Tips</span></li>
              <li><Link to="/value-calculator" className="hover:text-white transition-colors">Value Calculator</Link></li>
              <li><span className="cursor-default">FAQs</span></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="cursor-default">Terms of Service</span></li>
              <li><span className="cursor-default">Privacy Policy</span></li>
              <li><span className="cursor-default">Community Guidelines</span></li>
              <li><span className="cursor-default">Cookie Policy</span></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-[1400px] mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} SwapStyle. All rights reserved. Swap sustainably.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <span className="w-8 h-5 bg-gray-700 rounded text-xs flex items-center justify-center">VISA</span>
                <span className="w-8 h-5 bg-gray-700 rounded text-xs flex items-center justify-center">MC</span>
                <span className="w-8 h-5 bg-gray-700 rounded text-xs flex items-center justify-center">UPI</span>
              </span>
              <span className="text-gray-500">100% Safe & Secure</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
