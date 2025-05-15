import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Check, Calendar, Clock, Users, ArrowRight, Download, Share2 } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import { plateDecors } from '../data/plateDecors';

interface BookingDetails {
  plateId: string;
  date: Date;
  time: string;
  guests: number;
  totalPrice: number;
}

const BookingConfirmationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [bookingId, setBookingId] = useState<string>('');
  
  // Get booking details from location state
  const bookingDetails = location.state as BookingDetails;
  
  // Find the plate
  const plate = plateDecors.find(p => p.id === bookingDetails?.plateId);
  
  // Generate random booking ID on component mount
  useEffect(() => {
    if (!bookingDetails || !plate) {
      navigate('/catalog');
      return;
    }
    
    // Generate a random booking ID
    const generatedId = 'BK' + Math.floor(100000 + Math.random() * 900000);
    setBookingId(generatedId);
  }, [bookingDetails, plate, navigate]);
  
  if (!bookingDetails || !plate) {
    return null; // Will navigate away in useEffect
  }

  return (
    <Layout>
      <div className="bg-cream-50 py-16">
        <div className="container-custom max-w-4xl">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Header */}
            <div className="bg-green-100 px-6 py-5 flex items-center">
              <div className="bg-green-500 rounded-full p-2 mr-4">
                <Check className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-serif text-2xl font-medium text-charcoal-800">
                  Booking Confirmed!
                </h1>
                <p className="text-charcoal-600">
                  Your reservation has been successfully booked.
                </p>
              </div>
            </div>
            
            {/* Booking Details */}
            <div className="p-6">
              <div className="bg-cream-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-serif text-xl font-medium text-charcoal-700">
                    Booking Details
                  </h2>
                  <span className="text-charcoal-600">
                    Booking ID: <span className="font-medium">{bookingId}</span>
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-gold-500 mr-2 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-charcoal-700">Date</h3>
                      <p className="text-charcoal-600">
                        {bookingDetails.date.toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-gold-500 mr-2 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-charcoal-700">Time</h3>
                      <p className="text-charcoal-600">{bookingDetails.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Users className="h-5 w-5 text-gold-500 mr-2 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-charcoal-700">Guests</h3>
                      <p className="text-charcoal-600">{bookingDetails.guests} people</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Plate Details */}
              <div className="border border-cream-200 rounded-lg overflow-hidden mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-4">
                  <div className="sm:col-span-1">
                    <img 
                      src={plate.imageUrl} 
                      alt={plate.name} 
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="sm:col-span-3 p-4">
                    <h3 className="font-serif text-lg font-medium text-charcoal-700 mb-1">
                      {plate.name}
                    </h3>
                    <p className="text-sm text-burgundy-600 mb-2">
                      {plate.category} • {plate.style}
                    </p>
                    <p className="text-charcoal-600 text-sm mb-3">
                      {plate.description}
                    </p>
                    <div className="flex justify-between border-t border-cream-200 pt-3">
                      <span className="text-charcoal-600">Total Price:</span>
                      <span className="font-semibold text-charcoal-800">
                        ${bookingDetails.totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Important Information */}
              <div className="bg-cream-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-charcoal-700 mb-2">
                  Important Information:
                </h3>
                <ul className="text-charcoal-600 space-y-2">
                  <li className="flex items-start">
                    <span className="text-gold-500 mr-2">•</span>
                    A confirmation email has been sent to your registered email address.
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold-500 mr-2">•</span>
                    You can cancel or modify your booking up to 7 days before the event date.
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold-500 mr-2">•</span>
                    Our team will contact you 48 hours before the event to confirm details.
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold-500 mr-2">•</span>
                    For any questions or special requests, please contact our customer service.
                  </li>
                </ul>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/profile/bookings" className="btn-primary flex-1 flex items-center justify-center">
                  View All Bookings
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <button className="btn-outline flex-1 flex items-center justify-center">
                  <Download className="mr-2 h-5 w-5" />
                  Download Receipt
                </button>
                <button className="btn-outline flex-1 flex items-center justify-center">
                  <Share2 className="mr-2 h-5 w-5" />
                  Share Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingConfirmationPage;