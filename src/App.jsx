import React, { useState } from 'react';
import './App.css';
import { FiPaperclip, FiSettings, FiEdit, FiWind, FiChevronDown } from 'react-icons/fi';
import NewCard from './NewCard';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [isNewCardVisible, setIsNewCardVisible] = useState(false);

  const showNewCard = () => setIsNewCardVisible(true);
  const hideNewCard = () => setIsNewCardVisible(false);

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
            <NewCard isVisible={isNewCardVisible} onClose={hideNewCard} />
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
              onKeyDown={(e) => e.key === 'Enter' && showNewCard()}
            />
            <div className={`actions ${inputValue !== '' ? 'hidden' : ''}`}>
                <button><FiPaperclip style={{ marginRight: '5px' }} /> Attach <FiChevronDown style={{ marginLeft: '5px' }} /></button>
                <button><FiSettings style={{ marginRight: '5px' }} /> Settings</button>
                <button><FiEdit style={{ marginRight: '5px' }} /> New Chat</button>
            </div>
          </div>
        </div>
        <div className="suggestions">
          <p onClick={showNewCard}>Add dinner at Mijote at 8 to my calendar</p>
          <p onClick={showNewCard}>Reply saying yes, see you at 8</p>
          <p onClick={showNewCard}>What's on my calendar tonight?</p>
        </div>
      </div>
    </div>
  );
}

export default App;
