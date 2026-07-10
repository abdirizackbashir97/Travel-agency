import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Simulate signup – replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Reset fields after success
      setName('');
      setEmail('');
      setPhone('');
      setPassword('');
      setConfirmPassword('');
      setTermsAccepted(false);
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
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
      />
    </div>
  );
};

export default Signup;
