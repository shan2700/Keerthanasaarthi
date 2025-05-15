import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Users, ArrowRight } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import BookingCalendar from '../components/BookingCalendar';
import TimeSlotSelector from '../components/TimeSlotSelector';
import { plateDecors } from '../data/plateDecors';
import { useAuth } from '../context/AuthContext';

const BookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { authState } = useAuth();
  
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [guestCount, setGuestCount] = useState<number>(10);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingStep, setBookingStep] = useState<number>(1);
  
  // Find the plate from the data
  const plate = plateDecors.find(p => p.id === id);

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

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setBookingError(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setBookingError(null);
  };

  const handleGuestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 1) {
      setGuestCount(value);
    }
  };

  const handleNextStep = () => {
    if (bookingStep === 1) {
      if (!selectedDate || !selectedTime) {
        setBookingError("Please select both date and time");
        return;
      }
      setBookingStep(2);
    } else if (bookingStep === 2) {
      if (!authState.isAuthenticated) {
        navigate('/login');
        return;
      }
      
      // Simulate booking creation (in a real app, this would be an API call)
      setTimeout(() => {
        navigate('/booking-confirmation', { 
          state: { 
            plateId: plate.id, 
            date: selectedDate, 
            time: selectedTime,
            guests: guestCount,
            totalPrice: calculateTotalPrice()
          } 
        });
      }, 1000);
    }
  };

  const calculateTotalPrice = () => {
    // Base price is the plate price
    let total = plate.price;
    
    // Add $5 per guest over 10
    if (guestCount > 10) {
      total += (guestCount - 10) * 5;
    }
    
    return total;
  };

  return (
    <Layout>
      <div className="bg-cream-50 py-16">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-medium text-charcoal-800 mb-2">
              Book {plate.name}
            </h1>
            <p className="text-charcoal-600">
              Complete your booking by selecting date, time and guest count.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Booking Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                {/* Steps Progress */}
                <div className="mb-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${bookingStep >= 1 ? 'bg-gold-500 text-white' : 'bg-cream-200 text-charcoal-500'}`}>
                        1
                      </div>
                      <div className="ml-2">
                        <p className={`font-medium ${bookingStep >= 1 ? 'text-charcoal-700' : 'text-charcoal-400'}`}>
                          Date & Time
                        </p>
                      </div>
                    </div>
                    
                    <div className={`flex-1 h-1 mx-4 ${bookingStep >= 2 ? 'bg-gold-500' : 'bg-cream-200'}`}></div>
                    
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${bookingStep >= 2 ? 'bg-gold-500 text-white' : 'bg-cream-200 text-charcoal-500'}`}>
                        2
                      </div>
                      <div className="ml-2">
                        <p className={`font-medium ${bookingStep >= 2 ? 'text-charcoal-700' : 'text-charcoal-400'}`}>
                          Details & Confirmation
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Step 1: Date and Time */}
                {bookingStep === 1 && (
                  <div className="animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center mb-4">
                          <Calendar className="h-5 w-5 text-gold-500 mr-2" />
                          <h3 className="font-serif text-xl font-medium text-charcoal-700">
                            Select Date
                          </h3>
                        </div>
                        <BookingCalendar 
                          onDateSelect={handleDateSelect}
                          selectedDate={selectedDate}
                        />
                      </div>
                      
                      <div>
                        <div className="flex items-center mb-4">
                          <Clock className="h-5 w-5 text-gold-500 mr-2" />
                          <h3 className="font-serif text-xl font-medium text-charcoal-700">
                            Select Time
                          </h3>
                        </div>
                        <TimeSlotSelector 
                          onTimeSelect={handleTimeSelect}
                          selectedTime={selectedTime}
                        />
                      </div>
                    </div>
                    
                    {bookingError && (
                      <div className="mt-6 bg-burgundy-100 text-burgundy-700 px-4 py-3 rounded">
                        {bookingError}
                      </div>
                    )}
                    
                    <div className="mt-8 flex justify-end">
                      <button 
                        onClick={handleNextStep}
                        className="btn-primary flex items-center"
                      >
                        Continue to Details
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Step 2: Details & Confirmation */}
                {bookingStep === 2 && (
                  <div className="animate-fade-in">
                    <div className="mb-6">
                      <div className="flex items-center mb-4">
                        <Users className="h-5 w-5 text-gold-500 mr-2" />
                        <h3 className="font-serif text-xl font-medium text-charcoal-700">
                          Guest Information
                        </h3>
                      </div>
                      
                      <div>
                        <label htmlFor="guests" className="block text-charcoal-600 text-sm font-medium mb-2">
                          Number of Guests
                        </label>
                        <div className="flex items-center">
                          <button 
                            onClick={() => guestCount > 1 && setGuestCount(guestCount - 1)}
                            className="px-3 py-1 bg-cream-100 text-charcoal-600 rounded-l-md"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            id="guests"
                            value={guestCount}
                            onChange={handleGuestChange}
                            min="1"
                            className="w-20 px-3 py-2 text-center border-y border-charcoal-200"
                          />
                          <button 
                            onClick={() => setGuestCount(guestCount + 1)}
                            className="px-3 py-1 bg-cream-100 text-charcoal-600 rounded-r-md"
                          >
                            +
                          </button>
                          <span className="ml-2 text-sm text-charcoal-500">
                            {guestCount > 10 ? `(+$${(guestCount - 10) * 5} for additional guests)` : ''}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-charcoal-500">
                          Base price includes up to 10 guests
                        </p>
                      </div>
                      
                      <div className="mt-6">
                        <label className="block text-charcoal-600 text-sm font-medium mb-2">
                          Special Requests (Optional)
                        </label>
                        <textarea
                          className="input h-24"
                          placeholder="Any special instructions or requests..."
                        ></textarea>
                      </div>
                    </div>
                    
                    <div className="bg-cream-50 rounded-lg p-4 mb-6">
                      <h4 className="font-medium text-charcoal-700 mb-3">
                        Booking Summary
                      </h4>
                      <div className="space-y-2 text-charcoal-600">
                        <div className="flex justify-between">
                          <span>Date:</span>
                          <span className="font-medium">{selectedDate?.toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Time:</span>
                          <span className="font-medium">{selectedTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Guests:</span>
                          <span className="font-medium">{guestCount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Base Price:</span>
                          <span className="font-medium">${plate.price.toFixed(2)}</span>
                        </div>
                        {guestCount > 10 && (
                          <div className="flex justify-between">
                            <span>Additional Guest Fee:</span>
                            <span className="font-medium">${((guestCount - 10) * 5).toFixed(2)}</span>
                          </div>
                        )}
                        <div className="border-t border-cream-200 pt-2 mt-2">
                          <div className="flex justify-between font-semibold text-charcoal-700">
                            <span>Total:</span>
                            <span>${calculateTotalPrice().toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <button 
                        onClick={() => setBookingStep(1)}
                        className="btn-outline"
                      >
                        Back
                      </button>
                      <button 
                        onClick={handleNextStep}
                        className="btn-primary"
                      >
                        {authState.isAuthenticated ? 'Confirm Booking' : 'Log In to Continue'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Sidebar with Plate Info */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
                <img 
                  src={plate.imageUrl} 
                  alt={plate.name} 
                  className="w-full h-48 object-cover object-center"
                />
                <div className="p-4">
                  <div className="text-sm text-burgundy-600 font-medium uppercase mb-1">
                    {plate.category}
                  </div>
                  <h3 className="font-serif text-xl font-medium text-charcoal-700 mb-2">
                    {plate.name}
                  </h3>
                  <div className="flex items-center mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(plate.rating) ? 'text-gold-500 fill-gold-500' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="ml-1 text-sm text-charcoal-600">
                      ({plate.reviews})
                    </span>
                  </div>
                  <p className="text-charcoal-600 text-sm mb-4 line-clamp-3">
                    {plate.description}
                  </p>
                  <div className="border-t border-cream-200 pt-3">
                    <p className="flex justify-between text-charcoal-700">
                      <span>Price:</span>
                      <span className="font-semibold">${plate.price.toFixed(2)}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingPage;