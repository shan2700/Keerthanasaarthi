import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import SignupForm from '../../components/AuthForms/SignupForm';

const SignupPage: React.FC = () => {
  return (
    <Layout>
      <div className="bg-cream-50 min-h-screen py-16">
        <div className="container-custom max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl font-medium text-charcoal-800 mb-2">
              Create Your Account
            </h1>
            <p className="text-charcoal-600">
              Join Elegante to start booking beautiful plate decorations
            </p>
          </div>
          
          <SignupForm />
          
          <div className="mt-6 text-center text-charcoal-500 text-sm">
            <p>By creating an account, you agree to our <Link to="/terms" className="text-gold-600 hover:text-gold-700">Terms of Service</Link> and <Link to="/privacy" className="text-gold-600 hover:text-gold-700">Privacy Policy</Link>.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignupPage;