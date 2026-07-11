import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHero from '../components/auth/LoginHero';
import LoginForm from '../components/auth/LoginForm';
import ForgotPasswordModal from '../components/auth/ForgotPasswordModal';

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
      // Simulate login – replace with your actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Reset form fields
      setEmail('');
      setPassword('');
      setRememberMe(false);

      // Redirect to admin dashboard after successful login
      navigate('/admin');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = (email) => {
    console.log('Reset password for:', email);
    setIsForgotPasswordOpen(false);
  };

  return (
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
  );
};

export default Login;
