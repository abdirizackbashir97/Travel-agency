import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import Home from '../pages/Home';
import Destinations from '../pages/Destinations';
import DestinationDetails from '../pages/DestinationDetails';
import Hotels from '../pages/Hotels';
import HotelDetails from '../pages/HotelDetails';
import Flights from '../pages/Flights';
import FlightDetails from '../pages/FlightDetails';
import Tours from '../pages/Tours';
import Booking from '../pages/Booking';
import Payment from '../pages/Payment';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import UserDashboard from '../pages/UserDashboard';
import AdminDashboard from '../pages/AdminDashboard';
import AdminSettings from '../pages/AdminSettings';
import AdminUsers from '../pages/AdminUsers';
import Bookings from '../pages/Bookings';
import Wishlist from '../pages/Wishlist';
import Payments from '../pages/Payments';
import Settings from '../pages/Settings';
import AdminDestinations from '../pages/AdminDestinations';
import AdminFlights from '../pages/AdminFlights';
import AdminTours from '../pages/AdminTours';
import AdminHotels from '../pages/AdminHotels';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Main Layout Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destinations/:id" element={<DestinationDetails />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/flights/:id" element={<FlightDetails />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Dashboard Layout Routes */}
      <Route element={<DashboardLayout />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/destinations" element={<AdminDestinations />} />
        <Route path="/admin/flights" element={<AdminFlights />} />
        <Route path="/admin/tours" element={<AdminTours />} />
        <Route path="/admin/hotels" element={<AdminHotels />} />
        <Route path="/admin/bookings" element={<AdminDestinations />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/notifications" element={<UserDashboard />} />
      </Route>

      {/* Standalone Routes */}
      <Route path="/booking" element={<Booking />} />
      <Route path="/payment" element={<Payment />} />
    </Routes>
  );
};

export default AppRoutes;
