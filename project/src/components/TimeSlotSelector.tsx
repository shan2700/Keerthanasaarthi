import React from 'react';

interface TimeSlotSelectorProps {
  onTimeSelect: (time: string) => void;
  selectedTime: string | null;
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({ onTimeSelect, selectedTime }) => {
  // Mock time slots (in a real app, these would come from the API)
  const morningSlots = ['9:00 AM', '10:00 AM', '11:00 AM'];
  const afternoonSlots = ['12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];
  const eveningSlots = ['5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];

  // Mock unavailable slots (in a real app, these would come from the API)
  const unavailableSlots = ['10:00 AM', '1:00 PM', '6:00 PM'];

  const isTimeUnavailable = (time: string) => {
    return unavailableSlots.includes(time);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="font-serif text-xl font-medium text-charcoal-700 mb-4">
        Select a Time
      </h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-charcoal-600 font-medium mb-2">Morning</h4>
          <div className="grid grid-cols-3 gap-2">
            {morningSlots.map(time => (
              <button
                key={time}
                className={`
                  py-2 px-3 text-sm rounded-md transition-colors
                  ${isTimeUnavailable(time) 
                    ? 'bg-gray-100 text-charcoal-400 cursor-not-allowed' 
                    : selectedTime === time
                      ? 'bg-gold-500 text-white'
                      : 'bg-cream-100 text-charcoal-700 hover:bg-cream-200'
                  }
                `}
                onClick={() => !isTimeUnavailable(time) && onTimeSelect(time)}
                disabled={isTimeUnavailable(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-charcoal-600 font-medium mb-2">Afternoon</h4>
          <div className="grid grid-cols-3 gap-2">
            {afternoonSlots.map(time => (
              <button
                key={time}
                className={`
                  py-2 px-3 text-sm rounded-md transition-colors
                  ${isTimeUnavailable(time) 
                    ? 'bg-gray-100 text-charcoal-400 cursor-not-allowed' 
                    : selectedTime === time
                      ? 'bg-gold-500 text-white'
                      : 'bg-cream-100 text-charcoal-700 hover:bg-cream-200'
                  }
                `}
                onClick={() => !isTimeUnavailable(time) && onTimeSelect(time)}
                disabled={isTimeUnavailable(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-charcoal-600 font-medium mb-2">Evening</h4>
          <div className="grid grid-cols-3 gap-2">
            {eveningSlots.map(time => (
              <button
                key={time}
                className={`
                  py-2 px-3 text-sm rounded-md transition-colors
                  ${isTimeUnavailable(time) 
                    ? 'bg-gray-100 text-charcoal-400 cursor-not-allowed' 
                    : selectedTime === time
                      ? 'bg-gold-500 text-white'
                      : 'bg-cream-100 text-charcoal-700 hover:bg-cream-200'
                  }
                `}
                onClick={() => !isTimeUnavailable(time) && onTimeSelect(time)}
                disabled={isTimeUnavailable(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSlotSelector;