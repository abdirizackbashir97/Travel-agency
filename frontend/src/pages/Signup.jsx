import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SignupHero from '../components/auth/SignupHero';
import SignupForm from '../components/auth/SignupForm';

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password length
    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      setLoading(false);
      return;
    }

    // Validate terms
    if (!termsAccepted) {
      setError('Please accept the terms and conditions');
      setLoading(false);
      return;
    }

    try {
      // Split name into first and second name
      const nameParts = name.trim().split(' ');
      const first_name = nameParts[0] || '';
      const second_name = nameParts.slice(1).join(' ') || '';

      console.log('📝 Sending registration data:', {
        first_name,
        second_name,
        email,
        phone,
      });

      const response = await axios.post('http://localhost:5000/api/auth/register', {
        first_name: first_name,
        second_name: second_name,
        email: email,
        password: password,
        phone: phone,
        age: 25
      });

      console.log('📦 Registration response:', response.data);

      if (response.data.success) {
        // Store token and user data
        localStorage.setItem('accessToken', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('userName', response.data.user.first_name);
        localStorage.setItem('isLoggedIn', 'true');
        
        // Reset fields
        setName('');
        setEmail('');
        setPhone('');
        setPassword('');
        setConfirmPassword('');
        setTermsAccepted(false);
        
        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        setError(response.data.message || 'Registration failed');
        setLoading(false);
      }
    } catch (err) {
      console.error('❌ Registration error:', err);
      console.error('❌ Response:', err.response?.data);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <SignupHero />
      <SignupForm
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        phone={phone}
        setPhone={setPhone}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        termsAccepted={termsAccepted}
        setTermsAccepted={setTermsAccepted}
        handleSubmit={handleSubmit}
        loading={loading}
        error={error}
        setError={setError}
      />
    </div>
  );
};

export default Signup;
