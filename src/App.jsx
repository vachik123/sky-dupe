import React, { useState, useEffect } from 'react';
import './App.css';
import { FiPaperclip, FiSettings, FiEdit, FiWind, FiChevronDown } from 'react-icons/fi';
import NewCard from './NewCard';
import BookingContent from './components/BookingContent';
import AttendanceContent from './components/AttendanceContent';
import CalendarContent from './components/CalendarContent';
import StaffBookingContent from './components/StaffBookingContent';

const componentsMap = {
  booking: BookingContent,
  attendance: AttendanceContent,
  calendar: CalendarContent,
  staffBooking: StaffBookingContent,
};

function App() {
  const [inputValue, setInputValue] = useState('');
  const [isNewCardVisible, setIsNewCardVisible] = useState(false);
  const [promptText, setPromptText] = useState('');
  const [cardContentType, setCardContentType] = useState(null);
  const [cardTitle, setCardTitle] = useState('');
  const [cardCompletionMessage, setCardCompletionMessage] = useState('');

  // Typewriter effect state
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [isTitleComplete, setIsTitleComplete] = useState(false);
  const [displayedSuggestions, setDisplayedSuggestions] = useState(['', '', '']);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const titleText = "Internal Memo on Staff Trainings";

  const suggestions = [
    {
      text: "Draft an email to 4th and 5th-grade lead teachers to schedule a meeting about their alternative PD session for December 12.",
      type: 'staffBooking',
      title: 'Book Staff',
      completionMessage: "I've drafted the email and scheduled the meeting for December 12."
    },
    {
      text: "Contact Springfield High School to confirm the venue booking for the 'Project-Based Learning Showcase' on March 13, 2026.",
      type: 'staffBooking',
      title: 'Book Staff',
      completionMessage: "I've confirmed the venue booking at Springfield High School for March 13, 2026."
    },
    {
      text: "Find and book a Professional Development session on December 12 for 3rd grade teachers on leveraging ChatGPT in education",
      type: 'staffBooking',
      title: 'Book Staff',
      completionMessage: "I've booked the Professional Development session for December 12."
    }
  ];

  useEffect(() => {
    let titleCharIndex = 0;
    let titleInterval;

    // Type the title first
    const typeTitleCharacter = () => {
      if (titleCharIndex < titleText.length) {
        setDisplayedTitle(titleText.substring(0, titleCharIndex + 1));
        titleCharIndex++;
      } else {
        clearInterval(titleInterval);
        setIsTitleComplete(true);
      }
    };

    // Start typing title after a brief delay
    const titleStartDelay = setTimeout(() => {
      titleInterval = setInterval(typeTitleCharacter, 1); // Title typing speed
    }, 2000);

    return () => {
      clearTimeout(titleStartDelay);
      clearInterval(titleInterval);
    };
  }, []);

  useEffect(() => {
    if (!isTitleComplete) return; // Wait for title to complete

    let currentSuggestionIndex = 0;
    let currentCharIndex = 0;
    let typingInterval;

    const typeNextCharacter = () => {
      if (currentSuggestionIndex >= suggestions.length) {
        setIsTypingComplete(true);
        clearInterval(typingInterval);
        return;
      }

      const currentSuggestion = suggestions[currentSuggestionIndex];
      
      if (currentCharIndex < currentSuggestion.text.length) {
        // Type next character
        setDisplayedSuggestions(prev => {
          const newSuggestions = [...prev];
          newSuggestions[currentSuggestionIndex] = currentSuggestion.text.substring(0, currentCharIndex + 1);
          return newSuggestions;
        });
        currentCharIndex++;
      } else {
        // Move to next suggestion
        currentSuggestionIndex++;
        currentCharIndex = 0;
        clearInterval(typingInterval);
        setTimeout(() => {
          typingInterval = setInterval(typeNextCharacter, 1); // typing speed
        }, 0); // pause between suggestions
        return;
      }
    };

    // Start typing after a brief delay
    const startDelay = setTimeout(() => {
      typingInterval = setInterval(typeNextCharacter, 1); // typing speed
    }, 300); // delay after title completes

    return () => {
      clearTimeout(startDelay);
      clearInterval(typingInterval);
    };
  }, [isTitleComplete]);

  const showCard = (text, contentType, title, completionMessage) => {
    setPromptText(text);
    setCardContentType(contentType);
    setCardTitle(title);
    setCardCompletionMessage(completionMessage);
    setIsNewCardVisible(true);
  };

  const hideCard = () => {
    setIsNewCardVisible(false);
    setPromptText('');
    setCardContentType(null);
    setCardTitle('');
    setCardCompletionMessage('');
  };

  const handleSuggestionClick = (suggestion) => {
    if (isTypingComplete) {
      showCard(suggestion.text, suggestion.type, suggestion.title, suggestion.completionMessage);
    }
  };

  const determineContentType = (text) => {
    const lowerText = text.toLowerCase();
    
    // Check for booking keywords
    if (lowerText.includes('book') && lowerText.includes('room')) {
      return {
        type: 'booking',
        title: 'Book a Room',
        completionMessage: "I've booked the room for you."
      };
    }
    
    // Check for attendance keywords
    if (lowerText.includes('mark') && (lowerText.includes('attendance') || lowerText.includes('absent') || lowerText.includes('present'))) {
      return {
        type: 'attendance',
        title: 'Mark Attendance',
        completionMessage: "I've updated the attendance."
      };
    }
    
    // Check for staff booking/PD keywords
    if (lowerText.includes('professional development') || 
        lowerText.includes('pd session') || 
        lowerText.includes('staff training') ||
        lowerText.includes('book') && lowerText.includes('session')) {
      return {
        type: 'staffBooking',
        title: 'Book Staff',
        completionMessage: "I've booked the Professional Development session."
      };
    }
    
    // Check for email/scheduling keywords
    if (lowerText.includes('draft') && lowerText.includes('email')) {
      return {
        type: 'staffBooking',
        title: 'Book Staff',
        completionMessage: "I've drafted the email and scheduled the meeting."
      };
    }
    
    // Check for venue booking
    if (lowerText.includes('confirm') && lowerText.includes('venue')) {
      return {
        type: 'staffBooking',
        title: 'Book Staff',
        completionMessage: "I've confirmed the venue booking."
      };
    }
    
    // Default to booking if no match
    return {
      type: 'booking',
      title: 'Task',
      completionMessage: "I've completed the task."
    };
  };

  const handleInputSubmit = () => {
    if (inputValue.trim()) {
      const { type, title, completionMessage } = determineContentType(inputValue);
      showCard(inputValue, type, title, completionMessage);
      setInputValue(''); // Clear the input field
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleInputSubmit();
    }
  };

  return (
    <div className="App">
        <div className={`top-content-container ${isNewCardVisible ? 'card-active' : ''}`}>
            <div className="glass-window-background"></div>
            <div className="glass-window">
                <div className="main-content">
                <div className="messages-window">
                <img src="preview.png" alt="Messages window" />
                </div>
                <div className="ack-details">
                    <div className="messages-icon">
                    <img src="preview-icon.png" alt="Messages icon" />
                    </div>
                    <h2>
                      {displayedTitle || <span className="skeleton-title"></span>}
                    </h2>
                    <p>Preview Window</p>
                    <p>Screenshot</p>
                </div>
                </div>
            </div>
            <NewCard 
                isVisible={isNewCardVisible}
                onClose={hideCard}
                promptText={promptText}
                title={cardTitle}
                contentType={cardContentType}
                componentsMap={componentsMap}
                completionMessage={cardCompletionMessage}
            />
        </div>
        <div className="glass-window-2">
        <div className="header">
        <div className={`sky-input-container ${inputValue !== '' ? 'expanded' : ''}`}>
            <input
              type="text"
              className="sky-input"
              placeholder="Type"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className={`actions ${inputValue !== '' ? 'hidden' : ''}`}>
                <button><FiPaperclip style={{ marginRight: '5px' }} /> Attach <FiChevronDown style={{ marginLeft: '5px' }} /></button>
                <button><FiSettings style={{ marginRight: '5px' }} /> Settings</button>
                <button><FiEdit style={{ marginRight: '5px' }} /> New Chat</button>
            </div>
          </div>
        </div>
        <div className="suggestions">
          {suggestions.map((suggestion, index) => (
            <p 
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{ 
                cursor: isTypingComplete ? 'pointer' : 'default',
                opacity: displayedSuggestions[index].length > 0 ? 1 : (isTitleComplete ? 1 : 0.3)
              }}
            >
              {displayedSuggestions[index] || <span className="skeleton-suggestion"></span>}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;