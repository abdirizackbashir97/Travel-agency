import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import LoginHero from '../components/auth/LoginHero';
import LoginForm from '../components/auth/LoginForm';
import ForgotPasswordModal from '../components/auth/ForgotPasswordModal';

const API_BASE = 'http://localhost:5000/api';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('accessToken', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('isLoggedIn', 'true');
        // Redirect based on role
        const userRole = data.user?.role || 'user';
        if (userRole === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/dashboard');
        }
        toast.success('Login successful!');
      } else {
        toast.error(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = (email) => {
    console.log('Reset password for:', email);
    setIsForgotPasswordOpen(false);
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="flex min-h-screen bg-white">
        <LoginHero />
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
          handleSubmit={handleSubmit}
          loading={loading}
          openForgotPassword={() => setIsForgotPasswordOpen(true)}
        />
        <ForgotPasswordModal
          isOpen={isForgotPasswordOpen}
          onClose={() => setIsForgotPasswordOpen(false)}
          onSend={handleForgotPassword}
        />
      </div>
    </>
  );
};

export default Login;
