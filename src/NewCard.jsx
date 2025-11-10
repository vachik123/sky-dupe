import React, { useState, useEffect } from 'react';
import './NewCard.css';
import { FiX, FiSquare, FiChevronDown, FiCheck } from 'react-icons/fi';

const NewCardHeader = ({ promptText, onClose, isLoading }) => (
  <div className="new-card-header">
    <span className="new-card-header-prompt">
        {isLoading ? <FiSquare size={16} style={{ color: '#666' }} /> : <FiChevronDown size={16} style={{ color: '#666' }} />} {promptText}
    </span>
    <div className="new-card-header-controls">
        <button onClick={onClose} className="header-button">
            <FiX size={20} />
        </button>
    </div>
  </div>
);

const NewCardBody = ({ content: ContentComponent }) => (
  <div className="new-card-body">
    {ContentComponent ? <ContentComponent /> : null}
  </div>
);

const NewCardFooter = ({ onDone }) => (
  <div className="new-card-footer">
    <button className="footer-button">More Actions</button>
    <button className="footer-button primary" onClick={onDone}>Done</button>
  </div>
);

const NewCard = ({ isVisible, onClose, promptText, title, contentType, componentsMap }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const ContentComponent = componentsMap[contentType];

  const handleDone = () => {
    setIsDone(true);
  };

  useEffect(() => {
    if (isVisible) {
      setIsLoading(true);
      setShowContent(false);
      setIsDone(false);
      
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
    }
  }, [isVisible, contentType]);

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
                        <NewCardBody content={ContentComponent} />
                        <NewCardFooter onDone={handleDone} />
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default NewCard;
