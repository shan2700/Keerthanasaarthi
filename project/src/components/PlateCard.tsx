import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag } from 'lucide-react';
import { PlateDecor } from '../types';
import { useCart } from '../context/CartContext';

interface PlateCardProps {
  plate: PlateDecor;
}

const PlateCard: React.FC<PlateCardProps> = ({ plate }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(plate);
  };

  return (
    <Link 
      to={`/plate/${plate.id}`} 
      className="card group hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative overflow-hidden">
        <img 
          src={plate.imageUrl} 
          alt={plate.name} 
          className="w-full h-60 object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        {!plate.available && (
          <div className="absolute top-0 right-0 bg-burgundy-500 text-white px-3 py-1 text-sm font-medium">
            Unavailable
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            className="btn-primary !py-2 !text-sm w-full"
            onClick={handleAddToCart}
            disabled={!plate.available}
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            {plate.available ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-burgundy-600 font-medium uppercase">{plate.category}</p>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
            <span className="ml-1 text-sm font-medium">{plate.rating}</span>
          </div>
        </div>
        <h3 className="font-serif text-lg font-medium text-charcoal-700 mb-1">{plate.name}</h3>
        <div className="flex justify-between items-center mt-3">
          <p className="text-lg font-semibold text-charcoal-800">${plate.price.toFixed(2)}</p>
          <div className="flex flex-wrap gap-1">
            {plate.occasion.slice(0, 2).map((occ, index) => (
              <span 
                key={index} 
                className="text-xs bg-cream-100 text-charcoal-600 px-2 py-1 rounded"
              >
                {occ}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlateCard;