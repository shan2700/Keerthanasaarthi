import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ShoppingBag, Truck, Check, Users, Phone, Shield, CreditCard } from 'lucide-react';
import Layout from '../components/Layout/Layout';

const HowItWorksPage: React.FC = () => {
  return (
    <Layout>
      {/* Header */}
      <section className="relative py-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg"
            alt="Elegant table setting"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-charcoal-900/60"></div>
        </div>
        
        <div className="relative z-10 container-custom text-center text-white">
          <h1 className="font-serif mb-4">How It Works</h1>
          <p className="text-white/90 text-xl max-w-2xl mx-auto">
            Discover how easy it is to transform your events with our elegant plate décor service.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-serif text-charcoal-800 mb-4">Our Simple Booking Process</h2>
            <p className="text-charcoal-600 max-w-3xl mx-auto">
              From selection to setup, we make the entire process seamless so you can focus on enjoying your event.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Step 1 */}
            <div className="relative pl-12 md:pl-0">
              <div className="flex md:flex-col items-start">
                <div className="absolute left-0 md:relative md:mb-6 bg-gold-100 rounded-full p-3">
                  <ShoppingBag className="h-6 w-6 text-gold-600" />
                </div>
                <div className="ml-6 md:ml-0">
                  <h3 className="font-serif text-xl font-medium text-charcoal-700 mb-2">
                    1. Browse & Select
                  </h3>
                  <p className="text-charcoal-600 mb-4">
                    Explore our extensive catalog of plate décor options. Filter by style, occasion, or price to find the perfect match for your event.
                  </p>
                  <Link to="/catalog" className="text-gold-600 hover:text-gold-700 font-medium">
                    View our catalog
                  </Link>
                </div>
              </div>
              <div className="hidden md:block absolute top-16 left-6 h-16 w-0.5 bg-gold-200"></div>
            </div>
            
            {/* Step 2 */}
            <div className="relative pl-12 md:pl-0">
              <div className="flex md:flex-col items-start">
                <div className="absolute left-0 md:relative md:mb-6 bg-gold-100 rounded-full p-3">
                  <Calendar className="h-6 w-6 text-gold-600" />
                </div>
                <div className="ml-6 md:ml-0">
                  <h3 className="font-serif text-xl font-medium text-charcoal-700 mb-2">
                    2. Book Your Date
                  </h3>
                  <p className="text-charcoal-600 mb-4">
                    Choose your event date using our interactive calendar. See real-time availability and secure your preferred time slot.
                  </p>
                  <Link to="/catalog" className="text-gold-600 hover:text-gold-700 font-medium">
                    Check availability
                  </Link>
                </div>
              </div>
              <div className="hidden md:block absolute top-16 left-6 h-16 w-0.5 bg-gold-200"></div>
            </div>
            
            {/* Step 3 */}
            <div className="relative pl-12 md:pl-0">
              <div className="flex md:flex-col items-start">
                <div className="absolute left-0 md:relative md:mb-6 bg-gold-100 rounded-full p-3">
                  <CreditCard className="h-6 w-6 text-gold-600" />
                </div>
                <div className="ml-6 md:ml-0">
                  <h3 className="font-serif text-xl font-medium text-charcoal-700 mb-2">
                    3. Confirm & Pay
                  </h3>
                  <p className="text-charcoal-600 mb-4">
                    Review your booking details, make any necessary adjustments, and complete your payment securely. You'll receive an instant confirmation.
                  </p>
                </div>
              </div>
              <div className="hidden md:block absolute top-16 left-6 h-16 w-0.5 bg-gold-200"></div>
            </div>
            
            {/* Step 4 */}
            <div className="relative pl-12 md:pl-0">
              <div className="flex md:flex-col items-start">
                <div className="absolute left-0 md:relative md:mb-6 bg-gold-100 rounded-full p-3">
                  <Truck className="h-6 w-6 text-gold-600" />
                </div>
                <div className="ml-6 md:ml-0">
                  <h3 className="font-serif text-xl font-medium text-charcoal-700 mb-2">
                    4. Delivery & Setup
                  </h3>
                  <p className="text-charcoal-600 mb-4">
                    Our professional team will handle everything from delivery to setup at your venue. We ensure every detail is perfect before your event begins.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-cream-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-serif text-charcoal-800 mb-4">Why Choose Elegante</h2>
            <p className="text-charcoal-600 max-w-3xl mx-auto">
              We're committed to making your events memorable with exceptional service and attention to detail.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="bg-gold-100 rounded-full p-3 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <Check className="h-6 w-6 text-gold-600" />
              </div>
              <h3 className="font-serif text-lg font-medium text-charcoal-700 mb-2">
                Premium Quality
              </h3>
              <p className="text-charcoal-600">
                All our plate décor collections feature high-quality materials and exquisite craftsmanship.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="bg-gold-100 rounded-full p-3 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-gold-600" />
              </div>
              <h3 className="font-serif text-lg font-medium text-charcoal-700 mb-2">
                Expert Service
              </h3>
              <p className="text-charcoal-600">
                Our experienced team provides personalized assistance throughout the entire process.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="bg-gold-100 rounded-full p-3 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-gold-600" />
              </div>
              <h3 className="font-serif text-lg font-medium text-charcoal-700 mb-2">
                Satisfaction Guarantee
              </h3>
              <p className="text-charcoal-600">
                We're committed to your complete satisfaction with our 100% guarantee policy.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="bg-gold-100 rounded-full p-3 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-gold-600" />
              </div>
              <h3 className="font-serif text-lg font-medium text-charcoal-700 mb-2">
                24/7 Support
              </h3>
              <p className="text-charcoal-600">
                Our dedicated customer service team is available around the clock to assist you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-serif text-charcoal-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-charcoal-600">
              Find answers to common questions about our plate décor booking service.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-cream-50 rounded-lg p-6">
              <h3 className="font-serif text-lg font-medium text-charcoal-700 mb-2">
                How far in advance should I book?
              </h3>
              <p className="text-charcoal-600">
                We recommend booking at least 4-6 weeks in advance for standard events, and 2-3 months for large events or during peak season (May-September). However, we do accommodate last-minute bookings based on availability.
              </p>
            </div>
            
            <div className="bg-cream-50 rounded-lg p-6">
              <h3 className="font-serif text-lg font-medium text-charcoal-700 mb-2">
                What is your cancellation policy?
              </h3>
              <p className="text-charcoal-600">
                Cancellations made 7 or more days before your event receive a full refund. Cancellations within 3-6 days receive a 50% refund. Cancellations less than 3 days before the event are non-refundable. You can reschedule once at no additional cost if done 7+ days before the event.
              </p>
            </div>
            
            <div className="bg-cream-50 rounded-lg p-6">
              <h3 className="font-serif text-lg font-medium text-charcoal-700 mb-2">
                Does the price include delivery and setup?
              </h3>
              <p className="text-charcoal-600">
                Yes, all our prices include standard delivery, setup before your event, and collection afterward. For locations more than 30 miles from our center, a small additional fee may apply which will be clearly shown before you complete your booking.
              </p>
            </div>
            
            <div className="bg-cream-50 rounded-lg p-6">
              <h3 className="font-serif text-lg font-medium text-charcoal-700 mb-2">
                Can I customize my plate décor selection?
              </h3>
              <p className="text-charcoal-600">
                Absolutely! While we offer curated collections, we're happy to work with you to customize your plate décor to match your event's theme and color scheme. Contact us for custom requests or modifications to existing collections.
              </p>
            </div>
            
            <div className="bg-cream-50 rounded-lg p-6">
              <h3 className="font-serif text-lg font-medium text-charcoal-700 mb-2">
                What happens if something gets damaged?
              </h3>
              <p className="text-charcoal-600">
                We understand accidents happen. Minor wear is covered under our normal service. For significant damage, we have a fair replacement policy. We'll discuss these details when you book to ensure complete transparency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-burgundy-500 text-white">
        <div className="container-custom text-center">
          <h2 className="font-serif mb-4">Ready to Elevate Your Next Event?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-white/90">
            Experience the difference that professional plate décor can make. Browse our collections and book your date today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/catalog" className="btn bg-white text-burgundy-600 hover:bg-cream-100">
              View Our Catalog
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

export default HowItWorksPage;