import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import LoginForm from '../../components/AuthForms/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <Layout>
      <div className="bg-cream-50 min-h-screen py-16">
        <div className="container-custom max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl font-medium text-charcoal-800 mb-2">
              Welcome Back
            </h1>
            <p className="text-charcoal-600">
              Sign in to access your account and manage your bookings
            </p>
          </div>
          
          <LoginForm />
          
          <div className="mt-6 text-center text-charcoal-500 text-sm">
            <p>By logging in, you agree to our <Link to="/terms" className="text-gold-600 hover:text-gold-700">Terms of Service</Link> and <Link to="/privacy" className="text-gold-600 hover:text-gold-700">Privacy Policy</Link>.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;