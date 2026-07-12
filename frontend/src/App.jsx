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
import Bookings from './pages/Bookings';
import Booking from './pages/Booking';
import AdminLayout from './components/dashboard/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminFlights from './pages/AdminFlights';
import AdminHotels from './pages/AdminHotels';
import AdminDestinations from './pages/AdminDestinations';
import AdminTours from './pages/AdminTours';
import AdminBookings from './pages/AdminBookings';
import AdminPayments from './pages/AdminPayments';
import AdminReviews from './pages/AdminReviews';
import AdminReports from './pages/AdminReports';
import AdminSettings from './pages/AdminSettings';
import AdminProfile from './pages/AdminProfile';
import UserDashboard from './pages/UserDashboard';
import UserFlights from './pages/UserFlights';
import UserHotels from './pages/UserHotels';
import UserTours from './pages/UserTours';
import UserExplore from './pages/UserExplore';
import UserTickets from './pages/UserTickets';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isDashboardRoute = location.pathname.startsWith('/dashboard');
  const hidePublicNavbar = isAdminRoute || isDashboardRoute;

  return (
    <div className="flex flex-col min-h-screen">
      {!hidePublicNavbar && <Navbar />}
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
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/dashboard/flights" element={<UserFlights />} />
          <Route path="/dashboard/hotels" element={<UserHotels />} />
          <Route path="/dashboard/tours" element={<UserTours />} />
          <Route path="/dashboard/explore" element={<UserExplore />} />
          <Route path="/dashboard/tickets" element={<UserTickets />} />
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
          <Route path="/admin/users" element={<AdminLayout><AdminUsers /></AdminLayout>} />
          <Route path="/admin/flights" element={<AdminLayout><AdminFlights /></AdminLayout>} />
          <Route path="/admin/hotels" element={<AdminLayout><AdminHotels /></AdminLayout>} />
          <Route path="/admin/destinations" element={<AdminLayout><AdminDestinations /></AdminLayout>} />
          <Route path="/admin/tours" element={<AdminLayout><AdminTours /></AdminLayout>} />
          <Route path="/admin/bookings" element={<AdminLayout><AdminBookings /></AdminLayout>} />
          <Route path="/admin/payments" element={<AdminLayout><AdminPayments /></AdminLayout>} />
          <Route path="/admin/reviews" element={<AdminLayout><AdminReviews /></AdminLayout>} />
          <Route path="/admin/reports" element={<AdminLayout><AdminReports /></AdminLayout>} />
          <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />
          <Route path="/admin/profile" element={<AdminLayout><AdminProfile /></AdminLayout>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!hidePublicNavbar && <Footer />}
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
