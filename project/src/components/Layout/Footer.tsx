import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal-800 text-white py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <Link to="/" className="block mb-4">
              <h2 className="text-3xl font-serif font-bold text-gold-400">Keerthana's Aarthi</h2>
            </Link>
            <p className="text-gray-300 mb-6">
              Experience the beauty of traditional South Indian plate decor. From weddings to religious ceremonies, we bring authenticity to every occasion.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-gold-400 transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-gold-400 transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="mailto:info@keerthanasaarthi.com" className="text-gray-300 hover:text-gold-400 transition-colors" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-xl font-serif mb-4 text-gold-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-gold-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/catalog" className="text-gray-300 hover:text-gold-400 transition-colors">Catalog</Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-300 hover:text-gold-400 transition-colors">How It Works</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-gold-400 transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Collections */}
          <div className="col-span-1">
            <h3 className="text-xl font-serif mb-4 text-gold-400">Collections</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/catalog?category=Traditional" className="text-gray-300 hover:text-gold-400 transition-colors">Traditional Collection</Link>
              </li>
              <li>
                <Link to="/catalog?category=Wedding" className="text-gray-300 hover:text-gold-400 transition-colors">Wedding Collection</Link>
              </li>
              <li>
                <Link to="/catalog?category=Festival" className="text-gray-300 hover:text-gold-400 transition-colors">Festival Designs</Link>
              </li>
              <li>
                <Link to="/catalog?category=Puja" className="text-gray-300 hover:text-gold-400 transition-colors">Puja Collections</Link>
              </li>
              <li>
                <Link to="/catalog?category=Contemporary" className="text-gray-300 hover:text-gold-400 transition-colors">Contemporary Fusion</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-xl font-serif mb-4 text-gold-400">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-gold-400 mr-2 mt-0.5" />
                <span className="text-gray-300">+91 9865018649</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-gold-400 mr-2 mt-0.5" />
                <span className="text-gray-300">info@keerthanasaarthi.com</span>
              </li>
              <li className="text-gray-300 mt-4">
                <p>No.7 Mahasakthi Nagar</p>
                <p>Nehru Nagar</p>
                <p>Ramanathapuram, Tamil Nadu 600017</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-6 border-t border-charcoal-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Keerthana's Aarthi. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/terms" className="text-gray-400 text-sm hover:text-gold-400 transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-gray-400 text-sm hover:text-gold-400 transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
