import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import Hotels from './pages/Hotels';
import Flights from './pages/Flights';
import Tours from './pages/Tours';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DashboardLayout from './components/dashboard/DashboardLayout';
import UserDashboard from './pages/UserDashboard';
import UserBookings from './pages/UserBookings';
import UserFlights from './pages/UserFlights';
import UserHotels from './pages/UserHotels';
import UserTours from './pages/UserTours';
import UserPayments from './pages/UserPayments';
import UserNotifications from './pages/UserNotifications';
import UserReviews from './pages/UserReviews';
import UserProfile from './pages/UserProfile';
import UserSettings from './pages/UserSettings';
import UserHelp from './pages/UserHelp';
import AdminLayout from './components/dashboard/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminBookings from './pages/AdminBookings';
import AdminBookingManagement from './pages/AdminBookingManagement';
import AdminFlightBookings from './pages/AdminFlightBookings';
import AdminHotelBookings from './pages/AdminHotelBookings';
import AdminTourBookings from './pages/AdminTourBookings';
import AdminUsers from './pages/AdminUsers';
import AdminFlights from './pages/AdminFlights';
import AdminHotels from './pages/AdminHotels';
import AdminDestinations from './pages/AdminDestinations';
import AdminTours from './pages/AdminTours';
import AdminPayments from './pages/AdminPayments';
import AdminReviews from './pages/AdminReviews';
import AdminReports from './pages/AdminReports';
import AdminSettings from './pages/AdminSettings';
import AdminProfile from './pages/AdminProfile';
import AdminNotifications from './pages/AdminNotifications';
import AdminHelp from './pages/AdminHelp';

function AppContent() {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/dashboard');
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/signup';
  
  const showLayout = !isDashboardRoute && !isAdminRoute && !isAuthRoute;

  return (
    <div className="flex flex-col min-h-screen">
      {showLayout && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="booking-management" element={<AdminBookingManagement />} />
            <Route path="flights-bookings" element={<AdminFlightBookings />} />
            <Route path="hotels-bookings" element={<AdminHotelBookings />} />
            <Route path="tours-bookings" element={<AdminTourBookings />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="flights" element={<AdminFlights />} />
            <Route path="hotels" element={<AdminHotels />} />
            <Route path="destinations" element={<AdminDestinations />} />
            <Route path="tours" element={<AdminTours />} />
            <Route path="payments" element={<AdminPayments />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="notifications" element={<AdminNotifications />} />
            <Route path="help" element={<AdminHelp />} />
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
          </Route>

          {/* User Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<UserDashboard />} />
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="bookings" element={<UserBookings />} />
            <Route path="flights" element={<UserFlights />} />
            <Route path="hotels" element={<UserHotels />} />
            <Route path="tours" element={<UserTours />} />
            <Route path="payments" element={<UserPayments />} />
            <Route path="notifications" element={<UserNotifications />} />
            <Route path="reviews" element={<UserReviews />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="settings" element={<UserSettings />} />
            <Route path="help" element={<UserHelp />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {showLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
