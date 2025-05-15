import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login, authState } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!email || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    try {
      await login(email, password);
      if (!authState.error) {
        navigate('/profile');
      }
    } catch (error) {
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 animate-fade-in">
      <h2 className="text-2xl font-serif font-medium text-charcoal-700 mb-6">Log In</h2>
      
      {errorMessage && (
        <div className="bg-burgundy-100 text-burgundy-700 px-4 py-3 rounded mb-4">
          {errorMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
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
        
        <div className="mb-6">
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
          <div className="mt-1 text-right">
            <Link to="/forgot-password" className="text-sm text-gold-600 hover:text-gold-700">
              Forgot Password?
            </Link>
          </div>
        </div>
        
        <div className="mb-6">
          <button
            type="submit"
            className="btn-primary w-full"
            disabled={authState.loading}
          >
            {authState.loading ? 'Logging in...' : 'Log In'}
          </button>
        </div>
        
        <div className="text-center">
          <p className="text-charcoal-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-gold-600 hover:text-gold-700 font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;