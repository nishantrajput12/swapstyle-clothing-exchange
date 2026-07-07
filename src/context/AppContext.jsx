import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { getSeedData } from '../utils/seedData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [swaps, setSwaps] = useState([]);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    getSeedData();
    loadData();
  }, []);

  const loadData = () => {
    setListings(JSON.parse(localStorage.getItem('swapstyle_listings') || '[]'));
    setSwaps(JSON.parse(localStorage.getItem('swapstyle_swaps') || '[]'));
    setMessages(JSON.parse(localStorage.getItem('swapstyle_messages') || '[]'));
    setUsers(JSON.parse(localStorage.getItem('swapstyle_users') || '[]'));
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Listings
  const addListing = (listing) => {
    const newListing = {
      ...listing,
      id: 'l' + Date.now(),
      userId: user.id,
      available: true,
      createdAt: new Date().toISOString().split('T')[0],
      images: listing.images || ['https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=400&fit=crop']
    };
    const updated = [newListing, ...listings];
    setListings(updated);
    localStorage.setItem('swapstyle_listings', JSON.stringify(updated));
    showNotification('Listing created successfully!');
    return newListing;
  };

  const updateListing = (id, updates) => {
    const updated = listings.map(l => l.id === id ? { ...l, ...updates } : l);
    setListings(updated);
    localStorage.setItem('swapstyle_listings', JSON.stringify(updated));
    showNotification('Listing updated!');
  };

  const deleteListing = (id) => {
    const updated = listings.filter(l => l.id !== id);
    setListings(updated);
    localStorage.setItem('swapstyle_listings', JSON.stringify(updated));
    showNotification('Listing removed.');
  };

  const getListing = (id) => listings.find(l => l.id === id);
  const getUserListings = (userId) => listings.filter(l => l.userId === userId);
  const getAvailableListings = () => listings.filter(l => l.available);

  // Swaps
  const sendSwapRequest = (receiverId, senderListingId, receiverListingId, message) => {
    const newSwap = {
      id: 's' + Date.now(),
      senderId: user.id,
      receiverId,
      senderListingId,
      receiverListingId,
      status: 'pending',
      message: message || '',
      createdAt: new Date().toISOString().split('T')[0]
    };
    const updated = [newSwap, ...swaps];
    setSwaps(updated);
    localStorage.setItem('swapstyle_swaps', JSON.stringify(updated));
    showNotification('Swap request sent!');
    return newSwap;
  };

  const respondToSwap = (swapId, status) => {
    const updated = swaps.map(s => {
      if (s.id === swapId) {
        const newSwap = { ...s, status };
        if (status === 'accepted') {
          const listings = JSON.parse(localStorage.getItem('swapstyle_listings') || '[]');
          const l1 = listings.findIndex(l => l.id === s.senderListingId);
          const l2 = listings.findIndex(l => l.id === s.receiverListingId);
          if (l1 !== -1) listings[l1].available = false;
          if (l2 !== -1) listings[l2].available = false;
          localStorage.setItem('swapstyle_listings', JSON.stringify(listings));
          setListings(listings);
        }
        return newSwap;
      }
      return s;
    });
    setSwaps(updated);
    localStorage.setItem('swapstyle_swaps', JSON.stringify(updated));
    showNotification(status === 'accepted' ? 'Swap accepted!' : 'Swap declined.');
  };

  const getUserSwaps = (userId) => swaps.filter(s => s.senderId === userId || s.receiverId === userId);
  const getPendingSwaps = (userId) => swaps.filter(s => s.receiverId === userId && s.status === 'pending');

  // Messages
  const sendMessage = (receiverId, text) => {
    const newMsg = {
      id: 'm' + Date.now(),
      senderId: user.id,
      receiverId,
      text,
      timestamp: new Date().toISOString()
    };
    const updated = [...messages, newMsg];
    setMessages(updated);
    localStorage.setItem('swapstyle_messages', JSON.stringify(updated));
    return newMsg;
  };

  const getConversation = (userId1, userId2) => {
    return messages.filter(m =>
      (m.senderId === userId1 && m.receiverId === userId2) ||
      (m.senderId === userId2 && m.receiverId === userId1)
    ).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  };

  const getChatPartners = (userId) => {
    const partnerIds = new Set();
    messages.forEach(m => {
      if (m.senderId === userId) partnerIds.add(m.receiverId);
      if (m.receiverId === userId) partnerIds.add(m.senderId);
    });
    return Array.from(partnerIds);
  };

  const getLastMessage = (userId1, userId2) => {
    const convo = getConversation(userId1, userId2);
    return convo.length > 0 ? convo[convo.length - 1] : null;
  };

  // Users
  const getUser = (userId) => users.find(u => u.id === userId);
  const getAllUsers = () => users;

  // Admin
  const deleteUser = (userId) => {
    const updated = users.filter(u => u.id !== userId);
    setUsers(updated);
    localStorage.setItem('swapstyle_users', JSON.stringify(updated));
    const updatedListings = listings.filter(l => l.userId !== userId);
    setListings(updatedListings);
    localStorage.setItem('swapstyle_listings', JSON.stringify(updatedListings));
    showNotification('User removed.');
  };

  // Value Calculator
  const calculateValue = (brand, category, condition) => {
    const brandMultiplier = { 'Zara': 1.0, 'H&M': 0.7, 'Nike': 1.2, 'Adidas': 1.1, "Levi's": 1.3, 'Puma': 1.0, 'Mango': 0.9, 'Tommy Hilfiger': 1.2, 'Anthropologie': 1.4, 'Forever 21': 0.6, 'Converse': 1.0, 'The North Face': 1.5, 'Biba': 1.1, 'Allen Solly': 0.9, 'Only': 0.8, 'Urbanic': 0.7, 'Ray-Ban': 1.8, 'Handmade': 0.8, 'Other': 0.8 };
    const conditionMultiplier = { 'New': 1.0, 'Like New': 0.9, 'Excellent': 0.8, 'Good': 0.65, 'Fair': 0.4 };
    const categoryBase = { 'Tops': 25, 'T-Shirts': 18, 'Shirts': 22, 'Dresses': 35, 'Jeans': 30, 'Pants': 25, 'Skirts': 22, 'Jackets': 40, 'Blazers': 45, 'Hoodies': 30, 'Sweaters': 28, 'Ethnic Wear': 50, 'Shoes': 35, 'Accessories': 20 };
    const base = categoryBase[category] || 25;
    const bMult = brandMultiplier[brand] || 0.8;
    const cond = conditionMultiplier[condition] || 0.65;
    return Math.round(base * bMult * cond);
  };

  return (
    <AppContext.Provider value={{
      listings, swaps, messages, users, notification,
      addListing, updateListing, deleteListing, getListing, getUserListings, getAvailableListings,
      sendSwapRequest, respondToSwap, getUserSwaps, getPendingSwaps,
      sendMessage, getConversation, getChatPartners, getLastMessage,
      getUser, getAllUsers, deleteUser,
      calculateValue, showNotification, loadData
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
export default AppContext;
