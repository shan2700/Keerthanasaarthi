import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BookingCalendarProps {
  onDateSelect: (date: Date) => void;
  selectedDate: Date | null;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ onDateSelect, selectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Mock unavailable dates (in a real app, these would come from the API)
  const unavailableDates = [
    new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 5),
    new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 10),
    new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 15),
    new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 25),
  ];

  const isDateUnavailable = (date: Date) => {
    return unavailableDates.some(unavailableDate => 
      unavailableDate.getDate() === date.getDate() &&
      unavailableDate.getMonth() === date.getMonth() &&
      unavailableDate.getFullYear() === date.getFullYear()
    );
  };

  const isDateSelected = (date: Date) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === date.getDate() &&
      selectedDate.getMonth() === date.getMonth() &&
      selectedDate.getFullYear() === date.getFullYear()
    );
  };

  const handleDateClick = (date: Date) => {
    if (isDateUnavailable(date) || date < new Date()) return;
    onDateSelect(date);
  };

  const getMonthDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Array to store all days that will be displayed in the calendar
    const days = [];
    
    // Add days from previous month to fill the first week
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek; i > 0; i--) {
      const day = new Date(year, month, 1 - i);
      days.push({
        date: day,
        isCurrentMonth: false,
        isPast: day < new Date(),
      });
    }
    
    // Add all days of the current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const day = new Date(year, month, i);
      days.push({
        date: day,
        isCurrentMonth: true,
        isPast: day < new Date(),
      });
    }
    
    // Add days from next month to fill the last week
    const lastDayOfWeek = lastDay.getDay();
    for (let i = 1; i < 7 - lastDayOfWeek; i++) {
      const day = new Date(year, month + 1, i);
      days.push({
        date: day,
        isCurrentMonth: false,
        isPast: false,
      });
    }
    
    return days;
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const days = getMonthDays();

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={prevMonth} 
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-5 w-5 text-charcoal-600" />
        </button>
        <h3 className="font-serif text-xl font-medium text-charcoal-700">
          {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
        </h3>
        <button 
          onClick={nextMonth} 
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="h-5 w-5 text-charcoal-600" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekdays.map(day => (
          <div key={day} className="text-center text-charcoal-500 font-medium text-sm">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const isUnavailable = isDateUnavailable(day.date) || day.isPast;
          const isSelected = isDateSelected(day.date);
          
          return (
            <div 
              key={index} 
              className={`h-10 flex items-center justify-center text-sm
                ${day.isCurrentMonth ? '' : 'text-charcoal-300'}
                ${isUnavailable ? 'text-charcoal-300' : 'cursor-pointer hover:bg-cream-100'}
                ${isSelected ? 'bg-gold-500 text-white font-medium' : ''}
                rounded-full transition-colors
              `}
              onClick={() => day.isCurrentMonth && !isUnavailable && handleDateClick(day.date)}
            >
              {day.date.getDate()}
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 flex items-center space-x-4 text-sm text-charcoal-600">
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-gold-500 mr-2"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-charcoal-300 mr-2"></div>
          <span>Unavailable</span>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;