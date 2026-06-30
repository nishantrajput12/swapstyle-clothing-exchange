import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { isLoggedIn } from './api';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ClothingList from './pages/ClothingList';
import ClothingDetail from './pages/ClothingDetail';
import AddClothing from './pages/AddClothing';
import SwapRequests from './pages/SwapRequests';
import SwapDetail from './pages/SwapDetail';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';

function Protected({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/clothing" element={<ClothingList />} />
          <Route path="/clothing/:id" element={<ClothingDetail />} />
          <Route path="/add" element={<Protected><AddClothing /></Protected>} />
          <Route path="/swaps" element={<Protected><SwapRequests /></Protected>} />
          <Route path="/swaps/:id" element={<Protected><SwapDetail /></Protected>} />
          <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
          <Route path="/admin" element={<Protected><AdminPanel /></Protected>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
