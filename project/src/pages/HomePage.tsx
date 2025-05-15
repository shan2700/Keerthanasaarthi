import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ClipboardCheck, Calendar, Package } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import { plateDecors } from '../data/plateDecors';

const HomePage: React.FC = () => {
  const featuredPlates = plateDecors.filter(plate => plate.available).slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/5379210/pexels-photo-5379210.jpeg"
            alt="Elegant table setting"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/70 to-charcoal-900/40"></div>
        </div>
        
        <div className="relative z-10 container-custom h-full flex flex-col justify-center">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-white text-5xl md:text-6xl font-serif font-bold mb-4">
              Exquisite Plate Décor for Special Occasions
            </h1>
            <p className="text-white/90 text-xl mb-8">
              Transform your events with our curated collection of elegant plate decorations that leave lasting impressions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/catalog" className="btn-primary">
                Explore Collection
              </Link>
              <Link to="/how-it-works" className="btn-outline !border-white !text-white hover:!bg-white/10">
                How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Plates Section */}
      <section className="py-16 bg-cream-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <h2 className="text-charcoal-800 font-serif">Featured Collections</h2>
            <Link to="/catalog" className="group flex items-center text-gold-600 hover:text-gold-700 mt-4 md:mt-0">
              View All Collections 
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPlates.map(plate => (
              <Link 
                key={plate.id}
                to={`/plate/${plate.id}`}
                className="card group hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative overflow-hidden h-72">
                  <img 
                    src={plate.imageUrl} 
                    alt={plate.name} 
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                    <Star className="w-4 h-4 text-gold-500 fill-gold-500 mr-1" />
                    <span className="text-sm font-medium">{plate.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-burgundy-600 font-medium uppercase mb-2">
                    {plate.category}
                  </div>
                  <h3 className="font-serif text-xl font-medium text-charcoal-800 mb-2">
                    {plate.name}
                  </h3>
                  <p className="text-charcoal-600 mb-4 line-clamp-2">
                    {plate.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold text-charcoal-800">
                      ${plate.price.toFixed(2)}
                    </span>
                    <button className="flex items-center text-gold-600 hover:text-gold-700 font-medium">
                      View Details 
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-charcoal-800 font-serif mb-4">How It Works</h2>
            <p className="text-charcoal-600 max-w-2xl mx-auto">
              Booking your perfect plate décor is simple and convenient. Follow these steps to elevate your next event.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-cream-50 transition-colors">
              <div className="bg-gold-100 p-4 rounded-full mb-4">
                <ClipboardCheck className="h-8 w-8 text-gold-600" />
              </div>
              <h3 className="font-serif text-xl font-medium text-charcoal-700 mb-2">
                1. Choose Your Design
              </h3>
              <p className="text-charcoal-600">
                Browse our extensive collection and select the perfect plate décor that matches your event's style and theme.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-cream-50 transition-colors">
              <div className="bg-gold-100 p-4 rounded-full mb-4">
                <Calendar className="h-8 w-8 text-gold-600" />
              </div>
              <h3 className="font-serif text-xl font-medium text-charcoal-700 mb-2">
                2. Book Your Date
              </h3>
              <p className="text-charcoal-600">
                Select your event date and time using our convenient booking calendar to secure your reservation.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-cream-50 transition-colors">
              <div className="bg-gold-100 p-4 rounded-full mb-4">
                <Package className="h-8 w-8 text-gold-600" />
              </div>
              <h3 className="font-serif text-xl font-medium text-charcoal-700 mb-2">
                3. Enjoy Your Event
              </h3>
              <p className="text-charcoal-600">
                We'll handle delivery, setup, and collection. Simply enjoy your beautifully decorated event without any worries.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link to="/how-it-works" className="btn-outline">
              Learn More About Our Process
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-charcoal-800 text-white">
        <div className="container-custom">
          <h2 className="text-center font-serif mb-12 text-gold-400">What Our Clients Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-charcoal-700 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-gold-500 fill-gold-500" />
                ))}
              </div>
              <p className="italic mb-4">
                "The plate décor from Elegante transformed our wedding reception into a sophisticated affair. The attention to detail was impeccable and our guests couldn't stop complimenting the beautiful table settings."
              </p>
              <div>
                <h4 className="font-serif font-medium">Sarah & Michael</h4>
                <p className="text-sm text-gray-400">Wedding, June 2024</p>
              </div>
            </div>
            
            <div className="bg-charcoal-700 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-gold-500 fill-gold-500" />
                ))}
              </div>
              <p className="italic mb-4">
                "As an event planner, I've worked with many vendors, but Elegante stands out for their exceptional quality and service. Their plate décor adds that perfect touch of elegance that elevates any event."
              </p>
              <div>
                <h4 className="font-serif font-medium">Jennifer Rodriguez</h4>
                <p className="text-sm text-gray-400">Professional Event Planner</p>
              </div>
            </div>
            
            <div className="bg-charcoal-700 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-gold-500 fill-gold-500" />
                ))}
              </div>
              <p className="italic mb-4">
                "The corporate gala we hosted was a tremendous success thanks to Elegante's sophisticated plate décor. The service was flawless and the design perfectly aligned with our company's brand image."
              </p>
              <div>
                <h4 className="font-serif font-medium">David Chen</h4>
                <p className="text-sm text-gray-400">Corporate Event, March 2024</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-burgundy-500 text-white">
        <div className="container-custom text-center">
          <h2 className="font-serif mb-4">Ready to Transform Your Next Event?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-white/90">
            Discover our exquisite plate décor collections and create unforgettable experiences for your guests.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/catalog" className="btn bg-white text-burgundy-600 hover:bg-cream-100">
              Browse Catalog
            </Link>
            <Link to="/contact" className="btn border-2 border-white bg-transparent hover:bg-white/10">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;