import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import flightImage from '../assets/images/flights/flight_2.png';

axios.defaults.withCredentials = true;

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });

      if (res.data.success) {
        localStorage.setItem('accessToken', res.data.access_token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        localStorage.setItem('userName', res.data.user.first_name);
        localStorage.setItem('isLoggedIn', 'true');
        
        // Redirect based on role
        if (res.data.user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError(res.data.message || 'Invalid credentials');
        setLoading(false);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Check console.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 md:p-8">
      <div className="w-full max-w-7xl h-[95vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        <div className="flex flex-1 flex-col lg:flex-row">
          <div className="relative lg:w-1/2 h-72 lg:h-auto overflow-hidden">
            <img
              src={flightImage}
              alt="SkyRoute Travel"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8 text-white">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">✈️</span>
                  <div>
                    <h1 className="text-xl md:text-2xl font-bold">SkyRoute</h1>
                    <p className="text-xs md:text-sm text-white/70">Explore. Discover. Fly.</p>
                  </div>
                </div>
              </div>
              <div className="max-w-md">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-2">Explore the world</h2>
                <p className="text-xl md:text-2xl font-light text-orange-300 italic mb-3">Your Journey Begins Here</p>
                <p className="text-sm md:text-base text-white/80 leading-relaxed">Book flights, discover amazing destinations, and create unforgettable memories with us.</p>
                <div className="flex items-center gap-3 mt-4 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5 w-fit">
                  <span className="text-xl">🛡️</span>
                  <div>
                    <p className="text-xs font-semibold">Safe & Secure</p>
                    <p className="text-[10px] text-white/70">Your data is protected with top-level security</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center p-6 md:p-8 lg:p-10 bg-white">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
                <p className="text-sm text-gray-500">Login to your account and continue your journey with SkyRoute.</p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-xl mb-4 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">📧</span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-gray-50"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">🔒</span>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-gray-50"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg"
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                <div className="text-right mb-6">
                  <a href="#" className="text-sm text-blue-600 hover:underline">Forgot Password?</a>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-semibold text-base flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? '⏳ Logging in...' : '✈️ Login'}
                </button>
              </form>

              <div className="flex items-center my-6">
                <div className="flex-1 border-t border-gray-200"></div>
                <span className="px-4 text-sm text-gray-400">or continue with</span>
                <div className="flex-1 border-t border-gray-200"></div>
              </div>

              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-2.5 hover:bg-gray-50 transition bg-white">
                  <span className="text-lg">🔵</span>
                  <span className="text-sm font-medium text-gray-700">Continue with Google</span>
                </button>
                <button className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-2.5 hover:bg-gray-50 transition bg-white">
                  <span className="text-lg">📘</span>
                  <span className="text-sm font-medium text-gray-700">Continue with Facebook</span>
                </button>
                <button className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-2.5 hover:bg-gray-50 transition bg-white">
                  <span className="text-lg">🍎</span>
                  <span className="text-sm font-medium text-gray-700">Continue with Apple</span>
                </button>
              </div>

              <p className="text-center text-sm text-gray-600 mt-6">
                Don't have an account? <a href="/signup" className="text-blue-600 font-semibold hover:underline">Sign Up</a>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border-t border-gray-100 py-6 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-white hover:shadow-md transition shadow-sm">
              <span className="text-3xl mb-2">✈️</span>
              <h4 className="text-sm font-semibold text-gray-800">Best Flight Deals</h4>
              <p className="text-xs text-gray-500 mt-1">Find affordable flights to top destinations</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-white hover:shadow-md transition shadow-sm">
              <span className="text-3xl mb-2">🏨</span>
              <h4 className="text-sm font-semibold text-gray-800">Luxury Hotels</h4>
              <p className="text-xs text-gray-500 mt-1">Stay in comfort at the best hotels worldwide</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-white hover:shadow-md transition shadow-sm">
              <span className="text-3xl mb-2">📍</span>
              <h4 className="text-sm font-semibold text-gray-800">Amazing Destinations</h4>
              <p className="text-xs text-gray-500 mt-1">Explore beautiful places around the world</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-white hover:shadow-md transition shadow-sm">
              <span className="text-3xl mb-2">🎧</span>
              <h4 className="text-sm font-semibold text-gray-800">24/7 Support</h4>
              <p className="text-xs text-gray-500 mt-1">We're here to help you anytime, anywhere</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
