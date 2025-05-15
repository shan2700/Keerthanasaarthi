import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingBag, Heart, ArrowLeft, Share2, Check } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import { plateDecors } from '../data/plateDecors';
import { useCart } from '../context/CartContext';
import PlateCard from '../components/PlateCard';

const PlateDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  // Find the plate from the data
  const plate = plateDecors.find(p => p.id === id);

  // Similar plates (in a real app, this would be based on more sophisticated matching)
  const similarPlates = plateDecors
    .filter(p => p.id !== id && (p.category === plate?.category || p.style === plate?.style))
    .slice(0, 3);

  if (!plate) {
    return (
      <Layout>
        <div className="container-custom py-20 text-center">
          <h2 className="text-3xl font-serif font-medium text-charcoal-700 mb-4">
            Plate Not Found
          </h2>
          <p className="text-charcoal-600 mb-6">
            The plate decor you are looking for does not exist or has been removed.
          </p>
          <button 
            onClick={() => navigate('/catalog')}
            className="btn-primary"
          >
            Browse Catalog
          </button>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    addToCart(plate);
    setShowAddedMessage(true);
    
    // Hide the message after 3 seconds
    setTimeout(() => {
      setShowAddedMessage(false);
    }, 3000);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleShareClick = () => {
    setShowShareOptions(!showShareOptions);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-cream-50 py-4">
        <div className="container-custom">
          <button 
            onClick={handleGoBack}
            className="flex items-center text-charcoal-600 hover:text-charcoal-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Catalog
          </button>
        </div>
      </div>

      {/* Main Product Content */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <div className="bg-cream-50 rounded-lg overflow-hidden mb-4 aspect-square">
                <img 
                  src={plate.imageUrl} 
                  alt={plate.name} 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {/* This would be additional images in a real app */}
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="aspect-square bg-cream-100 rounded cursor-pointer hover:opacity-80 transition-opacity">
                    <img 
                      src={plate.imageUrl} 
                      alt={`${plate.name} view ${i}`} 
                      className="w-full h-full object-cover object-center rounded"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="bg-cream-100 text-charcoal-700 px-3 py-1 rounded-full text-sm">
                  {plate.category}
                </span>
                <span className="bg-cream-100 text-charcoal-700 px-3 py-1 rounded-full text-sm">
                  {plate.style}
                </span>
              </div>

              <h1 className="font-serif text-3xl lg:text-4xl font-medium text-charcoal-800 mb-2">
                {plate.name}
              </h1>

              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < Math.floor(plate.rating) ? 'text-gold-500 fill-gold-500' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="ml-2 text-charcoal-600">
                  {plate.rating} ({plate.reviews} reviews)
                </span>
              </div>

              <p className="text-2xl font-semibold text-charcoal-800 mb-6">
                ${plate.price.toFixed(2)}
              </p>

              <div className="mb-6 pb-6 border-b border-cream-200">
                <p className="text-charcoal-600 leading-relaxed">
                  {plate.description}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="font-medium text-charcoal-700 mb-2">Perfect For:</h3>
                <div className="flex flex-wrap gap-2">
                  {plate.occasion.map((occ, index) => (
                    <span 
                      key={index} 
                      className="bg-cream-100 text-charcoal-700 px-3 py-1 rounded-full text-sm"
                    >
                      {occ}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center">
                  <div className={`h-3 w-3 rounded-full mr-2 ${plate.available ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className={`${plate.available ? 'text-green-600' : 'text-red-600'} font-medium`}>
                    {plate.available ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button
                  onClick={handleAddToCart}
                  disabled={!plate.available}
                  className={`btn-primary flex-1 flex items-center justify-center ${!plate.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  {plate.available ? 'Add to Cart' : 'Out of Stock'}
                </button>
                
                <button
                  onClick={toggleWishlist}
                  className={`btn-outline flex items-center justify-center ${isWishlisted ? 'bg-burgundy-50 border-burgundy-500 text-burgundy-600' : ''}`}
                >
                  <Heart className={`h-5 w-5 mr-2 ${isWishlisted ? 'fill-burgundy-500 text-burgundy-500' : ''}`} />
                  {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                </button>
                
                <button
                  onClick={handleShareClick}
                  className="btn-outline !px-4 flex items-center justify-center relative"
                >
                  <Share2 className="h-5 w-5" />
                  
                  {showShareOptions && (
                    <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg p-3 z-10 w-48 animate-scale-in">
                      <div className="flex flex-col space-y-2">
                        <button className="text-left px-3 py-2 hover:bg-cream-100 rounded text-charcoal-700 flex items-center">
                          <span className="mr-2">📱</span> Text
                        </button>
                        <button className="text-left px-3 py-2 hover:bg-cream-100 rounded text-charcoal-700 flex items-center">
                          <span className="mr-2">📧</span> Email
                        </button>
                        <button className="text-left px-3 py-2 hover:bg-cream-100 rounded text-charcoal-700 flex items-center">
                          <span className="mr-2">📋</span> Copy Link
                        </button>
                      </div>
                    </div>
                  )}
                </button>
              </div>
              
              {/* Added to Cart Message */}
              {showAddedMessage && (
                <div className="bg-green-100 text-green-700 px-4 py-3 rounded flex items-center mb-6 animate-fade-in">
                  <Check className="h-5 w-5 mr-2" />
                  Added to cart successfully!
                </div>
              )}

              <div className="bg-cream-50 rounded-lg p-4">
                <h3 className="font-medium text-charcoal-700 mb-2">Booking Information:</h3>
                <ul className="text-charcoal-600 space-y-2">
                  <li className="flex items-start">
                    <span className="text-gold-500 mr-2">•</span>
                    Minimum booking period: 3 days
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold-500 mr-2">•</span>
                    Free delivery and setup for orders over $500
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold-500 mr-2">•</span>
                    Cancellation allowed up to 7 days before event
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Products */}
      <section className="py-12 bg-cream-50">
        <div className="container-custom">
          <h2 className="font-serif text-2xl font-medium text-charcoal-800 mb-8">
            You May Also Like
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarPlates.map(plate => (
              <PlateCard key={plate.id} plate={plate} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PlateDetailPage;