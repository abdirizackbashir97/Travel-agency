import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, CheckCircle, AlertCircle, Send, Sparkles, Award, Heart } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [showEmailPreview, setShowEmailPreview] = useState(false);
  const [userName, setUserName] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
    if (success) setSuccess(false);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.terms) newErrors.terms = 'You must agree to the terms';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    // Save user data to localStorage
    const userData = {
      id: Date.now(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      role: 'user',
      registeredAt: new Date().toISOString(),
      isLoggedIn: true,
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true');
    
    setUserName(`${formData.firstName} ${formData.lastName}`);
    setSuccess(true);
    setLoading(false);
    setShowEmailPreview(true);
    
    // Hide email preview after 8 seconds and redirect to dashboard
    setTimeout(() => {
      setShowEmailPreview(false);
      navigate('/dashboard');
    }, 10000);
  };

  // Email Notification Component
  const EmailNotification = ({ name }) => {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          {/* Email Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-6 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-medium">Welcome Email</p>
                <p className="text-blue-100 text-sm">TravelAgency</p>
              </div>
              <div className="ml-auto">
                <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">NEW</span>
              </div>
            </div>
          </div>

          {/* Email Body */}
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Welcome Aboard! 🎉</h2>
              <p className="text-gray-500 mt-1">Your journey with TravelAgency begins now</p>
            </div>

            {/* Greeting */}
            <div className="bg-blue-50 rounded-xl p-6 mb-6 border border-blue-100">
              <p className="text-xl font-bold text-gray-900">
                Dear <span className="text-blue-600">{name}</span>,
              </p>
            </div>

            {/* Main Message */}
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p className="text-lg font-medium text-gray-900">Welcome to the TravelAgency Family! 🌟</p>
              
              <p>
                We are absolutely thrilled to have you on board! Your decision to join TravelAgency 
                is the first step towards a world of unforgettable adventures and seamless travel experiences.
              </p>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-3">
                  <Award className="w-5 h-5 text-blue-600" />
                  Why Trust TravelAgency?
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>10,000+ Happy Travelers</strong> - Join our community of satisfied explorers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Best Price Guarantee</strong> - We offer the most competitive rates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>24/7 Expert Support</strong> - Our team is always here to help</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Secure & Trusted</strong> - Your safety is our top priority</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-3">
                  <Heart className="w-5 h-5 text-red-500" />
                  What We Do For You
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✈️</span>
                    <span><strong>Flight Bookings</strong> - Best deals on flights worldwide</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">🏨</span>
                    <span><strong>Hotel Reservations</strong> - Luxury stays at affordable prices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">🗺️</span>
                    <span><strong>Custom Tours</strong> - Tailored experiences just for you</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">📱</span>
                    <span><strong>Easy Booking</strong> - Book anytime, anywhere</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">💰</span>
                    <span><strong>Best Prices</strong> - Exclusive deals and discounts</span>
                  </li>
                </ul>
              </div>

              <div className="text-center p-4 bg-amber-50 rounded-xl border border-amber-100">
                <p className="text-amber-800 font-medium">
                  🌟 As a valued member, you now have access to exclusive travel deals and premium support!
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-xl font-bold text-gray-900">
                Thank You, <span className="text-blue-600">{name}</span>! 🙏
              </p>
              <p className="text-gray-500 text-sm mt-2">
                We can't wait to help you explore the world and create memories that will last a lifetime.
              </p>
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                <span className="text-blue-600 font-medium">Safe</span> · 
                <span className="text-green-600 font-medium">Secure</span> · 
                <span className="text-purple-600 font-medium">Trusted</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                © {new Date().getFullYear()} TravelAgency. All rights reserved.
              </p>
            </div>
          </div>

          {/* Close Button */}
          <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex justify-end">
            <button
              onClick={() => {
                setShowEmailPreview(false);
                navigate('/dashboard');
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Continue to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-xl border border-gray-200 p-8">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-lg">TA</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-500 mt-1">Start your journey with us today</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700 animate-pulse">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm">Account created successfully! Welcome aboard! 🎉</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full pl-9 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                      errors.firstName ? 'border-red-500' : 'border-gray-200'
                    }`}
                    placeholder="Enter your first name"
                    required
                  />
                </div>
                {errors.firstName && (
                  <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    errors.lastName ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="Enter your last name"
                  required
                />
                {errors.lastName && (
                  <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    errors.email ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="Enter your email address"
                  required
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    errors.password ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="Create a strong password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">Minimum 6 characters</p>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                className="w-4 h-4 border-gray-300 rounded focus:ring-blue-600"
                required
              />
              <label className="text-sm text-gray-600">
                I agree to the{' '}
                <Link to="/terms" className="text-blue-600 hover:text-blue-700">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-blue-600 hover:text-blue-700">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.terms && (
              <p className="text-xs text-red-500">{errors.terms}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Create Account
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Email Notification Popup */}
      {showEmailPreview && <EmailNotification name={userName} />}
    </div>
  );
};

export default Register;
