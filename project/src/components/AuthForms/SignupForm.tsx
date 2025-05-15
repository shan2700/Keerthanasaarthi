import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const SignupForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { signup, authState } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters');
      return;
    }

    try {
      await signup(name, email, password);
      if (!authState.error) {
        navigate('/profile');
      }
    } catch (error) {
      setErrorMessage('Failed to create an account');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 animate-fade-in">
      <h2 className="text-2xl font-serif font-medium text-charcoal-700 mb-6">Create an Account</h2>
      
      {errorMessage && (
        <div className="bg-burgundy-100 text-burgundy-700 px-4 py-3 rounded mb-4">
          {errorMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-charcoal-600 text-sm font-medium mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            placeholder="John Doe"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-charcoal-600 text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            placeholder="your@email.com"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="password" className="block text-charcoal-600 text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="••••••••"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-charcoal-600 text-sm font-medium mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input"
            placeholder="••••••••"
            required
          />
        </div>
        
        <div className="mb-6">
          <button
            type="submit"
            className="btn-primary w-full"
            disabled={authState.loading}
          >
            {authState.loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </div>
        
        <div className="text-center">
          <p className="text-charcoal-600">
            Already have an account?{' '}
            <Link to="/login" className="text-gold-600 hover:text-gold-700 font-medium">
              Log In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;