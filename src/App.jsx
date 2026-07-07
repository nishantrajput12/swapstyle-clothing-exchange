import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Notification from './components/Notification'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Marketplace from './pages/Marketplace'
import ItemDetail from './pages/ItemDetail'
import Dashboard from './pages/Dashboard'
import SwapRequests from './pages/SwapRequests'
import Chat from './pages/Chat'
import AdminPanel from './pages/AdminPanel'
import CreateListing from './pages/CreateListing'
import ValueCalculator from './pages/ValueCalculator'
import Profile from './pages/Profile'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <Notification />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/value-calculator" element={<ValueCalculator />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/swaps" element={<SwapRequests />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/chat/:userId" element={<Chat />} />
            <Route path="/listing/new" element={<CreateListing />} />
            <Route path="/listing/edit/:id" element={<CreateListing />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route element={<ProtectedRoute admin />}>
            <Route path="/admin" element={<AdminPanel />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
