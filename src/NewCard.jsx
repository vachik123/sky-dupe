import React, { useState, useEffect } from 'react';
import './NewCard.css';
import { FiX, FiSquare, FiChevronDown, FiCheck } from 'react-icons/fi';

const NewCardHeader = ({ promptText, onClose, isLoading }) => (
  <div className="new-card-header">
    <div className="new-card-header-prompt">
        {isLoading ? <FiSquare size={16} style={{ color: '#666' }} /> : <FiChevronDown size={16} style={{ color: '#666' }} />} {promptText}
    </div>
    <div className="new-card-header-controls">
        <button onClick={onClose} className="header-button">
            <FiX size={20} />
        </button>
    </div>
  </div>
);

const NewCardBody = ({ content: ContentComponent, onWorkflowComplete, onContentReady }) => (
  <div className="new-card-body">
    {ContentComponent ? <ContentComponent onWorkflowComplete={onWorkflowComplete} onContentReady={onContentReady} /> : null}
  </div>
);

const NewCardFooter = ({ onDone, showFooter, contentType }) => {
  // Don't render footer for staffBooking
  if (contentType === 'staffBooking') {
    return null;
  }

  return (
    <div className="new-card-footer" style={{ opacity: showFooter ? 1 : 0, pointerEvents: showFooter ? 'auto' : 'none', transition: 'opacity 0.3s ease' }}>
      <button className="footer-button">More Actions</button>
      <button className="footer-button primary" onClick={onDone}>Done</button>
    </div>
  );
};

const NewCard = ({ isVisible, onClose, promptText, title, contentType, componentsMap, completionMessage }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const [displayedCompletionText, setDisplayedCompletionText] = useState('');

  const ContentComponent = componentsMap[contentType];

  // Default completion message if none provided
  const defaultCompletionMessage = "I've completed the task.";
  const displayMessage = completionMessage || defaultCompletionMessage;

  const handleDone = () => {
    setIsDone(true);
  };

  const handleContentReady = () => {
    setShowFooter(true);
  };

  // Typewriter effect for completion message
  useEffect(() => {
    if (showCompletionMessage) {
      let charIndex = 0;
      setDisplayedCompletionText('');
      
      // Add delay before starting to type
      const startDelay = setTimeout(() => {
        const typingInterval = setInterval(() => {
          if (charIndex < displayMessage.length) {
            setDisplayedCompletionText(displayMessage.substring(0, charIndex + 1));
            charIndex++;
          } else {
            clearInterval(typingInterval);
          }
        }, 1); // typing speed
  
        return () => clearInterval(typingInterval);
      }, 500); // delay before typing starts (adjust this value)
  
      return () => clearTimeout(startDelay);
    } else {
      setDisplayedCompletionText('');
    }
  }, [showCompletionMessage, displayMessage]);

  useEffect(() => {
    if (isVisible) {
      setIsLoading(true);
      setShowContent(false);
      setIsDone(false);
      setShowFooter(false);
      setDisplayedCompletionText('');
      
      const timer = setTimeout(() => {
        setIsLoading(false);
        const contentTimer = setTimeout(() => setShowContent(true), 50);
        return () => clearTimeout(contentTimer);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
      setIsLoading(true);
      setIsDone(false);
      setShowFooter(false);
      setDisplayedCompletionText('');
    }
  }, [isVisible, contentType]);

  useEffect(() => {
    if (isDone) {
      const timer = setTimeout(() => {
        setShowCompletionMessage(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowCompletionMessage(false);
    }
  }, [isDone]);

  const cardClasses = `new-card ${!isLoading && showContent ? 'content' : ''} ${isLoading ? 'loading' : ''} ${isDone ? 'done' : ''}`;

  return (
    <div className={`new-card-container ${isVisible ? 'visible' : ''}`}>
        <div className={cardClasses}>
            <NewCardHeader promptText={promptText} onClose={onClose} isLoading={isLoading} />

            {isLoading ? null : (
                <div className="folder-wrapper">
                    <div className="folder-tab">
                        <span>{title}</span>
                        {isDone && <FiCheck className="checkmark-icon" />}
                    </div>
                    <div className="folder-content">
                        <NewCardBody content={ContentComponent} onWorkflowComplete={handleDone} onContentReady={handleContentReady} />
                        <NewCardFooter onDone={handleDone} showFooter={showFooter} contentType={contentType} />
                    </div>
                    <div className={`completion-message-wrapper ${showCompletionMessage ? 'visible' : ''}`}>
                        <div className="new-card-header new-card-header-prompt indented">
                            {displayedCompletionText}
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default NewCard;