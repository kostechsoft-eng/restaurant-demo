import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import MenuPage from './pages/MenuPage'
import GalleryPage from './pages/GalleryPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute'
import AdminLayout from './components/admin/AdminLayout'
import AdminLoginPage from './pages/admin/AdminLoginPage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import AdminBookingsPage from './pages/admin/AdminBookingsPage'
import AdminEnquiriesPage from './pages/admin/AdminEnquiriesPage'
import './styles.css'

function App() {
  return <Routes><Route path="/admin/login" element={<AdminLoginPage />} /><Route element={<ProtectedAdminRoute />}><Route path="/admin" element={<AdminLayout />}><Route index element={<AdminDashboardPage />} /><Route path="bookings" element={<AdminBookingsPage />} /><Route path="enquiries" element={<AdminEnquiriesPage />} /></Route></Route><Route element={<Layout />}><Route path="/" element={<Home />} /><Route path="/about" element={<AboutPage />} /><Route path="/menu" element={<MenuPage />} /><Route path="/gallery" element={<GalleryPage />} /><Route path="/contact" element={<ContactPage />} /><Route path="*" element={<NotFoundPage />} /></Route></Routes>
}

export default App
