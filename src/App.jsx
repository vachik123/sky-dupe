import React, { useState } from 'react';
import './App.css';
import { FiPaperclip, FiSettings, FiEdit, FiWind, FiChevronDown } from 'react-icons/fi';
import NewCard from './NewCard';
import BookingContent from './components/BookingContent';
import AttendanceContent from './components/AttendanceContent';
import CalendarContent from './components/CalendarContent';

const componentsMap = {
  booking: BookingContent,
  attendance: AttendanceContent,
  calendar: CalendarContent,
};

function App() {
  const [inputValue, setInputValue] = useState('');
  const [isNewCardVisible, setIsNewCardVisible] = useState(false);
  const [promptText, setPromptText] = useState('');
  const [cardContentType, setCardContentType] = useState(null);
  const [cardTitle, setCardTitle] = useState(''); // Re-added state for title

  const showCard = (text, contentType, title) => {
    setPromptText(text);
    setCardContentType(contentType);
    setCardTitle(title);
    setIsNewCardVisible(true);
  };

  const hideCard = () => {
    setIsNewCardVisible(false);
    setPromptText('');
    setCardContentType(null);
    setCardTitle('');
  };

  const handleSuggestionClick = (type, text, title) => {
    showCard(text, type, title);
  };

  return (
    <div className="App">
        <div className={`top-content-container ${isNewCardVisible ? 'card-active' : ''}`}>
            <div className="glass-window-background"></div>
            <div className="glass-window">
                <div className="main-content">
                <div className="messages-window">
                    <img src="https://picsum.photos/id/10/250/150" alt="Messages window" />
                </div>
                <div className="ack-details">
                    <div className="messages-icon">
                    <img src="https://picsum.photos/id/1/50/50" alt="Messages icon" />
                    </div>
                    <h2>A.C.K.</h2>
                    <p>Messages Window</p>
                    <p>Skyshot</p>
                </div>
                </div>
            </div>
            <NewCard 
                isVisible={isNewCardVisible}
                onClose={hideCard}
                promptText={promptText}
                title={cardTitle} // Pass title prop
                contentType={cardContentType}
                componentsMap={componentsMap}
            />
        </div>
        <div className="glass-window-2">
        <div className="header">
          <div className="sky-input-container">
            <FiWind style={{ color: 'white', marginRight: '10px' }} />
            <input
              type="text"
              className="sky-input"
              placeholder="SKY"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <div className={`actions ${inputValue !== '' ? 'hidden' : ''}`}>
                <button><FiPaperclip style={{ marginRight: '5px' }} /> Attach <FiChevronDown style={{ marginLeft: '5px' }} /></button>
                <button><FiSettings style={{ marginRight: '5px' }} /> Settings</button>
                <button><FiEdit style={{ marginRight: '5px' }} /> New Chat</button>
            </div>
          </div>
        </div>
        <div className="suggestions">
           <p onClick={(e) => handleSuggestionClick('booking', e.target.innerText, 'Book a Room')}>
            Please book Room B6 this afternoon at 330pm for math club.
          </p>
          <p onClick={(e) => handleSuggestionClick('attendance', e.target.innerText, 'Mark Attendance')}>
            Mark Alice as an excused absence for tomorrow... (see attached)
          </p>
          <p onClick={(e) => handleSuggestionClick('calendar', e.target.innerText, 'My Calendar')}>What's on my calendar tonight?</p>
        </div>
      </div>
    </div>
  );
}

export default App;
