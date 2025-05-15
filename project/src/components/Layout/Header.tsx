import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { authState } = useAuth();
  const { cartState } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className={`text-2xl sm:text-3xl font-serif font-bold ${isScrolled ? 'text-gold-600' : 'text-gold-500'}`}>
            Keerthana's Aarthi
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`font-medium ${isScrolled ? 'text-charcoal-600' : 'text-charcoal-700'} hover:text-gold-500 transition-colors`}
          >
            Home
          </Link>
          <Link 
            to="/catalog" 
            className={`font-medium ${isScrolled ? 'text-charcoal-600' : 'text-charcoal-700'} hover:text-gold-500 transition-colors`}
          >
            Catalog
          </Link>
          <Link 
            to="/how-it-works" 
            className={`font-medium ${isScrolled ? 'text-charcoal-600' : 'text-charcoal-700'} hover:text-gold-500 transition-colors`}
          >
            How It Works
          </Link>
          <Link 
            to="/contact" 
            className={`font-medium ${isScrolled ? 'text-charcoal-600' : 'text-charcoal-700'} hover:text-gold-500 transition-colors`}
          >
            Contact
          </Link>
        </nav>

        {/* User Controls */}
        <div className="hidden md:flex items-center space-x-4">
          <Link 
            to="/cart" 
            className="relative p-2 hover:bg-cream-100 rounded-full transition-colors"
          >
            <ShoppingBag 
              className={`h-6 w-6 ${isScrolled ? 'text-charcoal-600' : 'text-charcoal-700'}`} 
            />
            {cartState.items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-burgundy-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartState.items.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </Link>
          
          {authState.isAuthenticated ? (
            <Link 
              to="/profile" 
              className="p-2 hover:bg-cream-100 rounded-full transition-colors"
            >
              <User 
                className={`h-6 w-6 ${isScrolled ? 'text-charcoal-600' : 'text-charcoal-700'}`} 
              />
            </Link>
          ) : (
            <Link 
              to="/login" 
              className="btn-outline !py-2 !text-sm"
            >
              Login / Sign Up
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-charcoal-700" />
          ) : (
            <Menu className="h-6 w-6 text-charcoal-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white animate-fade-in">
          <div className="container-custom py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="py-2 font-medium text-charcoal-600 hover:text-gold-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/catalog" 
              className="py-2 font-medium text-charcoal-600 hover:text-gold-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Catalog
            </Link>
            <Link 
              to="/how-it-works" 
              className="py-2 font-medium text-charcoal-600 hover:text-gold-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link 
              to="/contact" 
              className="py-2 font-medium text-charcoal-600 hover:text-gold-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            
            <div className="pt-2 border-t border-gray-200 flex items-center justify-between">
              <Link 
                to="/cart" 
                className="flex items-center space-x-2 text-charcoal-600 hover:text-gold-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Cart ({cartState.items.reduce((total, item) => total + item.quantity, 0)})</span>
              </Link>
              
              {authState.isAuthenticated ? (
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-2 text-charcoal-600 hover:text-gold-500 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
              ) : (
                <Link 
                  to="/login" 
                  className="btn-outline !py-2 !text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login / Sign Up
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;