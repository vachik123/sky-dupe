import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './BookingContent.css';
import { FiMapPin, FiClock, FiRepeat, FiEdit2 } from 'react-icons/fi';

// --- Options for Select Components ---
const roomOptions = [
  { value: 'B6', label: 'Room B6 (Capacity: 25)' },
  { value: 'C3', label: 'Room C3 (Capacity: 15)' },
  { value: 'A1', label: 'Auditorium A1 (Capacity: 150)' },
  { value: 'D2', label: 'Lab D2 (Capacity: 40)' },
  { value: 'E5', label: 'Seminar E5 (Capacity: 30)' },
];

const timeOptions = Array.from({ length: 20 }, (_, i) => {
    const hour = Math.floor(i / 2) + 8;
    const minute = (i % 2) * 30;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
    const time = `${displayHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
    return { value: time, label: time };
});

const cadenceOptions = [
  { value: 'once', label: 'Does not repeat' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];

// --- Glassmorphism Styles for react-select ---
const glassmorphismSelectStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: '38px',
    height: '38px',
    background: 'rgba(255, 255, 255, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '10px',
    boxShadow: 'none',
    '&:hover': { borderColor: 'rgba(255, 255, 255, 0.5)' }
  }),
  valueContainer: (provided) => ({ ...provided, height: '38px', padding: '0 8px' }),
  input: (provided) => ({ ...provided, margin: '0px' }),
  indicatorSeparator: () => ({ display: 'none' }),
  indicatorsContainer: (provided) => ({ ...provided, height: '38px' }),
  singleValue: (provided) => ({ ...provided, color: '#333', fontWeight: 500, fontSize: '0.9em'}),
  menu: (provided) => ({
    ...provided,
    background: 'transparent',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    border: 'none',
    borderRadius: '10px',
  }),
  menuList: (provided) => ({
    ...provided,
    background: 'rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(20px)',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  }),
  option: (provided, state) => ({
    ...provided,
    background: state.isFocused ? 'rgba(0, 122, 255, 0.2)' : 'transparent',
    color: '#333',
    borderRadius: '8px',
    margin: '4px',
    width: 'auto',
    fontSize: '0.9em'
  }),
};

const BookingContent = ({ onContentReady }) => {
  // --- Component State ---
  const [selectedRoom, setSelectedRoom] = useState(roomOptions.find(o => o.value === 'B6'));
  const [purpose, setPurpose] = useState('Math Club');
  const [selectedTime, setSelectedTime] = useState({ value: '3:30 PM', label: '3:30 PM' });
  const [selectedCadence, setSelectedCadence] = useState(cadenceOptions.find(o => o.value === 'weekly'));

  useEffect(() => {
    // Content is ready immediately for this component
    if (onContentReady) {
      onContentReady();
    }
  }, [onContentReady]);

  return (
    <div className="booking-content-grid">
      {/* --- Room --- */}
      <div className="grid-label">
        <FiMapPin className="label-icon" />
        <span>Room</span>
      </div>
      <div className="grid-input">
        <Select styles={glassmorphismSelectStyles} options={roomOptions} value={selectedRoom} onChange={setSelectedRoom} />
      </div>

      {/* --- Purpose --- */}
      <div className="grid-label">
        <FiEdit2 className="label-icon" />
        <span>Purpose</span>
      </div>
      <div className="grid-input">
        <input 
          type="text"
          className="purpose-input-field"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
        />
      </div>

      {/* --- Time --- */}
      <div className="grid-label">
        <FiClock className="label-icon" />
        <span>Time</span>
      </div>
      <div className="grid-input">
        <Select styles={glassmorphismSelectStyles} options={timeOptions} value={selectedTime} onChange={setSelectedTime} />
      </div>

      {/* --- Cadence --- */}
      <div className="grid-label">
        <FiRepeat className="label-icon" />
        <span>Cadence</span>
      </div>
      <div className="grid-input">
        <Select styles={glassmorphismSelectStyles} options={cadenceOptions} value={selectedCadence} onChange={setSelectedCadence} />
      </div>
    </div>
  );
};

export default BookingContent;