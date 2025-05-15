import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Pages
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import PlateDetailPage from './pages/PlateDetailPage';
import BookingPage from './pages/BookingPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';
import LoginPage from './pages/AuthPages/LoginPage';
import SignupPage from './pages/AuthPages/SignupPage';
import HowItWorksPage from './pages/HowItWorksPage';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/plate/:id" element={<PlateDetailPage />} />
            <Route path="/booking/:id" element={<BookingPage />} />
            <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;