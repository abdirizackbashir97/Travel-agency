import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Destinations from '../pages/Destinations';
import Hotels from '../pages/Hotels';
import Flights from '../pages/Flights';
import Tours from '../pages/Tours';
import UserDashboard from '../pages/UserDashboard';
import AdminDashboard from '../pages/AdminDashboard';
import AdminDestinations from '../pages/AdminDestinations';
import AdminHotels from '../pages/AdminHotels';
import AdminFlights from '../pages/AdminFlights';
import AdminTours from '../pages/AdminTours';
import AdminBookings from '../pages/AdminBookings';
import AdminUsers from '../pages/AdminUsers';
import Booking from '../pages/Booking';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem('accessToken');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Routes with MainLayout (Navbar + Footer) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/tours" element={<Tours />} />
      </Route>

      {/* Routes without MainLayout (Auth pages) */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* Routes with DashboardLayout */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        } />
        <Route path="/booking" element={
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
        } />
      </Route>
      
      {/* Admin Routes with DashboardLayout */}
      <Route element={<DashboardLayout />}>
        <Route path="/admin/dashboard" element={
          <ProtectedRoute adminOnly>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/destinations" element={
          <ProtectedRoute adminOnly>
            <AdminDestinations />
          </ProtectedRoute>
        } />
        <Route path="/admin/hotels" element={
          <ProtectedRoute adminOnly>
            <AdminHotels />
          </ProtectedRoute>
        } />
        <Route path="/admin/flights" element={
          <ProtectedRoute adminOnly>
            <AdminFlights />
          </ProtectedRoute>
        } />
        <Route path="/admin/tours" element={
          <ProtectedRoute adminOnly>
            <AdminTours />
          </ProtectedRoute>
        } />
        <Route path="/admin/bookings" element={
          <ProtectedRoute adminOnly>
            <AdminBookings />
          </ProtectedRoute>
        } />
        <Route path="/admin/users" element={
          <ProtectedRoute adminOnly>
            <AdminUsers />
          </ProtectedRoute>
        } />
      </Route>
      
      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
