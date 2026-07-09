import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    second_name: '',
    email: '',
    password: '',
    confirm_password: '',
    age: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match');
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      console.log('📤 Registering user:', formData.email);

      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.first_name,
          second_name: formData.second_name,
          email: formData.email,
          password: formData.password,
          age: parseInt(formData.age) || 0
        })
      });

      const data = await response.json();
      console.log('📥 Response:', data);

      if (response.ok) {
        setSuccess('✅ Registration successful! Redirecting to login...');
        toast.success('✅ Registration successful!');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(data.error || 'Registration failed');
        toast.error(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('❌ Error:', error);
      setError('Cannot connect to server. Make sure backend is running on port 5002');
      toast.error('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-4">
      <Toaster position="top-right" />
      
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <span className="text-4xl">✈️</span>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-gray-600 text-sm">Join our travel community</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            ⚠️ {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
            ✅ {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              name="first_name"
              placeholder="First Name *"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50 border-2 border-transparent rounded-lg focus:border-indigo-500 focus:bg-white focus:outline-none transition-all"
              required
            />
            <input
              type="text"
              name="second_name"
              placeholder="Last Name"
              value={formData.second_name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50 border-2 border-transparent rounded-lg focus:border-indigo-500 focus:bg-white focus:outline-none transition-all"
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email Address *"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-gray-50 border-2 border-transparent rounded-lg focus:border-indigo-500 focus:bg-white focus:outline-none transition-all"
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              type="password"
              name="password"
              placeholder="Password *"
              value={formData.password}
              onChange={handleChange}
              className="px-4 py-2.5 bg-gray-50 border-2 border-transparent rounded-lg focus:border-indigo-500 focus:bg-white focus:outline-none transition-all"
              required
            />
            <input
              type="password"
              name="confirm_password"
              placeholder="Confirm *"
              value={formData.confirm_password}
              onChange={handleChange}
              className="px-4 py-2.5 bg-gray-50 border-2 border-transparent rounded-lg focus:border-indigo-500 focus:bg-white focus:outline-none transition-all"
              required
            />
          </div>

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-gray-50 border-2 border-transparent rounded-lg focus:border-indigo-500 focus:bg-white focus:outline-none transition-all"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-70"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
