import React from 'react';
import './DebugMenu.css';

function DebugMenu({ onSelectState }) {
  return (
    <div className="debug-menu-container">
      <button onClick={() => onSelectState('login')}>Login</button>
      <button onClick={() => onSelectState('attendance')}>Student Attendance</button>
      <button onClick={() => onSelectState('bookings')}>Room Bookings</button>
    </div>
  );
}

export default DebugMenu;
