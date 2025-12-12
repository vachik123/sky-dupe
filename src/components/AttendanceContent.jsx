import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './AttendanceContent.css';

// --- Options for Select Components ---
const statusOptions = [
  { value: 'absent', label: 'Absent' },
  { value: 'present', label: 'Present' },
  { value: 'late', label: 'Late' },
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

const AttendanceContent = ({ onContentReady }) => {
  const student = { label: 'Alice' }; // Static student from prompt

  // Set date to November 10, 2025
  const [selectedDate, setSelectedDate] = useState('2025-11-10');
  const [selectedStatus, setSelectedStatus] = useState(statusOptions.find(o => o.value === 'absent'));

  useEffect(() => {
    // Content is ready immediately for this component
    if (onContentReady) {
      onContentReady();
    }
  }, [onContentReady]);

  return (
    <div className="attendance-content-grid">
      <div className="grid-label">
        <span>Student</span>
      </div>
      <div className="grid-input">
        <div className="student-name">{student.label}</div>
      </div>

      <div className="grid-label">
        <span>Date</span>
      </div>
      <div className="grid-input">
        <input 
          type="date"
          className="date-input-field"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <div className="grid-label">
        <span>Status</span>
      </div>
      <div className="grid-input">
        <Select styles={glassmorphismSelectStyles} options={statusOptions} value={selectedStatus} onChange={setSelectedStatus} />
      </div>
    </div>
  );
};

export default AttendanceContent;